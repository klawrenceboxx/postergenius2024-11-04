import mongoose, { Document } from "mongoose";

// Interface for a SubCategory
export interface ISubCategory extends Document {
  name: string; // Subcategory name
  slug: string; // URL-friendly name
  category: mongoose.Types.ObjectId; // Reference to the parent category
  createdAt?: Date; // Optional creation timestamp
  updatedAt?: Date; // Optional update timestamp
}
