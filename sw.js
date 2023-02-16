const BASE = location.origin;
const CACHE_VERSION = 'V11';
// const CACHED_FILES = ['/index.html'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      try {
        await cache.addAll([]);
        console.log(`${CACHE_VERSION} files added to cache`);
      } catch (error) {
        console.error(`${CACHE_VERSION} failed to add files to cache`, error);
      }
    })()
  );
});

self.addEventListener('activate', (event) => {
  clients.claim(); // active le sw asap
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.includes(CACHE_VERSION)) {
            return caches.delete(key);
          }
        })
      );
      console.log(`${CACHE_VERSION} activated`);
    })()
  );
});

self.addEventListener('fetch', (event) => {
  if (
    event.request.url.startsWith('chrome-extension://')
    // ||
    // event.request.url.includes('/node_modules/')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((res) => {
      // Cache hit - return res
      if (res) {
        return res;
      }

      // IMPORTANT: Cloner la requête.
      // Une requete est un flux et est à consommation unique
      // Il est donc nécessaire de copier la requete pour pouvoir l'utiliser et la servir
      let fetchRequest = event.request.clone();

      return fetch(fetchRequest).then((res) => {
        if (
          (!res || res.status !== 200 || res.type !== 'basic') &&
          !res.includes('/node_modules/')
        ) {
          return res;
        }
        console.log('----RES----', res.url);
        // IMPORTANT: Même constat qu'au dessus, mais pour la mettre en cache
        let resToCache = res.clone();

        caches.open(CACHE_VERSION).then((cache) => {
          cache.put(event.request, resToCache);
        });

        return res;
      });
    })
  );
});
