export interface ProductType {
  _id: string;
  name: string;
  description: string;
  brand?: string;
  slug: string;
  category: string;
  subProducts: SubProductType[];
  details?: { name: string; value: string }[];
  questions?: { question: string; answer: string }[];
  refundPolicy?: string;
  return?: number;
  numReviews: number;
  shipping: number;
  sold: number;
  createdAt: string;
  updatedAt: string;
}

export interface SubProductType {
  _id: string;
  images: string[];
  color: string;
  colorImage?: string;
  sizes: { size: string; quantity: number; price: number }[];
  discount?: number;
}
