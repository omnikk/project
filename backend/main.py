from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import models
import schemas
import database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Beauty Salon API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/salons/", response_model=List[schemas.Salon])
def read_salons(db: Session = Depends(get_db)):
    return db.query(models.Salon).all()

@app.get("/salons/{salon_id}", response_model=schemas.SalonWithMasters)
def read_salon(salon_id: int, db: Session = Depends(get_db)):
    salon = db.query(models.Salon).filter(models.Salon.id == salon_id).first()
    if not salon:
        raise HTTPException(status_code=404, detail="Salon not found")
    return salon

@app.post("/salons/", response_model=schemas.Salon)
def create_salon(salon: schemas.SalonCreate, db: Session = Depends(get_db)):
    db_salon = models.Salon(**salon.dict())
    db.add(db_salon)
    db.commit()
    db.refresh(db_salon)
    return db_salon

@app.get("/masters/", response_model=List[schemas.Master])
def read_masters(salon_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.Master)
    if salon_id:
        query = query.filter(models.Master.salon_id == salon_id)
    return query.all()

@app.get("/masters/{master_id}", response_model=schemas.Master)
def read_master(master_id: int, db: Session = Depends(get_db)):
    master = db.query(models.Master).filter(models.Master.id == master_id).first()
    if not master:
        raise HTTPException(status_code=404, detail="Master not found")
    return master

@app.post("/masters/", response_model=schemas.Master)
def create_master(master: schemas.MasterCreate, db: Session = Depends(get_db)):
    db_master = models.Master(**master.dict())
    db.add(db_master)
    db.commit()
    db.refresh(db_master)
    return db_master

@app.get("/clients/", response_model=List[schemas.Client])
def read_clients(db: Session = Depends(get_db)):
    return db.query(models.Client).all()

@app.get("/clients/{client_id}", response_model=schemas.ClientProfile)
def read_client(client_id: int, db: Session = Depends(get_db)):
    client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@app.post("/clients/", response_model=schemas.Client)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_client = models.Client(**client.dict())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@app.get("/appointments/", response_model=List[schemas.Appointment])
def read_appointments(client_id: int = None, db: Session = Depends(get_db)):
    query = db.query(models.Appointment)
    if client_id:
        query = query.filter(models.Appointment.client_id == client_id)
    return query.all()

@app.post("/appointments/", response_model=schemas.Appointment)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    db_appointment = models.Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@app.get("/")
def root():
    return {"message": "Beauty Salon API is running!", "docs": "/docs"}