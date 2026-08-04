from fastapi import FastAPI
from api.auth import auth_router
from fastapi.middleware.cors import CORSMiddleware
from api.student_dashboard import dash_router
from api.team_admin_dashboard import team_router
from fastapi.staticfiles import StaticFiles
import os 
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("allowed_origin_1"), os.environ.get("allowed_origin_2")],  # React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(dash_router, prefix="/dash", tags=["dashboard"])
app.include_router(team_router, prefix="/team", tags=["team_dashboard"])


@app.get("/")
def runsv():
    return "working"
