"use client";
import { useSession } from "next-auth/react";
import { MdFlashOn } from "react-icons/md";
import Countdown from "@/components/countdown";
import FlashCard from "./Card";
import { flashDealsArray } from "@/app/data/home";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const FlashDeals: React.FC = () => {
  return (
    <div className="bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-3xl font-bold flex items-center">
          FLASH SALE
          <MdFlashOn className="ml-2 text-yellow-500" />
        </h1>
        <Countdown />
      </div>
      <Swiper
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 2, spaceBetween: 15 },
          640: { slidesPerView: 3, spaceBetween: 20 },
          768: { slidesPerView: 4, spaceBetween: 25 },
          1024: { slidesPerView: 5, spaceBetween: 30 },
          1280: { slidesPerView: 6, spaceBetween: 35 },
        }}
        navigation={true}
        modules={[Navigation]}
        className="text-white"
      >
        {flashDealsArray.map((product, i) => (
          <SwiperSlide key={i}>
            <FlashCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FlashDeals;
