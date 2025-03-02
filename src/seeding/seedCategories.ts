import db from "../utils/db";
import Category from "@/models/Category/category.schema";

async function seedCategories() {
  try {
    await db.connectDb();

    // Clear existing data
    await Category.deleteMany({});

    // Seed Categories
    const categories = await Category.insertMany([
      { name: "Superheroes", slug: "superheroes" },
      { name: "African Safari", slug: "african-safari" },
      { name: "Space", slug: "space" },
    ]);

    console.log("Categories seeded:", categories);
    return categories; // Return for use in other scripts if needed
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    process.exit();
  }
}

seedCategories();
