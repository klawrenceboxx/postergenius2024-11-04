import React from "react";
import MainSwiper from "./swiper";
import Offers from "../offers";

const Main: React.FC = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-[40px_300px_300px] gap-4 w-full">
      {/* Left column (Menu) spans all three rows */}
      <div className="bg-red-50 col-start-1 col-end-2 row-start-1 row-end-4">
        menu
      </div>

      {/* Header (Top row, spanning last two columns) */}
      <div className="bg-orange-40 col-start-2 col-end-4 row-start-1 row-end-2">
        header
      </div>

      {/* Swiper (Second row, second column) */}
      <div className="bg-yellow-40 col-start-2 col-end-3 row-start-2 row-end-3">
        <MainSwiper />
      </div>

      {/* Offers (Third row, second column) */}
      <div className="bg-blue-50 col-start-2 col-end-3 row-start-3 row-end-4">
        <Offers />
      </div>

      {/* User (Right column, spanning second and third rows) */}
      <div className="bg-green-50 col-start-3 col-end-4 row-start-2 row-end-4">
        user
      </div>
    </div>
  );
};

export default Main;
