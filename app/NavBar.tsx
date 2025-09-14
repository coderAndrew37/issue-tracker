"use client";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
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
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button className="flex items-center gap-2 focus:outline-none">
                    {sessionData.user.image && (
                      <Avatar
                        src={sessionData.user.image}
                        fallback={sessionData.user.name?.[0] || "U"}
                        size="2"
                        radius="full"
                        className="cursor-pointer"
                      />
                    )}
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content
                  sideOffset={4}
                  className="rounded-xl border bg-white shadow-md p-2"
                >
                  <DropdownMenu.Item asChild>
                    <Text size="2" weight="medium" className="text-zinc-600">
                      {sessionData.user.name ?? "Guest"}
                    </Text>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Text size="2" className="text-zinc-500">
                      {sessionData.user.email}
                    </Text>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link
                      href="/api/auth/signout"
                      className="block text-sm font-semibold text-zinc-500 hover:text-zinc-900 transition-colors px-2 py-1 cursor-pointer"
                    >
                      Logout
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
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
