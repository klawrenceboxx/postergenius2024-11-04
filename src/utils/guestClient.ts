// utils/guestClient.ts
import { v4 as uuidv4 } from "uuid";

// 🔐 Store guest ID in localStorage and document.cookie
export function getOrCreateGuestIdClient(): string {
  let guestId =
    typeof window !== "undefined" ? localStorage.getItem("guestId") : null;

  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem("guestId", guestId);
    document.cookie = `guestId=${guestId}; path=/; max-age=31536000`;
  }

  return guestId;
}
