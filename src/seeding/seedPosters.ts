// import db from "../utils/db";
// import Poster from "@/models/Posters/poster.schema";
// import Category from "@/models/Category/category.schema";

// async function seedPosters() {
//   try {
//     await db.connectDb();

//     // Fetch categories for reference
//     const categories = await Category.find();

//     if (categories.length === 0) {
//       throw new Error("Categories not found. Seed categories first.");
//     }

//     // Clear existing data
//     await Poster.deleteMany({});

//     // Seed Posters
//     const posters = await Poster.insertMany([
//       {
//         title: "Captain America Poster",
//         description: "A dynamic pose of Captain America.",
//         price: 19.99,
//         imageUrl: "/images/captain-america.jpg",
//         categories: [categories.find((c) => c.slug === "superheroes")?._id],
//         tags: ["marvel", "superhero", "action"],
//         variations: [
//           {
//             type: "Horizontal",
//             imageUrl: "/images/captain-america-horizontal.jpg",
//             sizes: [
//               { size: "8x10", price: 10.99 },
//               { size: "16x20", price: 19.99 },
//             ],
//           },
//         ],
//       },
//       {
//         title: "Cheetah in Action",
//         description: "A breathtaking shot of a cheetah running.",
//         price: 14.99,
//         imageUrl: "/images/cheetah.jpg",
//         categories: [categories.find((c) => c.slug === "african-safari")?._id],
//         tags: ["wildlife", "safari", "nature"],
//         variations: [
//           {
//             type: "Vertical",
//             imageUrl: "/images/cheetah-vertical.jpg",
//             sizes: [
//               { size: "8x10", price: 12.99 },
//               { size: "16x20", price: 18.99 },
//             ],
//           },
//         ],
//       },
//       {
//         title: "Milky Way Galaxy",
//         description: "A stunning view of the Milky Way.",
//         price: 24.99,
//         imageUrl: "/images/milky-way.jpg",
//         categories: [categories.find((c) => c.slug === "space")?._id],
//         tags: ["space", "galaxy", "stars"],
//         variations: [
//           {
//             type: "Panoramic",
//             imageUrl: "/images/milky-way-panoramic.jpg",
//             sizes: [
//               { size: "12x36", price: 29.99 },
//               { size: "24x72", price: 49.99 },
//             ],
//           },
//         ],
//       },
//     ]);

//     console.log("Posters seeded:", posters);
//   } catch (error) {
//     console.error("Error seeding posters:", error);
//   } finally {
//     process.exit();
//   }
// }

// seedPosters();
