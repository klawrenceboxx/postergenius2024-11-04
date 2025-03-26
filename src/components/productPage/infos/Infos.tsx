"use client";

import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/state/cartSlice";
import { ProductType } from "@/types/ProductType";

// Helper: Map dimensions to a size label
const getLabelForDimension = (dimension: string) => {
  switch (dimension) {
    case "12x18":
      return "M";
    case "18x24":
      return "L";
    case "24x36":
      return "XL";
    default:
      return dimension;
  }
};

interface SizeOption {
  label: string;
  dimensions: string;
  price: number;
}

interface InfosProps {
  product: ProductType;
  dimensions: string;
}

export const AddToCartButton: FC<{
  product: ProductType;
  price: number;
  dimensions?: string;
}> = ({ product, price, dimensions }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id || "",
        title: product.title,
        imageUrl: product.imageUrl,
        price: price,
        quantity: 1,
        slug: product.slug,
        dimensions: dimensions ?? "", // Default to smallest size if undefined
      })
    );
  };
  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out shadow hover:shadow-lg"
    >
      Add to Cart
    </button>
  );
};

const Infos: FC<InfosProps> = ({ product }) => {
  // If product.variations exists and its first variation has sizes, use them.
  const availableSizes: SizeOption[] = product.variations?.[0]?.sizes?.length
    ? product.variations[0].sizes.map((s) => ({
        label: getLabelForDimension(s.size),
        dimensions: s.size,
        price: s.price,
      }))
    : [
        { label: "M", dimensions: "12x18", price: product.finalPrice },
        { label: "L", dimensions: "18x24", price: product.finalPrice * 1.2 },
        { label: "XL", dimensions: "24x36", price: product.finalPrice * 1.5 },
      ];

  const [selectedSize, setSelectedSize] = useState<SizeOption>(
    availableSizes[0]
  );

  // If the product changes, recalc the sizes (and reset our selected size)
  useEffect(() => {
    setSelectedSize(availableSizes[0]);
  }, [product]);

  return (
    console.log("Loaded Sizes:", product),
    (
      <div className=" bg-white w-full md:w-1/2">
        {/* Product Name */}
        <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

        {/* Description */}
        <div>
          <p className="text-gray-600 mt-2">
            {product.description
              ? product.description
              : "No description available."}
          </p>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="mt-3">
            <h2 className="text-lg font-semibold">Reviews:</h2>
            {product.reviews.map((review, idx) => (
              <div key={idx} className="mt-2">
                {/* Star Rating */}
                <div
                  className="flex items-center text-yellow-400"
                  aria-label={`Review Rating: ${review.rating}`}
                >
                  {Array.from({ length: Math.floor(review.rating) }).map(
                    (_, starIdx) => (
                      <span key={starIdx}>&#9733;</span> // Filled star
                    )
                  )}
                  {/* If there's a fractional part, render a half/empty star */}
                  {review.rating % 1 !== 0 && <span>&#9734;</span>}
                </div>

                {/* Review Text (if any) */}
                {review.reviewText && (
                  <p className="text-gray-800 mt-1">"{review.reviewText}"</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-600">No reviews yet.</p>
        )}

        {/* Size Toggle */}
        <div className="mt-6">
          {/* Title + Info Icon */}
          <h3 className="text-md font-bold mb-2 flex items-center gap-1">
            Choose size
            <span
              className="text-gray-400 cursor-pointer"
              title="Learn more about our sizes"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9v2.25h1.5V9h-1.5zM12 14.25h.008v.008H12v-.008zM12 3.75c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25 8.25-3.694 8.25-8.25S16.556 3.75 12 3.75z"
                />
              </svg>
            </span>
          </h3>

          {/* Pill-Shaped Container */}
          <div className="inline-flex items-center p-1 border border-gray-300 rounded-full bg-gray-100">
            {availableSizes.map((size) => {
              const isSelected = selectedSize.label === size.label;
              return (
                <button
                  key={size.label}
                  onClick={() => setSelectedSize(size)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out
            ${
              isSelected
                ? "bg-white text-blue-600 border border-blue-600 shadow"
                : "text-gray-700 hover:bg-gray-200"
            }
          `}
                  style={{ minWidth: "60px" }} // ensures enough width for expanded text
                >
                  {isSelected
                    ? `${size.label} (${size.dimensions})`
                    : size.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price Display */}
        <div className="mt-4">
          {product.discount ? (
            <div className="text-lg">
              <span className="line-through text-gray-500">
                ${selectedSize.price.toFixed(2)}
              </span>
              <span className="text-red-500 ml-2 font-semibold">
                $
                {(
                  selectedSize.price -
                  (selectedSize.price * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="text-sm text-gray-600 ml-2">
                ({product.discount}% off)
              </span>
            </div>
          ) : (
            <p className="text-lg font-semibold">
              ${selectedSize.price.toFixed(2)}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <AddToCartButton
            product={product}
            price={selectedSize.price}
            dimensions={selectedSize.dimensions}
          />
        </div>
      </div>
    )
  );
};

export default Infos;
