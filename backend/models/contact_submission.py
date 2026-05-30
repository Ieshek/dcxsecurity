from sqlalchemy import Column, Integer, String, Text, DateTime, func

from database import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(length=120), nullable=False)
    phone = Column(String(length=30), nullable=False)
    email = Column(String(length=180), nullable=False, index=True)
    request_type = Column(String(length=120), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
