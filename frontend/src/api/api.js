const BASE_URL = "http://localhost:5000"; // адрес твоего бэкенда

export const fetchSalons = async () => {
  const res = await fetch(`${BASE_URL}/salons`);
  if (!res.ok) throw new Error("Ошибка при получении салонов");
  return res.json();
};

export const fetchSalonById = async (id) => {
  const res = await fetch(`${BASE_URL}/salons/${id}`);
  if (!res.ok) throw new Error("Ошибка при получении салона");
  return res.json();
};

export const fetchMasterById = async (id) => {
  const res = await fetch(`${BASE_URL}/masters/${id}`);
  if (!res.ok) throw new Error("Ошибка при получении мастера");
  return res.json();
};

export const fetchProfile = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Ошибка при получении профиля");
  return res.json();
};

