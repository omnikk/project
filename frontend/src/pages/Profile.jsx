import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchClientById, fetchAppointments } from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const [client, setClient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const clientId = 1;

  useEffect(() => {
    const loadData = async () => {
      try {
        const clientData = await fetchClientById(clientId);
        setClient(clientData);
        
        const appointmentsData = await fetchAppointments(clientId);
        setAppointments(appointmentsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading">
          <p>  Загрузка профиля...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <div className="content">
            <h1>  Профиль не найден</h1>
            <p style={{color: '#666', marginTop: '20px'}}>
              Пожалуйста, сначала запишитесь на услугу
            </p>
            <Link to="/" className="btn" style={{display: 'inline-block', marginTop: '20px'}}>
              Перейти к салонам
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      
      <div className="container">
        <div className="content">
          <div className="profile-header">
            <div style={{fontSize: '4rem', marginBottom: '20px'}}> </div>
            <h1>Привет, {client.name}!  </h1>
            <p style={{fontSize: '1.1rem', marginTop: '10px', opacity: '0.9'}}>
              Добро пожаловать в ваш личный кабинет
            </p>
          </div>
          
          <div className="profile-info">
            <h2>  Личная информация</h2>
            <div className="info-item">
              <strong>Имя:</strong> {client.name}
            </div>
            <div className="info-item">
              <strong>Телефон:</strong> {client.phone}
            </div>
            <div className="info-item">
              <strong>Всего визитов:</strong> {appointments.length}
            </div>
          </div>
          
          <div className="appointments-list">
            <h2 style={{color: '#667eea', marginBottom: '30px'}}>
                История посещений
            </h2>
            
            {appointments.length > 0 ? (
              appointments.map(appointment => {
                const date = new Date(appointment.start_time);
                const formattedDate = date.toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                return (
                  <div key={appointment.id} className="appointment-item">
                    <h4>{appointment.service}</h4>
                    <p>  {formattedDate} в {formattedTime}</p>
                    <p>  Мастер ID: {appointment.master_id}</p>
                    <p style={{
                      marginTop: '10px',
                      padding: '8px 15px',
                      background: 'white',
                      borderRadius: '20px',
                      display: 'inline-block',
                      color: '#667eea',
                      fontWeight: 'bold'
                    }}>
                      {new Date(appointment.start_time) > new Date() ? '  Предстоящая' : '  Завершена'}
                    </p>
                  </div>
                );
              })
            ) : (
              <div style={{textAlign: 'center', padding: '40px'}}>
                <div style={{fontSize: '4rem', marginBottom: '20px'}}> </div>
                <h3 style={{color: '#666', marginBottom: '20px'}}>
                  У вас пока нет записей
                </h3>
                <Link to="/" className="btn">
                  Записаться на услугу
                </Link>
              </div>
            )}
          </div>
          
          <div style={{
            marginTop: '40px',
            textAlign: 'center',
            padding: '30px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '15px'
          }}>
            <h3 style={{color: '#667eea', marginBottom: '15px'}}>
                Хотите записаться ещё?
            </h3>
            <Link to="/" className="btn">
              Выбрать салон и мастера
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;