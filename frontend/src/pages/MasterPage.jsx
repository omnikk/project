import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";

const MasterPage = () => {
  const { id } = useParams();
  const [master, setMaster] = useState(null);
  const [salon, setSalon] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMaster();
  }, [id]);

  const loadMaster = async () => {
    try {
      const response = await fetch(`http://localhost:8080/masters/${id}`);
      const data = await response.json();
      setMaster(data);

      const salonResponse = await fetch(
        `http://localhost:8080/salons/${data.salon_id}`
      );
      const salonData = await salonResponse.json();
      setSalon(salonData);
    } catch (error) {
      console.error("Ошибка загрузки мастера:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <Header />
        <div className="loading">
          <p>Загрузка...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!master) {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <p>Мастер не найден</p>
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
          <div className="master-detail">
            <img
              src={master.photo_url}
              alt={master.name}
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            />

            <h1 style={{ color: "#667eea", marginBottom: "10px" }}>
              {master.name}
            </h1>

            {salon && (
              <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "10px" }}>
                Салон: {salon.name}
              </p>
            )}

            <p style={{ color: "#666", fontSize: "1.1rem", marginBottom: "10px" }}>
              {master.specialization}
            </p>

            <p style={{ color: "#666", fontSize: "1rem", marginBottom: "30px" }}>
              Опыт работы: {master.experience}
            </p>

            <button
              onClick={() => setShowBooking(true)}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "15px 40px",
                borderRadius: "25px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
              }}
            >
              Записаться
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {showBooking && (
        <BookingForm
          master={master}
          onClose={() => setShowBooking(false)}
          onSuccess={() => {
            setShowBooking(false);
          }}
        />
      )}

      <style>{`
        .master-detail {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 40px 20px;
        }
      `}</style>
    </div>
  );
};

export default MasterPage;