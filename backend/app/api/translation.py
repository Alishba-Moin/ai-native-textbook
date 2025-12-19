from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from uuid import UUID
import google.generativeai as genai
import os

from app.models.user import User
from app.models.user_profile import UserProfile
from app.api.auth import get_current_user
from app.api.auth import dummy_users_db, dummy_profiles_db # Access dummy DB for demonstration
from app.core.config import settings

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY", settings.GEMINI_API_KEY))
model = genai.GenerativeModel('gemini-pro')

class TranslationRequest(BaseModel):
    chapter_id: UUID
    target_language: str = "ur" # Default to Urdu

class TranslatedContent(BaseModel):
    chapter_id: UUID
    user_id: UUID
    original_content: str
    translated_content: str
    language: str

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

async def generate_translated_content(original_content: str, target_language: str) -> str:
    prompt = f"""
    Translate the following content into {target_language}.

    Original Content:
    """
    response = model.generate_content(prompt + original_content)
    return response.text

@router.post("/chapter/{chapter_id}/translate", response_model=TranslatedContent)
async def translate_chapter_content(
    chapter_id: UUID,
    translation_request: TranslationRequest,
    current_user: User = Depends(get_current_user)
):
    original_content = get_original_chapter_content(chapter_id)
    if not original_content:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chapter content not found")

    translated_text = await generate_translated_content(original_content, translation_request.target_language)

    return TranslatedContent(
        chapter_id=chapter_id,
        user_id=current_user.id,
        original_content=original_content,
        translated_content=translated_text,
        language=translation_request.target_language,
    )
