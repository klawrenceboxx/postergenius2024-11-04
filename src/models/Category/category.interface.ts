import { Types } from "mongoose";

// Interface for categories
export interface ICategory {
  name: string; // Name of the category (e.g., "Superheroes", "Nature")
  slug: string; // URL-friendly version of the name
}
