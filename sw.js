// Revo Fixer - Service Worker
const CACHE_NAME = 'revo-fixer-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/activation.html',
  '/packages.html',
  '/buy-package.html',
  '/deposit.html',
  '/payment-submit.html',
  '/connect-profile.html',
  '/profile.html',
  '/transactions.html',
  '/wallet-transfer.html',
  '/live-game.html',
  '/statistics.html'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});