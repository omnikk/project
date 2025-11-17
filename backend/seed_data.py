from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from datetime import datetime, timedelta

models.Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    try:
        if db.query(models.Salon).count() > 0:
            print("База данных уже содержит данные!")
            return
        
        salons_data = [
            {"name": "Салон красоты 'Эльза'", "address": "ул. Тверская, д. 12", "lat": 55.764276, "lon": 37.606831},
            {"name": "Beauty Studio 'Жасмин'", "address": "Кутузовский проспект, д. 5", "lat": 55.752004, "lon": 37.566833},
            {"name": "Салон 'Magnolia'", "address": "ул. Арбат, д. 20", "lat": 55.750584, "lon": 37.588039},
            {"name": "SPA-центр 'Релакс'", "address": "Ленинский проспект, д. 45", "lat": 55.706892, "lon": 37.584573}
        ]
        
        salons = []
        for salon_data in salons_data:
            salon = models.Salon(**salon_data)
            db.add(salon)
            salons.append(salon)
        
        db.commit()
        print(f"✅ Создано {len(salons)} салонов")
        
        masters_names = [
            "Анна Иванова", "Мария Петрова", "Елена Сидорова",
            "Ольга Смирнова", "Татьяна Козлова", "Наталья Волкова",
            "Ирина Соколова", "Екатерина Морозова"
        ]
        
        masters = []
        for i, salon in enumerate(salons):
            for j in range(2):
                master_index = i * 2 + j
                if master_index < len(masters_names):
                    master = models.Master(
                        name=masters_names[master_index],
                        salon_id=salon.id,
                        specialization="Парикмахер-стилист",
                        experience="5+ лет опыта"
                    )
                    db.add(master)
                    masters.append(master)
        
        db.commit()
        print(f"✅ Создано {len(masters)} мастеров")
        
        clients_data = [
            {"name": "Алексей Петров", "phone": "+7 (999) 123-45-67"},
            {"name": "Дарья Сидорова", "phone": "+7 (999) 234-56-78"},
            {"name": "Игорь Смирнов", "phone": "+7 (999) 345-67-89"},
        ]
        
        clients = []
        for client_data in clients_data:
            client = models.Client(
                name=client_data["name"],
                phone=client_data["phone"],
                salon_id=salons[0].id
            )
            db.add(client)
            clients.append(client)
        
        db.commit()
        print(f"✅ Создано {len(clients)} клиентов")
        
        services = ["Стрижка", "Окрашивание", "Укладка", "Маникюр", "Педикюр"]
        appointments = []
        base_date = datetime.now() + timedelta(days=1)
        
        for i in range(10):
            appointment = models.Appointment(
                master_id=masters[i % len(masters)].id,
                client_id=clients[i % len(clients)].id,
                start_time=base_date + timedelta(hours=i),
                end_time=base_date + timedelta(hours=i+1),
                service=services[i % len(services)]
            )
            db.add(appointment)
            appointments.append(appointment)
        
        db.commit()
        print(f"✅ Создано {len(appointments)} записей")
        print("\n🎉 База данных успешно заполнена!")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Запуск заполнения базы данных...")
    seed_database()