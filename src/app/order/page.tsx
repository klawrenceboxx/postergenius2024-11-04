import React from "react";
import Header from "@/components/Headerr";
import footer from "@/components/Footerr";

function page() {
  return (
    <div className="container mx-auto mt-4">
      page
      <Header />
      <h1 className="text-2xl font-bold">Order Page</h1>
      <p>Details about the order will go here.</p>
    </div>
  );
}

export default page;
