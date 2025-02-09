import { FC } from "react";
import categories from "@/app/data/categories.json";
import { CategoryType } from "@/types/CategoryType";
import CategoryCard from "../CategoryCard";

const CategorySection: FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {categories.map((category: CategoryType) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </section>
  );
};

export default CategorySection;
