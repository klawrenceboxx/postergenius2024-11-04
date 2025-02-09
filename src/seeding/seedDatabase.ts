import db from "../utils/db";
import CategoryModel from "../models/Category/category.schema";
import PosterModel from "../models/Posters/poster.schema";

async function seedDatabase() {
  try {
    console.log("Connecting to the database...");
    await db.connectDb();

    console.log("Clearing existing data...");
    await CategoryModel.deleteMany({});
    await PosterModel.deleteMany({});

    console.log("Seeding categories...");
    const categories = await CategoryModel.insertMany([
      { name: "Superheroes", slug: "superheroes" },
      { name: "African Safari", slug: "african-safari" },
      { name: "Space", slug: "space" },
    ]);
    console.log("Categories seeded successfully:", categories);

    console.log("Seeding posters...");
    const posters = await PosterModel.insertMany([
      {
        title: "Captain America Poster",
        description: "A dynamic pose of Captain America.",
        price: 19.99,
        imageUrl: "/images/captain-america.jpg",
        categories: [categories[0]._id],
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
      },
      {
        title: "Cheetah in Action",
        description: "A breathtaking shot of a cheetah running.",
        price: 14.99,
        imageUrl: "/images/cheetah.jpg",
        categories: [categories[1]._id],
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
      },
      {
        title: "Milky Way Galaxy",
        description: "A stunning view of the Milky Way.",
        price: 24.99,
        imageUrl: "/images/milky-way.jpg",
        categories: [categories[2]._id],
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
      },
    ]);
    console.log("Posters seeded successfully:", posters);

    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error during database seeding:", error);
  } finally {
    await db.disconnectDb();
    process.exit(0);
  }
}

seedDatabase();
