import { Types } from "mongoose";

// Interface for categories
export interface ICategory {
  _id?: Types.ObjectId; // Optional for compatibility when creating or referencing
  name: string; // Name of the category (e.g., "Superheroes", "Nature")
  slug: string; // URL-friendly version of the name
  parent?: Types.ObjectId | ICategory | null;
}
