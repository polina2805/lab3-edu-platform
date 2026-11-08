import { useState } from 'react';
import { lecturers } from './data/lecturers';
import LoginModal from './components/LoginModal';
import BookingForm from './components/BookingForm';
import { useLocalStorage } from './hooks/useLocalStorage'; // Импортируем хук
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  
  // Состояния для авторизации
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Хук для избранного
  const [favorites, setFavorites] = useLocalStorage('favorite_lecturers', []);

  // НОВОЕ: Состояние для фильтра "Только избранные"
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Чтобы не открывался профиль при клике на сердечко
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id)); // Удаляем
    } else {
      setFavorites([...favorites, id]); // Добавляем
    }
  };

  const openProfile = (lecturer) => {
    setSelectedLecturer(lecturer);
    setCurrentPage('profile');
    window.scrollTo(0, 0);
  };

  const goHome = () => {
    setCurrentPage('home');
    setSelectedLecturer(null);
  };

  const handleLogin = (email) => {
    setUser({ email });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    goHome();
  };

  // НОВОЕ: Фильтрация с учетом избранного
  const filteredLecturers = lecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFav = showOnlyFavorites ? favorites.includes(lecturer.id) : true;
    return matchesSearch && matchesFav;
  });

  return (
    <div className="app-container">
      {/* ================= ШАПКА ================= */}
      <header className="header">
        <div className="header-content">
          <div className="logo" onClick={goHome}>
            EduPlatform
          </div>

          <nav className="nav-links">
            <a href="#home" onClick={goHome}>Главная</a>
            <a href="#about">О нас</a>
            <a href="#partners">Партнеры</a>
            <a href="#lecturers">Лекторы</a>
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-info">
                <span className="user-email">{user.email}</span>
                <button className="login-btn logout" onClick={handleLogout}>Выйти</button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setIsLoginModalOpen(true)}>
                Войти
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {currentPage === 'home' && (
          <>
            {/* ================= БЛОК О НАС ================= */}
            <section id="about" className="section-about">
              <div className="about-image-placeholder">
                <img 
                  src="https://storage.yandexcloud.net/edu-platform-photos-godardge/r1.jpg" 
                  alt="Аудитория" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
              <div className="about-text">
                <h2>Наши лекторы — признанные специалисты в своих областях, готовые делиться опытом и знаниями.</h2>
                
                <button 
                  className="cta-btn" 
                  onClick={() => document.getElementById('lecturers').scrollIntoView({ behavior: 'smooth' })}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Найти лектора
                </button>
              </div>
            </section>

            <section className="section-features">
              <p className="features-intro">
                Наша учебная платформа соединяет компании, образовательные учреждения и НКО с профессиональными лекторами, спикерами и тренерами.
              </p>
              
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🤝</div>
                  <h3>Подбор экспертов</h3>
                  <p>Мы помогаем найти специалистов, которые не просто делятся знаниями, но и вдохновляют аудиторию.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h3>Быстрое бронирование</h3>
                  <p>Упрощаем процесс организации лекций. Выбирайте дату и время в пару кликов.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🏢</div>
                  <h3>Для любых задач</h3>
                  <p>Работаем с компаниями, образовательными учреждениями и НКО по всей России.</p>
                </div>
              </div>
            </section>

            {/* ================= БЛОК ПАРТНЕРЫ ================= */}
            <section id="partners" className="section-partners">
              <h2 className="section-title-center">Партнеры</h2>
              <div className="partners-grid">
                <div className="partner-card">
                  <a href="https://icl.ru" target="_blank" rel="noopener noreferrer" className="partner-logo">ICL</a>
                  <p>ICL — высокотехнологичная, динамично развивающаяся группа компаний, входящая в число крупнейших ИТ-компаний России, предоставляющая весь спектр ИТ-услуг, проектов, решений и продуктов.</p>
                </div>
                <div className="partner-card">
                  <a href="https://www.tatneft.ru" target="_blank" rel="noopener noreferrer" className="partner-logo" style={{ color: '#007a33' }}>TATNEFT</a>
                  <p>«Татнефть» - одна из крупнейших российских вертикально-интегрированных компаний, в составе которой динамично развиваются нефтегазодобыча, нефтепереработка, нефтехимия.</p>
                </div>
              </div>
            </section>

            {/* ================= БЛОК ЛЕКТОРЫ ================= */}
            <section id="lecturers" className="section-lecturers">
              <h2 className="section-title-left">Лекторы</h2>
              
              {/* Обертка для поиска и фильтра */}
              <div className="search-container" style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input 
                    type="text" 
                    className="search-input"
                    placeholder="Поиск лектора по имени..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%' }}
                  />
                  <span className="search-icon" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
                </div>
                
                {/* НОВАЯ КНОПКА ФИЛЬТРА */}
                <button 
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                  style={{ 
                    padding: '10px 15px', 
                    cursor: 'pointer', 
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    backgroundColor: showOnlyFavorites ? '#ffe6e6' : '#fff',
                    fontWeight: showOnlyFavorites ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {showOnlyFavorites ? '❤️ Избранные' : '🤍 Все лекторы'}
                </button>
              </div>

              <div className="grid-lecturers">
                {/* Используем отфильтрованный массив */}
                {filteredLecturers.map(lecturer => (
                  <div key={lecturer.id} className="lecturer-card-new" onClick={() => openProfile(lecturer)}>
                    <div className="lecturer-photo-box">
                      <img src={lecturer.photo} alt={lecturer.name} />
                    </div>
                    <div className="lecturer-info-new">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{lecturer.name}</h3>
                        
                        <button 
                          onClick={(e) => toggleFavorite(e, lecturer.id)}
                          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                          title="Добавить в избранное"
                        >
                          {favorites.includes(lecturer.id) ? '❤️' : '🤍'}
                        </button>
                      </div>

                      <p className="lecturer-degree">{lecturer.degree}</p>
                      <p className="lecturer-hint">Нажмите, чтобы узнать больше о дисциплинах и тарифах →</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredLecturers.length === 0 && (
                <p className="no-results">
                  {showOnlyFavorites 
                    ? 'У вас пока нет избранных лекторов 😔' 
                    : `По запросу "${searchQuery}" ничего не найдено 😔`}
                </p>
              )}
            </section>
          </>
        )}

        {/* ================= СТРАНИЦА ПРОФИЛЯ ================= */}
        {currentPage === 'profile' && selectedLecturer && (
          <div className="profile">
            <button onClick={goHome} className="back-btn">← Назад к списку</button>
            
            <div className="profile-header">
              <img src={selectedLecturer.photo} alt={selectedLecturer.name} className="profile-img" />
              <div className="profile-info">
                <h2>{selectedLecturer.name}</h2>
                <p><strong>Образование:</strong> {selectedLecturer.education}</p>
                <p><strong>Стаж:</strong> {selectedLecturer.experience} лет</p>
                <p><strong>Учёная степень:</strong> {selectedLecturer.degree}</p>
                
                <button 
                  className="profile-book-btn"
                  onClick={() => document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' })}
                >
                  📅 Записаться на занятие
                </button>
              </div>
            </div>

            <h3>Преподаваемые дисциплины:</h3>
            <div className="disciplines">
              {selectedLecturer.disciplines.map((disc, idx) => (
                <div key={idx} className="discipline-block">
                  <h4>{disc.title}</h4>
                  <p className="disc-desc">{disc.description}</p>
                  <ol className="topics-list">
                    {disc.topics.map((topic, tIdx) => (
                      <li key={tIdx}>{topic}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>

            <h3>Тарифы:</h3>
            <div className="tariffs">
              {selectedLecturer.tariffs.map((tariff, idx) => (
                <div key={idx} className="tariff-card">
                  <h4>{tariff.title}</h4>
                  <p className="price">{tariff.price}</p>
                </div>
              ))}
            </div>

            <div id="booking-section">
              <BookingForm 
                lecturerName={selectedLecturer.name} 
                tariffs={selectedLecturer.tariffs} 
              />
            </div>

          </div>
        )}
      </main>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
    </div>
  );
}

export default App;