"use client";

import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/components/cart/CartProduct";
import CartHeader from "@/components/cart/CartHeader";
import CartCheckout from "@/components/cart/CartCheckout";

export default function CartPage() {
  const cartItems = useSelector((state: any) => state.cart.items);

  return (
    <div className="p-4">
      <CartHeader />

      <h1 className="text-3xl font-bold mb-6 mt-3">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <CartProduct key={item._id} product={item} />
            ))}
          </div>
          <div className="md:col-span-1">
            <CartCheckout subtotal={3} shipping={4} tax={5} />
          </div>
        </div>
      )}
    </div>
  );
}
