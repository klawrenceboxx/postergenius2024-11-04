export interface SubCategoryType {
  _id: string; // Unique identifier for the subcategory
  name: string; // Name of the subcategory
  slug: string; // Slug for URL generation
}

export interface CategoryType {
  _id: string; // Unique identifier for the category
  name: string; // Name of the category
  slug: string; // Slug for URL generation
  subcategories: SubCategoryType[]; // Array of subcategories
}
