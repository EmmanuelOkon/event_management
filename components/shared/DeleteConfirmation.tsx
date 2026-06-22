"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { deleteEvent } from "@/lib/actions/event.actions";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

type DeleteConfirmationProps = {
  eventId: string;
  eventName: string;
  trigger?: ReactNode;
};

export const DeleteConfirmation = ({
  eventId,
  eventName,
  trigger,
}: DeleteConfirmationProps) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="hover:bg-red-100 p-3 text-destructive transition-all cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-white rounded-none ">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-none bg-red-50 text-red-500">
          <Trash2 className="h-5 w-5" />
        </div>
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-semibold">
            Delete Event
          </DialogTitle>
          <DialogDescription className="p-regular-16 text-grey-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-black">{eventName}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose className="border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold hover:bg-primary/40 hover:text-black transition disabled:pointer-events-none disabled:opacity-60 cursor-pointer">
            Cancel
          </DialogClose>

          <Button
            className="rounded-none cursor-pointer bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
