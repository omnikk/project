import React from "react";
import { Map, Marker } from "pigeon-maps";
import { useNavigate } from "react-router-dom";

const SalonMap = ({ salons }) => {
  const navigate = useNavigate();
  
  return (
    <div style={{ height: "500px", borderRadius: "15px", overflow: "hidden", marginBottom: "40px" }}>
      <Map 
        defaultCenter={[55.751574, 37.573856]} 
        defaultZoom={11}
        height={500}
      >
        {salons.map((salon) => (
          <Marker
            key={salon.id}
            anchor={[salon.lat || 55.751574, salon.lon || 37.573856]}
            color="#667eea"
            onClick={() => navigate(`/salon/${salon.id}`)}
          />
        ))}
      </Map>
    </div>
  );
};

export default SalonMap;