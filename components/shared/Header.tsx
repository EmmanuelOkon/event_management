"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="w-full border-b ">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently Logo"
          />
        </Link>

        <Show when="signed-in">
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </Show>

        <div className="flex items-center gap-3">
          <Show when="signed-in">
            <UserButton />
            <MobileNav />
          </Show>
          <Show when="signed-out">
            <Button asChild className="rounded-md" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
