import React from "react";
import MainSwiper from "./swiper";
import Offers from "./offers";
import Menu from "./Menu";
import User from "./User";
import Header from "./Header";

const Main: React.FC = () => {
  return (
    <div className="p-4 grid grid-cols-[20%_60%_20%] grid-rows-[40px_400px_300px] gap-4 w-full h-auto ">
      {/* Left column (Menu) spans all three rows */}
      <div className="col-start-1 col-end-2 row-start-1 row-end-3 rounded-xl shadow">
        <Menu />
      </div>

      {/* Header (Top row, spanning last two columns) */}
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 shadow">
        <Header />
      </div>

      {/* Swiper (Second row, second column) */}
      <div className="col-start-2 col-end-3 w-full shadow rounded-xl overflow-hidden">
        <MainSwiper />
      </div>

      {/* Offers (Third row, second column) */}
      <div className="col-start-2 col-end-3 row-start-3 row-end-4 shadow rounded-xl overflow-hidden">
        <Offers />
      </div>

      {/* User (Right column, spanning second and third rows) */}
      <div className="col-start-3 col-end-4 row-start-2 row-end-4 rounded-xl shadow">
        <User />
      </div>
    </div>
  );
};

export default Main;
