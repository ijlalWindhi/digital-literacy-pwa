"use server";
import { cookies } from "next/headers";

const getCookieName = (key: string) =>
  `${process.env.NEXT_PUBLIC_STORAGE_NAME}_${key}`;

/**
 * Set cookie
 * @param key
 * @param value
 * @returns
 * @example
 * setCookie("token", "123")
 */
export async function setCookies(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(getCookieName(key), value, {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 jam
  });
}

/**
 * Get cookie by key
 * @param key
 * @returns
 * @example
 * getCookie("token")
 */
export async function getCookies(key: string) {
  const cookieStore = await cookies();
  return cookieStore.get(getCookieName(key));
}

/**
 * Delete cookie by key
 * @param key
 * @returns
 * @example
 * deleteCookie("token")
 */
export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(getCookieName(key));
}
