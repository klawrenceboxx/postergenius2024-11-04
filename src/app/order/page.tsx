import React from "react";
import Header from "@/components/Header";
import footer from "@/components/Footer";

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
