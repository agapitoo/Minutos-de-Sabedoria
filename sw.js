const CACHE_NAME = 'minutos-sabedoria-v1';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './piano.mp3',
    './manifest.json',
    './android/android-launchericon-48-48.png',
    './android/android-launchericon-72-72.png',
    './android/android-launchericon-96-96.png',
    './android/android-launchericon-144-144.png',
    './android/android-launchericon-192-192.png',
    './android/android-launchericon-512-512.png',
    './ios/180.png',
    './ios/1024.png'
].map(url => new URL(url, self.location.href).href);

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(cacheNames => Promise.all(
                cacheNames
                    .filter(cache => cache !== CACHE_NAME)
                    .map(cache => caches.delete(cache))
            ))
    );
}); 