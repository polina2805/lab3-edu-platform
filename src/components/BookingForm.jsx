import { useState } from 'react';
import './BookingForm.css';

export default function BookingForm({ lecturerName, tariffs }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tariff, setTariff] = useState(tariffs[0].title); // Первый тариф по умолчанию
  const [date, setDate] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone && date) {
      // Имитация отправки на сервер
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
        setDate('');
      }, 4000); // Через 4 секунды скрываем сообщение
    } else {
      alert('Пожалуйста, заполните все поля!');
    }
  };

  return (
    <div className="booking-container">
      <h3>Записаться на занятие</h3>
      
      {isSuccess ? (
        <div className="booking-success">
          ✅ Вы успешно записаны к лектору {lecturerName}!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-row">
            <div className="form-group">
              <label>Ваше имя</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Иван Иванов" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Телефон</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="+7 (999) 123-45-67" 
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Тариф</label>
              <select value={tariff} onChange={(e) => setTariff(e.target.value)}>
                {tariffs.map((t, i) => (
                  <option key={i} value={t.title}>{t.title} ({t.price})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Желаемая дата</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                required 
              />
            </div>
          </div>

          <button type="submit" className="booking-submit-btn">
            Отправить заявку
          </button>
        </form>
      )}
    </div>
  );
}