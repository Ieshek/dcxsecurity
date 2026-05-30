"""
Cache manager for Google Reviews using JSON file storage
"""

import json
import logging
from pathlib import Path
from typing import List, Dict, Optional
from datetime import datetime, timezone, timedelta
from asyncio import Lock

logger = logging.getLogger(__name__)


class ReviewsCacheManager:
    """Manages Google Reviews cache using JSON file storage"""

    def __init__(self, cache_file: str = "data/google_reviews.json", cache_hours: int = 12):
        """
        Initialize cache manager
        
        Args:
            cache_file: Path to JSON cache file
            cache_hours: Cache validity in hours
        """
        self.cache_file = Path(cache_file)
        self.cache_duration = timedelta(hours=cache_hours)
        self.lock = Lock()
        
        # Ensure directory exists
        self.cache_file.parent.mkdir(parents=True, exist_ok=True)

    async def get(self) -> Optional[Dict]:
        """
        Get cached reviews if valid
        
        Returns:
            Dict with reviews data or None if expired/missing
        """
        async with self.lock:
            try:
                if not self.cache_file.exists():
                    logger.info("Cache file does not exist")
                    return None

                with open(self.cache_file, "r") as f:
                    data = json.load(f)

                # Check if cache is expired
                if "last_updated" in data:
                    last_updated = datetime.fromisoformat(data["last_updated"])
                    age = datetime.now(timezone.utc) - last_updated

                    if age < self.cache_duration:
                        logger.info(f"Cache is valid (age: {age.total_seconds()/3600:.1f} hours)")
                        return data
                    else:
                        logger.info(f"Cache expired (age: {age.total_seconds()/3600:.1f} hours)")
                        return None

                return None

            except json.JSONDecodeError:
                logger.error("Cache file is corrupted")
                return None
            except Exception as e:
                logger.error(f"Error reading cache: {str(e)}")
                return None

    async def set(self, reviews: List[Dict]) -> bool:
        """
        Save reviews to cache file
        
        Args:
            reviews: List of review dictionaries
            
        Returns:
            True if successful, False otherwise
        """
        async with self.lock:
            try:
                data = {
                    "last_updated": datetime.now(timezone.utc).isoformat(),
                    "reviews": reviews,
                }

                with open(self.cache_file, "w") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

                logger.info(f"Cached {len(reviews)} reviews to {self.cache_file}")
                return True

            except Exception as e:
                logger.error(f"Error writing cache: {str(e)}")
                return False

    async def is_expired(self) -> bool:
        """Check if cache is expired"""
        async with self.lock:
            try:
                if not self.cache_file.exists():
                    return True

                with open(self.cache_file, "r") as f:
                    data = json.load(f)

                if "last_updated" not in data:
                    return True

                last_updated = datetime.fromisoformat(data["last_updated"])
                age = datetime.now(timezone.utc) - last_updated

                return age >= self.cache_duration

            except Exception:
                return True

    async def clear(self) -> bool:
        """Clear cache file"""
        async with self.lock:
            try:
                if self.cache_file.exists():
                    self.cache_file.unlink()
                    logger.info("Cache cleared")
                return True
            except Exception as e:
                logger.error(f"Error clearing cache: {str(e)}")
                return False
