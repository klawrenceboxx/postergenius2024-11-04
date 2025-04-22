import mongoose, { Schema, Document, Model } from "mongoose";
import { Address } from "@/types/address";
import { string } from "yup";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "seller";
  image: string;
  emailVerified: boolean;
  paymentMethod: string;
  address: Address;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      rquired: [true, "Please enter your name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    image: {
      type: String,
      default: "https://example.com/default-profile.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    paymentMethod: {
      type: String,
      default: "",
    },
    address: {
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
  },
  { timestamps: true }
);

const userModel: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default userModel;
