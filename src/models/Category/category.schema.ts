import { Types } from "mongoose";
import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "./category.interface";

export function isPopulatedCategory(
  parent: Types.ObjectId | ICategory | null
): parent is ICategory {
  return !!parent && typeof parent === "object" && "name" in parent;
}

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
    parent: { type: mongoose.Types.ObjectId, ref: "Category", default: null },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const CategoryModel: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default CategoryModel;
