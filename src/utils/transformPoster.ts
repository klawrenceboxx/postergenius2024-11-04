// src/utils/transformPoster.ts

import { IPoster } from "@/models/Posters/poster.interface";
import { ProductType } from "@/types/ProductType";

export function transformPosterToProduct(poster: IPoster): ProductType {
  const price = poster.price;
  const discount = poster.discount ?? 0;

  // If a manual sale price is set, use that over calculated discount
  const finalPrice = price - (price * discount) / 100;
  const displayPrice = poster.salePrice ?? parseFloat(finalPrice.toFixed(2));
  const savings = parseFloat((price - finalPrice).toFixed(2));

  return {
    _id: poster._id?.toString() ?? "",
    title: poster.title,
    description: poster.description,
    slug: poster.slug,
    price: poster.price,
    salePrice: poster.salePrice,
    finalPrice,
    savings,
    imageUrl: poster.imageUrl,
    mockups: poster.mockups ?? [],
    category: poster.category ?? null,
    tags: poster.tags ?? [],
    variations: poster.variations ?? [],
    reviews: poster.reviews ?? [],
    sku: poster.sku,
    sold: poster.sold,
    discount: poster.discount ?? 0,
  };
}
