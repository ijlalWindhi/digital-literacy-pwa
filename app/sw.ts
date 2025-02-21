/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { registerRoute, NavigationRoute } from "workbox-routing";
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

clientsClaim();

// Pre-cache manifest
precacheAndRoute(self.__WB_MANIFEST);

// Enhanced page cache strategy
const pageCache = new NetworkFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 24 * 60 * 60,
    }),
  ],
  networkTimeoutSeconds: 3, // Add timeout to fall back to cache quicker
});

// Enhanced API cache with fallback data
const apiCache = new NetworkFirst({
  cacheName: "api-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 12 * 60 * 60,
      maxEntries: 100,
    }),
  ],
  networkTimeoutSeconds: 3,
});

// Static resources cache
const staticResourceCache = new StaleWhileRevalidate({
  cacheName: "static-resources",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60,
      maxEntries: 200,
    }),
  ],
});

const imageCache = new CacheFirst({
  cacheName: "image-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
      maxEntries: 50,
    }),
  ],
});

const fontCache = new CacheFirst({
  cacheName: "font-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 365 * 24 * 60 * 60,
    }),
  ],
});

// Enhanced navigation handling
const navigationHandler = async ({ request, event }: any) => {
  try {
    // Try network first
    const response = await pageCache.handle({ request, event });
    if (response) return response;

    // If network fails, try cache
    const cache = await caches.open("page-cache");
    const cachedResponse = await cache.match(request);
    if (cachedResponse) return cachedResponse;

    // Return cached homepage as fallback
    const homepageCache = await cache.match("/");
    if (homepageCache) return homepageCache;

    // Final fallback
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Offline Mode - Digital Literacy</title>
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
            <p>Halaman ini belum tersedia offline. Silakan kembali ke halaman utama.</p>
            <button class="retry-button" onclick="window.location.href='/'">
              Kembali ke Beranda
            </button>
          </div>
        </body>
      </html>
      `,
      {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    return new Response("Service Unavailable", { status: 503 });
  }
};

// Register routes
registerRoute(new NavigationRoute(navigationHandler));

registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  staticResourceCache,
);

registerRoute(({ url }) => url.pathname.startsWith("/api/"), apiCache);

registerRoute(({ request }) => request.destination === "image", imageCache);

registerRoute(({ request }) => request.destination === "font", fontCache);

// Handle API fallbacks
(self as any).addEventListener("fetch", (event: any) => {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          if (response.ok) {
            const cache = await caches.open("api-cache");
            cache.put(event.request, response.clone());
            return response;
          }

          // Return cached response if network fails
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return empty data as last resort
          return new Response(
            JSON.stringify({
              data: [],
              message: "Offline data not available",
            }),
            {
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          const cachedResponse = await caches.match(event.request);
          return (
            cachedResponse ||
            new Response(
              JSON.stringify({
                data: [],
                message: "Offline data not available",
              }),
              {
                headers: { "Content-Type": "application/json" },
              },
            )
          );
        }
      })(),
    );
  }
});

// Skip waiting and cleanup
(self as any).addEventListener("message", (event: any) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    (self as any).skipWaiting();
  }
});

(self as any).addEventListener("activate", (event: any) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
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
