import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface MainSwiperProps {
  images: { url: string; public_id: string }[];
}

export default function MainSwiper({ images }: MainSwiperProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!images || images.length === 0) {
    return <p className="text-center text-red-500">No images available</p>;
  }

  return (
    <div className="flex flex-col md:flex-row md:gap-4">
      {/* Main Image with Zoom */}
      <div className="relative md:w-2/3 flex items-center justify-center">
        <Zoom>
          <img
            src={images[activeIndex]?.url || ""}
            alt={`Main product image`}
            className="rounded-lg shadow-md max-h-[500px] object-cover"
          />
        </Zoom>
      </div>

      {/* Thumbnail List */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-1/3">
        {images.map((image, index) => (
          <button
            key={image.public_id}
            onClick={() => setActiveIndex(index)}
            className={`w-24 h-24 flex-shrink-0 border ${
              activeIndex === index ? "border-blue-500" : "border-gray-300"
            } rounded-lg overflow-hidden`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
