import { FC } from "react";
import { CategoryType } from "@/types/CategoryType";

interface CategoryCardProps {
  category: CategoryType;
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-bold">{category.name}</h3>
      <p className="text-sm text-gray-600">Explore {category.name} products</p>
    </div>
  );
};

export default CategoryCard;
