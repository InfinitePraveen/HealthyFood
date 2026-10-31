from pydantic import BaseModel, Field
from typing import List

class InteractionRequest(BaseModel):
    medications: List[str] = Field(default_factory=list)
    foods: List[str] = Field(default_factory=list)
    medication_data_complete: bool = False

class InteractionResult(BaseModel):
    status: str
    rule_version: str
    matches: list
    explanation: str
