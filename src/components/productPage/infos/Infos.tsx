import { FC } from "react";
import { ProductType } from "@/types/ProductType";

interface InfosProps {
  product: ProductType;
}

const Infos: FC<InfosProps> = ({ product }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Product Name */}
      <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
      {product.sku && (
        <h2 className="text-sm text-gray-600 mt-1">
          SKU: <span className="font-semibold">{product.sku}</span>
        </h2>
      )}

      {/* Product Rating */}
      {product.rating && (
        <div className="flex items-center gap-2 mt-3">
          <div
            className="flex items-center text-yellow-400"
            aria-label={`Rating: ${product.rating}`}
          >
            {Array.from({ length: Math.floor(product.rating) }).map(
              (_, idx) => (
                <span key={idx}>&#9733;</span>
              )
            )}
            {product.rating % 1 !== 0 && <span>&#9734;</span>}
          </div>
          <span className="text-sm text-gray-600">
            {product.numReviews} review{product.numReviews === 1 ? "" : "s"}
          </span>
        </div>
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
