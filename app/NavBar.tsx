"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";

const NavBar = () => {
  // Get the current pathname
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="w-full border-b mb-5 p-4 flex justify-between items-center">
      <Link href="/">
        <FaBug className="text-2xl" />
      </Link>

      <ul className="flex space-x-4">
        {links.map((link) => (
          <li
            key={link.href}
            className={classNames({
              "font-semibold": true,
              "text-zinc-500": true,
              "hover:text-zinc-900": true,
              "transition-colors": true,
              "text-zinc-900": pathname === link.href,
            })}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
