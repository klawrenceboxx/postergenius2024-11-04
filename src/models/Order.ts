import mongoose, { Schema, Document, Types, Model } from "mongoose";
import { Address } from "@/types/address";
import { OrderItem } from "@/types/orderItem";

interface PaymentResult {
  id: string;
  status: string;
  email: string;
}

export interface IOrder extends Document {
  user?: Types.ObjectId;
  guestId?: string;
  items: OrderItem[];
  orderTotal: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  shippingPrice: number;
  taxPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  status:
    | "Not Processed"
    | "Processing"
    | "Dispatched"
    | "Canceled"
    | "Completed";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    slug: { type: String, required: true },
    dimensions: { type: String, required: true },
  },
  { _id: false }
);

const ShippingAddressSchema = new Schema<Address>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const PaymentResultSchema = new Schema<PaymentResult>(
  {
    id: { type: String },
    status: { type: String },
    email: { type: String },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    guestId: { type: String, required: false },
    items: [OrderItemSchema],
    orderTotal: { type: Number, required: true },
    shippingAddress: { type: ShippingAddressSchema, required: true },
    paymentMethod: { type: String, required: true },
    paymentResult: { type: PaymentResultSchema },
    shippingPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    status: {
      type: String,
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Canceled",
        "Completed",
      ],
      default: "Not Processed",
    },
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
