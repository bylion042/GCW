self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('giftcardwave-cache').then((cache) => {
        return cache.addAll([
          '/index', // Root URL
          '/css/index.css',  // Path to the CSS file
          '/js/scripts.js',  // Path to the JS file
          '/images/icon-192x192.png',  // Path to the 192x192 icon
          '/icons/icon-512x512.png'   // Path to the 512x512 icon
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);  // Fetch from network if not cached
      })
    );
  });
  