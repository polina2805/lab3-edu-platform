import { useState } from 'react';
import './LoginModal.css';

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null; // Если окно закрыто, ничего не рендерим

  const handleSubmit = (e) => {
    e.preventDefault(); // Отменяем перезагрузку страницы
    if (email && password) {
      // Имитация входа: передаем email как имя пользователя
      onLogin(email); 
      setEmail('');
      setPassword('');
    } else {
      alert('Пожалуйста, заполните все поля!');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation нужен, чтобы клик внутри окна не закрывал его */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Вход в систему</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="student@example.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          
          <button type="submit" className="submit-btn">Войти</button>
        </form>
      </div>
    </div>
  );
}