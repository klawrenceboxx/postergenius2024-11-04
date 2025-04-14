import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

/**
 * Client-side guestId (localStorage + cookie)
 */
export const getOrCreateGuestIdClient = (): string => {
  if (typeof window === "undefined") return "";
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guestId", guestId);
    document.cookie = `guestId=${guestId}; path=/; max-age=31536000`;
  }
  return guestId;
};

/**
 * Server-side guestId from cookie (read-only)
 */
export const getGuestIdServer = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("guestId")?.value || null;
};

/**
 * Server-side: Create a Set-Cookie header
 */
export const createGuestCookieHeader = (guestId: string): string => {
  return `guestId=${guestId}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax`;
};
