from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Any
from uuid import UUID

from app.api.auth import get_current_user # For authentication
from app.services.quiz_agent import QuizGenerationRequest, Quiz, generate_quiz
from app.services.summary_agent import SummaryGenerationRequest, Summary, generate_summary
from app.services.diagram_agent import DiagramExplanationRequest, DiagramExplanation, explain_diagram

router = APIRouter()

class SubagentExecutionRequest(BaseModel):
    agent_name: str
    payload: dict # Generic payload to be parsed by individual agent functions

class SubagentExecutionResponse(BaseModel):
    agent_name: str
    result: Any
    message: str = "Subagent executed successfully"

@router.post("/subagent/{agent_name}/execute", response_model=SubagentExecutionResponse)
async def execute_subagent(
    agent_name: str,
    request: SubagentExecutionRequest,
    current_user: Any = Depends(get_current_user) # Assuming user is authenticated
):
    if agent_name == "quiz_generator":
        try:
            quiz_request = QuizGenerationRequest(**request.payload)
            quiz_result = await generate_quiz(quiz_request)
            return SubagentExecutionResponse(agent_name=agent_name, result=quiz_result.model_dump())
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Quiz generation failed: {e}")
    elif agent_name == "summary_agent":
        try:
            summary_request = SummaryGenerationRequest(**request.payload)
            summary_result = await generate_summary(summary_request)
            return SubagentExecutionResponse(agent_name=agent_name, result=summary_result.model_dump())
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Summary generation failed: {e}")
    elif agent_name == "diagram_explainer":
        try:
            diagram_request = DiagramExplanationRequest(**request.payload)
            diagram_result = await explain_diagram(diagram_request)
            return SubagentExecutionResponse(agent_name=agent_name, result=diagram_result.model_dump())
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Diagram explanation failed: {e}")
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Subagent '{agent_name}' not found")
