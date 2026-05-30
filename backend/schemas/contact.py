from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, constr


class ContactRequest(BaseModel):
    full_name: constr(strip_whitespace=True, min_length=2, max_length=120)
    phone: constr(
        strip_whitespace=True,
        min_length=10,
        max_length=20,
        regex=r"^(?:\+91[\-\s]?)?[6-9]\d{9}$",
    )
    email: EmailStr
    request_type: constr(strip_whitespace=True, min_length=3, max_length=120)
    message: constr(strip_whitespace=True, min_length=10, max_length=2000)
    honeypot: Optional[str] = Field(None, description="Leave empty")


class ContactResponse(BaseModel):
    success: bool
    message: str
    submission_id: Optional[int] = None
    created_at: Optional[datetime] = None
