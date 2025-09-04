const CACHE_NAME = 'josh-robinson-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/tutoring.html',
  '/workshops.html',
  '/style.css',
  '/scripts.js',
  '/favicon.ico',
  '/assets/St pauls.jpeg',
  '/assets/Graduation.jpeg',
  '/assets/LUBE FINALS.jpeg',
  '/assets/Studying.jpeg',
  '/assets/101.jpeg',
  '/assets/A-Levels.jpeg',
  '/assets/EU.jpeg',
  '/assets/Eco Panel.jpeg',
  '/assets/Head of School.jpeg',
  '/assets/Injury.jpeg',
  '/assets/josh-bridge.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📱 Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('❌ Service Worker: Cache failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then(response => {
            // Cache new responses for next time
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Offline fallback for HTML pages
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle offline form submissions
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      console.log('📤 Service Worker: Processing offline submissions');
      // Process offline data when back online
    }
  } catch (error) {
    console.error('❌ Service Worker: Background sync failed:', error);
  }
}

async function getOfflineData() {
  // Get stored offline form data
  return [];
}
