import mongoose, { Schema, Document, Types, Model } from "mongoose";
import { CartItem } from "@/types/cart";

export interface ICart extends Document {
  user?: Types.ObjectId;
  guestId?: string;
  items: CartItem[];
  cartTotal: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<CartItem>(
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

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: false },
    guestId: { type: String, required: false },
    items: [CartItemSchema],
    cartTotal: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartModel: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);

export default CartModel;
