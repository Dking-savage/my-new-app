// Minimal Service Worker for Dking ChronoList
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass through network requests normally
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
