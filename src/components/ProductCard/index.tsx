"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductType } from "@/types/ProductType";

interface ProductCardProps {
  product?: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!product) return;
    setImage(product.imageUrl || "");
    setPrice(product.finalPrice);
  }, [product]);

  return (
    <Link href={`/posters/${product?.slug ?? "#"}`}>
      <div className="border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition duration-300">
        {/* Image Display */}
        <div className="w-full h-64 overflow-hidden relative">
          {image ? (
            <img
              src={image}
              alt={product?.title ?? "Product"}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No Image</p>
            </div>
          )}
        </div>

        {/* Product Info */}
        {product && product.title ? (
          <>
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </>
        ) : (
          <p className="text-gray-500">Product information unavailable</p>
        )}

        {/* Price */}
        {price !== null ? (
          <p className="text-md font-bold text-gray-800">${price.toFixed(2)}</p>
        ) : (
          <p className="text-md font-bold text-gray-800">Price unavailable</p>
        )}
      </div>
    </Link>
  );
}
