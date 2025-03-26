"use client";

import { FC } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/state/cartSlice";
import { ProductType } from "@/types/ProductType";

interface InfosProps {
  product: ProductType;
}

export const AddToCartButton: FC<{ product: ProductType }> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id || "",
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.finalPrice,
        quantity: 1,
        slug: product.slug,
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
  return (
    <div className=" bg-white w-full md:w-1/2">
      {/* <div className="p-4 bg-yellow-50 w-full md:w-1/2"> */}

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

      {/* Product Price */}
      <div className="mt-4">
        {product.discount ? (
          <div className="text-lg">
            <span className="line-through text-gray-500">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-red-500 ml-2 font-semibold">
              $
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
            </span>
            <span className="text-sm text-gray-600 ml-2">
              ({product.discount}% off)
            </span>
          </div>
        ) : (
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default Infos;
