const cacheName = 'fds-cache-v2';
const filesToCache = [
  '/',
  '/index.html',
  '/FDS_ORTONEX_023.pdf',
  '/FDS_HIPOCLORITO_65.pdf',
  '/FDS_TRICLORO.pdf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

