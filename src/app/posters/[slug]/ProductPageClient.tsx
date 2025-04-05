"use client";

import { useState } from "react";
import React from "react";
import Infos from "@/components/productPage/infos/Infos";
import PosterMockupViewer from "@/components/productPage/MockupViewer/PosterMockupViewer";

export default function ProductPage({ product }: { product: any }) {
  const [selectedDimensions, setSelectedDimensions] = useState("12x18");
  const [activeMockupIndex, setActiveMockupIndex] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row w-full gap-8">
      <div className="flex-1 min-w-0 ">
        <PosterMockupViewer
          posterUrl={product.imageUrl}
          selectedDimensions={selectedDimensions}
          activeMockupIndex={activeMockupIndex}
          onMockupChange={setActiveMockupIndex}
        />
      </div>
      <div className="w-[360px] flex-shrink-0 flex">
        <Infos
          product={product}
          selectedDimensions={selectedDimensions}
          onDimensionsChange={setSelectedDimensions}
        />
      </div>
    </div>
  );
}
