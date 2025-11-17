import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMasterById } from "../api/api";

const MasterPage = () => {
  const { id } = useParams();
  const [master, setMaster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMasterById(id)
      .then(data => setMaster(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка мастера...</p>;
  if (!master) return <p>Мастер не найден</p>;

  return (
    <div>
      <h1>{master.name}</h1>
      <p>{master.description}</p>
      <Link to="/">← Назад на главную</Link>
    </div>
  );
};

export default MasterPage;
