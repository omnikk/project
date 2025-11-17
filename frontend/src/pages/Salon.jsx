import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSalons, getMasters } from "../services/api";

const Salon = () => {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [masters, setMasters] = useState([]);
  const navigate = useNavigate();
const salons = [
  { id: 1, name: "Салон 1", address: "ул. Примерная, 1", coords: [55.76, 37.64], masters: ["Анна","Мария"] },
  { id: 2, name: "Салон 2", address: "ул. Примерная, 2", coords: [55.75, 37.60], masters: ["Ирина","Елена"] },

];
  useEffect(() => {
    getSalons().then((s) => setSalon(s.find((sal) => sal.id == id)));
    getMasters(Number(id)).then(setMasters);
  }, [id]);

  if (!salon) return <p>Загрузка...</p>;

  return (
    <div className="container">
      <h1>{salon.name}</h1>
      <p>Адрес: {salon.address}</p>
      <h2>Мастера</h2>
      <ul>
        {masters.map((m) => (
          <li key={m.id}>
            {m.name} <button onClick={() => navigate(`/appointment/${salon.id}`)}>Записаться</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Salon;
