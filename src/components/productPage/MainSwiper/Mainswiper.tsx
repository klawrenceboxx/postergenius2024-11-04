"use client";

import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface MainSwiperProps {
  images: string[];
}

export default function MainSwiper({ images }: MainSwiperProps) {
  const [active, setActive] = useState<number>(0);

  if (!images || images.length === 0) {
    return <p className="text-center text-red-500">No images available</p>;
  }

  return (
    <div className="flex flex-col md:flex-row-reverse md:gap-6 w-full">
      {/* Main Image with Zoom */}
      <div className="flex-1 flex items-center justify-start">
        <Zoom>
          <img
            src={images[active]}
            alt={`Main product image`}
            className="rounded-xl shadow-lg max-h-[600px] object-contain w-full max-w-[90%] md:max-w-full transition-opacity duration-300 ease-in-out animate-fadeIn"
          />
        </Zoom>
      </div>

      {/* Thumbnail List */}
      <div className=" flex md:flex-col gap-4 mt-4 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-gray-400">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`w-20 h-20 sm:w-24 sm:h-24 border-2 rounded-lg overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-200 ${
              active === index ? "border-blue-500" : "border-gray-300"
            } `}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
