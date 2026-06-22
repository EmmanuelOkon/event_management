"use client";

import React from "react";
import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemsProps = {
  linkWrapper?: (link: React.ReactNode) => React.ReactNode;
};

const NavItems = ({ linkWrapper }: NavItemsProps) => {
  const pathname = usePathname();

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "border-b border-accent text-accent font-bold "
            } flex-center text-[0.75rem] whitespace-nowrap uppercase font-semibold hover:text-accent transition-colors duration-200`}
          >
            {linkWrapper ? (
              linkWrapper(<Link href={link.route}>{link.label}</Link>)
            ) : (
              <Link href={link.route}>{link.label}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
