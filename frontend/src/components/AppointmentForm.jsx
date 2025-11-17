import React, { useState, useEffect } from "react";
import { getMasters, getAvailableTimes } from "../services/api";

const AppointmentForm = ({ salon, onComplete }) => {
  const [masters, setMasters] = useState([]);
  const [master, setMaster] = useState(null);
  const [times, setTimes] = useState([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (salon) {
      getMasters(salon.id).then(setMasters);
    }
  }, [salon]);

  useEffect(() => {
    if (master) {
      getAvailableTimes(master.id).then(setTimes);
    }
  }, [master]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onComplete({ salon, master, time, name, phone });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Запись в {salon.name}</h3>

      <label>Мастер:</label>
      {masters.map((m) => (
        <MasterCard key={m.id} master={m} onClick={setMaster} />
      ))}

      {times.length > 0 && (
        <>
          <label>Время:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Выберите время</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </>
      )}

      <label>Имя:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Телефон:</label>
      <input value={phone} onChange={(e) => setPhone(e.target.value)} required />

      <button type="submit">Записаться</button>
    </form>
  );
};

export default AppointmentForm;
