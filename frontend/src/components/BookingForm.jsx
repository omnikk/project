import React, { useState } from "react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${name}! Мы свяжемся с вами по номеру ${phone}.`);
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="form">
      <h2>Записаться на стрижку</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Телефон:</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
        </div>
        <div>
          <label>Комментарий:</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} />
        </div>
        <button type="submit">Записаться</button>
      </form>
    </div>
  );
};

export default BookingForm;
