import { PaymentMethod } from "@/types/PaymentMethod";

export const paymentMethods: PaymentMethod[] = [
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay easily using your PayPal balance or linked bank account.",
    images: ["/images/payment/paypal.webp"],
  },
  {
    id: "credit_card",
    name: "Credit Card",
    description: "Pay securely with Visa, Mastercard, or Amex.",
    images: ["/images/payment/visa.webp", "/images/payment/mastercard.webp"],
  },
  {
    id: "cash",
    name: "Cash on Delivery",
    description: "Pay in cash when your order arrives at your door.",
  },
];
