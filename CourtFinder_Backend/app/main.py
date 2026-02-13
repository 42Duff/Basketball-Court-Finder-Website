from fastapi import FastAPI
from .database import engine, Base
from . import models
from .routers import courts
from fastapi.middleware.cors import CORSMiddleware #add cors to stop browser blocking cross-origin requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(courts.router)

@app.get("/")
def root():
    return {"status": "CourtFinder API running"}