import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { X } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <nav className="md:hidden">
      <Sheet key={pathname}>
        <SheetTrigger className="align-middle">
          <Image
            src="/assets/icons/menu.svg"
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden p-4 border-accent ">
          <div className="flex items-center justify-between">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={118}
              height={38}
            />
            <SheetClose className="cursor-pointer transition-all duration-300 hover:text-destructive">
              <X className="h-5 w-5" />
            </SheetClose>
          </div>
          <Separator className="border border-gray-50" />
          <NavItems
            linkWrapper={(link: ReactNode) => (
              <SheetClose asChild>{link}</SheetClose>
            )}
          />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
