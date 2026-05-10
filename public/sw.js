const CACHE_NAME = 'jdih-bna-cache-v4';
const ASSETS_TO_CACHE = [
    '/',
    '/manifest.json',
    '/favicon.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE).catch(err => console.log('Pre-cache error:', err));
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    // Jangan intercept request ke Vite/Hot Reload agar tidak konflik saat development
    if (event.request.url.includes(':5173') || event.request.url.includes('@vite')) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
                return response;
            })
            .catch(() => {
                return caches.match(event.request).then((cachedResponse) => {
                    // Jika ada di cache, kembalikan. 
                    // Jika tidak ada, kembalikan response error yang valid atau biarkan gagal secara natural
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    
                    // Penting: Jangan kembalikan null. 
                    // Untuk navigasi halaman, bisa arahkan ke fallback '/'
                    if (event.request.mode === 'navigate') {
                        return caches.match('/');
                    }
                    
                    // Untuk aset lain, biarkan browser menangani kegagalan fetch yang asli
                    return fetch(event.request); 
                });
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
