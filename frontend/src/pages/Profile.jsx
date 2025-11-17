import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile(1) // пример: id пользователя 1
      .then(data => setProfile(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка профиля...</p>;
  if (!profile) return <p>Профиль не найден</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>История бронирований:</p>
      <ul>
        {profile.bookings.map(booking => (
          <li key={booking.id}>{booking.date} - {booking.salonName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
