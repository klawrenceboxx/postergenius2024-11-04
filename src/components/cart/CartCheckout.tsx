"use client";

import React from "react";

interface CartCheckoutProps {
  subtotal: number;
  shipping: number;
  tax: number;
}

const CartCheckout: React.FC<CartCheckoutProps> = ({
  subtotal,
  shipping,
  tax,
}) => {
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white shadow-xl p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="border-t border-b border-gray-300 py-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Subtotal</span>
          <span className="text-gray-700">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Shipping</span>
          <span className="text-gray-700">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700">Tax</span>
          <span className="text-gray-700">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-semibold">Order Total:</span>
        <span className="text-xl font-semibold">${total.toFixed(2)}</span>
      </div>

      <button
        className="w-full text-xl font-semibold bg-blue-500 hover:bg-blue-600 text-white py-4 rounded transition duration-200 mt-4"
        onClick={() => {
          console.log("Proceeding to checkout");
        }}
      >
        Checkout
      </button>
    </div>
  );
};

export default CartCheckout;
