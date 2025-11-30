
from pydantic import BaseModel, Field
from typing import List, Literal, Optional

class QuizRequest(BaseModel):
    topic: str
    difficulty: Literal["beginner", "intermediate", "advanced"] = "intermediate"

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    correctAnswer: int = Field(..., ge=0, le=3)
    explanation: str
    difficulty: Literal["beginner", "intermediate", "advanced"]

class GeneratedQuizMetadata(BaseModel):
    difficulty: str
    estimatedTime: int # in minutes

class GeneratedQuiz(BaseModel):
    topic: str
    questions: List[QuizQuestion]
    metadata: GeneratedQuizMetadata
