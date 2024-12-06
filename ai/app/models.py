# app/models.py
from pydantic import BaseModel
from typing import List

class Classroom(BaseModel):
    cpu: str
    gpu: str
    memory: str
    disk: str
    program: List[str]
    language: str
    notes: str
    count: int
    image_url: str
