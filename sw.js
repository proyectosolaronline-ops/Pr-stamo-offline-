const V = 'sp-v4';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(V).then(c => c.addAll(['./', './index.html']))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(
    fetch(e.request)
      .then(r => {
        caches.open(V).then(c => c.put(e.request, r.clone()));
        return r;
      })
      .catch(() =>
        caches.match(e.request).then(h => h || caches.match('./index.html'))
      )
  );
});
