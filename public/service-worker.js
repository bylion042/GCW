// self.addEventListener('install', (event) => {
//     event.waitUntil(
//       caches.open('giftcardwave-cache-v2').then((cache) =>{
//         return cache.addAll([
//           '/', 
//           '/css/index.css',  
//           '/js/scripts.js', 
//           '/icons/icon-192.png',  
//           '/icons/icon-512.png'   
//         ]);
//       })
//     );
//   });
  
//   self.addEventListener('fetch', (event) => {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         return cachedResponse || fetch(event.request); 
//       })
//     );
//   });
  

const CACHE_NAME = 'giftcardwave-cache-v2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/css/index.css',
        '/js/scripts.js',
        '/icons/icon-192.png',
        '/icons/icon-512.png',
        '/manifest.json'
      ]);
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
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
