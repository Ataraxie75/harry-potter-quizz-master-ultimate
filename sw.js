/* Service worker du Grand Grimoire.
   Stratégie « réseau d'abord » : toujours la dernière version quand on est
   connecté, et repli sur le cache quand on est hors-ligne. Le cache est
   versionné : à chaque déploiement (bump de VERSION), l'ancien est purgé,
   ce qui évite tout contenu périmé. */

const VERSION = "v7";
const CACHE = "grimoire-" + VERSION;

const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css?v=7",
  "./js/questions.js?v=7",
  "./js/reserve.js?v=7",
  "./js/app.js?v=7",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-180.png",
];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    fetch(req)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
