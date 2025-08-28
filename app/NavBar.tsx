import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
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
            className="font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
