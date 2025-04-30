import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";

/**
 * ✅ Client-side guestId: ensures localStorage + cookie are set
 */
export const getOrCreateGuestIdClient = (): string => {
  if (typeof window === "undefined") return "";

  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guestId", guestId);
    document.cookie = `guestId=${guestId}; path=/; max-age=31536000`;
    console.log("🆕 Created guestId:", guestId);
  } else {
    console.log("🆔 Existing guestId:", guestId);
  }

  return guestId;
};

/**
 * ✅ Server-side guestId from cookie (App Router safe)
 */
export const getGuestIdServer = async (): Promise<string | null> => {
  const cookieStore = await cookies(); // Await the Promise
  return cookieStore.get("guestId")?.value || null;
};

/**
 * ✅ Manually create Set-Cookie header if needed
 */
export const createGuestCookieHeader = (guestId: string): string => {
  return `guestId=${guestId}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax`;
};
