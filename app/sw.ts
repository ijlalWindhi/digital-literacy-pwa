import { registerRoute, Route } from "workbox-routing";
import { NetworkFirst, CacheFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

// Cache untuk halaman login
const loginPageCache = new NetworkFirst({
  cacheName: "login-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 24 * 60 * 60, // 24 jam
    }),
  ],
});

// Cache untuk assets UI login (CSS, JS, images)
const loginAssetsCache = new CacheFirst({
  cacheName: "login-assets-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
    }),
  ],
});

// Register routes
registerRoute(({ url }) => url.pathname === "/auth/login", loginPageCache);

registerRoute(({ request, url }) => {
  // Cache semua assets yang digunakan di halaman login
  return (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "font" ||
    (request.destination === "image" && url.pathname.includes("/auth"))
  );
}, loginAssetsCache);

// Offline fallback khusus untuk login
const loginOfflineFallback = new Route(
  ({ url }) => url.pathname === "/auth/login",
  async () => {
    try {
      const cache = await caches.open("login-cache");
      const response = await cache.match("/auth/login");
      if (response) return response;

      return new Response(
        `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <title>Login - Offline Mode</title>
          <style>
            /* Copy styles dari halaman login Anda */
            .offline-message {
              text-align: center;
              padding: 20px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="offline-message">
            <h1>Login Tidak Tersedia</h1>
            <p>Mohon periksa koneksi internet Anda untuk melakukan login.</p>
            <button onclick="window.location.reload()">Coba Lagi</button>
          </div>
        </body>
        </html>
        `,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    } catch (error) {
      return new Response("Login tidak tersedia dalam mode offline", {
        status: 503,
        headers: { "Content-Type": "text/plain" },
      });
    }
  },
);

// Register offline fallback
registerRoute(loginOfflineFallback);
