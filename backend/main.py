from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from . import models, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Салоны ---
@app.post("/salons/")
def create_salon(name: str, address: str, db: Session = Depends(get_db)):
    salon = models.Salon(name=name, address=address)
    db.add(salon)
    db.commit()
    db.refresh(salon)
    return salon

@app.get("/salons/")
def read_salons(db: Session = Depends(get_db)):
    return db.query(models.Salon).all()

# --- Мастера ---
@app.post("/masters/")
def create_master(name: str, salon_id: int, db: Session = Depends(get_db)):
    master = models.Master(name=name, salon_id=salon_id)
    db.add(master)
    db.commit()
    db.refresh(master)
    return master

@app.get("/masters/")
def read_masters(db: Session = Depends(get_db)):
    return db.query(models.Master).all()

# --- Клиенты ---
@app.post("/clients/")
def create_client(name: str, phone: str, salon_id: int, db: Session = Depends(get_db)):
    client = models.Client(name=name, phone=phone, salon_id=salon_id)
    db.add(client)
    db.commit()
    db.refresh(client)
    return client

@app.get("/clients/")
def read_clients(db: Session = Depends(get_db)):
    return db.query(models.Client).all()

# --- Записи/расписание ---
@app.post("/appointments/")
def create_appointment(master_id: int, client_id: int, start_time: str, end_time: str, service: str, db: Session = Depends(get_db)):
    start_dt = datetime.fromisoformat(start_time)
    end_dt = datetime.fromisoformat(end_time)
    appointment = models.Appointment(master_id=master_id, client_id=client_id, start_time=start_dt, end_time=end_dt, service=service)
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment

@app.get("/appointments/")
def read_appointments(db: Session = Depends(get_db)):
    return db.query(models.Appointment).all()
