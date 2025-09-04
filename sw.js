const CACHE_NAME = 'josh-robinson-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';
const IMAGE_CACHE = 'images-v1.0.0';

// Critical resources for immediate loading
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/style.css',
  '/scripts.js',
  '/favicon.ico'
];

// Static assets for offline use
const STATIC_RESOURCES = [
  '/tutoring.html',
  '/workshops.html',
  '/manifest.json'
];

// Image assets with different caching strategies
const IMAGE_RESOURCES = [
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

// Install event - cache critical resources first
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache critical resources immediately
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📱 Service Worker: Caching critical resources');
        return cache.addAll(CRITICAL_RESOURCES);
      }),
      // Cache static resources
      caches.open(STATIC_CACHE).then(cache => {
        console.log('📱 Service Worker: Caching static resources');
        return cache.addAll(STATIC_RESOURCES);
      }),
      // Cache images in background
      caches.open(IMAGE_CACHE).then(cache => {
        console.log('📱 Service Worker: Caching images');
        return cache.addAll(IMAGE_RESOURCES);
      })
    ]).catch(error => {
      console.error('❌ Service Worker: Cache failed:', error);
    })
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (url.origin !== location.origin) return;
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Return cached response
          return cachedResponse;
        }
        
        // Fetch from network
        return fetch(request)
          .then(response => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }
            
            // Clone response for caching
            const responseToCache = response.clone();
            
            // Choose cache based on resource type
            let cacheName = DYNAMIC_CACHE;
            if (request.destination === 'image') {
              cacheName = IMAGE_CACHE;
            } else if (request.destination === 'document' || request.destination === 'script' || request.destination === 'style') {
              cacheName = STATIC_CACHE;
            }
            
            // Cache the response
            caches.open(cacheName).then(cache => {
              cache.put(request, responseToCache);
            });
            
            return response;
          })
          .catch(() => {
            // Offline fallback strategies
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            if (request.destination === 'image') {
              return caches.match('/assets/placeholder.webp');
            }
            return new Response('Offline content not available', {
              status: 503,
              statusText: 'Service Unavailable'
            });
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
