from uuid import UUID, uuid4
from pydantic import BaseModel, Field

class UserProfile(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    user_id: UUID # Foreign Key to User
    name: str
    software_background: str
    hardware_background: str
    learning_pace_preference: str
    preferred_language: str = "en" # Default to English
    personalized_content_difficulty: str = "standard" # Default difficulty

    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174001",
                "user_id": "123e4567-e89b-12d3-a456-426614174000",
                "name": "John Doe",
                "software_background": "Intermediate Python",
                "hardware_background": "Familiar with Arduino",
                "learning_pace_preference": "Moderate",
                "preferred_language": "en",
                "personalized_content_difficulty": "standard"
            }
        }
