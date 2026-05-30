"""
Google Reviews Scraper Service
Extracts reviews from Google Maps using Selenium

Refactored with:
- Multi-fallback review button detection
- Multi-fallback review container detection
- Dynamic reviewer name discovery with DOM inspection
- Deduplication via composite key (text + image or text + name)
- Smart scrolling (stops when no new reviews appear)
- Structured debug output: debug/page_loaded.png|html, debug/reviews_opened.png|html, etc.
- Review text expansion (More / Read More buttons)
- Rating extraction from aria-label
- Profile image extraction (real Google photos only)
- JSON cache to data/google_reviews.json
"""

import json
import logging
import os
import re
import time
import uuid
from pathlib import Path
from typing import List, Dict, Optional, Set, Tuple

from selenium import webdriver
from selenium.common.exceptions import (
    NoSuchElementException,
    StaleElementReferenceException,
    TimeoutException,
)
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

GOOGLE_MAPS_URL = "https://www.google.com/maps/place/DCX+Security+Wizards"
SCROLL_PAUSE = 1.5         # seconds between scroll ticks
MAX_REVIEWS = 50           # hard cap
MAX_SCROLL_STALE = 5       # stop after N scrolls with no new reviews
DEBUG_DIR = Path("debug")
DATA_DIR = Path("data")
CACHE_FILE = DATA_DIR / "google_reviews.json"

# ---------------------------------------------------------------------------
# Review-button XPath selectors (tried in order)
# ---------------------------------------------------------------------------
REVIEW_BUTTON_SELECTORS = [
    "//button[.//div[contains(text(),'Reviews')]]",
    "//div[text()='Reviews']/ancestor::button[1]",
    "//button[contains(@aria-label,'Reviews')]",
    "//*[@aria-label='Reviews']",
    "//button[contains(.,'Reviews')]",
    "//div[contains(@class,'fontTitleSmall') and contains(text(),'Reviews')]"
    "/ancestor::button[1]",
]

# JavaScript fallback queries for the Reviews button
REVIEW_BUTTON_JS_QUERIES = [
    "return [...document.querySelectorAll('button')].find("
    "  b => b.innerText && b.innerText.includes('Reviews'));",
    "return document.querySelector('[aria-label*=\"Reviews\"]');",
    "return [...document.querySelectorAll('[jsaction]')].find("
    "  el => el.innerText && el.innerText.match(/^\\d+ reviews?$/i));",
]

# ---------------------------------------------------------------------------
# Review-container XPath selectors (tried in order)
# ---------------------------------------------------------------------------
REVIEW_CONTAINER_SELECTORS = [
    "//div[@role='main']//div[contains(@style,'overflow-y: auto')]",
    "//div[@role='main']//div[contains(@style,'overflow-y:auto')]",
    "//div[@role='dialog']//div[contains(@style,'overflow')]",
    "//div[contains(@class,'lXJj5c')]",
    "//div[@role='main']",
]

# ---------------------------------------------------------------------------
# Review element XPath selectors (tried in order)
# ---------------------------------------------------------------------------
REVIEW_ELEMENT_SELECTORS = [
    "//div[@data-review-id]",
    "//div[@data-js-lseid]",
    "//div[contains(@class,'jJc9Ad')]",       # seen in 2024 Maps
    "//div[contains(@class,'GHT2ce')]",
    "//div[@role='listitem']",
    "//div[contains(@class,'fontBodyMedium') and .//span[@role='img']]",
]

# ---------------------------------------------------------------------------
# Per-review field selectors
# ---------------------------------------------------------------------------
NAME_SELECTORS = [
    ".//div[contains(@class,'d4r55')]",
    ".//div[contains(@class,'WNxzHc')]//span",
    ".//span[contains(@class,'sSAMbb')]",
    ".//div[contains(@class,'qBrPac')]//span",
    ".//button[contains(@aria-label,'Photo of')]",   # aria-label carries name
    ".//span[not(@class) and string-length(text())>1 and not(contains(text(),'star'))]",
    ".//a[contains(@href,'/maps/contrib/')]",
]

RATING_SELECTORS = [
    ".//span[@role='img'][contains(@aria-label,'star')]",
    ".//div[contains(@class,'iRPBf')]",
    ".//span[contains(@aria-label,'star')]",
    ".//span[contains(@aria-label,'Rated')]",
    ".//span[contains(@aria-label,'out of 5')]",
]

REVIEW_TEXT_SELECTORS = [
    ".//span[contains(@class,'wiI7pd')]",
    ".//div[contains(@class,'MyEned')]//span",
    ".//span[@jslog and string-length(text())>10]",
    ".//div[contains(@class,'review-full-text')]",
    ".//div[contains(@class,'review-content')]",
]

PROFILE_IMAGE_SELECTORS = [
    ".//img[contains(@src,'googleusercontent') and not(contains(@src,'maps/'))]",
    ".//img[contains(@class,'RxBJg')]",
    ".//img[contains(@class,'NBa7we')]",
    ".//img[contains(@class,'jMKvEc')]",
    ".//img[@alt and string-length(@src)>20]",
]

# Placeholder / broken image patterns to skip
PLACEHOLDER_PATTERNS = [
    "/maps/",
    "photoreference=",
    "data:image/gif;base64,R0lGODlhAQABAAD",  # 1×1 transparent gif
]


# ===========================================================================
# Helper utilities
# ===========================================================================

def _ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def _save_debug(driver, prefix: str, label: str) -> None:
    """Save screenshot and page source to debug/<label>."""
    _ensure_dir(DEBUG_DIR)
    screenshot_path = str(DEBUG_DIR / f"{label}.png")
    html_path = str(DEBUG_DIR / f"{label}.html")
    try:
        driver.save_screenshot(screenshot_path)
        logger.info(f"[DEBUG] Screenshot → {screenshot_path}")
    except Exception as exc:
        logger.warning(f"[DEBUG] Could not save screenshot: {exc}")
    try:
        with open(html_path, "w", encoding="utf-8") as fh:
            fh.write(driver.page_source)
        logger.info(f"[DEBUG] Page source → {html_path}")
    except Exception as exc:
        logger.warning(f"[DEBUG] Could not save HTML: {exc}")


def _extract_rating_from_label(label: str) -> int:
    """Parse '5 stars', 'Rated 4 out of 5 stars', '3 star' → int."""
    if not label:
        return 5
    m = re.search(r"(\d+)", label)
    if m:
        val = int(m.group(1))
        return min(max(val, 1), 5)
    return 5


def _is_placeholder_image(src: str) -> bool:
    if not src:
        return True
    return any(pat in src for pat in PLACEHOLDER_PATTERNS)


def _dedup_key(review_text: str, profile_image: Optional[str], name: str) -> str:
    """Create a composite key for deduplication."""
    # Normalise text (strip whitespace, lowercase)
    text_norm = re.sub(r"\s+", " ", review_text.strip().lower())
    img_norm = (profile_image or "").split("=")[0]  # strip URL params
    name_norm = name.strip().lower()
    return f"{text_norm}|||{img_norm or name_norm}"


# ===========================================================================
# Chrome driver factory
# ===========================================================================

def _build_driver(headless: bool = True) -> webdriver.Chrome:
    options = Options()
    if headless:
        options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    )
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--lang=en-US,en;q=0.9")
    options.add_experimental_option(
        "prefs",
        {
            "profile.default_content_setting_values.notifications": 2,
            "intl.accept_languages": "en-US,en",
        },
    )
    # Suppress "Chrome is being controlled by automated test software" banner
    options.add_experimental_option("excludeSwitches", ["enable-automation"])
    options.add_experimental_option("useAutomationExtension", False)
    driver = webdriver.Chrome(options=options)
    # Stealth tweak
    driver.execute_cdp_cmd(
        "Page.addScriptToEvaluateOnNewDocument",
        {"source": "Object.defineProperty(navigator,'webdriver',{get:()=>undefined})"},
    )
    return driver


# ===========================================================================
# Core scraper class
# ===========================================================================

class GoogleReviewsScraper:
    """
    Robust Google Maps reviews scraper.

    Usage:
        scraper = GoogleReviewsScraper(headless=True)
        reviews = scraper.scrape()
    """

    def __init__(self, headless: bool = True, maps_url: str = GOOGLE_MAPS_URL):
        self.headless = headless
        self.maps_url = maps_url
        self.driver: Optional[webdriver.Chrome] = None

    # ------------------------------------------------------------------
    # Lifecycle
    # ------------------------------------------------------------------

    def _init_driver(self) -> None:
        logger.info("Initialising Chrome WebDriver …")
        self.driver = _build_driver(self.headless)
        logger.info("Chrome WebDriver ready.")

    def _quit_driver(self) -> None:
        if self.driver:
            try:
                self.driver.quit()
            except Exception:
                pass
            self.driver = None

    # ------------------------------------------------------------------
    # Step 1 — Navigate and save initial debug snapshot
    # ------------------------------------------------------------------

    def _navigate(self) -> None:
        logger.info(f"Navigating → {self.maps_url}")
        self.driver.get(self.maps_url)
        time.sleep(4)  # let initial JS render

        print("=" * 80)
        print(f"PAGE TITLE : {self.driver.title}")
        print(f"CURRENT URL: {self.driver.current_url}")

        buttons = self.driver.find_elements(By.TAG_NAME, "button")
        print(f"BUTTONS FOUND: {len(buttons)}")
        for i, btn in enumerate(buttons[:120]):
            try:
                txt = btn.text.strip()
                if txt:
                    print(f"  BUTTON[{i:03d}]: {txt!r}")
            except Exception:
                pass
        print("=" * 80)

        _save_debug(self.driver, "", "page_loaded")

    # ------------------------------------------------------------------
    # Step 2 — Click the Reviews tab
    # ------------------------------------------------------------------

    def _click_reviews_tab(self) -> bool:
        """
        Try multiple strategies to locate and click the Reviews button.
        Returns True on success.
        """
        wait = WebDriverWait(self.driver, 15)

        # --- XPath strategies ---
        for selector in REVIEW_BUTTON_SELECTORS:
            try:
                logger.info(f"  Trying XPath: {selector}")
                btn = wait.until(
                    EC.element_to_be_clickable((By.XPATH, selector))
                )
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({block:'center'});", btn
                )
                time.sleep(0.5)
                self.driver.execute_script("arguments[0].click();", btn)
                logger.info(f"  ✓ Reviews button clicked via XPath: {selector}")
                time.sleep(4)
                _save_debug(self.driver, "", "reviews_opened")
                return True
            except Exception:
                logger.debug(f"  ✗ XPath failed: {selector}")

        # --- JavaScript fallback strategies ---
        logger.info("XPath strategies exhausted → trying JavaScript fallbacks …")
        for js_query in REVIEW_BUTTON_JS_QUERIES:
            try:
                btn = self.driver.execute_script(js_query)
                if btn:
                    self.driver.execute_script(
                        "arguments[0].scrollIntoView({block:'center'});", btn
                    )
                    time.sleep(0.5)
                    self.driver.execute_script("arguments[0].click();", btn)
                    logger.info(f"  ✓ Reviews button clicked via JS: {js_query[:60]}")
                    time.sleep(4)
                    _save_debug(self.driver, "", "reviews_opened")
                    return True
            except Exception as exc:
                logger.debug(f"  ✗ JS fallback failed: {exc}")

        # --- Total failure ---
        logger.error("Could NOT locate Reviews button via any strategy.")
        _save_debug(self.driver, "", "review_button_not_found")
        review_elems = self.driver.find_elements(By.XPATH, "//div[@data-review-id]")
        print(f"[DIAGNOSTIC] review elements in DOM: {len(review_elems)}")
        return False

    # ------------------------------------------------------------------
    # Step 3 — Locate the scrollable reviews container
    # ------------------------------------------------------------------

    def _get_scroll_container(self):
        for selector in REVIEW_CONTAINER_SELECTORS:
            try:
                container = self.driver.find_element(By.XPATH, selector)
                # Verify it's actually scrollable
                scroll_height = self.driver.execute_script(
                    "return arguments[0].scrollHeight;", container
                )
                client_height = self.driver.execute_script(
                    "return arguments[0].clientHeight;", container
                )
                if scroll_height and scroll_height > client_height:
                    logger.info(
                        f"✓ Scroll container found: {selector!r} "
                        f"(scrollHeight={scroll_height}, clientHeight={client_height})"
                    )
                    return container
            except Exception:
                pass

        # Last resort: find largest div with overflow scroll/auto
        try:
            container = self.driver.execute_script("""
                const divs = [...document.querySelectorAll('div')];
                return divs
                    .filter(d => {
                        const s = window.getComputedStyle(d);
                        return (s.overflowY === 'auto' || s.overflowY === 'scroll')
                               && d.scrollHeight > d.clientHeight + 100;
                    })
                    .sort((a, b) => b.scrollHeight - a.scrollHeight)[0] || null;
            """)
            if container:
                logger.info("✓ Scroll container found via JS computed-style scan.")
                return container
        except Exception:
            pass

        logger.warning("No dedicated scroll container found — will scroll document body.")
        return None

    # ------------------------------------------------------------------
    # Step 4 — Smart scroll until no new reviews appear
    # ------------------------------------------------------------------

    def _smart_scroll(self, container) -> None:
        """Scroll the reviews panel until MAX_REVIEWS loaded or no new items appear."""
        stale_count = 0
        prev_count = 0
        iteration = 0

        while stale_count < MAX_SCROLL_STALE:
            iteration += 1
            current_reviews = self._count_visible_reviews()

            if current_reviews >= MAX_REVIEWS:
                logger.info(f"Reached MAX_REVIEWS cap ({MAX_REVIEWS}). Stopping scroll.")
                break

            if current_reviews == prev_count:
                stale_count += 1
                logger.info(
                    f"Scroll iteration {iteration}: no new reviews "
                    f"({current_reviews} total, stale={stale_count}/{MAX_SCROLL_STALE})"
                )
            else:
                stale_count = 0
                logger.info(
                    f"Scroll iteration {iteration}: {current_reviews} reviews loaded "
                    f"(+{current_reviews - prev_count})"
                )

            prev_count = current_reviews

            try:
                if container:
                    self.driver.execute_script(
                        "arguments[0].scrollTop += 1200;", container
                    )
                else:
                    self.driver.execute_script("window.scrollBy(0, 1200);")
            except Exception as exc:
                logger.warning(f"Scroll error: {exc}")

            time.sleep(SCROLL_PAUSE)

        logger.info(
            f"Scrolling complete after {iteration} iterations. "
            f"Final visible review count: {self._count_visible_reviews()}"
        )

    def _count_visible_reviews(self) -> int:
        for selector in REVIEW_ELEMENT_SELECTORS:
            try:
                elems = self.driver.find_elements(By.XPATH, selector)
                if elems:
                    return len(elems)
            except Exception:
                pass
        return 0

    # ------------------------------------------------------------------
    # Step 5 — Extract all reviews
    # ------------------------------------------------------------------

    def _expand_review_text(self, elem) -> None:
        """Click 'More' / 'Read More' to expand truncated review text."""
        expand_xpaths = [
            ".//button[contains(normalize-space(),'More')]",
            ".//button[contains(normalize-space(),'Read more')]",
            ".//span[contains(@class,'review-more')]",
            ".//span[@jsaction and contains(normalize-space(),'More')]",
        ]
        for xpath in expand_xpaths:
            try:
                more_btn = elem.find_element(By.XPATH, xpath)
                self.driver.execute_script("arguments[0].click();", more_btn)
                time.sleep(0.3)
                return
            except NoSuchElementException:
                pass

    def _extract_name(self, elem, idx: int) -> str:
        """
        Try every known selector to extract reviewer name.
        Logs full outerHTML for the first 3 reviews to aid debugging.
        Never returns 'Anonymous' unless truly no name is found.
        """
        # Log DOM for first 3 reviews
        if idx < 3:
            try:
                outer = elem.get_attribute("outerHTML")
                logger.debug(
                    f"[DOM][review {idx}] outerHTML (first 800 chars):\n"
                    f"{outer[:800]}"
                )
                # Also print to stdout for immediate visibility
                print(f"\n{'─'*60}")
                print(f"[DOM DEBUG] Review #{idx} outerHTML (first 600 chars):")
                print(outer[:600])
                print("─" * 60)
            except Exception:
                pass

        # 1. Try known XPath selectors
        for selector in NAME_SELECTORS:
            try:
                name_elem = elem.find_element(By.XPATH, selector)

                # For button[aria-label='Photo of NAME'] pattern
                aria = name_elem.get_attribute("aria-label") or ""
                if "Photo of" in aria:
                    candidate = aria.replace("Photo of", "").strip()
                    if candidate:
                        return candidate

                # href-based: /maps/contrib/UID → try aria-label
                href = name_elem.get_attribute("href") or ""
                if "/maps/contrib/" in href:
                    label = name_elem.get_attribute("aria-label") or ""
                    if label:
                        return label.strip()

                text = name_elem.text.strip()
                if text and len(text) > 1 and text.lower() not in (
                    "more", "read more", "less",
                ):
                    return text
            except (NoSuchElementException, StaleElementReferenceException):
                continue

        # 2. JavaScript fallback: grab all text spans and heuristically pick the name
        try:
            candidates = self.driver.execute_script("""
                const elem = arguments[0];
                const results = [];
                // All spans / divs with short text (1-4 words) near top of card
                elem.querySelectorAll('span, div, a').forEach(el => {
                    const t = (el.innerText || '').trim();
                    if (t && t.split(' ').length <= 5 && t.length > 1
                        && !t.match(/^\\d/)
                        && !t.toLowerCase().includes('star')
                        && !t.toLowerCase().includes('review')
                        && !t.toLowerCase().includes('more')
                        && !t.toLowerCase().includes('ago')) {
                        results.push(t);
                    }
                });
                return results.slice(0, 5);
            """, elem)
            if candidates:
                # The first plausible candidate is usually the name
                return candidates[0]
        except Exception:
            pass

        return ""  # Never "Anonymous" — let caller decide

    def _extract_rating(self, elem) -> int:
        for selector in RATING_SELECTORS:
            try:
                rating_elem = elem.find_element(By.XPATH, selector)
                label = rating_elem.get_attribute("aria-label") or ""
                rating = _extract_rating_from_label(label)
                if rating:
                    return rating
            except (NoSuchElementException, StaleElementReferenceException):
                continue
        return 5  # safe default

    def _extract_review_text(self, elem) -> str:
        for selector in REVIEW_TEXT_SELECTORS:
            try:
                text_elem = elem.find_element(By.XPATH, selector)
                text = text_elem.text.strip()
                if text and len(text) > 3:
                    return text
            except (NoSuchElementException, StaleElementReferenceException):
                continue

        # JS fallback: grab largest text block inside the element
        try:
            text = self.driver.execute_script("""
                const elem = arguments[0];
                let maxLen = 0, maxText = '';
                elem.querySelectorAll('span, div, p').forEach(el => {
                    const t = (el.innerText || '').trim();
                    if (t.length > maxLen) { maxLen = t.length; maxText = t; }
                });
                return maxText;
            """, elem)
            if text and len(text) > 3:
                return text.strip()
        except Exception:
            pass

        return ""

    def _extract_profile_image(self, elem) -> Optional[str]:
        for selector in PROFILE_IMAGE_SELECTORS:
            try:
                img = elem.find_element(By.XPATH, selector)
                src = img.get_attribute("src") or ""
                if src and not _is_placeholder_image(src):
                    return src
            except (NoSuchElementException, StaleElementReferenceException):
                continue
        return None

    def _get_review_elements(self) -> list:
        """Find all review elements, trying each selector in order."""
        for selector in REVIEW_ELEMENT_SELECTORS:
            try:
                elems = self.driver.find_elements(By.XPATH, selector)
                if elems:
                    logger.info(
                        f"✓ Review elements found ({len(elems)}) using: {selector!r}"
                    )
                    return elems
            except Exception:
                continue
        logger.warning("No review elements found with any selector.")
        return []

    def _extract_all_reviews(self) -> List[Dict]:
        """Extract, deduplicate, and return all review dicts."""
        # Wait for at least one review to appear
        for selector in REVIEW_ELEMENT_SELECTORS:
            try:
                WebDriverWait(self.driver, 12).until(
                    EC.presence_of_element_located((By.XPATH, selector))
                )
                break
            except TimeoutException:
                pass

        review_elements = self._get_review_elements()
        if not review_elements:
            logger.error("No review elements detected. Saving diagnostic snapshot.")
            _save_debug(self.driver, "", "reviews_opened")
            print(f"[DIAGNOSTIC] Current URL: {self.driver.current_url}")
            print(f"[DIAGNOSTIC] Page title : {self.driver.title}")
            return []

        logger.info(f"Processing {len(review_elements)} review elements …")

        reviews: List[Dict] = []
        seen_keys: Set[str] = set()

        for idx, elem in enumerate(review_elements[: MAX_REVIEWS * 2]):
            if len(reviews) >= MAX_REVIEWS:
                break

            try:
                self.driver.execute_script(
                    "arguments[0].scrollIntoView({block:'nearest'});", elem
                )
                time.sleep(0.15)

                # Expand truncated text
                self._expand_review_text(elem)

                name = self._extract_name(elem, idx)
                rating = self._extract_rating(elem)
                text = self._extract_review_text(elem)
                image = self._extract_profile_image(elem)

                if not text:
                    logger.debug(f"Review #{idx}: no text, skipping.")
                    continue

                # Deduplication
                key = _dedup_key(text, image, name)
                if key in seen_keys:
                    logger.info(f"Review #{idx}: duplicate, skipping.")
                    continue
                seen_keys.add(key)

                # Use "Anonymous" only as absolute last resort
                display_name = name if name else "Anonymous"

                review = {
                    "id": str(uuid.uuid4()),
                    "name": display_name,
                    "rating": rating,
                    "review": text,
                    "profile_image": image,
                }
                reviews.append(review)
                logger.info(
                    f"  [{len(reviews):02d}] {display_name!r} — {rating}★ — "
                    f"{text[:60]!r}…"
                )

            except StaleElementReferenceException:
                logger.warning(f"Review #{idx}: stale element, skipping.")
            except Exception as exc:
                logger.error(f"Review #{idx}: unexpected error — {exc}")

        logger.info(
            f"Extracted {len(reviews)} unique reviews "
            f"(from {len(review_elements)} elements)."
        )
        return reviews

    # ------------------------------------------------------------------
    # Cache helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _save_cache(reviews: List[Dict]) -> None:
        try:
            _ensure_dir(DATA_DIR)
            from datetime import datetime, timezone
            payload = {
                "last_updated": datetime.now(timezone.utc).isoformat(),
                "reviews": reviews,
            }
            with open(CACHE_FILE, "w", encoding="utf-8") as fh:
                json.dump(payload, fh, indent=2, ensure_ascii=False)
            logger.info(f"Cached {len(reviews)} reviews → {CACHE_FILE}")
        except Exception as exc:
            logger.error(f"Failed to save cache: {exc}")

    # ------------------------------------------------------------------
    # Public entry point
    # ------------------------------------------------------------------

    def scrape(self) -> List[Dict]:
        """
        Run the full scraping pipeline.

        Returns:
            List of review dicts:
            [{"id": str, "name": str, "rating": int, "review": str, "profile_image": str|None}]
        """
        reviews: List[Dict] = []
        try:
            self._init_driver()
            self._navigate()

            tab_opened = self._click_reviews_tab()
            if not tab_opened:
                logger.warning(
                    "Reviews tab could not be opened. "
                    "Attempting extraction anyway (reviews may already be visible)."
                )

            container = self._get_scroll_container()
            self._smart_scroll(container)

            reviews = self._extract_all_reviews()

            if reviews:
                self._save_cache(reviews)
            else:
                logger.warning("No reviews extracted — cache not updated.")

        except Exception as exc:
            logger.error(f"Fatal scraper error: {exc}", exc_info=True)
            if self.driver:
                _save_debug(self.driver, "", "scraper_fatal_error")

        finally:
            self._quit_driver()

        return reviews


# ===========================================================================
# Convenience function (public API used by routes)
# ===========================================================================

def get_google_reviews(headless: bool = True) -> List[Dict]:
    """
    Convenience wrapper around GoogleReviewsScraper.

    Args:
        headless: Run Chrome in headless mode (default True).

    Returns:
        List of review dicts.
    """
    scraper = GoogleReviewsScraper(headless=headless)
    return scraper.scrape()
