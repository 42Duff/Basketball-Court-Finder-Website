import csv
from pathlib import Path

from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Court

CSV_PATH = Path(__file__).parent / "MarylandBasketballCourts.csv"

def import_courts():
    db: Session = SessionLocal()

    try:
        with open(CSV_PATH, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)

            courts_to_add = []

            for row in reader:
                court = Court(
                    name=row["Name"].strip(),
                    latitude=float(row["Latitude"]),
                    longitude=float(row["Longitude"]),
                    court_type=row["CourtType"].upper(),
                    address=row["Address"].strip(),
                    city=row["City"].strip(),
                    zipcode=row["ZIPCode"].strip(),
                    state=row["State"].strip(),
                )

                courts_to_add.append(court)

            db.bulk_save_objects(courts_to_add)
            db.commit()

            print(f"Imported {len(courts_to_add)} courts")

    except Exception as e:
        db.rollback()
        print("Import failed:", e)

    finally:
        db.close()

if __name__ == "__main__":
    import_courts()

