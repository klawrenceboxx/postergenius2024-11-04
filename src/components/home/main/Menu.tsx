import React from "react";
import { BiCategory } from "react-icons/bi";
import { menuArray } from "@/app/data/home";
import Link from "next/link";

const Menu: React.FC = () => {
  return (
    <div className="h-144 bg-white rounded-lg shadow-slate-100">
      {" "}
      {/* styles.menu */}
      <ul>
        <li className="h-10 flex items-center cursor-pointer hover:bg-sky-700">
          <a
            href=""
            className="py-0 px-5 flex items-center gap-2 w-full h-10 bg-slate-100 border-b-2 border-slate-grey"
          >
            {/* styles.menu__header */}
            <BiCategory />
            <b>Categories</b>
          </a>
        </li>
        <div className="mt-1">
          {/* styles.menu__list */}
          {menuArray.map((item, i) => (
            <li className="px-4 h-8 flex items-center cursor-pointer text-slate-500 hover:bg-slate-100">
              <Link key={item.name} href={item.link || "#"}>
                {item.name}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Menu;
