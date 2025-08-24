self.addEventListener("install", event => {
  console.log("Service Worker: Installed");
  self.skipWaiting(); // activate immediately
});

self.addEventListener("activate", event => {
  console.log("Service Worker: Activated");
  self.clients.claim(); // take control of all pages
});

self.addEventListener("fetch", event => {
  // Just log requests, don't cache anything
  console.log("Service Worker fetching:", event.request.url);
});

const CACHE_NAME = "calc-app-v1";
const FILES_TO_CACHE = [
  "./",            // root
  "./index.html",
  "./styles.css",
  "./script.js",
  "./icon.png",
  "./manifest.json"
];

// Install: cache files
self.addEventListener("install", event => {
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Caching calculator files");
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch(err => console.error("Cache failed:", err))
  );
  self.skipWaiting(); // activate immediately
});

// Activate: clean old caches
self.addEventListener("activate", event => {
  console.log("Service Worker: Activated");
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim(); // take control of pages immediately
});

// Fetch: serve cached files first, fallback to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(err => {
        console.error("Fetch failed:", err);
        return fetch(event.request); // fallback
      })
  );
});
