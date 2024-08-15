importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image', new workbox.strategies.NetworkFirst()
);

const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/basicweb/wavejavascript/todo/index.html',
  '/basicweb/wavejavascript/todo/todo.css',
  '/basicweb/wavejavascript/todo/todo.js',
  '/basicweb/wavejavascript/todo/navbar-template.html',
  '/basicweb/wavejavascript/todo/manifest.json',
  '/basicweb/wavejavascript/todo/profile/navabar-template.html',
  '/basicweb/wavejavascript/todo/profile/profile.css',
  '/basicweb/wavejavascript/todo/profile/profile.html',
  '/basicweb/wavejavascript/todo/profile/profile.js',
  '/basicweb/wavejavascript/todo/service/battle.html',
  '/basicweb/wavejavascript/todo/service/battle.js',
  '/basicweb/wavejavascript/todo/heal/heal.css',
  '/basicweb/wavejavascript/todo/heal/heal.html',
  '/basicweb/wavejavascript/todo/heal/heal.js',
  '/basicweb/wavejavascript/todo/heal/navbar-template.html',
  '/basicweb/wavejavascript/todo/questDesign/navbar-template.html',
  '/basicweb/wavejavascript/todo/questDesign/npcBattle.js',
  '/basicweb/wavejavascript/todo/questDesign/quest.css',
  '/basicweb/wavejavascript/todo/questDesign/quest.html',
  '/basicweb/wavejavascript/todo/logo.png',
  '/basicweb/wavejavascript/todo/offline.html'
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
