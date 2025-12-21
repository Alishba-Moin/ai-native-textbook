from pydantic import BaseModel, Field
from typing import List, Dict, Any
from uuid import UUID, uuid4
import google.generativeai as genai
import os

from app.core.config import settings

genai.configure(api_key=os.getenv("GEMINI_API_KEY", settings.GEMINI_API_KEY))
summary_generation_model = genai.GenerativeModel('gemini-pro') # Using gemini-pro for summary generation

class Summary(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    chapter_id: UUID
    summary_text: str
    summary_type: str = "concise"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + 'Z') # ISO 8601 format

class SummaryGenerationRequest(BaseModel):
    chapter_id: UUID
    chapter_content: str
    summary_length: str = "concise" # e.g., "concise", "detailed"

async def generate_summary(request: SummaryGenerationRequest) -> Summary:
    prompt = f"""
    Generate a {request.summary_length} summary of the following chapter content (Chapter ID: {request.chapter_id}).

    Chapter Content:
    {request.chapter_content}

    Summary:
    """

    try:
        response = await summary_generation_model.generate_content(prompt)
        summary_text = response.text

        return Summary(
            chapter_id=request.chapter_id,
            summary_text=summary_text,
            summary_type=request.summary_length,
        )
    except Exception as e:
        print(f"Error generating summary: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Summary generation failed: {e}")
