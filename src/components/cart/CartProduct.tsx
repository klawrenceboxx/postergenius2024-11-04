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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white shadow-sm rounded-md">
      {/* Left Side: Product Image + Info */}
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <Link href={`/posters/${product.slug}`}>
          <div className="w-28 aspect-[2/3] bg-gray-200 rounded-sm overflow-hidden">
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
          {/* If you have dimension text (like "Matte - 45 x 32 cm"), show it */}
          {product.dimensions && (
            <p className="text-sm text-gray-600 mt-1">
              Matte – {product.dimensions}
            </p>
          )}

          {/* Price */}
          <p className="text-gray-800 text-lg font-bold mt-2">
            ${product.price.toFixed(2)}
          </p>

          {/* Shipping / Extra Info */}
          <p className="text-gray-500 text-sm mt-2">
            {" "}
            Ships in 3-4 business days
          </p>
          <p className="text-gray-500 text-sm">
            Every Purchase supports an artist
          </p>
          <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>
        </div>
      </div>

      {/* Middle: Quantity Controls */}
      <div className="flex items-center mt-4 md:mt:0">
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

      {/* Right: Remove Button */}
      <div className="mt-4 md:mt-0 md:ml-4">
        <button
          onClick={handleRemove}
          className="text-sm text-red-500 focus:outline-none hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
