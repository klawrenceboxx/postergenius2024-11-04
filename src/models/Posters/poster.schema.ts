import mongoose, { Schema, Model } from "mongoose";
import { IPoster, IReview, IVariation } from "./poster.interface";

const VariationSchema = new Schema<IVariation>(
  {
    type: { type: String, required: true }, // Variation type (e.g., "Horizontal", "Black-and-White")
    imageUrl: { type: String, required: true }, // Image URL for this variation
    sizes: [
      {
        size: { type: String, required: true }, // e.g., "8x10", "16x20"
        price: { type: Number, required: true }, // Price for the specific size
      },
    ],
  },
  { _id: false } // Prevent automatic _id generation for sub-documents
);

const ReviewSchema = new Schema<IReview>(
  {
    reviewBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewText: { type: String },
    images: [{ type: String }],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PosterSchema = new Schema<IPoster>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }, // Base price
    imageUrl: { type: String, required: true },
    categories: [
      { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    ],
    tags: [{ type: String }], // Optional tags
    variations: [VariationSchema], // Array of variations
    reviews: [ReviewSchema], // Array of reviews
  },
  { timestamps: true }
);

// Prevent redefinition errors in Next.js
const PosterModel: Model<IPoster> =
  mongoose.models.Poster || mongoose.model<IPoster>("Poster", PosterSchema);

export default PosterModel;
