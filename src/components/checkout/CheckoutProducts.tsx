// components/checkout/CheckoutCartSummary.tsx
"use client";

import { FC } from "react";
import { ICart } from "@/models/Cart"; // make sure this path is right

interface CheckoutProductsProps {
  cart: ICart;
}

const CheckoutProducts: FC<CheckoutProductsProps> = ({ cart }) => {
  return (
    <div className="border rounded p-4 bg-white mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Cart</h2>
        <span className="text-gray-500 text-sm">{cart.items.length} items</span>
      </div>

      <div className="flex flex-wrap gap-4">
        {cart.items.map((item) => (
          <div key={`${item._id}-${item.dimensions}`} className="w-32">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="rounded-md mb-1"
            />
            <div className="text-sm text-gray-600 flex justify-between">
              <span>{item.dimensions}</span>
              <span>x{item.quantity}</span>
            </div>
            <p className="truncate text-sm">{item.title}</p>
            <p className="text-sm font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 mt-4 text-right">
        <span className="text-sm text-gray-600 mr-2">Subtotal:</span>
        <span className="text-lg font-bold">${cart.cartTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CheckoutProducts;
