/* Overdrive Utility service worker.
   Caches the site shell so tou.html opens offline and can be installed as an app.
   Notifications are shown by the page through registration.showNotification();
   there is no push server — nothing leaves the device. */
var CACHE = "ov-utility-v1";
var SHELL = ["./", "./index.html", "./tou.html", "./connect.html", "./feedback.html", "./terms.html",
             "./assets/style.css", "./assets/site.js", "./manifest.webmanifest",
             "./assets/icon-192.png", "./assets/icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
// Network first, cache fallback: a fresh page whenever online, the cached one when not.
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    var copy = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copy); }); return r;
  }).catch(function () { return caches.match(e.request); }));
});
self.addEventListener("notificationclick", function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window" }).then(function (list) {
    for (var i = 0; i < list.length; i++) if ("focus" in list[i]) return list[i].focus();
    return self.clients.openWindow("./tou.html");
  }));
});
