import { Types } from "mongoose";

// Interface for individual poster variations
export interface IVariation {
  type: string; // Variation type (e.g., "Horizontal", "Black-and-White")
  imageUrl: string; // Image URL for this variation
  sizes: {
    size: string; // e.g., "8x10", "16x20"
    price: number; // Price for the specific size
  }[];
}

// Interface for poster reviews
export interface IReview {
  reviewBy: Types.ObjectId; // Reference to the User model
  rating: number; // 1-5 star rating
  reviewText?: string; // Optional review text
  images?: string[]; // User-uploaded review images
  likes?: number; // Number of likes on the review
}

// Main poster interface
export interface IPoster {
  _id?: Types.ObjectId;
  title: string; // name of the poster
  description: string;
  slug: string; // Unique slug for the poster
  price: number; // Specific price of the product
  salePrice?: number; // manually set price for marketing purposes
  imageUrl: string;
  mockups?: string[];
  // category: Types.ObjectId; // References to Category model
  category: Types.ObjectId | null;
  tags?: string[]; // Optional tags for filtering
  variations?: IVariation[]; // Array of variations
  reviews?: IReview[]; // Array of reviews
  sku: string; // Unique Stock Keeping Unit identifier
  sold: number; // Number of units sold
  discount?: number; // Optional discount percentage
}
