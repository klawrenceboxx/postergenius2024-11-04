// src/app/product/[slug]/page.tsx
import { notFound } from "next/navigation";
import db from "@/utils/db";
import { PosterModel } from "@/models/Posters";
import { CategoryModel } from "@/models/Category";
import { isPopulatedCategory } from "@/models/Category/category.schema";
import Header from "@/components/Headerr";
import Footer from "@/components/Footerr";
import Link from "next/link";
import { transformPosterToProduct } from "@/utils/transformPoster";
import PosterMockupViewer from "@/components/productPage/MockupViewer/PosterMockupViewer";
import Infos from "@/components/productPage/infos/Infos";
import ProductPageClient from "./ProductPageClient";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  await db.connectDb();
  const poster = await PosterModel.findOne({ slug }).lean();
  if (!poster) {
    return {
      title: "Poster Not Found",
      description: "We couldn't find the poster you're looking for.",
    };
  }
  return {
    title: poster.title,
    description: poster.description,
    openGraph: {
      title: poster.title,
      description: poster.description,
      type: "website",
      url: `https://yourdomain.com/product/${slug}`,
      images: [
        {
          url: poster.imageUrl || poster.mockups?.[0] || "",
          width: 800,
          height: 600,
          alt: poster.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: poster.title,
      description: poster.description,
      images: [poster.imageUrl || poster.mockups?.[0] || ""],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  await db.connectDb();
  const poster = await PosterModel.findOne({ slug })
    .populate({
      path: "category",
      model: CategoryModel,
      populate: { path: "parent", model: CategoryModel },
    })
    .lean();
  if (!poster) {
    notFound();
  }
  const product = transformPosterToProduct(poster);

  // Render a client wrapper for interactivity.
  return (
    <>
      <Header />
      <div className="bg-white px-4 md:px-4 py-6 mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span> / </span>{" "}
          {isPopulatedCategory(poster.category) &&
            poster.category.parent &&
            isPopulatedCategory(poster.category.parent) && (
              <>{poster.category.parent.name} / </>
            )}
          {isPopulatedCategory(poster.category) && poster.category.name} /{" "}
          {poster.title}
        </div>
        {/* ProductPage Client Wrapper defined inline */}
        <ProductPageClient product={product} />
      </div>
      <Footer />
    </>
  );
}
