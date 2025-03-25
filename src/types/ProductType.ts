//// filepath: /c:/Users/Kalee/Documents/postergenius2024-11-04/src/types/ProductType.ts
import { Types } from "mongoose";
import { IVariation, IReview } from "../models/Posters/poster.interface";

export interface ProductType {
  _id: string; // Product ID
  title: string; // Product name/title
  description: string; // Description of the product
  slug: string; // URL-friendly slug
  price: number; // Specific price of the product
  salePrice?: number; // manually set price for marketing purposes
  finalPrice: number; // computed as: price - (price * discount / 100)
  imageUrl: string;
  mockups?: string[]; // Array of mockup image URLs
  category: Types.ObjectId | null;
  tags?: string[]; // Optional tags for filtering
  variations?: IVariation[]; // Array of variations
  reviews?: IReview[]; // Array of reviews
  sku: string; // Optional SKU identifier
  sold: number; // Number of units sold
  discount?: number; // Optional discount percentage
  savings?: number; // computed as: price - finalPrice
}
