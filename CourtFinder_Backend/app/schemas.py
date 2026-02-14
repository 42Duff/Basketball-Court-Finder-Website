from pydantic import BaseModel

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
