"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "@/components/home/main";
import FlashDeals from "@/components/home/flashDeals";
import CategorySection from "@/components/CategorySection";
import ProductCard from "@/components/ProductCard";
import { v4 as uuidv4 } from "uuid";

import { ProductType } from "@/types/ProductType";
import { CategoryType } from "@/types/CategoryType";

type CountryData = {
  name: string;
  region: string;
  city: string;
};

interface ClientHomeProps {
  serverSession?: any;
  serverCountry: CountryData;
  serverProducts: {
    _id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    categories: string[];
    tags?: string[];
    variations?: { type: string; imageUrl: string; sizes: any[] }[];
    reviews?: any[];
    __v: number;
  }[];
}

function adaptPosterToProductType(
  poster: ClientHomeProps["serverProducts"][0],
  categories: CategoryType[]
): ProductType {
  const matchedCategory = categories.find(
    (c) => c._id === poster.categories[0]
  );

  return {
    _id: poster._id,
    name: poster.title,
    slug: poster.title.toLowerCase().replace(/\s+/g, "-"),
    description: poster.description,
    category: matchedCategory || {
      _id: "",
      name: "Unknown Category",
      slug: "unknown-category",
      subcategories: [],
    },
    subProducts: poster.variations?.map((variation) => ({
      _id: `${poster._id}-${uuidv4()}`,
      sku: `SKU-${uuidv4()}`,
      color: variation.type,
      colorImage: variation.imageUrl,
      images: [variation.imageUrl],
      sizes: variation.sizes.map((size) => ({
        size: typeof size === "object" && size.size ? size.size : "One Size",
        quantity: 10,
        price:
          typeof size === "object" && size.price ? size.price : poster.price,
      })),
      discount: 0,
      sold: 0,
    })) || [
      {
        _id: `${poster._id}-default`,
        sku: `SKU-${Math.random().toString(36).substr(2, 9)}`,
        color: "Default",
        colorImage: "",
        images: [poster.imageUrl],
        sizes: [
          {
            size: "One Size",
            quantity: 10,
            price: poster.price,
          },
        ],
        discount: 0,
        sold: 0,
      },
    ],
    price: poster.price,
    priceBefore: poster.price,
    shipping: 0,
    rating: 0,
    numReviews: poster.reviews?.length || 0,
    sold: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export default function ClientHome({
  serverSession,
  serverCountry,
  serverProducts,
}: ClientHomeProps) {
  const { data: clientSession, status } = useSession();
  const session = clientSession || serverSession;

  const categoryList: CategoryType[] = [
    { _id: "1", name: "Superheroes", slug: "superheroes", subcategories: [] },
    {
      _id: "2",
      name: "African Safari",
      slug: "african-safari",
      subcategories: [],
    },
    { _id: "3", name: "Space", slug: "space", subcategories: [] },
  ];

  const adaptedProducts = serverProducts.map((poster) =>
    adaptPosterToProductType(poster, categoryList)
  );

  return (
    <div>
      <Header country={serverCountry} />
      <p className="text-lg font-semibold text-gray-700">
        Country: {serverCountry.name}
      </p>

      {status === "loading" ? (
        <p>Loading session...</p>
      ) : session ? (
        <>
          <p>You are logged in as {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}

      <Main />
      <FlashDeals />
      <CategorySection />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {adaptedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Footer country={serverCountry} />
    </div>
  );
}
