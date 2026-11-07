const V = 'almacen-20261107145350';
const SHELL = ['./', './index.html', './app.js', './styles.css', './manifest.webmanifest', './icons/icon-192.png', './assets/tabler-icons-outline.css', './assets/fonts/tabler-icons-outline.woff2'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.open(V).then(async (c) => {
    const hit = await c.match(r, { ignoreSearch: true });
    const red = fetch(r).then((res) => { if (res.ok) c.put(r, res.clone()); return res; }).catch(() => hit || (r.mode === 'navigate' ? c.match('./index.html') : undefined));
    return hit || red;
  }));
});
