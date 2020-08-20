const CACHE_NAME = "devtechnology-v1";
var urlToCache = [
    "/",
    "/index.html",
    "/navbar.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/image/banner2.png",
    "/image/blog.png",
    "/image/home.png",
    "/image/home-1.png",
    "/image/home-2.png",
    "/image/home-3.png",
    "/image/pelatihan-1.png",
    "/image/pelatihan-2.png",
    "/image/pelatihan-3.png",
    "/image/profile.png",
    "/image/icons/icon-72x72.png",
    "/image/icons/icon-96x96.png",
    "/image/icons/icon-128x128.png",
    "/image/icons/icon-144x144.png",
    "/image/icons/icon-152x152.png",
    "/image/icons/icon-192x192.png",
    "/image/icons/icon-384x384.png",
    "/image/icons/icon-512x512.png",
    "/js/materialize.min.js",
    "/js/navbar.js",
    "/pages/blog.html",
    "/pages/home.html",
    "/pages/pelatihan.html",
    "/pages/profile.html",
    "/manifest.json"
];

// menerapkan services worker
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlToCache);
        })
    );
});

// mengaktifkan mode offline services worker
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches
        .match(event.request, {
            cacheName: CACHE_NAME
        })
        .then(function (response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }

            console.log(
                "ServiceWorker: Memuat aset dari server: ",
                event.request.url
            );
            return fetch(event.request);
        })
    );
});

// menghapus cache lama untuk version 
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});