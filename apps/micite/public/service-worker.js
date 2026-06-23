const CACHE_NAME = 'micite-static-v18';
const ASSETS = [
  './',
  'index.html',
  'app.html',
  'help.html',
  'privacy.html',
  'terms.html',
  'styles.css',
  'app.js',
  'share.js',
  'landing.js',
  'install.js',
  'manifest.webmanifest',
  'assets/micite-logo.png',
  'assets/micite-icon.png',
  'assets/cognisint-logo-horizontal-reversed.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok && event.request.url.startsWith(self.location.origin)) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
