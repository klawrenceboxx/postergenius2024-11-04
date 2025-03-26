"use client";

import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/components/cart/CartProduct";
import CartHeader from "@/components/cart/CartHeader";

export default function CartPage() {
  const cartItems = useSelector((state: any) => state.cart.items);

  return (
    <div className="p-4">
      <CartHeader />

      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: any) => (
            <CartProduct key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
