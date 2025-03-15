"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ProductType } from "@/types/ProductType";

interface ProductCardProps {
  product?: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [active, setActive] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [styles, setStyles] = useState<{ color: string; image: string }[]>([]);

  useEffect(() => {
    if (!product || !product.subProducts || product.subProducts.length === 0)
      return;

    const activeProduct = product.subProducts[active];
    setImages(activeProduct?.images ?? []);
    setPrices(
      activeProduct?.sizes?.map((s) => s.price).sort((a, b) => a - b) ?? []
    );
    setStyles(
      product.subProducts.map((sp) => ({
        color: sp.color,
        image: sp.colorImage ?? "",
      }))
    );
  }, [active, product]);

  return (
    <Link href={`/posters/${product?.slug ?? "#"}`}>
      <div className="border rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition duration-300">
        {/* Image Display with Hover Effect */}
        <div className="w-full h-64 overflow-hidden relative">
          {images.length > 0 ? (
            <img
              src={images[0]}
              alt={product?.name ?? "Product"}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No Image</p>
            </div>
          )}
        </div>

        {/* Product Info */}
        {product && product.name ? (
          <>
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </>
        ) : (
          <p className="text-gray-500">Product information unavailable</p>
        )}

        {/* Price Range */}
        {prices.length > 0 ? (
          <p className="text-md font-bold text-gray-800">
            ${prices[0]}{" "}
            {prices.length > 1 ? `- $${prices[prices.length - 1]}` : ""}
          </p>
        ) : (
          <p className="text-md font-bold text-gray-800">Price unavailable</p>
        )}

        {/* Color Options */}
        <div className="flex gap-2 mt-2">
          {styles.length > 0 ? (
            styles.map((style, index) => (
              <button
                key={index}
                className={`w-6 h-6 rounded-full border-2 ${
                  active === index ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: style.color || "transparent" }}
                onClick={() => setActive(index)}
              />
            ))
          ) : (
            <p className="text-gray-500">No styles available</p>
          )}
        </div>
      </div>
    </Link>
  );
}
