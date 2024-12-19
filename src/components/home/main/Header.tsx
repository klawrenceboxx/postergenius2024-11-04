import React from "react";
import Link from "next/link";

// Reusable component for individual navigation items
const NavItem: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <li className="hover:underline items-center text-xl">
    <Link href={href}>{children}</Link>
  </li>
);

const Header: React.FC = () => {
  // List of navigation items
  const navItems = [
    { href: "/store", label: "Store" },
    { href: "/electronics", label: "Electronics" },
    { href: "/watches", label: "Watches" },
  ];

  return (
    <div>
      <ul className="flex items-center gap-4 text-violet-800 p-2 font-bold">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </ul>
    </div>
  );
};

export default Header;
