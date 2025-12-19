from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from uuid import UUID

from app.models.user import User
from app.models.user_profile import UserProfile
from app.api.auth import get_current_user # Assuming this will be implemented for auth

router = APIRouter()

# Placeholder for database operations (will be replaced with actual DB interactions)
# In-memory storage for demonstration
from app.api.auth import dummy_profiles_db # Access dummy DB from auth module

class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    software_background: Optional[str] = None
    hardware_background: Optional[str] = None
    learning_pace_preference: Optional[str] = None
    preferred_language: Optional[str] = None
    personalized_content_difficulty: Optional[str] = None

@router.get("/profile", response_model=UserProfile)
async def get_user_profile(current_user: User = Depends(get_current_user)):
    profile = next((p for p in dummy_profiles_db if p.user_id == current_user.id), None)
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")
    return profile

@router.put("/profile", response_model=UserProfile)
async def update_user_profile(profile_update: UserProfileUpdate, current_user: User = Depends(get_current_user)):
    profile = next((p for p in dummy_profiles_db if p.user_id == current_user.id), None)
    if not profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")

    # Update fields if provided
    for field, value in profile_update.model_dump(exclude_unset=True).items():
        setattr(profile, field, value)

    return profile
