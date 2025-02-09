import Head from "next/head";
import { GetServerSideProps } from "next";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ParsedUrlQuery } from "querystring";
import { ProductType } from "@/types/ProductType";
import { Key } from "react";
import { CategoryType } from "@/types/CategoryType";

interface ProductPageProps {
  product: ProductType & { category: CategoryType };
}

interface ContextQuery extends ParsedUrlQuery {
  slug: string;
  style?: string;
  size?: string;
}

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return (
      <p className="text-center text-red-500 font-semibold">
        Product not found
      </p>
    );
  }

  return (
    <div>
      {/* Metadata */}
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Head>

      {/* Header */}
      <Header country={{ name: "Test Country" }} />

      {/* Main Product Container */}
      <div className="container mx-auto px-4 py-6 min-h-screen">
        {/* Breadcrumb Path */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="hover:text-gray-800 cursor-pointer">Home</span> &gt;{" "}
          <span className="hover:text-gray-800 cursor-pointer">
            {product.category?.name}
          </span>{" "}
          &gt;{" "}
          {product.subcategories?.map(
            (subcategory: any, index: Key | null | undefined) => (
              <span key={index} className="hover:text-gray-800 cursor-pointer">
                {subcategory.name}
                {typeof index === "number" &&
                  index < product.subcategories.length - 1 &&
                  " > "}
              </span>
            )
          )}
        </div>

        {/* Product Details */}
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{product.description}</p>

        {/* Product Images */}
        <div className="flex gap-4 mt-6 overflow-x-auto">
          {product.images.map(
            (image: string | undefined, index: Key | null | undefined) => (
              <img
                key={index}
                src={image}
                alt={`${product.name} - Image ${Number(index) + 1}`}
                className="rounded-lg shadow-md w-48 h-48 object-cover"
              />
            )
          )}
        </div>

        {/* Product Information */}
        <div className="mt-6">
          <p className="text-xl font-semibold">
            Price Range: {product.priceRange || `$${product.price}`}
          </p>
          <p className="text-lg mt-2">Available Colors:</p>
          <div className="flex gap-2 mt-2">
            {product.colors.map((color: any, index: Key | null | undefined) => (
              <span
                key={index}
                className="w-6 h-6 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer country={{ name: "Test Country" }} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug, style = "0", size = "0" } = context.query as ContextQuery;

  await db.connectDb();

  const product = await Product.findOne({ slug })
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "subcategories",
      model: SubCategory,
    })
    .lean();
  await db.disconnectDb();

  if (!product) {
    return { notFound: true };
  }

  const subProduct = product.subProducts[+style];
  const prices = subProduct.sizes
    .map((size) => size.price)
    .sort((a, b) => a - b);

  const enhancedProduct = {
    ...product,
    images: subProduct.images,
    colors: product.subProducts.map((sp) => sp.color),
    price: subProduct.sizes[+size]?.price || prices[0],
    priceRange:
      prices.length > 1
        ? `$${prices[0]} - $${prices[prices.length - 1]}`
        : null,
    discount: subProduct.discount,
  };

  return {
    props: { product: JSON.parse(JSON.stringify(enhancedProduct)) },
  };
};
