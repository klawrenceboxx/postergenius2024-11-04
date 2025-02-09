import mongoose, { Schema, Model } from "mongoose";
import { ISubCategory } from "./subcategory.interface"; // Import the interface

// SubCategory Schema Definition
const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required."],
      minlength: [2, "Subcategory name must be at least 2 characters long."],
      maxlength: [32, "Subcategory name must be at most 32 characters long."],
      trim: true, // Removes extra whitespace
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures consistent URLs
      index: true, // Optimized for searches
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Links to the Category model
      required: [true, "Subcategory must belong to a category."],
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Model Definition (Prevents Hot-Reload Errors in Next.js)
const SubCategoryModel: Model<ISubCategory> =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);

export default SubCategoryModel;
