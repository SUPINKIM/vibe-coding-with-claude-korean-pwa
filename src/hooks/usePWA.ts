import { useState, useEffect } from 'react';

interface PWAInstallPrompt extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<PWAInstallPrompt | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // PWA 설치 프롬프트 감지
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as PWAInstallPrompt);
      setIsInstallable(true);
    };

    // PWA 설치 완료 감지
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      console.log('PWA was installed');
    };

    // 알림 권한 상태 확인
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // PWA가 이미 설치되었는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // PWA 설치 실행
  const installPWA = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setDeferredPrompt(null);
      setIsInstallable(false);
      return true;
    } else {
      console.log('User dismissed the install prompt');
      return false;
    }
  };

  // 알림 권한 요청
  const requestNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    
    return permission === 'granted';
  };

  // 즉시 알림 표시
  const showNotification = (title: string, options?: NotificationOptions) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        ...options,
      });
    }
  };

  // 지연된 알림 스케줄링 (3일 후)
  const scheduleReminder = () => {
    const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
    //const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    localStorage.setItem('lastVisit', now.toString());
    
    // 3일 후 알림을 위한 체크
    setTimeout(() => {
      const currentLastVisit = localStorage.getItem('lastVisit');
      if (currentLastVisit && (now - parseInt(currentLastVisit)) >= threeDaysInMs) {
        showNotification('Korean Learning Reminder! 📚', {
          body: '한국어 공부할 시간이에요! Time to study Korean! 🇰🇷',
          requireInteraction: true,
        });
      }
    }, threeDaysInMs);
  };

  // 앱 방문 기록
  const trackVisit = () => {
    const now = Date.now();
    localStorage.setItem('lastVisit', now.toString());
    
    // 방문 횟수 카운트
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0') + 1;
    localStorage.setItem('visitCount', visitCount.toString());
  };

  return {
    isInstallable,
    isInstalled,
    notificationPermission,
    installPWA,
    requestNotificationPermission,
    showNotification,
    scheduleReminder,
    trackVisit,
  };
};
