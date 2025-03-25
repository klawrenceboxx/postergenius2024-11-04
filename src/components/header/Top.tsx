"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { MdSecurity } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { RiAccountCircleLine, RiArrowDropDownLine } from "react-icons/ri";
import UserMenu from "./UserMenu"; // Import the UserMenu component
import { CountryData } from "@/types/CountryData";
import { useSession } from "next-auth/react";

type HeaderProps = {
  country?: CountryData;
};

const Top: React.FC<HeaderProps> = ({ country }) => {
  const { data: session, status } = useSession();
  const [visible, setVisible] = useState(false); // State to control menu visibility

  return (
    <div className="bg-gray-100 py-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-sm font-semibold text-gray-600">
          {/* {country.name} / CAD */}
          Canada / CAD
        </div>
        <ul className="flex items-center space-x-6 text-gray-600 text-sm font-semibold">
          {/* These items will be hidden on small screens */}
          <li className="hidden md:flex items-center gap-1 cursor-pointer hover:text-gray-800">
            <MdSecurity className="text-xl" />
            <span>Buyer Protection</span>
          </li>
          <li className="hidden md:block cursor-pointer hover:text-gray-800">
            <span>Customer Service</span>
          </li>
          <li className="hidden md:block cursor-pointer hover:text-gray-800">
            <span>Help</span>
          </li>
          <li className="flex items-center gap-1 cursor-pointer hover:text-gray-800">
            <FaRegHeart className="text-xl" />
            <span>Wishlist</span>
          </li>
          <li
            className="cursor-pointer hover:text-gray-800 relative"
            onMouseEnter={() => setVisible(true)} // Show menu on hover
            onMouseLeave={() => setVisible(false)} // Hide menu when mouse leaves
          >
            <div className="flex items-center gap-1">
              {session ? (
                <>
                  <img
                    src={session.user?.image || "/default-profile.png"}
                    alt={`${session.user?.name || "User"}'s profile`}
                    width={20} // adjust to fit your design
                    height={20} // adjust to fit your design
                    className="rounded-full"
                  />
                  <span>{session.user?.name || "Account"}</span>
                </>
              ) : (
                <>
                  <RiAccountCircleLine className="text-xl" />
                  <span>Account</span>
                </>
              )}

              <RiArrowDropDownLine className="text-xl" />
            </div>
            {visible && (
              <div
                className="absolute top-full right-0 mt-0 z-10 bg-white shadow-lg rounded-md"
                onMouseEnter={() => setVisible(true)} // Keep the menu visible
                onMouseLeave={() => setVisible(false)} // Hide the menu when mouse leaves>
              >
                <UserMenu session={session} />
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
