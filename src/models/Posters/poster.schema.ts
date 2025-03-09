// poster.schema.ts
import mongoose, { Schema, Model, Document } from "mongoose";
import { IPoster } from "./poster.interface";
import CategoryModel from "../Category/category.schema";

// ✅ Define Standard Sizes & Prices
const SIZE_OPTIONS = [
  { size: "12x18", price: 29.99 },
  { size: "18x24", price: 39.99 },
  { size: "24x36", price: 49.99 },
];

const VariationSchema = new Schema({
  type: { type: String, required: true },
  imageUrl: { type: String, required: true },
  sizes: [
    {
      size: {
        type: String,
        required: true,
        enum: SIZE_OPTIONS.map((s) => s.size),
      }, // ✅ Enforce sizes
      price: {
        type: Number,
        required: true,
        enum: SIZE_OPTIONS.map((s) => s.price),
      }, // ✅ Enforce prices
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
      { type: mongoose.Types.ObjectId, ref: CategoryModel, required: true },
    ],
    tags: [{ type: String }],
    variations: [VariationSchema],
    sku: { type: String, required: true, unique: true }, // ✅ Add SKU
    slug: { type: String, required: true, unique: true }, // ✅ Add Slug
  },
  { timestamps: true } // ✅ Enable createdAt & updatedAt
);

// ✅ Auto-generate Slug Before Saving
PosterSchema.pre("save", function (this: IPoster & mongoose.Document, next) {
  if (
    !this.isModified("title") &&
    !this.isModified("tags") &&
    !this.isModified("sku")
  ) {
    return next(); // Skip slug update if no relevant fields changed
  }

  // Generate slug
  const formattedTitle = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const formattedTags = (this.tags ?? [])
    .map((tag) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
    .join("-");
  this.slug = `${formattedTitle}-${formattedTags}-${this.sku}`;

  next();
});

const PosterModel: Model<IPoster> =
  mongoose.models.Poster || mongoose.model<IPoster>("Poster", PosterSchema);

export default PosterModel;
