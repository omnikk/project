// Заглушка для запросов к backend
export const getSalons = async () => {
  return [
    { id: 1, name: "Салон 1", coords: [55.751574, 37.573856] },
    { id: 2, name: "Салон 2", coords: [55.761574, 37.583856] },
    { id: 3, name: "Салон 3", coords: [55.771574, 37.593856] },
    { id: 4, name: "Салон 4", coords: [55.781574, 37.603856] },
    { id: 5, name: "Салон 5", coords: [55.791574, 37.613856] },
  ];
};

export const getMasters = async (salonId) => {
  return [
    { id: 1, name: "Мастер 1" },
    { id: 2, name: "Мастер 2" },
    { id: 3, name: "Мастер 3" },
  ];
};

export const getAvailableTimes = async (masterId) => {
  return ["10:00", "11:00", "12:00", "14:00", "15:00"];
};
