import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSwitch.css';

const LanguageSwitch: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='language-switch'>
      <div className='language-title'>{t('language.title')}</div>
      <div className='language-buttons'>
        <button
          className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
          onClick={() => changeLanguage('en')}
        >
          🇺🇸 {t('language.english')}
        </button>
        <button
          className={`language-btn ${i18n.language === 'ko' ? 'active' : ''}`}
          onClick={() => changeLanguage('ko')}
        >
          🇰🇷 {t('language.korean')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitch;
