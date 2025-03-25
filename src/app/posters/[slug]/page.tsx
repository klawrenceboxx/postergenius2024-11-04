// src/app/product/[slug]/page.tsx
import { notFound } from "next/navigation";
import db from "@/utils/db";
import { PosterModel } from "@/models/Posters";
import { CategoryModel } from "@/models/Category";
import { isPopulatedCategory } from "@/models/Category/category.schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainSwiper from "@/components/productPage/MainSwiper/Mainswiper";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

// ✅ SEO Metadata for this page (App Router-friendly)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;

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

// ✅ Main Page Component
export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);

  // Connect to the DB and fetch poster data
  await db.connectDb();
  const poster = await PosterModel.findOne({ slug })
    .populate({
      path: "category",
      model: CategoryModel,
      populate: {
        path: "parent",
        model: CategoryModel,
      },
    })
    .lean();

  if (!poster) {
    notFound(); // Trigger Next.js 404 if no poster is found
  }

  console.log(poster);

  const { title, description, price, mockups } = poster;

  console.log(title);

  console.log(mockups);

  // const title = "Static Title for Testing";

  return (
    <>
      <Header />
      {/* Home / Posters / {poster.title} */}
      <div className="px-6 md:px-10 py-6 max-w-7xl mx-auto">
        {/* Breadcrumb */}

        <div className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span> / </span>{" "}
          {poster.category?.parent &&
            isPopulatedCategory(poster.category.parent) && (
              <>{poster.category.parent.name} / </>
            )}
          {poster.category.name} / {poster.title}
          {/* {poster.category?.parent?.name && (
            <>{poster.category.parent.name} / </>
          )}
          {poster.category.name} / {poster.title}{" "} */}
        </div>
        <div className="w-full">
          <MainSwiper images={mockups} />
        </div>
      </div>
      <Footer />
    </>
  );
}
