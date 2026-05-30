"""
Google Reviews API Routes
"""

import logging
from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
import asyncio

from services.google_reviews_scraper import get_google_reviews as scrape_reviews
from services.cache_manager import ReviewsCacheManager

logger = logging.getLogger(__name__)

# Initialize cache manager
cache_manager = ReviewsCacheManager(cache_file="data/google_reviews.json", cache_hours=12)

# Create router
router = APIRouter(prefix="/api")


# Models
class ReviewData(BaseModel):
    id: str
    name: str
    rating: int
    review: str
    profile_image: Optional[str] = None


class GoogleReviewsResponse(BaseModel):
    success: bool
    cached: bool
    last_updated: Optional[str] = None
    reviews: List[ReviewData] = []
    message: Optional[str] = None


def refresh_reviews_background():
    """Background task to refresh reviews"""
    try:
        logger.info("Starting background review refresh")
        reviews = scrape_reviews(headless=True)
        
        # Save to cache
        import json
        from pathlib import Path
        cache_file = Path("data/google_reviews.json")
        cache_file.parent.mkdir(parents=True, exist_ok=True)
        
        data = {
            "last_updated": datetime.now().isoformat(),
            "reviews": reviews,
        }
        
        with open(cache_file, "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Background refresh completed with {len(reviews)} reviews")
    except Exception as e:
        logger.error(f"Background refresh failed: {str(e)}")


@router.get("/google-reviews", response_model=GoogleReviewsResponse)
async def get_google_reviews(background_tasks: BackgroundTasks):
    """
    Get Google reviews for DCX Security Wizards.
    Uses caching with 12-hour refresh interval.
    
    Returns cached reviews if available and not expired.
    Otherwise fetches fresh reviews from Google Maps.
    """
    try:
        # Try to get cached reviews
        cached_data = await cache_manager.get()

        if cached_data:
            reviews = [ReviewData(**r) for r in cached_data.get("reviews", [])]
            return GoogleReviewsResponse(
                success=True,
                cached=True,
                last_updated=cached_data.get("last_updated"),
                reviews=reviews,
                message=f"Serving {len(reviews)} cached reviews",
            )

        # Cache is expired or doesn't exist, fetch new reviews
        logger.info("Cache expired or missing, fetching new reviews")

        # Run scraper in executor to avoid blocking
        loop = asyncio.get_event_loop()
        reviews_data = await loop.run_in_executor(None, scrape_reviews, True)

        # Convert to ReviewData objects
        reviews = [ReviewData(**r) for r in reviews_data]

        # Save to cache in background
        await cache_manager.set(reviews_data)

        # Schedule next refresh in 12 hours
        background_tasks.add_task(refresh_reviews_background)

        return GoogleReviewsResponse(
            success=True,
            cached=False,
            last_updated=datetime.now().isoformat(),
            reviews=reviews,
            message=f"Fetched {len(reviews)} fresh reviews from Google Maps",
        )

    except Exception as e:
        logger.error(f"Error getting Google reviews: {str(e)}")
        
        # Try to return cached reviews even if fetch failed
        try:
            cached_data = await cache_manager.get()
            if cached_data:
                reviews = [ReviewData(**r) for r in cached_data.get("reviews", [])]
                return GoogleReviewsResponse(
                    success=True,
                    cached=True,
                    last_updated=cached_data.get("last_updated"),
                    reviews=reviews,
                    message="Serving cached reviews (fresh fetch failed)",
                )
        except Exception as cache_err:
            logger.error(f"Could not get cached reviews: {str(cache_err)}")

        # Return error response
        return GoogleReviewsResponse(
            success=False,
            cached=False,
            reviews=[],
            message="Unable to load Google Reviews at this time",
        )


@router.post("/google-reviews/refresh")
async def refresh_google_reviews():
    """
    Manually trigger a refresh of Google reviews.
    Clears cache and fetches fresh reviews.
    """
    try:
        logger.info("Manual refresh triggered")
        
        # Clear cache
        await cache_manager.clear()

        # Fetch fresh reviews
        loop = asyncio.get_event_loop()
        reviews_data = await loop.run_in_executor(None, scrape_reviews, True)

        # Convert to ReviewData objects
        reviews = [ReviewData(**r) for r in reviews_data]

        # Save to cache
        await cache_manager.set(reviews_data)

        return GoogleReviewsResponse(
            success=True,
            cached=False,
            last_updated=datetime.now().isoformat(),
            reviews=reviews,
            message=f"Manually refreshed {len(reviews)} reviews from Google Maps",
        )

    except Exception as e:
        logger.error(f"Error refreshing reviews: {str(e)}")
        return GoogleReviewsResponse(
            success=False,
            cached=False,
            reviews=[],
            message=f"Refresh failed: {str(e)}",
        )


@router.get("/google-reviews/cache-status")
async def get_cache_status():
    """Get current cache status"""
    try:
        cached_data = await cache_manager.get()
        
        if cached_data:
            return {
                "success": True,
                "cached": True,
                "last_updated": cached_data.get("last_updated"),
                "review_count": len(cached_data.get("reviews", [])),
                "is_expired": False,
            }
        else:
            is_expired = await cache_manager.is_expired()
            return {
                "success": True,
                "cached": False,
                "last_updated": None,
                "review_count": 0,
                "is_expired": is_expired,
            }
    except Exception as e:
        logger.error(f"Error getting cache status: {str(e)}")
        return {
            "success": False,
            "error": str(e),
        }
