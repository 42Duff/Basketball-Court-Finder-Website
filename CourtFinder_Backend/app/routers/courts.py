from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Optional
from sqlalchemy.orm import Session
from .. import models, schemas
from ..database import get_db
from datetime import datetime, timedelta
from sqlalchemy import func

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

# GET ALL *LIVE* COURT ACTIVITY
@router.get("/report")
def get_all_courts_activity(db: Session = Depends(get_db)):

    one_hour_ago = datetime.now() - timedelta(hours=1)

    reports = db.query(
        models.CourtReport.court_id,
        func.avg(models.CourtReport.players_count).label("avg_players"),
        func.count(models.CourtReport.id).label("report_count")
    ).filter(
        models.CourtReport.reported_at >= one_hour_ago
    ).group_by(
        models.CourtReport.court_id
    ).all()

    results = []

    for r in reports:

        avg = float(r.avg_players)

        if avg <= 4:
            activity_level = "LOW"
        elif avg <= 9:
            activity_level = "MEDIUM"
        else:
            activity_level = "HIGH"

        results.append({
            "court_id": r.court_id,
            "avg_players":avg,
            "activity_level": activity_level,
            "reports": r.report_count
        })

    return results

# GET HISTORICAL REPORTS
@router.get("/historical")
def get_historical_activity(db: Session = Depends(get_db)):

    reports = db.query(
        models.CourtReport.court_id,
        func.avg(models.CourtReport.players_count).label("avg_players")
    ).group_by(
        models.CourtReport.court_id
    ).all()

    results = []

    for r in reports:

        avg = float(r.avg_players)

        if avg <= 4:
            activity_level = "LOW"
        elif avg <= 9:
            activity_level = "MEDIUM"
        else:
            activity_level = "HIGH"

        results.append({
            "court_id" : r.court_id,
            "activity_level" : activity_level
        })

    return results

# READ *LIVE* REPORTS FOR ONE COURT AND CREATE AVERAGES
@router.get("/{court_id}/report")
def get_court_activity(court_id: int, db: Session = Depends(get_db)):

    one_hour_ago = datetime.now() - timedelta(hours=1)

    reports = db.query(models.CourtReport).filter(
        models.CourtReport.court_id == court_id,
        models.CourtReport.reported_at >= one_hour_ago
    ).all()

    if not reports:
        return {
            "court_id": court_id,
            "avg_players": 0,
            "activity_level": "UNREPORTED",
            "reports": 0
        }
    
    avg_players = sum(r.players_count for r in reports) / len(reports)

    if avg_players <= 4:
        activity_level = "LOW"
    elif avg_players <= 9:
        activity_level = "MEDIUM"
    else:
        activity_level = "HIGH"

    return {
        "court_id": court_id,
        "avg_players": avg_players,
        "activity_level": activity_level,
        "reports": len(reports)
    }

# CREATE REPORT
@router.post("/{court_id}/report", response_model=schemas.CourtReportResponse)
def report_court_activity(
    court_id: int,
    report: schemas.CourtReportCreate,
    db: Session = Depends(get_db)
):
    court = db.query(models.Court).filter(models.Court.id == court_id).first()

    if not court:
        raise HTTPException(status_code=404, detail="Court not found")
    
    db_report = models.CourtReport(
        court_id=court_id,
        players_count=report.players_count
    )

    db.add(db_report)
    db.commit()
    db.refresh(db_report)

    return db_report

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




