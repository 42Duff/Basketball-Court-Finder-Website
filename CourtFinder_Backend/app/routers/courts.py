from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/courts",
    tags=["courts"]
)

#CRUD endpoints
#CREATE
@router.post("/", response_model=schemas.CourtResponse)
def create_court(court: schemas.CourtCreate, db: Session = Depends(get_db)):
    db_court = models.Court(**court.dict())
    db.add(db_court)
    db.commit()
    db.refresh(db_court)
    return db_court

# READ ALL
@router.get("/", response_model=list[schemas.CourtResponse])
def get_courts(
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(models.Court)

    if status:
        query = query.filter(models.Court.status == status)

    return query.all()

#READ ONE
@router.get("/{court_id}", response_model=schemas.CourtResponse)
def get_court(court_id: int, db: Session = Depends(get_db)):
    court = db.query(models.Court).filter(models.Court.id == court_id).first()

    if court is None:
        raise HTTPException(status_code=404, detail="Court not found")
    
    return court

#UPDATE
@router.put("/{court_id}", response_model=schemas.CourtResponse)
def update_court(
    court_id: int,
    updated_court: schemas.CourtCreate,
    db: Session = Depends(get_db)
):
    court = db.query(models.Court).filter(models.Court.id == court_id).first()

    if court is None:
        raise HTTPException(status_code=404, detail="Court not found")
    
    for key, value in updated_court.dict().items():
        setattr(court, key, value)

    db.commit()
    db.refresh(court)
    return court
    
#DELETE
@router.delete("/{court_id}")
def delete_court(court_id: int, db: Session = Depends(get_db)):
    court = db.query(models.Court).filter(models.Court.id == court_id).first()

    if court is None:
        raise HTTPException(status_code=404, detail="Court not found")
    
    db.delete(court)
    db.commit()
    return {"detail": "Court deleted successfully"}



