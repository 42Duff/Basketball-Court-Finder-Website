from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func
from .database import Base

class Court(Base):
    __tablename__ = "courts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    court_type = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    zipcode = Column(String, nullable=False)
    state = Column(String, nullable=False)
    status = Column(String, default="pending")

class CourtReport(Base):
    __tablename__ = "court_reports"

    id = Column(Integer, primary_key=True, index=True)
    court_id = Column(Integer, ForeignKey("courts.id"), nullable=False)
    players_count = Column(Integer, nullable=False)
    reported_at = Column(DateTime(timezone=True), server_default=func.now())

