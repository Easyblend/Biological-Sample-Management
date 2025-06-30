from fastapi import FastAPI
from sqlmodel import SQLModel
from .database import engine
from fastapi.middleware.cors import CORSMiddleware
from .routes import sample, comment

app = FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)

# ------------------ CORS Middleware ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Include Routers ------------------
app.include_router(sample.router, prefix="/samples", tags=["Samples"])
app.include_router(comment.router, prefix="/comments", tags=["Comments"])
