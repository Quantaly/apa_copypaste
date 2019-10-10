const CACHE_NAME = "apa_copypaste-v4";
const TO_CACHE = [
    ".",
    "index.html",
    "styles.css",
    "index.js",
];

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then(async (cache) => {
        await cache.addAll(TO_CACHE);
        console.log("Finished caching resources");
    }));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
                return caches.delete(name);
            }
        }));
    }));
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});