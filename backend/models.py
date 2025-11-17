from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base

class Salon(Base):
    __tablename__ = "salons"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    address = Column(String)

    masters = relationship("Master", back_populates="salon")
    clients = relationship("Client", back_populates="salon")

class Master(Base):
    __tablename__ = "masters"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    salon_id = Column(Integer, ForeignKey("salons.id"))

    salon = relationship("Salon", back_populates="masters")
    appointments = relationship("Appointment", back_populates="master")

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    salon_id = Column(Integer, ForeignKey("salons.id"))

    salon = relationship("Salon", back_populates="clients")
    appointments = relationship("Appointment", back_populates="client")

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    master_id = Column(Integer, ForeignKey("masters.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    service = Column(String)

    master = relationship("Master", back_populates="appointments")
    client = relationship("Client", back_populates="appointments")
