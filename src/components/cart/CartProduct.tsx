"use client";

import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { removeFromCart, updateCartQuantity } from "@/lib/state/cartSlice";

export default function CartProduct({ product }: { product: any }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(
      removeFromCart({ _id: product._id, dimensions: product.dimensions })
    );
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      dispatch(
        updateCartQuantity({
          _id: product._id,
          quantity: product.quantity - 1,
          dimensions: product.dimensions,
        })
      );
    }
  };

  const handleIncrease = () => {
    dispatch(
      updateCartQuantity({
        _id: product._id,
        quantity: product.quantity + 1,
        dimensions: product.dimensions,
      })
    );
  };

  return (
    <div className="flex items-center p-4 border rounded-md">
      {/* Product Image */}
      <Link href={`/posters/${product.slug}`}>
        <div className="w-32 aspect-[2/3] bg-gray-200 rounded-sm overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>
      </div>
      {/* Quantity Controls */}
      <div className="flex items-center mt-2">
        <button
          onClick={handleDecrease}
          className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
        >
          -
        </button>
        <span className="px-4">{product.quantity}</span>
        <button
          onClick={handleIncrease}
          className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
        >
          +
        </button>
      </div>
      {/* Remove Button */}
      <div className="pl-4">
        <button
          onClick={handleRemove}
          className="text-sm text-red-500 focus:outline-none"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
