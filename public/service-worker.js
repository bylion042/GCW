self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('giftcardwave-cache').then((cache) => {
        return cache.addAll([
          '/', 
          '/css/index.css',  
          '/js/scripts.js', 
          '/icons/icon-192.png',  
          '/icons/icon-512.png'   
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request); 
      })
    );
  });
  