"use client";

import { setCart } from "@/lib/state/cartSlice";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
} from "@/utils/cartStorage";

const CartSync = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [hasMounted, setHasMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    dispatch(setCart(storedCart));
    setHasMounted(true); // Set hasMounted to true after loading the cart
  }, [dispatch]);

  // Save cart to localStorage on any change
  useEffect(() => {
    if (hasMounted) {
      saveCartToLocalStorage(cart);
    }
  }, [cart, hasMounted]);

  return null;
};

export default CartSync;
