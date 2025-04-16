// models/Coupon.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  startDate: string;
  endDate: string;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      trim: true,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      minlength: 4,
      maxlength: 10,
    },
    startDate: {
      type: String,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: String,
      required: [true, "End date is required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount value is required"],
    },
  },
  { timestamps: true }
);

const CouponModel: Model<ICoupon> =
  mongoose.models.Coupon || mongoose.model<ICoupon>("Coupon", CouponSchema);

export default CouponModel;
