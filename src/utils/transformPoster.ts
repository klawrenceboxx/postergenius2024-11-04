// src/utils/transformPoster.ts

import { Types } from "mongoose";
import { IPoster } from "@/models/Posters/poster.interface";
import { ProductType } from "@/types/ProductType";

export function transformPosterToProduct(poster: IPoster): ProductType {
  const discount = poster.discount || 0;
  const salePrice = poster.salePrice ?? poster.price;
  const finalPrice = poster.price - (poster.price * discount) / 100;
  const savings = parseFloat((poster.price - finalPrice).toFixed(2));

  // Convert nested category object (if it exists) to a plain object
  let category = null;
  if (poster.category) {
    category = { ...poster.category } as any;
    if (category._id) {
      category._id =
        typeof category._id === "object"
          ? category._id.toString()
          : category._id;
    }
    if (category.parent) {
      category.parent = { ...category.parent };
      if (category.parent._id) {
        category.parent._id =
          typeof category.parent._id === "object"
            ? category.parent._id.toString()
            : category.parent._id;
      }
    }
  }

  return {
    ...poster,
    _id: poster._id?.toString() || "",
    salePrice,
    finalPrice,
    discount,
    savings,
    category,
  };
}
