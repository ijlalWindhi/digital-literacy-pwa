import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true
})

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Vary", value: "Origin" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_APP_URL || "", // Only allow this origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS", // Only allow these methods
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400", // 1 day
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload", // 1 year
          },
          {
            key: "X-HTTP-Method-Override",
            value: "OFF", // Disable HTTP method override
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block", // Enable XSS protection
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevent Clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Prevent MIME sniffing
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Protect user's privacy
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()", // Disable unnecessary permissions
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, private",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
