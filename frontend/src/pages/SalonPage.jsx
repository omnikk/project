import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSalonById } from "../api/api";

const SalonPage = () => {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalonById(id)
      .then(data => setSalon(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка салона...</p>;
  if (!salon) return <p>Салон не найден</p>;

  return (
    <div>
      <h1>{salon.name}</h1>
      <h2>Мастера:</h2>
      {salon.masters.map(master => (
        <div key={master.id}>
          <Link to={`/master/${master.id}`}>{master.name}</Link>
        </div>
      ))}
      <Link to="/">← Назад на главную</Link>
    </div>
  );
};

export default SalonPage;
