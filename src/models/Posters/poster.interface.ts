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
  title: string;
  description: string;
  slug: string; // Unique slug for the poster
  price: number; // Base price of the poster
  imageUrl: string;
  categories: Types.ObjectId[]; // References to Category model
  tags?: string[]; // Optional tags for filtering
  variations?: IVariation[]; // Array of variations
  reviews?: IReview[]; // Array of reviews
  sku: string; // Unique Stock Keeping Unit identifier
}
