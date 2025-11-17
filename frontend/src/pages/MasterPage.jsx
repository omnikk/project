import React from "react";
import { useParams, Link } from "react-router-dom";

const MasterPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Мастер #{id}</h1>
      <p>Здесь будут детали мастера и услуги</p>
      <Link to="/">← Назад на главную</Link>
    </div>
  );
};

export default MasterPage;
