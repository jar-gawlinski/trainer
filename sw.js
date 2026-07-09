const CACHE = 'train-v11';

const PRECACHE_LOCAL = [
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap';

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);

    // Cache local files
    await cache.addAll(PRECACHE_LOCAL);

    // Cache Google Fonts CSS + actual font files
    try {
      const fontResp = await fetch(FONTS_URL);
      const fontRespClone = fontResp.clone();
      await cache.put(FONTS_URL, fontResp);

      const css = await fontRespClone.text();
      const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1]);
      await Promise.all(urls.map(async url => {
        try {
          const r = await fetch(url);
          await cache.put(url, r);
        } catch(err) { /* ignore individual font failures */ }
      }));
    } catch(err) { /* offline during install — fonts will load when online */ }

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  e.respondWith((async () => {
    const cached = await caches.match(e.request);
    if (cached) return cached;

    try {
      const response = await fetch(e.request);
      if (response && response.status === 200) {
        const cache = await caches.open(CACHE);
        cache.put(e.request, response.clone());
      }
      return response;
    } catch(err) {
      // Offline fallback — return the app shell
      return caches.match('./index.html');
    }
  })());
});
