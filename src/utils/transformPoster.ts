// src/utils/transformPoster.ts

import { IPoster } from "@/models/Posters/poster.interface";
import { ProductType } from "@/types/ProductType";

export function transformPosterToProduct(poster: IPoster): ProductType {
  const discount = poster.discount || 0;
  const salePrice = poster.salePrice ?? poster.price;
  const finalPrice = poster.price - (poster.price * discount) / 100;
  const savings = parseFloat((poster.price - finalPrice).toFixed(2));

  // Convert category into a plain object with _id as string
  let category = null;
  if (poster.category) {
    category = { ...poster.category } as any;
    if (category._id) {
      category._id = category._id.toString();
    }
    if (category.parent) {
      category.parent = { ...category.parent };
      if (category.parent._id) {
        category.parent._id = category.parent._id.toString();
      }
    }
  }

  // Convert variations
  let variations = undefined;
  if (poster.variations) {
    variations = poster.variations.map((variation) => ({
      type: variation.type,
      imageUrl: variation.imageUrl,
      // We only include the properties defined in IVariation.sizes (no _id)
      sizes: variation.sizes.map((size) => ({
        size: size.size,
        price: size.price,
      })),
    }));
  }

  // Convert reviews: change ObjectId fields to strings.
  // (If your client code expects plain objects, this conversion is necessary.)
  let reviews = undefined;
  if (poster.reviews) {
    reviews = poster.reviews.map((review) => ({
      // Convert reviewBy (an ObjectId) to a string.
      reviewBy: review.reviewBy ? review.reviewBy.toString() : "",
      rating: review.rating,
      reviewText: review.reviewText,
      images: review.images,
      likes: review.likes,
    }));
  }

  // Build the transformed product.
  const transformed = {
    ...poster,
    _id: poster._id ? poster._id.toString() : "",
    salePrice,
    finalPrice,
    discount,
    savings,
    category,
    variations,
    reviews,
  };

  // Ensure we return a plain object.
  return JSON.parse(JSON.stringify(transformed));
}
