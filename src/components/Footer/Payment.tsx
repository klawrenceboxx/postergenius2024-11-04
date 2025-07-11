"use client";

export default function Payment() {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">WE ACCEPT</h3>
      <div className="flex gap-4 items-center">
        <img src="/payments/visa.svg" alt="Visa" className="w-24 h-auto" />
        <img
          src="/payments/mastercard.svg"
          alt="MasterCard"
          className="w-24 h-auto"
        />
        <img src="/payments/paypal2.svg" alt="PayPal" className="w-24 h-auto" />
      </div>
    </div>
  );
}
