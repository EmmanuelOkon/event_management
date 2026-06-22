"use client";

import type { Event as EventType } from "@/types";
import { useUser } from "@clerk/nextjs";
import { Edit, Ticket, Users } from "lucide-react";
import Link from "next/link";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { MotionDiv } from "./MotionWrapper";

type CardProps = {
  event: EventType;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  index?: number;
};

const Card = ({ event, hasOrderLink, hidePrice, index = 0 }: CardProps) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string | undefined;
  // const isEventCreator = !!userId && userId === String(event.organizer._id);

  const isEventCreator = !!userId && userId === String(event.organizer._id);
  const capacity = event.capacity ?? 0;
  const ticketsAvailable = event.ticketsAvailable ?? capacity;
  const attendeesCount = Math.max(capacity - ticketsAvailable, 0);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04 }}
      className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden bg-white card-border md:min-h-[438px] transition-all duration-300 hover:-translate-y-1"
    >
      <Link
        href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center h-64 bg-gray-50 bg-cover bg-center text-grey-500 grayscale transition-all group-hover:grayscale-0"
      >
        <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-black/10">
          {new Date(event.startDateTime).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
          })}
        </div>
      </Link>

      {/* IS EVENT CREATOR ... */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-4 top-4 flex flex-col gap4 bg-white  backdrop-blur-sm divide-y divide-black border border-black shadow-sm transition-all">
          <Link
            href={`/events/${event._id}/edit`}
            className="p-3 text-gray-500 transition-all hover:bg-blue-100 hover:text-blue-600"
          >
            <Edit className="h-4 w-4 " />
          </Link>

          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      <div className="flex flex-col gap-3 p-4">
        {!hidePrice && (
          <div className="flex justify-between items-center mb-2">
            <span className="badge-editorial">
              {event.category.name}
            </span>
          </div>
        )}

        <Link href={`/events/${event._id}`} className="w-fit">
          <p className="font-serif text-xl md:text-2xl font-bold leading-tight line-clamp-2 flex-1 text-black hover:underline underline-offset-4">
            {event.title}
          </p>
        </Link>

        <div className="flex flex-col gap-2 mt-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
            {event.location} &bull; {event.isFree ? "Complimentary" : `$${event.price}`}
          </p>

          <div className="flex-between w-full mt-4 border-t border-gray-100 pt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {attendeesCount} going · <Ticket className="h-3.5 w-3.5" />{" "}
              {ticketsAvailable} available
            </span>

            {hasOrderLink ? (
              <Link
                href={`/orders?eventId=${event._id}`}
                className="text-[11px] font-bold underline uppercase tracking-tighter"
              >
                Order Details
              </Link>
            ) : (
              <Link
                href={`/events/${event._id}`}
                className="text-[11px] font-bold underline uppercase tracking-tighter"
              >
                Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
};

export default Card;
