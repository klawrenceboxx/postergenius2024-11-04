import React from "react";

const Ad: React.FC = () => {
  return (
    <div className="w-full h-14 bg-gradient-to-r from-purple-500 via-yellow-500 to-blue-500 flex items-center justify-between px-4 sm:px-8">
      <div className="text-white font-bold text-sm sm:text-base">
        READY-TO-USE COUPONS{" "}
        <span className="text-yellow-300">SAVE $200 BONUS COUPON</span>
      </div>
      <a
        href="#"
        className="bg-white text-blue-500 font-semibold px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-grey-100"
      >
        Shop Now →
      </a>
    </div>
  );
};

export default Ad;
