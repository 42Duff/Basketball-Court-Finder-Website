from fastapi import FastAPI
from .database import engine, Base
from . import models

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"status": "CourtFinder API running"}