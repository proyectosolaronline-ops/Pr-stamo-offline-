/* ═══════════════════════════════════════════════
   SimPréstamo — Service Worker
   Intercepta recargas offline y sirve el propio
   simulador desde caché (evita pantallas externas)
═══════════════════════════════════════════════ */
const SW_VERSION  = 'simprestamo-v1';
const CACHE_FILES = ['/simulador-prestamos.html'];

/* Al instalar: guardar el HTML en caché de SW */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SW_VERSION).then(cache => cache.addAll(CACHE_FILES))
  );
  self.skipWaiting();
});

/* Al activar: limpiar versiones anteriores */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== SW_VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

/* Fetch: Network first → si falla → caché propio */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Solo interceptar navegación al propio simulador
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          // Online: actualizar caché del SW con la versión fresca
          const clone = res.clone();
          caches.open(SW_VERSION).then(c => c.put(e.request, clone));
          return res;
        })
        .catch(() =>
          // Offline: servir desde caché del SW (nunca redirigir a otro archivo)
          caches.match(e.request).then(cached =>
            cached || caches.match('/simulador-prestamos.html')
          )
        )
    );
  }
  // Requests de red (Sheets API) — siempre network, sin interceptar
});
