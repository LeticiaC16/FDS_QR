const cacheName = 'fds-cache-v3'; // muda a versão sempre que atualizar
const filesToCache = [
  './', // usa ./ em vez de / para funcionar no GitHub Pages e Vercel
  './index.html',
  './FDS_ORTONEX_023.pdf',
  './FDS_HIPOCLORITO_65.pdf',
  './FDS_TRICLORO.pdf',
  './info.json' // garante cache offline da tabela de sistemas
];

// Instala e faz cache inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== cacheName).map(k => caches.delete(k)))
    )
  );
});

// Busca no cache primeiro, senão tenta rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

