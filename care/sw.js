const CACHE_NAME = 'kodyan-care-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/resources/pulpo-logo.png',
  '/resources/pulpo-logo-192.png',
  '/resources/pulpo-logo-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve el recurso en cache o lo descarga
        return response || fetch(event.request);
      })
  );
});
