"use client";

import type { Event as EventType } from "@/types";
import { Show, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const CheckoutButton = ({ event }: { event: EventType }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const ticketsAvailable = event.ticketsAvailable ?? 0;
  const isSoldOut = ticketsAvailable <= 0;

  const share = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link copied");
  };

  return (
    <div className="flex items-center gap-2 w-full flex-col">
      {hasEventFinished || isSoldOut ? (
        <Button
          // className="rounded-none w-full disabled:cursor-not-allowed"
          className="rounded-none w-full disabled:opacity50 disabled:cursor-not-allowed disabled:pointer-events-auto"
          size="lg"
          disabled
        >
          {hasEventFinished ? "Event Ended" : "Sold Out"}
        </Button>
      ) : (
        <>
          <Show when="signed-out">
            <Button
              asChild
              className="button rounded-none w-full hover:bg-muted-foreground "
              size="lg"
            >
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </Show>

          <Show when="signed-in">
            <Checkout event={event} userId={userId} />
          </Show>
        </>
      )}

      <Button
        variant="ghost"
        className="w-full rounded-none border border-border hover:border-accent cursor-pointer transition-all duration-300 ease-in-out"
        onClick={share}
      >
        <Share2 className="mr-1 h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default CheckoutButton;
