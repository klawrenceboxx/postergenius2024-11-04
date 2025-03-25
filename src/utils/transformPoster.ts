// src/utils/transformPoster.ts

import { Types } from "mongoose";
import { IPoster } from "@/models/Posters/poster.interface";
import { ProductType } from "@/types/ProductType";

export function transformPosterToProduct(poster: IPoster): ProductType {
  const discount = poster.discount || 0;
  // If no salePrice is provided, default to poster.price
  const salePrice = poster.salePrice ?? poster.price;
  const finalPrice = poster.price - (poster.price * discount) / 100;
  const savings = parseFloat((poster.price - finalPrice).toFixed(2));

  return {
    ...poster,
    salePrice,
    finalPrice,
    discount,
    // Optionally add computed savings if your ProductType requires it
    savings,
  };
}
