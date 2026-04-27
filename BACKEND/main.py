from fastapi import FastAPI
from api.auth import auth_router
from fastapi.middleware.cors import CORSMiddleware
from api.student_dashboard import dash_router
from api.team_admin_dashboard import team_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],  # React app
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

