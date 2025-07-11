"use client";

import { setCart } from "@/lib/state/cartSlice";
import { RootState } from "@/lib/store";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
} from "@/utils/cartStorage";
import { useSession } from "next-auth/react";
import { getOrCreateGuestIdClient } from "@/utils/guestClient"; // ✅

const CartSync = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [hasMounted, setHasMounted] = useState(false);
  const { data: session } = useSession();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // --------------------------\\
  // 1. Load cart from localStorage on first mount (before login)
  // --------------------------
  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    dispatch(setCart(storedCart));

    // ✅ Ensure guestId is initialized
    if (!session?.user?.id) {
      const guestId = getOrCreateGuestIdClient();
      console.log("✅ guestId ensured:", guestId);
    }

    setHasMounted(true);
  }, [dispatch, session?.user?.id]);

  // --------------------------
  // 2. Save Redux cart to localStorage anytime it changes (for guests)
  // --------------------------
  useEffect(() => {
    if (hasMounted && !session?.user?.id) {
      saveCartToLocalStorage(cart);
    }
  }, [cart, hasMounted, session]);

  // --------------------------
  // 3. Auto-save Redux cart to MongoDB after cart changes (guest or user)
  // --------------------------
  useEffect(() => {
    const userId = session?.user?.id;
    const guestId = localStorage.getItem("guestId");

    if (!hasMounted || (!userId && !guestId)) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        await fetch("/api/cart/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cart,
            cartTotal: cart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            ),
          }),
        });

        console.log("🗃️ Auto-saved cart to MongoDB (user or guest)");
      } catch (err) {
        console.error("❌ Auto-save failed:", err);
      }
    }, 5000);
  }, [cart, session?.user?.id, hasMounted]);

  // --------------------------
  // 4. On login, merge guest cart and load user cart from DB
  // --------------------------
  useEffect(() => {
    const syncCart = async () => {
      const userId = session?.user?.id;
      const guestId = localStorage.getItem("guestId");

      if (!userId) return;

      if (guestId) {
        await fetch("/api/cart/merge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, guestId }),
        });
        localStorage.removeItem("guestId");
      }

      const res = await fetch(`/api/cart/load?userId=${userId}`);
      const data = await res.json();
      dispatch(setCart(data.items || []));
    };

    syncCart();
  }, [session, dispatch]);

  return null;
};

export default CartSync;
