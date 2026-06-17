const CACHE_NAME = 'jayashali-simhagarjana-v1';

// App offline lo kuda functional ga run avvadaniki kavalsina core assets list
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 1. INSTALL EVENT: Core files anni mobile browser cache memory loki save avuthay
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('App Core Cache Framework Initialized.');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE EVENT: App update ayinappudu patha cache memory ni clear chesthundhi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Old App Cache Matrix Purged:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// 3. FETCH EVENT: Audio files storage external github (raw files) nunchi stream avuthay 
// and core UI layout fast ga cache nunchi render avuthundi.
self.addEventListener('fetch', (event) => {
  // Audio streaming smooth ga undadaniki network request lane prefer chestham
  if (event.request.url.includes('.mp3')) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse; // UI icons, styles cache nunchi fast ga load avuthay
      }
      return fetch(event.request);
    })
  );
});