import React, { useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';
import '../styles/PWAInstallButton.css';

const PWAInstallButton: React.FC = () => {
  const {
    isInstallable,
    isInstalled,
    notificationPermission,
    installPWA,
    requestNotificationPermission,
    trackVisit,
    scheduleReminder,
  } = usePWA();

  useEffect(() => {
    // 앱 방문 추적
    trackVisit();
    
    // 알림 권한이 있으면 리마인더 스케줄링
    if (notificationPermission === 'granted') {
      scheduleReminder();
    }
  }, []);

  const handleInstallClick = async () => {
    const installed = await installPWA();
    if (installed) {
      // 설치 후 알림 권한 요청
      await requestNotificationPermission();
    }
  };

  const handleNotificationClick = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      scheduleReminder();
    }
  };

  if (isInstalled) {
    return (
      <div className='pwa-status installed'>
        <span>✅ App Installed!</span>
        {notificationPermission !== 'granted' && (
          <button className='notification-btn' onClick={handleNotificationClick}>
            🔔 Enable Reminders
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='pwa-controls'>
      {isInstallable && (
        <button className='install-btn' onClick={handleInstallClick}>
          📱 Install App
        </button>
      )}
      
      {notificationPermission === 'default' && (
        <button className='notification-btn' onClick={handleNotificationClick}>
          🔔 Enable Reminders
        </button>
      )}
      
      {notificationPermission === 'granted' && (
        <div className='notification-status'>
          ✅ Reminders enabled
        </div>
      )}
    </div>
  );
};

export default PWAInstallButton;
