import { Suspense } from "react";
import type { Metadata } from "next";
import { Loader2 } from "lucide-react";
import { Poppins } from "next/font/google";

import Providers from "../lib/react-query";
import { METADATA } from "@/constants/metadata";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    images: METADATA.profile,
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
  icons: [{ rel: "apple-touch-icon", url: "/icons/icon-192x192.png" }],
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Suspense
          fallback={
            <div className="w-screen h-screen flex items-center justify-center text-primary">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          }
        >
          <Toaster />
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
