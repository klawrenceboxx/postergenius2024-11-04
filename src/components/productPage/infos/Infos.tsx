import { FC } from "react";
import { ProductType } from "@/types/ProductType";

interface InfosProps {
  product: ProductType;
}

const Infos: FC<InfosProps> = ({ product }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Product Name */}
      <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>

      {/* SKU */}
      {product.sku && (
        <h2 className="text-sm text-gray-600 mt-1">
          SKU: <span className="font-semibold">{product.sku}</span>
        </h2>
      )}

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
    </div>
  );
};

export default Infos;
