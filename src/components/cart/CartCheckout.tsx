"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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
    <div className="bg-white shadow p-6 rounded-lg">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Order Details</h2>

      {/* Ship-to + Arrival Info */}
      <div className="flex items-center jusifty-between mb-2">
        <span className="text-gray-600">Shipt to:</span>
        <span className="font-semibold">Canada</span>
      </div>
      <div className="text-sm text-gray-500 mb-4">Arrives in 7-8 days</div>
      <hr className="my-4" />

      {/* Pricing Breakdown */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600">Item Total</span>
        <span className="font-semibold">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600">Shipping & Handling</span>
        <span className="font-semibold">${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Tax</span>
        <span className="font-semibold">${tax.toFixed(2)}</span>
      </div>
      <hr className="my-4" />

      {/* Order Total */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">Order Total:</span>
        <span className="text-lg font-semibold">${total.toFixed(2)}</span>
      </div>

      {/* Promo / Discount */}
      <div className="mb-4 text-sm text-gray-500">
        23% OFF on made-to-order Posters. Use code{" "}
        <span className="font-bold">GET23</span>
      </div>

      {/* Discount Code Link */}
      <div className="mb-4">
        <Link href="/checkout">
          <button
            className="text-blue-600 text-sm underline"
            onClick={() => {
              // Add logic to show discount code input
              console.log("Clicked discount code link");
            }}
          >
            {" "}
            I have a discount code or eGift Card
          </button>
        </Link>
      </div>

      {/* Checkout Button */}
      <button
        className="w-full text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-200"
        onClick={() => {
          console.log("Proceeding to checkout");
        }}
      >
        Checkout
      </button>

      {/* Returns Info */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Returns within 100 days
      </div>
    </div>
  );
};

export default CartCheckout;
