"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

const HeaderUserMenu = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Account";
  const email = user.primaryEmailAddress?.emailAddress || "";
  const initials =
    [user.firstName?.[0], user.lastName?.[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() ||
    fullName.slice(0, 2).toUpperCase();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="group rounded-full border border-border/70 bg-card p-1 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 cursor-pointer"
          aria-label="Open account menu"
        >
          <Avatar className="h-9 w-9 border border-border/50">
            <AvatarImage src={user.imageUrl} alt={fullName} />
            <AvatarFallback className="bg-accent/10 font-semibold text-accent">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-72 rounded-none border border-border bg-card p-0 shadow-[var(--shadow-soft)]"
      >
        <div className="border-b border-border bg-primary-50/60 px-4 py-4">
          <p className="font-display text-lg font-semibold tracking-tight text-foreground">
            {fullName}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{email}</p>
        </div>

        <div className="p-3">
          <SignOutButton>
            <Button
              variant="outline"
              className="w-full rounded-none border-border bg-transparent justify-start hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HeaderUserMenu;
