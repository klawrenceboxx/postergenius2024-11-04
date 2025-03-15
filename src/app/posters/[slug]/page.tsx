// src/app/product/[slug]/page.tsx

interface PageProps {
  params: {
    slug: string;
  };
}

// Basic dynamic page
export default function Page({ params }: PageProps) {
  const { slug } = params;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Product Slug: {slug}</h1>
      <p>
        This is a placeholder for the product details page. You can fetch the
        poster/product from your DB here.
      </p>
    </div>
  );
}
