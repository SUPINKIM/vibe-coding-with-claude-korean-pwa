const CACHE_NAME = 'korean-learning-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// 설치 이벤트 - 필수 파일들을 캐시
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        console.log('Service Worker: Skip waiting');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Install failed', error);
      })
  );
});

// 활성화 이벤트 - 이전 캐시 정리
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch 이벤트 - 네트워크 요청 인터셉트
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 캐시에 있으면 반환, 없으면 네트워크 요청
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // 네트워크 요청
        return fetch(event.request)
          .then((response) => {
            // 유효한 응답이 아니면 그대로 반환
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 응답을 복제 (스트림은 한 번만 읽을 수 있음)
            const responseToCache = response.clone();
            
            // 동적으로 캐시에 추가
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          })
          .catch(() => {
            // 네트워크 실패시 기본 오프라인 페이지 반환 (선택사항)
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});

// 푸시 알림 이벤트
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received', event);
  
  const options = {
    body: event.data ? event.data.text() : '한국어 공부할 시간이에요! Time to study Korean! 🇰🇷',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [200, 100, 200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'study',
        title: '공부하기 Study Now',
        icon: '/icon-192x192.png'
      },
      {
        action: 'dismiss',
        title: '나중에 Later'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Korean Learning Reminder 📚', options)
  );
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event);
  
  event.notification.close();
  
  if (event.action === 'study') {
    // 공부하기 버튼 클릭
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'dismiss') {
    // 나중에 버튼 클릭 - 아무것도 안함
    console.log('User dismissed the notification');
  } else {
    // 알림 자체를 클릭
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// 백그라운드 동기화 (선택사항)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync');
    event.waitUntil(
      // 백그라운드에서 할 작업들
      Promise.resolve()
    );
  }
});
