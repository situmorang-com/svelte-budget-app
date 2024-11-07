// Define the cache name and the list of files to cache
const CACHE_NAME = 'budget-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/index-DN2Ky6PN.css', // Adjust these paths as per your build process
  '/assets/index-B9AVfmn6.js',
  '/api/groceries.json',
  '/manifest.json'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event - serving cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if present, else fetch from network
      return response || fetch(event.request);
    })
  );
});

// Activate event - update the cache if needed
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
