import dotenv from "dotenv";
dotenv.config();

import db from "../utils/db";
import PosterModel from "@/models/Posters/poster.schema";
import CategoryModel from "@/models/Category/category.schema";

// ✅ Define Standard Sizes & basePrices
const SIZE_OPTIONS = [
  { size: "12x18", price: 29.99 },
  { size: "18x24", price: 39.99 },
  { size: "24x36", price: 49.99 },
];

// Hard-coded user ObjectId for placeholder reviews (replace with real user id as needed)
const placeholderUserId = "678e9cd167805dc4b130bfb7";

async function seedPosters() {
  try {
    await db.connectDb();

    // Fetch categories for reference (these must be seeded first)
    const categories = await CategoryModel.find();
    if (categories.length === 0) {
      throw new Error("Categories not found. Please seed categories first.");
    }

    // Define category variables from the child categories (that will be used on posters)
    const superheroCategory = categories.find(
      (cat: any) => cat.slug === "superheroes"
    );
    const safariCategory = categories.find(
      (cat: any) => cat.slug === "african-safari"
    );
    const spaceCategory = categories.find((cat: any) => cat.slug === "space");

    // Clear existing posters in the collection
    await PosterModel.deleteMany({});

    // Function to generate slug
    const generateSlug = (title: string, tags: string[], sku: string) => {
      const formattedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const formattedTags = tags
        .map((tag) => tag.toLowerCase().replace(/[^a-z0-9]+/g, "-"))
        .join("-");
      return `${formattedTitle}-${formattedTags}-${sku}`;
    };

    // Posters to Seed
    const postersToSeed = await PosterModel.insertMany([
      {
        title: "Thor Poster",
        description: "A dynamic pose of Thor, God of Thunder.",
        price: 39.99,
        salePrice: 39.99, // If no discount, salePrice can equal price
        imageUrl:
          "https://storage.googleapis.com/digital_posters/kincaid1207_Thor_hammer_raised_summons_a_storm_lightning_crac_fcedce18-9702-4387-a06a-8d6c7662d50a_0-topaz-standard%20v2-900w.jpeg",
        category: superheroCategory ? superheroCategory._id : null,
        tags: ["marvel", "superhero", "action"],
        sku: "SUPR-THOR-BLUEWHT-01",
        slug: generateSlug(
          "Thor Poster",
          ["marvel", "superhero", "action"],
          "SUPR-THOR-BLUEWHT-01"
        ),
        variations: [
          {
            type: "Horizontal",
            imageUrl:
              "https://storage.googleapis.com/digital_posters/kincaid1207_Thor_hammer_raised_summons_a_storm_lightning_crac_fcedce18-9702-4387-a06a-8d6c7662d50a_0-topaz-standard%20v2-900w.jpeg",
            sizes: SIZE_OPTIONS,
          },
        ],
        reviews: [
          {
            reviewBy: placeholderUserId,
            rating: 4,
            reviewText: "Amazing poster!",
          },
        ],
        // New fields may be added here as needed, for example:
        sold: 0,
        discount: 0,
        // MOCKUPS for Thor Poster
        mockups: [
          "https://storage.googleapis.com/digital_posters/Thor%20Mockups/kincaid1207_Thor_hammer_raised_summons_a_storm_lightning_crac_fcedce18-9702-4387-a06a-8d6c7662d50a_0-topaz-standard%20v2-900w_mkp3.jpg",
          "https://storage.googleapis.com/digital_posters/Thor%20Mockups/kincaid1207_Thor_hammer_raised_summons_a_storm_lightning_crac_fcedce18-9702-4387-a06a-8d6c7662d50a_0-topaz-standard%20v2-900w_mkp5.jpg",
          "https://storage.googleapis.com/digital_posters/Thor%20Mockups/kincaid1207_Thor_hammer_raised_summons_a_storm_lightning_crac_fcedce18-9702-4387-a06a-8d6c7662d50a_0-topaz-standard%20v2-900w_mkp7.jpg",
        ],
      },
      {
        title: "African Sunset",
        description:
          "A breathtaking painting of an African Elephant at sunset.",
        price: 39.99,
        salePrice: 39.99,
        imageUrl:
          "https://storage.googleapis.com/digital_posters/kincaid1207_A_silhouette_of_an_elephant_stands_against_a_suns_6ccd0e35-a9f6-4c36-bb13-97ed9ac6cb21_2-topaz-standard%20v2-900w.jpeg",
        category: safariCategory ? safariCategory._id : null,
        tags: ["wildlife", "safari", "nature"],
        sku: "SAFR-ELEPH-REDORG-01",
        slug: generateSlug(
          "African Sunset",
          ["wildlife", "safari", "nature"],
          "SAFR-ELEPH-REDORG-01"
        ),
        variations: [
          {
            type: "Vertical",
            imageUrl:
              "https://storage.googleapis.com/digital_posters/kincaid1207_A_silhouette_of_an_elephant_stands_against_a_suns_6ccd0e35-a9f6-4c36-bb13-97ed9ac6cb21_2-topaz-standard%20v2-900w.jpeg",
          },
        ],
        reviews: [
          {
            reviewBy: placeholderUserId,
            rating: 5,
            reviewText: "Stunning artwork!",
          },
        ],
        sold: 0,
        discount: 0,
        // MOCKUPS for African Sunset
        mockups: [
          "https://storage.googleapis.com/digital_posters/Elephant%20Mockups/kincaid1207_A_silhouette_of_an_elephant_stands_against_a_suns_6ccd0e35-a9f6-4c36-bb13-97ed9ac6cb21_2-topaz-standard%20v2-900w_mkp3.jpg",
          "https://storage.googleapis.com/digital_posters/Elephant%20Mockups/kincaid1207_A_silhouette_of_an_elephant_stands_against_a_suns_6ccd0e35-a9f6-4c36-bb13-97ed9ac6cb21_2-topaz-standard%20v2-900w_mkp5.jpg",
          "https://storage.googleapis.com/digital_posters/Elephant%20Mockups/kincaid1207_A_silhouette_of_an_elephant_stands_against_a_suns_6ccd0e35-a9f6-4c36-bb13-97ed9ac6cb21_2-topaz-standard%20v2-900w_mkp7.jpg",
        ],
      },
      {
        title: "Milky Way Galaxy",
        description: "A stunning view of the Milky Way.",
        price: 49.99,
        salePrice: 49.99,
        imageUrl:
          "https://storage.googleapis.com/digital_posters/kincaid1207_A_region_of_space_where_new_stars_are_born_bursti_28cb603b-df78-4959-836a-e4f764e127d3_1-topaz-low%20resolution%20v2-900w.jpeg",
        category: spaceCategory ? spaceCategory._id : null,
        tags: ["space", "galaxy", "stars"],
        sku: "SPCE-MILKY-BLACKPUR-01",
        slug: generateSlug(
          "Milky Way Galaxy",
          ["space", "galaxy", "stars"],
          "SPCE-MILKY-BLACKPUR-01"
        ),
        variations: [
          {
            type: "Panoramic",
            imageUrl:
              "https://storage.googleapis.com/digital_posters/kincaid1207_A_region_of_space_where_new_stars_are_born_bursti_28cb603b-df78-4959-836a-e4f764e127d3_1-topaz-low%20resolution%20v2-900w.jpeg",
            sizes: SIZE_OPTIONS,
          },
        ],
        reviews: [
          {
            reviewBy: placeholderUserId,
            rating: 3,
            reviewText: "Good view but could improve in color.",
          },
        ],
        sold: 0,
        discount: 0,
        // MOCKUPS for Milky Way Galaxy
        mockups: [
          "https://storage.googleapis.com/digital_posters/Space%20Mockups/kincaid1207_A_region_of_space_where_new_stars_are_born_bursti_28cb603b-df78-4959-836a-e4f764e127d3_1-topaz-low%20resolution%20v2-900w_mkp3.jpg",
          "https://storage.googleapis.com/digital_posters/Space%20Mockups/kincaid1207_A_region_of_space_where_new_stars_are_born_bursti_28cb603b-df78-4959-836a-e4f764e127d3_1-topaz-low%20resolution%20v2-900w_mkp5.jpg",
          "https://storage.googleapis.com/digital_posters/Space%20Mockups/kincaid1207_A_region_of_space_where_new_stars_are_born_bursti_28cb603b-df78-4959-836a-e4f764e127d3_1-topaz-low%20resolution%20v2-900w_mkp7.jpg",
        ],
      },
    ]);

    console.log("Posters seeded:", postersToSeed);
  } catch (error) {
    console.error("Error seeding posters:", error);
  } finally {
    await db.disconnectDb().then(() => process.exit(0));
  }
}

seedPosters();
