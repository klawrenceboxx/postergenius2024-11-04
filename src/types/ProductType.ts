export interface ProductType {
  subcategories: SubCategoryType[]; // Updated to use a typed array for subcategories
  colors: string[]; // Assuming colors are strings representing color codes
  price: number; // The specific price of the product
  priceRange: string | null; // Can be null if there’s no price range
  images: string[]; // Updated to be a string array for image URLs
  _id: string;
  name: string;
  description: string;
  brand?: string;
  slug: string;
  category: CategoryType; // Updated to use the CategoryType for category
  subProducts: SubProductType[];
  sku?: string; // Added sku property (optional in case some products don’t have it)
  details?: { name: string; value: string }[];
  questions?: { question: string; answer: string }[];
  refundPolicy?: string;
  return?: number;
  numReviews: number; // Total number of reviews
  rating: number; // Added a field for average product rating
  shipping: number; // Shipping cost
  sold: number; // Number of units sold
  discount?: number; // Optional discount percentage
  createdAt: string;
  updatedAt: string;
}

export interface SubProductType {
  _id: string;
  images: string[]; // Array of image URLs
  color: string; // Color name or code
  colorImage?: string; // Optional image URL for the color swatch
  sizes: { size: string; quantity: number; price: number }[]; // Array of sizes with quantity and price
  discount?: number; // Optional discount percentage
}

export interface CategoryType {
  _id: string;
  name: string; // Category name
  slug: string; // Category slug for URL
}

export interface SubCategoryType {
  _id: string;
  name: string; // Subcategory name
  slug: string; // Subcategory slug for URL
  parentCategory: string; // Parent category ID
}
