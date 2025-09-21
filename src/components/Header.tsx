import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className='app-header'>
      <div className='header-container'>
        <div className='header-left'>
          <h1 className='app-title'>
            🇰🇷 Korean Learning
          </h1>
          <p className='app-subtitle'>한국어를 재미있게 배우세요!</p>
        </div>
        
        <div className='header-right'>
          <div className='language-selector'>
            <button
              className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
              onClick={() => changeLanguage('en')}
              title='English'
            >
              🇺🇸 EN
            </button>
            <button
              className={`lang-btn ${i18n.language === 'ko' ? 'active' : ''}`}
              onClick={() => changeLanguage('ko')}
              title='한국어'
            >
              🇰🇷 KO
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
