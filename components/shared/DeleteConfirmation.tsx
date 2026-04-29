"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/actions/event.actions";
import { Trash2 } from "lucide-react";

export const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-primary/20 p-3 text-red-400 hover:text-red-700 transition-all cursor-pointer">
        <Trash2 className="h-4 w-4" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white rounded-none ">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-serif text-2xl font-semibold">
            Are you sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this event
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none hover:bg-primary/40 hover:text-black cursor-pointer ">Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="rounded-none cursor-pointer bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
