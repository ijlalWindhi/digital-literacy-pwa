/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerRoute, Route } from "workbox-routing";
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

declare let self: ServiceWorkerGlobalScope;

// Mengambil alih kontrol segera tanpa menunggu reload
clientsClaim();

// Pre-cache semua asset yang di-generate saat build
precacheAndRoute(self.__WB_MANIFEST);

// Cache untuk halaman HTML
const pageCache = new NetworkFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 24 * 60 * 60, // 24 jam
    }),
  ],
});

// Cache untuk API requests
const apiCache = new NetworkFirst({
  cacheName: "api-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 12 * 60 * 60, // 12 jam
      maxEntries: 100, // Maksimal 100 entries
    }),
  ],
});

// Cache untuk static assets (CSS, JS)
const staticResourceCache = new StaleWhileRevalidate({
  cacheName: "static-resources",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60, // 7 hari
      maxEntries: 200,
    }),
  ],
});

// Cache untuk gambar
const imageCache = new CacheFirst({
  cacheName: "image-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
      maxEntries: 50,
    }),
  ],
});

// Cache untuk font
const fontCache = new CacheFirst({
  cacheName: "font-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 365 * 24 * 60 * 60, // 1 tahun
    }),
  ],
});

// Register routes
registerRoute(({ request }) => request.mode === "navigate", pageCache);

registerRoute(({ url }) => url.pathname.startsWith("/api/"), apiCache);

registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  staticResourceCache,
);

registerRoute(({ request }) => request.destination === "image", imageCache);

registerRoute(({ request }) => request.destination === "font", fontCache);

// Handling offline fallback
const offlineFallback = new Route(
  ({ request }) => request.mode === "navigate",
  async ({ request }) => {
    try {
      // Coba ambil halaman dari cache
      const cache = await caches.open("page-cache");
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        return cachedResponse;
      }

      // Jika tidak ada di cache, tampilkan offline page
      const offlineResponse = await cache.match("/offline.html");
      if (offlineResponse) {
        return offlineResponse;
      }

      // Fallback jika offline page tidak ditemukan
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="id">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Offline - Digital Literacy</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                padding: 2rem;
                max-width: 600px;
                margin: 0 auto;
                text-align: center;
              }
              .offline-container {
                background: #f9fafb;
                border-radius: 8px;
                padding: 2rem;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .retry-button {
                background: #000;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 1rem;
              }
              .retry-button:hover {
                background: #333;
              }
            </style>
          </head>
          <body>
            <div class="offline-container">
              <h1>Anda Sedang Offline</h1>
              <p>Mohon periksa koneksi internet Anda dan coba lagi.</p>
              <button class="retry-button" onclick="window.location.reload()">
                Coba Lagi
              </button>
            </div>
          </body>
        </html>
        `,
        {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        },
      );
    } catch (error) {
      return new Response("Offline", {
        status: 503,
        statusText: "Service Unavailable",
      });
    }
  },
);

// Register offline fallback
registerRoute(offlineFallback);

// Listen for message events from the client
(self as any).addEventListener("message", (event: any) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    (self as any).skipWaiting();
  }
});

// Cleanup old caches
(self as any).addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches that don't match our current cache names
          if (
            ![
              "page-cache",
              "api-cache",
              "static-resources",
              "image-cache",
              "font-cache",
            ].includes(cacheName)
          ) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
