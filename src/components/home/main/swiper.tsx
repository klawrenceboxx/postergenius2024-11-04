"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const MainSwiper: React.FC = () => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="bg-gray-100 w-full h-full"
      >
        {[...Array(7).keys()].map((i) => (
          <SwiperSlide
            className="flex items-center justify-center bg-white text-lg text-gray-800"
            key={i}
          >
            <img
              className="w-full h-auto object-contain"
              src={`../../swiper/${i + 1}.png`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainSwiper;
