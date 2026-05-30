import time
from collections import defaultdict, deque
from threading import Lock


class RateLimiter:
    def __init__(self, max_requests: int = 5, window_seconds: int = 600) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(deque)
        self.lock = Lock()

    def allow(self, key: str) -> bool:
        now = time.time()
        with self.lock:
            queue = self.requests[key]
            while queue and queue[0] + self.window_seconds < now:
                queue.popleft()
            if len(queue) >= self.max_requests:
                return False
            queue.append(now)
            return True

    def reset(self, key: str) -> None:
        with self.lock:
            if key in self.requests:
                del self.requests[key]
