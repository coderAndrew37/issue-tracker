"use client";
import { Avatar, Container, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const pathname = usePathname();
  const { status, data: sessionData } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="w-full border-b mb-5 p-4">
      <Container>
        <Flex justify="between" align="center">
          {/* Left section: Logo + Links */}
          <Flex align="center" gap="4">
            <Link href="/">
              <FaBug className="text-2xl text-zinc-700 hover:text-zinc-900 transition-colors" />
            </Link>
            <ul className="flex space-x-4">
              {links.map((link) => (
                <li
                  key={link.href}
                  className={classNames(
                    "font-semibold transition-colors",
                    pathname === link.href
                      ? "text-zinc-900"
                      : "text-zinc-500 hover:text-zinc-900"
                  )}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </Flex>

          {/* Right section: User info / Login-Logout */}
          <Flex align="center" gap="3">
            {status === "authenticated" && sessionData?.user && (
              <>
                {sessionData.user.image && (
                  <Avatar
                    src={sessionData.user.image}
                    fallback={sessionData.user.name?.[0] || "U"}
                    size="2"
                    radius="full"
                  />
                )}
                <Text size="2" weight="medium" className="text-zinc-600">
                  {sessionData.user.name ?? "Guest"}
                </Text>
                <Link
                  href="/api/auth/signout"
                  className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
                >
                  Logout
                </Link>
              </>
            )}

            {status === "unauthenticated" && (
              <Link
                href="/api/auth/signin"
                className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                Login
              </Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
