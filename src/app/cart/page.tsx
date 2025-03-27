"use client";

import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "@/components/cart/CartProduct";
import CartHeader from "@/components/cart/CartHeader";
import CartCheckout from "@/components/cart/CartCheckout";

export default function CartPage() {
  const cartItems = useSelector((state: any) => state.cart.items);
  console.log("🛒 Cart Items:", cartItems);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <CartHeader />

      <h1 className="text-3xl font-bold mb-6 mt-3">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item: any) => (
              <CartProduct
                key={`${item._id}-${item.dimensions}`}
                product={item}
              />
            ))}
          </div>
          {/* Right: Order Details */}
          <CartCheckout subtotal={3} shipping={4} tax={5} />
        </div>
      )}
    </div>
  );
}
