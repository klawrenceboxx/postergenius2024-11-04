import React from "react";
import Image from "next/image";

function PaymentMethods() {
  return (
    <div className="flex gap-2 justify-start mt-6">
      <img src="payments/visa.svg" alt="visa" className="w-12 h-auto " />
      <img src="payments/mastercard.svg" alt="visa" className="w-12 h-auto " />
      <img src="payments/discover.svg" alt="visa" className="w-12 h-auto " />
      <img src="payments/amex.svg" alt="visa" className="w-12 h-auto " />
      <img src="payments/gpay.svg" alt="visa" className="w-12 h-auto " />
      <img src="payments/applepay.svg" alt="visa" className="w-12 h-auto " />
      <img src="payments/paypal2.svg" alt="visa" className="w-12 h-auto " />
    </div>
  );
}

export default PaymentMethods;
