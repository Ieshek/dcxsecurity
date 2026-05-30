import logging
from datetime import datetime
from typing import Dict

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Request, status
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from models.contact_submission import ContactSubmission
from schemas.contact import ContactRequest, ContactResponse
from services.email_service import send_owner_notification, send_user_confirmation
from services.rate_limiter import RateLimiter

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api")

rate_limiter = RateLimiter(max_requests=5, window_seconds=600)


@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(
    payload: ContactRequest,
    request: Request,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    if payload.honeypot:
        logger.warning("Blocked spam submission by honeypot")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid submission.",
        )

    client_ip = request.client.host if request.client else "unknown"
    if not rate_limiter.allow(client_ip):
        logger.warning("Rate limit exceeded for %s", client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many requests. Please try again later.",
        )

    submission = ContactSubmission(
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
        request_type=payload.request_type,
        message=payload.message,
    )

    try:
        db.add(submission)
        await db.commit()
        await db.refresh(submission)
    except SQLAlchemyError as exc:
        logger.error("Database error saving contact submission: %s", exc)
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to store the request at this time.",
        )

    email_payload: Dict[str, str] = {
        "full_name": submission.full_name,
        "phone": submission.phone,
        "email": submission.email,
        "request_type": submission.request_type,
        "message": submission.message,
        "created_at": submission.created_at.isoformat(),
    }

    background_tasks.add_task(send_owner_notification, email_payload)
    background_tasks.add_task(send_user_confirmation, email_payload)

    return ContactResponse(
        success=True,
        message="Thank you! Your message has been received.",
        submission_id=submission.id,
        created_at=submission.created_at,
    )
