import { type NextRequest, NextResponse } from "next/server";

// Define auth-related pages
const publicPages = ["/auth/login", "/auth/register", "/manifest.json"];

// Define public assets paths that should always be accessible
const publicAssets = [
  "/images",
  "/icons",
  "/screenshots",
  "/fonts",
  "/public",
  "/favicon.ico",
  "/_next",
  "/api",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(
    `${process.env.NEXT_PUBLIC_STORAGE_NAME}_token`,
  )?.value;
  const path = request.nextUrl.pathname;

  // Check if the current path is for public assets
  const isPublicAsset = publicAssets.some((asset) => path.startsWith(asset));
  if (isPublicAsset) {
    return NextResponse.next();
  }

  // Check if the current path is an auth page
  const isAuthPage = publicPages.includes(path);

  // If user has token and tries to access auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user doesn't have token and tries to access protected pages
  if (!token && !isAuthPage) {
    const redirectUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure paths that will trigger the middleware
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
