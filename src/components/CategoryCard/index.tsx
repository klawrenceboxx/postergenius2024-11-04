import { FC } from "react";
import { CategoryType } from "@/types/CategoryType";
import Image from "next/image";
import Link from "next/link";
import products2 from "@/app/data/products2.json";

interface CategoryCardProps {
  category: CategoryType;
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  // Convert both product category and category.slug to lowercase before comparing.
  const filteredProducts = products2
    .filter(
      (product) =>
        product.category.toLowerCase() === category.slug.toLowerCase()
    )
    .slice(0, 4); // Cap the number of images at 4
  return (
    <div className="bg-white shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold">{category.name}</h3>
      <p className="text-sm text-gray-600">Explore {category.name} products</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden shadow-md border border-gray-200 shadow-lg"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={250}
              height={350}
              className="rounded-sm shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
