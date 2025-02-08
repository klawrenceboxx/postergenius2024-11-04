"use client";

import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

interface ProductSwiperProps {
  images: { url: string }[];
}

export default function ProductSwiper({ images }: ProductSwiperProps) {
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, []);

  return (
    <div
      className="relative w-[90px] h-[500px] cursor-pointer"
      onMouseEnter={() => swiperRef.current?.swiper.autoplay.start()}
      onMouseLeave={() => swiperRef.current?.swiper.slideTo(0)}
    >
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        centeredSlides={true}
        autoplay={{ delay: 500, disableOnInteraction: false }}
        speed={500}
        className="w-full h-full"
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={`Product image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No Image</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}
