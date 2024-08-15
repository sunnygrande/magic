importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image', new workbox.strategies.NetworkFirst()
);

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/todo_2.0/index.html',
  '/todo_2.0/todo.css',
  '/todo_2.0/todo.js',
  '/todo_2.0/navbar-template.html',
  '/todo_2.0/manifest.json',
  '/todo_2.0/profile/',
  '/todo_2.0/service/',
  '/todo_2.0/heal/',
  '/todo_2.0/questDesign/',
  '/todo_2.0/quests/',
  '/todo_2.0/logo.png',
  '/todo_2.0/offline.html'
];

self.addEventListener('install', function(event) {
  console.log('Service Worker: Installing');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Service Worker: Caching URLs');
        console.log('Caching URL:', urlsToCache[0]); // Log the specific URL
        return cache.add(urlsToCache[0]).catch(error => {
          console.error(`Failed to cache ${urlsToCache[0]}:`, error);
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
