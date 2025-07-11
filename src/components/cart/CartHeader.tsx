import React from "react";
import Ad from "@/components/Header/Ad";
import Top from "@/components/Header/Top";
import Main from "@/components/Header/Main";

const CartHeader: React.FC = () => {
  return (
    <header className="bg-white shadow">
      {/* Top Row: Ad with Cart Title and a Continue Shopping link */}
      <div className="">
        <div className="flex items-center">
          <Ad />
        </div>
      </div>

      {/* Middle Row: Optional Top Navigation (visible on md+) */}
      <div className="hidden md:block px-4 py-2">
        <Top />
      </div>

      {/* Bottom Row: Main Navigation */}
      <div className="px-4 py-2 border-t">
        <Main />
      </div>
    </header>
  );
};

export default CartHeader;
