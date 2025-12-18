from uuid import UUID, uuid4
from datetime import datetime
from pydantic import BaseModel, Field

class User(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login_at: datetime = Field(default_factory=datetime.utcnow)
    profile_id: UUID | None = None # Foreign Key to UserProfile, nullable for initial creation

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "email": "user@example.com",
                "password_hash": "$2b$12$EXAMPLEHASH",
                "created_at": "2025-01-01T12:00:00.000Z",
                "last_login_at": "2025-01-01T12:00:00.000Z",
                "profile_id": "123e4567-e89b-12d3-a456-426614174001"
            }
        }
