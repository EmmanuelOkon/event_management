"use client";

import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <span className="text-3xl font-bold tracking-tighter uppercase">
            Evoria.
          </span>
        </Link>
        {/* <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={38}
            alt="Evently Logo"
          />
        </Link> */}

        <div className="flex items-center gap-3">
          <Show when="signed-in">
            <nav className="md:flex justify-between hidden w-full max-w-xs">
              <NavItems />
            </nav>
          </Show>

          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <UserButton />
              <MobileNav />
            </div>
          </Show>
          <Show when="signed-out">
            <Button asChild className="rounded-none" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
