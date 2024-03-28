importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image', new workbox.strategies.NetworkFirst()
);

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/todo/index.html',
  '/todo/todo.css',
  '/todo/todo.js',
  '/todo/navbar-template.html',
  '/todo/manifest.json',
  '/todo/profile/navabar-template.html',
  '/todo/profile/profile.css',
  '/todo/profile/profile.html',
  '/todo/profile/profile.js'
];

self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching URLs');
        return cache.addAll(urlsToCache).catch(error => {
          console.error(`Failed to cache URLs:`, error);
        });
      })
  );
});


self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('Service Worker: Cache match found');
        return response || fetch(event.request);
      })
  );
});
