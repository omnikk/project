import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSalons } from "../api/api";

const Home = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalons()
      .then(data => setSalons(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка салонов...</p>;

  return (
    <div>
      <h1>Главная</h1>
      {salons.map(salon => (
        <div key={salon.id}>
          <Link to={`/salon/${salon.id}`}>{salon.name}</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
