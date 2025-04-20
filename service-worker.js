self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('giftcardwave-cache').then((cache) => {
        return cache.addAll([
          '/',  // Root URL
          '/index',  // Assuming you are serving this from EJS routes, not index.html
          '/css/index.css',  // Path to the CSS file
          '/js/scripts.js',  // Path to the JS file
          '/images/favicon-192x192.png',  // Path to the 192x192 icon
          '/images/favicon-512x512.png'   // Path to the 512x512 icon
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
  