/* sw.js — Hooljon. Generowany przez zloz-490.js, nie edytować ręcznie:
   wersja musi pochodzić z APP_VERSION pliku HTML, inaczej byłyby dwa źródła
   prawdy o tym, co jest wdrożone. */
const WERSJA = '2026-09-11.724';
const CACHE = 'hooljon-' + WERSJA;
const CACHE_ZEWN = 'hooljon-zewnetrzne';
const ZASOBY = ['./manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

/* Skrypty i fonty z CDN wolno trzymać, bo ich adresy zawierają wersję.
   Supabase i przekaźnik NIE są tu wymienione celowo: odpowiedź z danymi
   użytkownika w cache to najgorszy możliwy rodzaj nieświeżości. */
const ZEWNETRZNE = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

/* .669: KAŻDY PLIK OSOBNO. addAll jest atomowe — brak jednego pliku (tak było
   w repozytorium do .668: bez icon-192.png) unieważniał cały precache, razem
   z manifestem. allSettled zapisuje to, co przyszło, i nie czeka na resztę. */
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE)
    .then((c) => Promise.allSettled(ZASOBY.map((u) => c.add(u))))
    .catch(() => {})
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((k) => Promise.all(k.map((n) => (n !== CACHE && n !== CACHE_ZEWN) ? caches.delete(n) : null)))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* DOKUMENT: sieć najpierw. Po wdrożeniu nowej wersji uczeń dostaje ją od
     razu; cache służy wyłącznie na wypadek braku sieci. */
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((odp) => {
        const kopia = odp.clone();
        caches.open(CACHE).then((c) => c.put('./', kopia)).catch(() => {});
        return odp;
      }).catch(() => caches.match('./').then((z) => z || caches.match(req)))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then((z) => z || fetch(req).then((odp) => {
      const kopia = odp.clone();
      caches.open(CACHE).then((c) => c.put(req, kopia)).catch(() => {});
      return odp;
    })));
    return;
  }

  if (ZEWNETRZNE.includes(url.hostname)) {
    e.respondWith(caches.match(req).then((z) => {
      const siec = fetch(req).then((odp) => {
        const kopia = odp.clone();
        caches.open(CACHE_ZEWN).then((c) => c.put(req, kopia)).catch(() => {});
        return odp;
      }).catch(() => z);
      return z || siec;
    }));
  }
  /* Reszta (Supabase, przekaźnik) idzie prosto do sieci — bez pośrednictwa. */
});
