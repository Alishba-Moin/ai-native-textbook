from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import google.generativeai as genai
import os

from app.models.user import User
from app.models.user_profile import UserProfile
from app.api.auth import get_current_user # To get current authenticated user
from app.api.auth import dummy_users_db, dummy_profiles_db # Access dummy DB for demonstration
from app.core.config import settings

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY", settings.GEMINI_API_KEY))
model = genai.GenerativeModel('gemini-pro') # Using gemini-pro for content generation

class PersonalizationRequest(BaseModel):
    chapter_id: UUID
    # user_id will be derived from auth token

class PersonalizedContent(BaseModel):
    chapter_id: UUID
    user_id: UUID
    difficulty: str
    original_content: str
    personalized_content: str
    language: str = "en"

# Placeholder for fetching original chapter content (would read from file/DB in real app)
def get_original_chapter_content(chapter_id: UUID) -> Optional[str]:
    # For now, a dummy content
    dummy_content = f"""
    # Introduction to Robotics (Chapter {chapter_id})

    Robotics is an interdisciplinary field that integrates computer science and engineering.
    It involves the design, construction, operation, and use of robots. The goal of robotics
    is to design machines that can help and assist humans in their daily lives.

    Key areas in robotics include:
    - **Artificial Intelligence**: For decision-making and learning.
    - **Mechanics**: For robot structure and movement.
    - **Electronics**: For power and control.
    - **Computer Science**: For programming and algorithms.

    Robots are increasingly used in various industries, including manufacturing, healthcare, and exploration.
    """
    return dummy_content

async def generate_personalized_content(original_content: str, user_profile: UserProfile, chapter_id: UUID) -> str:
    difficulty = user_profile.personalized_content_difficulty
    language = user_profile.preferred_language
    software_background = user_profile.software_background
    hardware_background = user_profile.hardware_background
    learning_pace = user_profile.learning_pace_preference

    prompt = f"""
    The user is reading a chapter on Robotics (ID: {chapter_id}).
    Their profile indicates:
    - Preferred Language: {language}
    - Personalized Content Difficulty: {difficulty}
    - Software Background: {software_background}
    - Hardware Background: {hardware_background}
    - Learning Pace: {learning_pace}

    Rewrite the following original chapter content to be suitable for the user's preferences.
    Focus on adjusting the complexity, examples, and terminology based on their background and desired difficulty.
    If the preferred language is not English, translate the personalized content into that language.

    Original Content:
    """
    response = model.generate_content(prompt + original_content)
    return response.text

@router.post("/chapter/{chapter_id}/personalize", response_model=PersonalizedContent)
async def personalize_chapter_content(
    chapter_id: UUID,
    current_user: User = Depends(get_current_user)
):
    user_profile = next((p for p in dummy_profiles_db if p.user_id == current_user.id), None)
    if not user_profile:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User profile not found")

    original_content = get_original_chapter_content(chapter_id)
    if not original_content:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chapter content not found")

    personalized_text = await generate_personalized_content(original_content, user_profile, chapter_id)

    return PersonalizedContent(
        chapter_id=chapter_id,
        user_id=current_user.id,
        difficulty=user_profile.personalized_content_difficulty,
        original_content=original_content,
        personalized_content=personalized_text,
        language=user_profile.preferred_language,
    )
