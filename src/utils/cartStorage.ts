// creating functions that will load and save the cart to local storage
import { CartItem } from "@/types/cart";

export const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

export const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
