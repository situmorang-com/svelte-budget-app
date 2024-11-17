// Define the cache name and the list of files to cache
const CACHE_VERSION = 'v2'; // Increment this version

// Install event - caching assets
self.addEventListener('install', async (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open('v1');
      console.log('Opened cache');

      try {
        // Fetch the manifest file
        const manifestResponse = await fetch('/manifest.json');
        const manifest = await manifestResponse.json();

        // Extract filenames from manifest
        const cssFile = manifest['index.css'] ? manifest['index.css'].file : null;
        const jsFile = manifest['index.js'] ? manifest['index.js'].file : null;

        // Build the list of files to cache
        const filesToCache = [
          '/index.html',
          '/groceries.json', // Add groceries.json to the cache list
        ];

        if (cssFile) filesToCache.push(`/${cssFile}`);
        if (jsFile) filesToCache.push(`/${jsFile}`);

        // Cache all the required files
        await cache.addAll(filesToCache);
        console.log('Cached files:', filesToCache);
      } catch (error) {
        console.error('Failed to cache files during install:', error);
      }
    })()
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the request is in the cache, return it, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});


// Activate event - update the cache if needed
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_VERSION];
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
