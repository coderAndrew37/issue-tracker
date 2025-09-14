"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { Box, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  // Get the current pathname
  const pathname = usePathname();
  const { status, data: sessionData } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="w-full border-b mb-5 p-4 flex justify-between items-center">
      <Flex>
        <Box>
          {" "}
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
        </Box>
        <Box>
          {status === "authenticated" && sessionData?.user !== undefined && (
            // <div className="flex items-center space-x-2">
            //   <span className="text-sm font-semibold text-zinc-500">
            //     {sessionData.user?.name ?? "Guest User"}
            //   </span>
            <Link
              href="/api/auth/signout"
              className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Logout
            </Link>
          )}

          {/* const sessionData: Session | null = (sessionData ?? null) as Session |
          null;
          {status === "loading" && (
            <span className="text-sm font-semibold text-zinc-500">
              Loading...
            </span>
          )} */}
          {status === "unauthenticated" && (
            <Link
              href="/api/auth/signin"
              className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Login
            </Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;
