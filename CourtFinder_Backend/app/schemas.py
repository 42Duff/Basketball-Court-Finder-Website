from pydantic import BaseModel
from datetime import datetime

class CourtBase(BaseModel):
    name: str
    latitude: float
    longitude: float
    court_type: str
    address: str
    city: str
    zipcode: str
    state: str
    status: str

class CourtCreate(CourtBase):
    pass

class CourtResponse(CourtBase):
    id: int

    class Config:
        from_attributes = True

class CourtReportCreate(BaseModel):
    players_count: int

class CourtReportResponse(BaseModel):
    id: int
    court_id: int
    players_count: int
    reported_at: datetime

    class Config:
        from_attributes = True
