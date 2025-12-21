from pydantic import BaseModel, Field
from typing import List, Dict, Any
from uuid import UUID, uuid4
import google.generativeai as genai
import os

from app.core.config import settings

genai.configure(api_key=os.getenv("GEMINI_API_KEY", settings.GEMINI_API_KEY))
quiz_generation_model = genai.GenerativeModel('gemini-pro') # Using gemini-pro for quiz generation

class QuizQuestion(BaseModel):
    question_text: str
    options: List[str]
    correct_answer: str
    explanation: str

class Quiz(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    chapter_id: UUID
    quiz_type: str = "multiple_choice"
    questions: List[QuizQuestion]
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat() + 'Z') # ISO 8601 format

class QuizGenerationRequest(BaseModel):
    chapter_id: UUID
    chapter_content: str
    num_questions: int = 5
    difficulty: str = "medium"

async def generate_quiz(request: QuizGenerationRequest) -> Quiz:
    prompt = f"""
    Generate a {request.difficulty} difficulty multiple-choice quiz with {request.num_questions} questions
    based on the following chapter content (Chapter ID: {request.chapter_id}).
    For each question, provide 4 options, the correct answer, and a brief explanation.

    Chapter Content:
    {request.chapter_content}

    Output format example:
    Question: What is X?
    Options:
    - A: Option 1
    - B: Option 2
    - C: Option 3 (Correct)
    - D: Option 4
    Correct Answer: C
    Explanation: [Explanation here]

    ---

    Question: ...
    """

    try:
        response = await quiz_generation_model.generate_content(prompt)
        quiz_text = response.text

        questions = []
        # Simple parsing logic - ideally, a more robust parser would be used
        question_blocks = quiz_text.split('---')
        for block in question_blocks:
            if not block.strip():
                continue

            question_match = re.search(r'Question: (.*)', block)
            options_match = re.findall(r'- ([A-D]): (.*)', block)
            correct_answer_match = re.search(r'Correct Answer: ([A-D])', block)
            explanation_match = re.search(r'Explanation: (.*)', block)

            if question_match and options_match and correct_answer_match and explanation_match:
                question_text = question_match.group(1).strip()
                options = [f'{opt[0]}: {opt[1]}' for opt in options_match]
                correct_answer_label = correct_answer_match.group(1).strip()
                # Find the full text of the correct answer option
                correct_answer_text = next((opt[1] for opt in options_match if opt[0] == correct_answer_label), '')
                explanation = explanation_match.group(1).strip()

                if question_text and options and correct_answer_text and explanation:
                    questions.append(QuizQuestion(
                        question_text=question_text,
                        options=options,
                        correct_answer=correct_answer_text, # Store the full text of the correct answer
                        explanation=explanation
                    ))

        return Quiz(
            chapter_id=request.chapter_id,
            questions=questions,
        )
    except Exception as e:
        print(f"Error generating quiz: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Quiz generation failed: {e}")



