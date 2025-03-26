"use client";

export default function CartProduct({ product }: { product: any }) {
  return (
    <div className="flex items-center p-4 border rounded-md">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Product Details */}
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mt-1">Quantity: {product.quantity}</p>
      </div>
      {/* Remove Button */}
      <div>
        <button className="text-sm text-red-500 focus:outline-none">
          Remove
        </button>
      </div>
    </div>
  );
}
