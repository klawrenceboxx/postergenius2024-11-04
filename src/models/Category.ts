import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for a Category
export interface ICategory extends Document {
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Category Schema
const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      minlength: [2, "Category name must be at least 2 characters long."],
      maxlength: [32, "Category name must be at most 32 characters long."],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures consistent URLs
      index: true, // Optimized for searches
    },
  },
  { timestamps: true }
);

// Model Definition (Prevents Hot-Reload Errors in Next.js)
const CategoryModel: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
