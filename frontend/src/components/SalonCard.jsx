import React from "react";

const SalonCard = ({ salon, onClick }) => (
  <div className="card" onClick={() => onClick(salon)}>
    <h3>{salon.name}</h3>
  </div>
);

export default SalonCard;
