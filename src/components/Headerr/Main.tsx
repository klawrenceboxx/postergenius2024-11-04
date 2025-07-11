"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RiSearch2Line } from "react-icons/ri";
import { FaOpencart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store"; // if you have this

const Main: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-gray-100 py-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo Section */}
        <Link className="flex items-center space-x-2" href="/">
          <Image
            src="/logo.png" // Ensure this matches the actual path to your logo
            alt="PosterGenius Logo"
            width={30} // Adjust to fit your design
            height={30} // Adjust to fit your design
            className="rounded-lg" // Rounded edges without a full circle
          />
          <span className="text-2xl font-bold text-black font-poppins">
            PosterGenius
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 cursor-pointer">
              <RiSearch2Line size={20} />
            </div>
          </div>
        </div>

        {/* Cart Icon */}
        <Link
          className="relative flex items-center text-gray-700 hover:text-blue-600"
          href="/cart"
        >
          <FaOpencart size={24} />
          <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Main;
