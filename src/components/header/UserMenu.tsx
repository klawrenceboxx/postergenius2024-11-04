// userMenu.js

import React from "react";
import Link from "next/link";
import Image from "next/image";

interface UserMenuProps {
  loggedIn: boolean;
}

const UserMenu: React.FC<UserMenuProps> = ({ loggedIn }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-md w-64">
      <h4 className="text-lg font-semibold mb-4 text-gray-700">
        Welcome to Shoppay!
      </h4>

      {loggedIn ? (
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src="/profile.jpg"
            alt="Profile Image"
            width={60} // adjust to fit your design
            height={60} // adjust to fit your design
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">Welcome Back,</span>
            <h3 className="text-lg font-bold text-gray-800">Kaleel</h3>
            <button className="text-blue-600 mt-2 text-sm">Sign Out</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between mb-4 space-x-2">
          <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
            Register
          </button>
          <button className="bg-gray-200 px-4 py-1 rounded text-gray-700 hover:bg-gray-300">
            Login
          </button>
        </div>
      )}

      <ul className="text-gray-800 text-sm space-y-2">
        <li>
          <Link href="/profile" className="hover:text-blue-600">
            Account
          </Link>
        </li>
        <li>
          <Link href="/profile/orders" className="hover:text-blue-600">
            My Orders
          </Link>
        </li>
        <li>
          <Link href="/profile/messages" className="hover:text-blue-600">
            Message Center
          </Link>
        </li>
        <li>
          <Link href="/profile/address" className="hover:text-blue-600">
            Address
          </Link>
        </li>
        <li>
          <Link href="/profile/wishlist" className="hover:text-blue-600">
            Wishlist
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
