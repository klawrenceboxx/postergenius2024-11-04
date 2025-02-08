import mongoose, { Schema, Document, Model } from "mongoose";

// Extract ObjectId for references
const { ObjectId } = mongoose.Schema.Types;

// Interface for a SubCategory
export interface ISubCategory extends Document {
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId; // References `Category.ts`
  createdAt?: Date;
  updatedAt?: Date;
}

// SubCategory Schema
const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: [true, "Subcategory name is required."],
      minlength: [2, "Subcategory name must be at least 2 characters long."],
      maxlength: [32, "Subcategory name must be at most 32 characters long."],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensures consistent URLs
      index: true,
    },
    category: {
      type: ObjectId,
      ref: "Category", // Links SubCategory to a parent Category
      required: [true, "Subcategory must have a parent category."],
    },
  },
  { timestamps: true }
);

// Model Definition (Prevents Hot-Reload Errors in Next.js)
const SubCategoryModel: Model<ISubCategory> =
  mongoose.models.SubCategory ||
  mongoose.model<ISubCategory>("SubCategory", SubCategorySchema);

export default SubCategoryModel;
