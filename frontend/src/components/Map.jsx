import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const salons = [
  { id: 1, name: "Салон A", coords: [55.76, 37.64] },
  { id: 2, name: "Салон B", coords: [55.75, 37.62] },
];

const SalonMap = () => {
  return (
    <YMaps>
      <Map defaultState={{ center: [55.76, 37.64], zoom: 12 }} width="100%" height="500px">
        {salons.map((salon) => (
          <Placemark
            key={salon.id}
            geometry={salon.coords}
            properties={{ balloonContent: salon.name }}
            modules={['geoObject.addon.balloon']}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default SalonMap;
