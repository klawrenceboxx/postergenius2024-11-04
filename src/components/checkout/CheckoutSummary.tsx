"use client";

import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/state/cartSlice";
import { FC, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ShippingInput from "@/components/inputs/ShippingInput";
import { IUser } from "@/models/Users";
import { ICart } from "@/models/Cart";
import { useRouter } from "next/navigation";
import { getOrCreateGuestIdClient } from "@/utils/guestClient";

type SummaryProps = {
  cart: ICart;
  user: IUser | null;
  paymentMethod: string;
};

const couponSchema = z.object({
  code: z.string().min(1, "Please enter a coupon"),
});

const Summary: FC<SummaryProps> = ({ cart, user, paymentMethod }) => {
  const router = useRouter();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number | null>(
    null
  );
  const [orderError, setOrderError] = useState("");
  const dispatch = useDispatch();

  const applyCouponHandler = async (values: { code: string }) => {
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: values.code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        setDiscount(0);
        setTotalAfterDiscount(null);
        return;
      }

      setDiscount(data.discount);
      setTotalAfterDiscount(
        cart.cartTotal - (cart.cartTotal * data.discount) / 100
      );
      setError("");
    } catch (err) {
      console.error("Coupon error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  const placeOrderHandler = async () => {
    if (!paymentMethod) {
      console.error("Missing: paymentMethod");
      setOrderError("Please choose a payment method.");
      return;
    }

    try {
      const guestId = getOrCreateGuestIdClient();

      console.log({
        items: cart.items,
        shippingAddress: user?.address,
        paymentMethod,
        total: totalAfterDiscount ?? cart.cartTotal,
      });

      const res = await fetch("/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-guest-id": guestId },
        body: JSON.stringify({
          items: cart.items,
          shippingAddress: user?.address,
          paymentMethod,
          total: totalAfterDiscount ?? cart.cartTotal,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setOrderError(data.error || "Could not place order.");
        return;
      }

      dispatch(clearCart());

      router.push(`/order/${data.orderId}`);
    } catch (err) {
      setOrderError("Failed to place order. Try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <Formik
        initialValues={{ code: coupon }}
        validationSchema={toFormikValidationSchema(couponSchema)}
        onSubmit={applyCouponHandler}
      >
        <Form className="space-y-4">
          <ShippingInput
            name="code"
            label="Discount Code"
            placeholder="Enter coupon code"
          />
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded hover:bg-gray-900"
          >
            Apply Coupon
          </button>
        </Form>
      </Formik>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

      <div className="mt-6 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span className="font-semibold">${cart.cartTotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Applied ({discount}% Off)</span>
            <span>- ${((cart.cartTotal * discount) / 100).toFixed(2)}</span>
          </div>
        )}

        {totalAfterDiscount !== null && (
          <div className="flex justify-between text-blue-600 font-bold text-lg border-t pt-2">
            <span>Total after discount:</span>
            <span>${totalAfterDiscount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <button
        type="button"
        className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        onClick={placeOrderHandler}
      >
        Place Order
      </button>

      {orderError && <p className="text-sm text-red-500 mt-4">{orderError}</p>}
    </div>
  );
};

export default Summary;
