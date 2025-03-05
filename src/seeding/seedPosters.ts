import dotenv from "dotenv";
dotenv.config();

import db from "../utils/db";
import PosterModel from "@/models/Posters/poster.schema";
import CategoryModel from "@/models/Category/category.schema";

async function seedPosters() {
  try {
    await db.connectDb();

    // Fetch categories for reference (these must be seeded first)
    const categories = await CategoryModel.find();

    if (categories.length === 0) {
      throw new Error("Categories not found. Please seed categories first.");
    }

    // Define category variables using the category identifier (e.g., slug)
    const superheroCategory = categories.find(
      (cat: any) => cat.slug === "superheroes"
    );
    const safariCategory = categories.find(
      (cat: any) => cat.slug === "african-safari"
    );
    const spaceCategory = categories.find((cat: any) => cat.slug === "space");

    // Clear existing posters in the collection
    await PosterModel.deleteMany({});

    // Seed Posters (transformed to match the Poster schema)
    const postersToSeed = await PosterModel.insertMany([
      {
        title: "Captain America Poster",
        description: "A dynamic pose of Captain America.",
        price: 19.99,
        imageUrl: "/images/captain-america.jpg",
        // Use reference to the category with slug "superheroes"
        categories: superheroCategory ? [superheroCategory._id] : [],
        tags: ["marvel", "superhero", "action"],
        variations: [
          {
            type: "Horizontal",
            imageUrl: "/images/captain-america-horizontal.jpg",
            sizes: [
              { size: "8x10", price: 10.99 },
              { size: "16x20", price: 19.99 },
            ],
          },
        ],
        reviews: [],
      },
      {
        title: "Cheetah in Action",
        description: "A breathtaking shot of a cheetah running.",
        price: 14.99,
        imageUrl: "/images/cheetah.jpg",
        categories: safariCategory ? [safariCategory._id] : [],
        tags: ["wildlife", "safari", "nature"],
        variations: [
          {
            type: "Vertical",
            imageUrl: "/images/cheetah-vertical.jpg",
            sizes: [
              { size: "8x10", price: 12.99 },
              { size: "16x20", price: 18.99 },
            ],
          },
        ],
        reviews: [],
      },
      {
        title: "Milky Way Galaxy",
        description: "A stunning view of the Milky Way.",
        price: 24.99,
        imageUrl: "/images/milky-way.jpg",
        categories: spaceCategory ? [spaceCategory._id] : [],
        tags: ["space", "galaxy", "stars"],
        variations: [
          {
            type: "Panoramic",
            imageUrl: "/images/milky-way-panoramic.jpg",
            sizes: [
              { size: "12x36", price: 29.99 },
              { size: "24x72", price: 49.99 },
            ],
          },
        ],
        reviews: [],
      },
    ]);

    console.log("Posters seeded:", postersToSeed);
  } catch (error) {
    console.error("Error seeding posters:", error);
  } finally {
    // In this seeding script, disconnect from the database after seeding
    await db.disconnectDb().then(() => process.exit(0));
  }
}

seedPosters();
