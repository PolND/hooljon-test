/* sw.js — Hooljon. Generowany przez zloz-490.js, nie edytować ręcznie:
   wersja musi pochodzić z APP_VERSION pliku HTML, inaczej byłyby dwa źródła
   prawdy o tym, co jest wdrożone. */
const WERSJA = '2026-09-11.727';
const CACHE = 'hooljon-' + WERSJA;
const CACHE_ZEWN = 'hooljon-zewnetrzne';
const ZASOBY = ['./manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png'];

/* .725: nagrania karaoke („Intonacja”: 15 zdań × .webm + .mp3, razem ok. 260 KB) — w pamięci od instalacji,
   żeby działały offline. Odtwarzacz prosi o nagranie kawałkami (nagłówek Range); z pamięci oddajemy wtedy
   wycięty kawałek (206) — Safari bez tego nie odtworzy dźwięku podanego przez service workera. */
const AUDIO_KARAOKE = ["./audio/karaoke/fable-1-dekl-r3.webm","./audio/karaoke/fable-1-dekl-r3.mp3","./audio/karaoke/fable-2-pytanie-r3.webm","./audio/karaoke/fable-2-pytanie-r3.mp3","./audio/karaoke/fable-4-pytanie-taknie-r3.webm","./audio/karaoke/fable-4-pytanie-taknie-r3.mp3","./audio/karaoke/fable-3-naglos.webm","./audio/karaoke/fable-3-naglos.mp3","./audio/karaoke/fable-5-asymilacja-nosowa-r3.webm","./audio/karaoke/fable-5-asymilacja-nosowa-r3.mp3","./audio/karaoke/fable-6-asymilacja-h.webm","./audio/karaoke/fable-6-asymilacja-h.mp3","./audio/karaoke/fable-7-asymilacja-liczba-r3.webm","./audio/karaoke/fable-7-asymilacja-liczba-r3.mp3","./audio/karaoke/fable-10-l-neundeyo.webm","./audio/karaoke/fable-10-l-neundeyo.mp3","./audio/karaoke/fable-11-lh-neundeyo-asym-r3.webm","./audio/karaoke/fable-11-lh-neundeyo-asym-r3.mp3","./audio/karaoke/fable-12-h-echo-r3.webm","./audio/karaoke/fable-12-h-echo-r3.mp3","./audio/karaoke/fable-13-h-zdziwienie-r3.webm","./audio/karaoke/fable-13-h-zdziwienie-r3.mp3","./audio/karaoke/fable-14-naglos-d.webm","./audio/karaoke/fable-14-naglos-d.mp3","./audio/karaoke/fable-15-naglos-t.webm","./audio/karaoke/fable-15-naglos-t.mp3","./audio/karaoke/fable-16-naglos-tt.webm","./audio/karaoke/fable-16-naglos-tt.mp3","./audio/karaoke/fable-2b-pytanie-hl-r3.webm","./audio/karaoke/fable-2b-pytanie-hl-r3.mp3"];

/* Skrypty i fonty z CDN wolno trzymać, bo ich adresy zawierają wersję.
   Supabase i przekaźnik NIE są tu wymienione celowo: odpowiedź z danymi
   użytkownika w cache to najgorszy możliwy rodzaj nieświeżości. */
const ZEWNETRZNE = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

/* .669: KAŻDY PLIK OSOBNO. addAll jest atomowe — brak jednego pliku (tak było
   w repozytorium do .668: bez icon-192.png) unieważniał cały precache, razem
   z manifestem. allSettled zapisuje to, co przyszło, i nie czeka na resztę. */
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE)
    .then((c) => Promise.allSettled(ZASOBY.concat(AUDIO_KARAOKE).map((u) => c.add(u))))
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

  if (url.origin === self.location.origin && url.pathname.indexOf('/audio/karaoke/') !== -1) {
    e.respondWith(odpowiedzAudio(req));
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

/* .725: nagranie z pamięci (albo z sieci, w całości, i do pamięci); prośba z Range dostaje wycięty kawałek. */
async function odpowiedzAudio(req) {
  const klucz = req.url.split('#')[0];
  let pelna = await caches.match(klucz);
  if (!pelna) {
    pelna = await fetch(klucz);
    if (!pelna.ok || pelna.status !== 200) return pelna;
    const kopia = pelna.clone();
    caches.open(CACHE).then((c) => c.put(klucz, kopia)).catch(() => {});
  }
  const zakres = req.headers.get('range');
  if (!zakres) return pelna;
  const dane = await pelna.arrayBuffer();
  const n = dane.byteLength;
  const m = /bytes=(\d*)-(\d*)/.exec(zakres) || [null, '', ''];
  let a = m[1] !== '' ? parseInt(m[1], 10) : 0, b = m[2] !== '' ? parseInt(m[2], 10) : n - 1;
  if (m[1] === '' && m[2] !== '') { a = Math.max(0, n - parseInt(m[2], 10)); b = n - 1; }
  if (a >= n) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + n } });
  b = Math.min(b, n - 1);
  const typ = pelna.headers.get('Content-Type') || (/\.mp3$/.test(klucz) ? 'audio/mpeg' : 'audio/webm');
  return new Response(dane.slice(a, b + 1), { status: 206, headers: { 'Content-Type': typ, 'Content-Range': 'bytes ' + a + '-' + b + '/' + n, 'Content-Length': String(b - a + 1), 'Accept-Ranges': 'bytes' } });
}
