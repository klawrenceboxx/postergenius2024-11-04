"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import CartProduct from "@/components/cart/CartProduct";
import CartHeader from "@/components/cart/CartHeader";
import CartCheckout from "@/components/cart/CartCheckout";
import PaymentMethods from "@/components/cart/PaymentMethods";
import { RootState } from "@/lib/store"; // use your typed store if possible

export default function CartPage() {
  // ✅ Use shallowEqual to avoid unnecessary re-renders
  const cartItems = useSelector(
    (state: RootState) => state.cart.items,
    shallowEqual
  );

  const [subtotal, setSubtotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0); // Example static shipping
  const [tax, setTax] = useState<number>(0); // You can calculate later if needed
  const [total, setTotal] = useState<number>(0);

  // 💡 Update subtotal when cart items change
  useEffect(() => {
    console.log("🛒 Cart Items changed:", cartItems);
    const calculatedSubtotal = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(calculatedSubtotal);
  }, [cartItems]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <CartHeader />
      <h1 className="text-3xl font-bold mb-6 mt-3">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartProduct
                key={`${item._id}-${item.dimensions}`}
                product={item}
              />
            ))}
          </div>
          <div>
            <CartCheckout subtotal={subtotal} shipping={shipping} tax={tax} />
            <PaymentMethods />
          </div>
        </div>
      )}
    </div>
  );
}
