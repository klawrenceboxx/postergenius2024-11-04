import dotenv from "dotenv";
dotenv.config();

import db from "../utils/db";
import PosterModel from "@/models/Posters/poster.schema";
import CategoryModel from "@/models/Category/category.schema";

async function seedCategories() {
  try {
    await db.connectDb();

    // Clear existing data
    await CategoryModel.deleteMany({});

    // // Seed Categories
    // const categories = await CategoryModel.insertMany([
    //   { name: "Superheroes", slug: "superheroes" },
    //   { name: "African Safari", slug: "african-safari" },
    //   { name: "Space", slug: "space" },
    // ]);

    // Create parent and child categories

    // For Superheroes
    const marvel = await CategoryModel.create({
      name: "Marvel",
      slug: "marvel",
    });
    const superheroes = await CategoryModel.create({
      name: "Superheroes",
      slug: "superheroes",
      parent: marvel._id,
    });

    // For African Safari
    const wildlife = await CategoryModel.create({
      name: "Wildlife",
      slug: "wildlife",
    });
    const africanSafari = await CategoryModel.create({
      name: "African Safari",
      slug: "african-safari",
      parent: wildlife._id,
    });

    // For Space
    const universe = await CategoryModel.create({
      name: "Universe",
      slug: "universe",
    });
    const space = await CategoryModel.create({
      name: "Space",
      slug: "space",
      parent: universe._id,
    });

    console.log("Categories seeded:", {
      marvel,
      superheroes,
      wildlife,
      africanSafari,
      universe,
      space,
    });
    return { marvel, superheroes, wildlife, africanSafari, universe, space };
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    process.exit();
  }
}

seedCategories();
