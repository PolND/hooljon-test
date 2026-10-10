/* sw.js — Hooljon. Generowany przez zloz-490.js, nie edytować ręcznie:
   wersja musi pochodzić z APP_VERSION pliku HTML, inaczej byłyby dwa źródła
   prawdy o tym, co jest wdrożone. */
const WERSJA = '2026-09-11.821';
const CACHE = 'hooljon-' + WERSJA;
const CACHE_ZEWN = 'hooljon-zewnetrzne';
/* .754 (pakiet 6 §10): nowe nazwy plików ikon */
const ZASOBY = ['./manifest.webmanifest', './ikona-192.png', './ikona-512.png', './ikona-maskable-512.png', './ikona-mono-512.png', './apple-touch-180.png'];

/* .725: nagrania karaoke („Intonacja”: 15 zdań × .webm + .mp3, razem ok. 260 KB) — w pamięci od instalacji,
   .761: także czytanki (73 zdania × .webm + .mp3, razem ok. 2 MB),
   .780: czytanki drugiej paczki (492 zdań, ok. 21,0 MB) NIE są na liście (decyzja Damiana) — odpowiedzAudio
   pobiera nagranie przy pierwszym odtworzeniu i od tej chwili trzyma je w pamięci,
   .784: tak samo wyjątki w czytankach-dokumentach (25 zdań),
   .785: nagrania głosów K2 i M1 z wyrównaną głośnością (te same nazwy plików; nowa wersja = nowa pamięć),
   .787: wszystkie nagrania z 0,3 s ciszy na początku (te same nazwy plików),
   .788: głos M1 zastąpiony przez M3 (Kang) — te same nazwy plików; zdania bez nagrania zdjęte z listy,
   .789: 3 pytania M3 z nagraniem (transza 11) dochodzą do listy,
   .790: dopisane 3 zdania M3 z .788, które wtedy dostały nagranie, a nie trafiły na listę,
   .792: 2 zdania fryzjera (231-s01, 231-s03, transza 12) dochodzą do listy,
   .793: zdania czytanek bez nagrania dostają nagranie (zasada „bez ciszy”) — te z lekcji paczki 1 dochodzą do listy,
   żeby działały offline. Odtwarzacz prosi o nagranie kawałkami (nagłówek Range); z pamięci oddajemy wtedy
   wycięty kawałek (206) — Safari bez tego nie odtworzy dźwięku podanego przez service workera. */
const AUDIO_KARAOKE = ["./audio/karaoke/fable-1-dekl-r3.webm","./audio/karaoke/fable-1-dekl-r3.mp3","./audio/karaoke/fable-2-pytanie-r3.webm","./audio/karaoke/fable-2-pytanie-r3.mp3","./audio/karaoke/fable-4-pytanie-taknie-r3.webm","./audio/karaoke/fable-4-pytanie-taknie-r3.mp3","./audio/karaoke/fable-3-naglos.webm","./audio/karaoke/fable-3-naglos.mp3","./audio/karaoke/fable-5-asymilacja-nosowa-r3.webm","./audio/karaoke/fable-5-asymilacja-nosowa-r3.mp3","./audio/karaoke/fable-6-asymilacja-h.webm","./audio/karaoke/fable-6-asymilacja-h.mp3","./audio/karaoke/fable-7-asymilacja-liczba-r3.webm","./audio/karaoke/fable-7-asymilacja-liczba-r3.mp3","./audio/karaoke/fable-10-l-neundeyo.webm","./audio/karaoke/fable-10-l-neundeyo.mp3","./audio/karaoke/fable-11-lh-neundeyo-asym-r3.webm","./audio/karaoke/fable-11-lh-neundeyo-asym-r3.mp3","./audio/karaoke/fable-12-h-echo-r3.webm","./audio/karaoke/fable-12-h-echo-r3.mp3","./audio/karaoke/fable-13-h-zdziwienie-r3.webm","./audio/karaoke/fable-13-h-zdziwienie-r3.mp3","./audio/karaoke/fable-14-naglos-d.webm","./audio/karaoke/fable-14-naglos-d.mp3","./audio/karaoke/fable-15-naglos-t.webm","./audio/karaoke/fable-15-naglos-t.mp3","./audio/karaoke/fable-16-naglos-tt.webm","./audio/karaoke/fable-16-naglos-tt.mp3","./audio/karaoke/fable-2b-pytanie-hl-r3.webm","./audio/karaoke/fable-2b-pytanie-hl-r3.mp3","./audio/karaoke/story-200-s01.webm","./audio/karaoke/story-200-s01.mp3","./audio/karaoke/story-200-s02.webm","./audio/karaoke/story-200-s02.mp3","./audio/karaoke/story-200-s03.webm","./audio/karaoke/story-200-s03.mp3","./audio/karaoke/story-200-s04.webm","./audio/karaoke/story-200-s04.mp3","./audio/karaoke/story-200-s05.webm","./audio/karaoke/story-200-s05.mp3","./audio/karaoke/story-200-s06.webm","./audio/karaoke/story-200-s06.mp3","./audio/karaoke/story-203-s01.webm","./audio/karaoke/story-203-s01.mp3","./audio/karaoke/story-203-s02.webm","./audio/karaoke/story-203-s02.mp3","./audio/karaoke/story-203-s03.webm","./audio/karaoke/story-203-s03.mp3","./audio/karaoke/story-203-s04.webm","./audio/karaoke/story-203-s04.mp3","./audio/karaoke/story-203-s05.webm","./audio/karaoke/story-203-s05.mp3","./audio/karaoke/story-212-s01.webm","./audio/karaoke/story-212-s01.mp3","./audio/karaoke/story-212-s02.webm","./audio/karaoke/story-212-s02.mp3","./audio/karaoke/story-212-s03.webm","./audio/karaoke/story-212-s03.mp3","./audio/karaoke/story-212-s04.webm","./audio/karaoke/story-212-s04.mp3","./audio/karaoke/story-212-s05.webm","./audio/karaoke/story-212-s05.mp3","./audio/karaoke/story-212-s06.webm","./audio/karaoke/story-212-s06.mp3","./audio/karaoke/story-231-s01.webm","./audio/karaoke/story-231-s01.mp3","./audio/karaoke/story-231-s02.webm","./audio/karaoke/story-231-s02.mp3","./audio/karaoke/story-231-s03.webm","./audio/karaoke/story-231-s03.mp3","./audio/karaoke/story-231-s04.webm","./audio/karaoke/story-231-s04.mp3","./audio/karaoke/story-231-s05.webm","./audio/karaoke/story-231-s05.mp3","./audio/karaoke/story-231-s06.webm","./audio/karaoke/story-231-s06.mp3","./audio/karaoke/story-231-s07.webm","./audio/karaoke/story-231-s07.mp3","./audio/karaoke/story-231-s08.webm","./audio/karaoke/story-231-s08.mp3","./audio/karaoke/story-231-s09.webm","./audio/karaoke/story-231-s09.mp3","./audio/karaoke/story-231-s10.webm","./audio/karaoke/story-231-s10.mp3","./audio/karaoke/story-231-s11.webm","./audio/karaoke/story-231-s11.mp3","./audio/karaoke/story-231-s12.webm","./audio/karaoke/story-231-s12.mp3","./audio/karaoke/story-231-s13.webm","./audio/karaoke/story-231-s13.mp3","./audio/karaoke/story-231-s14.webm","./audio/karaoke/story-231-s14.mp3","./audio/karaoke/story-231-s15.webm","./audio/karaoke/story-231-s15.mp3","./audio/karaoke/story-231-s16.webm","./audio/karaoke/story-231-s16.mp3","./audio/karaoke/story-233-s01.webm","./audio/karaoke/story-233-s01.mp3","./audio/karaoke/story-233-s02.webm","./audio/karaoke/story-233-s02.mp3","./audio/karaoke/story-233-s03.webm","./audio/karaoke/story-233-s03.mp3","./audio/karaoke/story-233-s04.webm","./audio/karaoke/story-233-s04.mp3","./audio/karaoke/story-233-s05.webm","./audio/karaoke/story-233-s05.mp3","./audio/karaoke/story-233-s06.webm","./audio/karaoke/story-233-s06.mp3","./audio/karaoke/story-233-s07.webm","./audio/karaoke/story-233-s07.mp3","./audio/karaoke/story-233-s08.webm","./audio/karaoke/story-233-s08.mp3","./audio/karaoke/story-233-s09.webm","./audio/karaoke/story-233-s09.mp3","./audio/karaoke/story-233-s10.webm","./audio/karaoke/story-233-s10.mp3","./audio/karaoke/story-233-s11.webm","./audio/karaoke/story-233-s11.mp3","./audio/karaoke/story-233-s12.webm","./audio/karaoke/story-233-s12.mp3","./audio/karaoke/story-233-s13.webm","./audio/karaoke/story-233-s13.mp3","./audio/karaoke/story-233-s14.webm","./audio/karaoke/story-233-s14.mp3","./audio/karaoke/story-238-s01.webm","./audio/karaoke/story-238-s01.mp3","./audio/karaoke/story-238-s02.webm","./audio/karaoke/story-238-s02.mp3","./audio/karaoke/story-238-s03.webm","./audio/karaoke/story-238-s03.mp3","./audio/karaoke/story-238-s04.webm","./audio/karaoke/story-238-s04.mp3","./audio/karaoke/story-238-s05.webm","./audio/karaoke/story-238-s05.mp3","./audio/karaoke/story-238-s06.webm","./audio/karaoke/story-238-s06.mp3","./audio/karaoke/story-238-s07.webm","./audio/karaoke/story-238-s07.mp3","./audio/karaoke/story-238-s08.webm","./audio/karaoke/story-238-s08.mp3","./audio/karaoke/story-238-s09.webm","./audio/karaoke/story-238-s09.mp3","./audio/karaoke/story-238-s10.webm","./audio/karaoke/story-238-s10.mp3","./audio/karaoke/story-238-s11.webm","./audio/karaoke/story-238-s11.mp3","./audio/karaoke/story-238-s12.webm","./audio/karaoke/story-238-s12.mp3","./audio/karaoke/story-238-s13.webm","./audio/karaoke/story-238-s13.mp3","./audio/karaoke/story-238-s14.webm","./audio/karaoke/story-238-s14.mp3","./audio/karaoke/story-238-s15.webm","./audio/karaoke/story-238-s15.mp3","./audio/karaoke/story-241-s01.webm","./audio/karaoke/story-241-s01.mp3","./audio/karaoke/story-241-s02.webm","./audio/karaoke/story-241-s02.mp3","./audio/karaoke/story-241-s03.webm","./audio/karaoke/story-241-s03.mp3","./audio/karaoke/story-241-s04.webm","./audio/karaoke/story-241-s04.mp3","./audio/karaoke/story-241-s05.webm","./audio/karaoke/story-241-s05.mp3","./audio/karaoke/story-241-s06.webm","./audio/karaoke/story-241-s06.mp3","./audio/karaoke/story-241-s07.webm","./audio/karaoke/story-241-s07.mp3","./audio/karaoke/story-241-s08.webm","./audio/karaoke/story-241-s08.mp3","./audio/karaoke/story-241-s09.webm","./audio/karaoke/story-241-s09.mp3","./audio/karaoke/story-241-s10.webm","./audio/karaoke/story-241-s10.mp3","./audio/karaoke/story-241-s11.webm","./audio/karaoke/story-241-s11.mp3","./audio/karaoke/story-241-s12.webm","./audio/karaoke/story-241-s12.mp3","./audio/karaoke/story-241-s13.webm","./audio/karaoke/story-241-s13.mp3","./audio/karaoke/story-241-s14.webm","./audio/karaoke/story-241-s14.mp3","./audio/karaoke/story-268-s01.webm","./audio/karaoke/story-268-s01.mp3","./audio/karaoke/story-268-s02.webm","./audio/karaoke/story-268-s02.mp3","./audio/karaoke/story-268-s03.webm","./audio/karaoke/story-268-s03.mp3","./audio/karaoke/story-268-s04.webm","./audio/karaoke/story-268-s04.mp3","./audio/karaoke/story-268-s05.webm","./audio/karaoke/story-268-s05.mp3","./audio/karaoke/story-268-s06.webm","./audio/karaoke/story-268-s06.mp3","./audio/karaoke/story-268-s07.webm","./audio/karaoke/story-268-s07.mp3","./audio/karaoke/story-268-s08.webm","./audio/karaoke/story-268-s08.mp3","./audio/karaoke/story-268-s09.webm","./audio/karaoke/story-268-s09.mp3","./audio/karaoke/story-268-s10.webm","./audio/karaoke/story-268-s10.mp3","./audio/karaoke/story-268-s11.webm","./audio/karaoke/story-268-s11.mp3","./audio/karaoke/story-268-s12.webm","./audio/karaoke/story-268-s12.mp3","./audio/karaoke/story-268-s13.webm","./audio/karaoke/story-268-s13.mp3"];

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
