import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAppointments, fetchClientByUserId } from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Проверяем авторизацию
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        alert("Пожалуйста, войдите в систему!");
        navigate("/");
        return;
      }

      const userData = JSON.parse(savedUser);
      setUser(userData);

      try {
        // Получаем клиента пользователя
        const clientData = await fetchClientByUserId(userData.id);
        
        if (clientData) {
          setClient(clientData);
          // Получаем записи клиента
          const appointmentsData = await fetchAppointments(clientData.id);
          setAppointments(appointmentsData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading">
          <p>Загрузка профиля...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <div className="content">
            <h1>Профиль не найден</h1>
            <p style={{color: '#666', marginTop: '20px'}}>
              Пожалуйста, войдите в систему
            </p>
            <Link to="/" className="btn" style={{display: 'inline-block', marginTop: '20px'}}>
              На главную
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
            <div style={{fontSize: '4rem', marginBottom: '20px'}}>👤</div>
            <h1>Привет, {user.name}!</h1>
            <p style={{fontSize: '1.1rem', marginTop: '10px', opacity: '0.9'}}>
              Добро пожаловать в ваш личный кабинет
            </p>
          </div>
          
          <div className="profile-info">
            <h2>Личная информация</h2>
            <div className="info-item">
              <strong>Имя:</strong> {user.name}
            </div>
            <div className="info-item">
              <strong>Логин:</strong> {user.username}
            </div>
            <div className="info-item">
              <strong>Роль:</strong> {user.role === "admin" ? "Администратор" : "Клиент"}
            </div>
            {client && (
              <div className="info-item">
                <strong>Телефон:</strong> {client.phone}
              </div>
            )}
            <div style={{marginTop: '20px'}}>
              <Link to="/edit-profile">
                <button className="btn">
                  Редактировать профиль
                </button>
              </Link>
            </div>
          </div>
          
          <div className="appointments-list">
            <h2 style={{color: '#ff8c00', marginBottom: '30px'}}>
              Мои записи
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
                    <p>Дата: {formattedDate} в {formattedTime}</p>
                    <p>Мастер ID: {appointment.master_id}</p>
                    <p style={{
                      marginTop: '10px',
                      padding: '8px 15px',
                      background: 'white',
                      borderRadius: '20px',
                      display: 'inline-block',
                      color: '#ff8c00',
                      fontWeight: 'bold'
                    }}>
                      {new Date(appointment.start_time) > new Date() ? 'Предстоящая' : 'Завершена'}
                    </p>
                  </div>
                );
              })
            ) : (
              <div style={{textAlign: 'center', padding: '40px'}}>
                <div style={{fontSize: '4rem', marginBottom: '20px'}}>📝</div>
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
            <h3 style={{color: '#ff8c00', marginBottom: '15px'}}>
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
