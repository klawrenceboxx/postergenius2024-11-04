import mongoose, { Schema, Document, Model } from "mongoose";

// Extract ObjectId type
const { ObjectId } = mongoose.Schema.Types;

// Interface for individual product variations
interface ISubProduct {
  images: string[]; // Array of image URLs
  color: { name: string; image: string }; // Color & associated image
  sizes: { size: string; quantity: number; price: number }[]; // Different sizes, stock & prices
  discount: number; // Discount amount
  sold: number; // Number of units sold
}

// Interface for product reviews
interface IReview {
  reviewBy: mongoose.Types.ObjectId; // References User model
  rating: number; // 1-5 star rating
  reviewText?: string; // Optional written review
  size?: string; // Size purchased (if applicable)
  style?: { color: string; image: string }; // Color & style reference
  fit?: string; // User feedback on fit
  images?: string[]; // User-uploaded review images
  likes?: number; // Like count on review
}

// Main Product Interface
export interface IProduct extends Document {
  name: string;
  description: string;
  brand?: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  subcategories?: mongoose.Types.ObjectId[];
  details?: { name: string; value: string }[]; // Dynamic details
  questions?: { question: string; answer: string }[]; // Q&A
  refundPolicy: string;
  rating: number; // Overall rating
  numReviews: number; // Number of reviews
  shipping: number; // Custom shipping fee
  subProducts: ISubProduct[];
  reviews: IReview[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Review Schema (Embedded inside Product)
const ReviewSchema = new Schema<IReview>(
  {
    reviewBy: { type: ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, default: 0 },
    reviewText: { type: String },
    size: { type: String },
    style: {
      color: { type: String },
      image: { type: String },
    },
    fit: { type: String },
    images: [{ type: String }],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// SubProduct Schema (For product variations)
const SubProductSchema = new Schema<ISubProduct>(
  {
    images: [{ type: String, required: true }],
    color: {
      name: { type: String, required: true },
      image: { type: String, required: true },
    },
    sizes: [
      {
        size: { type: String, required: true },
        quantity: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true },
      },
    ],
    discount: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Main Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    brand: { type: String },
    slug: { type: String, required: true, unique: true },
    category: { type: ObjectId, ref: "Category", required: true },
    subcategories: [{ type: ObjectId, ref: "Subcategory" }],
    details: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    questions: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    refundPolicy: { type: String, default: "30 Days" },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    subProducts: [SubProductSchema], // Array of product variations
    reviews: [ReviewSchema], // Array of reviews
  },
  { timestamps: true }
);

// Prevents model redefinition errors in Next.js hot-reload
const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;
