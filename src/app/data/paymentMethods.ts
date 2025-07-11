export const paymentMethods = [
  {
    id: "credit",
    name: "Credit Card",
    description: "Visa, MasterCard, Amex",
    images: ["visa.svg", "mastercard.svg"], // ✅ just filenames
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay easily using your PayPal balance or linked bank account.",
    images: ["/payments/paypal2.svg"],
  },
  {
    id: "credit_card",
    name: "Credit Card",
    description: "Pay securely with Visa, Mastercard, or Amex.",
    images: ["/payments/visa.svg", "/payments/mastercard.svg"],
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    description: "Pay in cash when your order arrives at your door.",
  },
];
