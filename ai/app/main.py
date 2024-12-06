# app/main.py
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from app.recommendation import recommend_based_on_activity
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 미들웨어 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처에서 요청을 허용합니다. 필요에 따라 수정하세요.
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용합니다.
    allow_headers=["*"],  # 모든 헤더를 허용합니다.
)

# Static 파일 서빙 (HTML, 이미지 등)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

class ActivityRequest(BaseModel):
    activity: str  # 활동 종류 (예: AI 개발)

class ClassroomRecommendation(BaseModel):
    classroom_id: int
    explanation: str

@app.get("/", response_class=HTMLResponse)
async def get_form():
    with open("app/static/activity_form.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/recommend-classroom", response_model=ClassroomRecommendation)
async def recommend_classroom(activity: ActivityRequest):
    classroom_id, explanation = recommend_based_on_activity(activity.activity)
    return ClassroomRecommendation(classroom_id=classroom_id, explanation=explanation)
