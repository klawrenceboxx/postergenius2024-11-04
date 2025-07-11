"use client";

import { useState } from "react";
import { paymentMethods } from "@/app/data/paymentMethods";
import { PaymentMethod } from "@/types/PaymentMethod";
import { FC } from "react";
import { ICart } from "@/models/Cart"; // make sure this path is right

interface CheckoutPaymentProps {
  cart: ICart;
}

const CheckoutPayment: FC<CheckoutPaymentProps> = ({ cart }) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
      <div className="flex flex-col gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            htmlFor={method.id}
            className={`cursor-pointer p-4 border rounded-lg transition ${
              selected === method.id
                ? "bg-blue-50 border-blue-600"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <input
                  type="radio"
                  name="payment"
                  id={method.id}
                  checked={selected === method.id}
                  onChange={() => setSelected(method.id)}
                  className="mr-3"
                />
                <span className="font-medium">Pay with {method.name}</span>
                <p className="text-sm text-gray-600 mt-1">
                  {method.description}
                </p>
              </div>

              {method.images && (
                <div className="flex gap-2">
                  {method.images.map((imgName, i) => {
                    const imagePath = `/payments/${imgName}`;
                    return (
                      <img
                        key={i}
                        src={imagePath}
                        alt={method.name}
                        className="w-10 h-auto"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/payments/default.svg"; // fallback image you should include
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckoutPayment;
