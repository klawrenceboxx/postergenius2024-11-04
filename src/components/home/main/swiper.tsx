"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full mx-0 cursor-pointer"
      >
        {[...Array(7).keys()].map((i) => (
          <SwiperSlide
            className="flex items-center justify-center bg-white text-lg text-gray-800"
            key={i}
          >
            <img
              className="block h-100 object-cover"
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
