// poster.schema.ts
import mongoose, { Schema, Model } from "mongoose";
import { IPoster } from "./poster.interface";

// Lazy import to prevent circular dependency
// const CategoryModel = () => require("../Category/category.schema").default;
import CategoryModel from "../Category/category.schema";

const VariationSchema = new Schema({
  type: { type: String, required: true },
  imageUrl: { type: String, required: true },
  sizes: [
    {
      size: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const ReviewSchema = new Schema({
  reviewBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String },
  images: [{ type: String }],
  likes: { type: Number, default: 0 },
});

const PosterSchema = new Schema<IPoster>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    categories: [
      {
        type: mongoose.Types.ObjectId,
        ref: CategoryModel, // Lazy load CategoryModel
        required: true,
      },
    ],
    tags: [{ type: String }],
    variations: [VariationSchema],
    reviews: [ReviewSchema],
  },
  { timestamps: true } // ✅ Enable createdAt & updatedAt
);

const PosterModel: Model<IPoster> =
  mongoose.models.Poster || mongoose.model<IPoster>("Poster", PosterSchema);

export default PosterModel;
