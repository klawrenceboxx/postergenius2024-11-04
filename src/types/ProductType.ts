//// filepath: /c:/Users/Kalee/Documents/postergenius2024-11-04/src/types/ProductType.ts
export interface ProductType {
  subcategories?: SubCategoryType[]; // Optional array for subcategories
  colors?: string[]; // Optional array of color strings
  price: number; // Specific price of the product
  priceBefore: number; // Previous or original price
  priceRange?: string | null; // Can be null if there’s no price range
  images?: string[]; // Optional array of image URLs
  _id: string; // Product ID

  name: string; // Product name/title
  description: string; // Description of the product
  brand?: string; // Optional brand name
  slug: string; // URL-friendly slug
  category: CategoryType; // Category info using CategoryType
  subProducts: SubProductType[]; // Array of sub-products
  sku?: string; // Optional SKU identifier
  details?: { name: string; value: string }[]; // Optional array of detail objects
  questions?: { question: string; answer: string }[]; // Optional Q&A array
  refundPolicy?: string; // Optional refund policy text
  return?: number; // Optional return policy field (could be days, etc.)
  numReviews: number; // Total number of reviews
  rating: number; // Average product rating
  shipping: number; // Shipping cost
  sold: number; // Number of units sold
  discount?: number; // Optional discount percentage
  createdAt: string; // Creation date string
  updatedAt: string; // Last updated date string
}

export interface SubProductType {
  _id: string; // Sub-product unique ID
  images: string[]; // Array of image URLs
  color: string; // Color name or code
  colorImage?: string; // Optional color swatch image URL
  sizes: { size: string; quantity: number; price: number }[]; // Array of size objects
  discount?: number; // Optional discount percentage
}

export interface CategoryType {
  _id: string; // Category ID
  name: string; // Category name
  slug: string; // URL-friendly category slug
}

export interface SubCategoryType {
  _id: string; // Subcategory ID
  name: string; // Subcategory name
  slug: string; // URL-friendly subcategory slug
  parentCategory: string; // Parent category ID for hierarchy
}
