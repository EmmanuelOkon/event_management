"use client";

import CheckoutButton from "@/components/shared/CheckoutButton";
import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import EventCollection from "@/components/shared/EventCollection";
import EventDetailsSkeleton from "@/components/shared/EventDetailsSkeleton";
import { MotionDiv } from "@/components/shared/MotionWrapper";
import {
  useGetEventById,
  useGetRelatedEvents,
} from "@/components/hooks/useEvents";
import { formatDateLong, formatPrice, formatTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Pencil,
  Ticket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Event as EventType } from "@/types";

type EventDetailsContentProps = {
  eventId: string;
  userId?: string;
  page?: string;
  hasPurchasedTicket?: boolean;
};

type OrganizerSidebarProps = {
  event: EventType;
  hasEventFinished: boolean;
  eventTimeRange: string;
  attendeesCount: number;
  ticketsAvailable: number;
  isOrganizer: boolean;
  hasPurchasedTicket: boolean;
};

const OrganizerSidebar = ({
  event,
  hasEventFinished,
  eventTimeRange,
  attendeesCount,
  ticketsAvailable,
  isOrganizer,
  hasPurchasedTicket,
}: OrganizerSidebarProps) => (
  <div className="rounded-none border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
    <div className="mb-4 flex items-baseline gap-1">
      <span
        className={`${hasEventFinished ? "line-through text-ring" : ""} font-display text-3xl font-semibold`}
      >
        {/* Free events return an empty price string */}
        {event?.price ? "" : "Free"} {/* Event price with value */}
        {event.price ? formatPrice(event.price) : ""}
      </span>

      {!event.isFree && (
        <span className="text-xs text-muted-foreground">per ticket</span>
      )}
    </div>

    <div className="space-y-3 text-sm">
      <div className="flex items-start gap-3">
        <Calendar className="mt-0.5 h-4 w-4 text-accent" />
        <div>
          <p className="font-medium">
            {formatDateLong(String(event.startDateTime))}
          </p>
          <p className="text-muted-foreground">
            <Clock className="mr-1 inline h-3 w-3" />
            {eventTimeRange}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 text-accent" />
        <p>{event.location}</p>
      </div>
      <div className="flex items-start gap-3">
        <Users className="mt-0.5 h-4 w-4 text-accent" />
        <p>
          {attendeesCount} going · {ticketsAvailable} spots left
        </p>
      </div>
      {hasPurchasedTicket && !isOrganizer ? (
        <div className="space-y-3 border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <div>
              <p className="font-medium">Ticket secured</p>
              <p className="text-sm text-emerald-800/80">
                You already have access to this event.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="w-full rounded-none bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Link href="/profile?tab=tickets">
              <Ticket className="mr-2 h-4 w-4" />
              View My Tickets
            </Link>
          </Button>
        </div>
      ) : (
        <CheckoutButton event={event} />
      )}
    </div>

    {isOrganizer && (
      <>
        <Separator className="my-5" />
        <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
          Organizer tools
        </p>
        <div className="flex gap-2">
          <Button
            asChild
            variant="outline"
            className="flex-1 rounded-none hover:bg-blue-100 border border-border hover:border-blue-600 cursor-pointer transition-all duration-300 ease-in-out hover:text-blue-600 text-sm"
          >
            <Link href={`/events/${event._id}/edit`}>
              <Pencil className="mr-1 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <DeleteConfirmation
            eventId={event._id}
            eventName={event.title}
            trigger={
              <Button
                variant="outline"
                className="flex-1 text-destructive hover:text-destructive rounded-none text-sm hover:bg-red-100 border border-border hover:border-destructive cursor-pointer transition-all duration-300 ease-in-out"
              >
                Delete
              </Button>
            }
          />
        </div>
      </>
    )}
  </div>
);

const EventDetailsContent = ({
  eventId,
  userId,
  page,
  hasPurchasedTicket = false,
}: EventDetailsContentProps) => {
  const { event, isLoadingEvent, isGetEventError, getEventError } =
    useGetEventById(eventId);

  const { relatedEvents, isLoadingRelatedEvents } = useGetRelatedEvents({
    categoryId: event?.category._id ?? "",
    eventId: event?._id ?? eventId,
    page: page ?? "1",
  });

  if (isLoadingEvent) {
    return <EventDetailsSkeleton />;
  }

  if (isGetEventError || !event) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center space-y-4">
        <p className="text-lg text-muted-foreground">
          {getEventError instanceof Error
            ? getEventError.message
            : "Event not found"}
        </p>
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/">Back to events</Link>
        </Button>
      </div>
    );
  }

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const capacity = event.capacity ?? 0;
  const ticketsAvailable = event.ticketsAvailable ?? capacity;
  const attendeesCount = Math.max(capacity - ticketsAvailable, 0);
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);
  const isSameEventDay = startDate.toDateString() === endDate.toDateString();
  const startDateTime = String(event.startDateTime);
  const endDateTime = String(event.endDateTime);
  const eventTimeRange = isSameEventDay
    ? `${formatTime(startDateTime)} - ${formatTime(endDateTime)}`
    : `${formatTime(startDateTime)} - ${formatDateLong(
        endDateTime,
      )}, ${formatTime(endDateTime)}`;

  const isOrganizer = !!userId && userId === String(event.organizer._id);
  const organizerImageUrl = (
    event.organizer as EventType["organizer"] & { imageUrl?: string }
  ).imageUrl;

  const sidebarProps = {
    event,
    hasEventFinished,
    eventTimeRange,
    attendeesCount,
    ticketsAvailable,
    isOrganizer,
    hasPurchasedTicket,
  };

  return (
    <article className="mx-auto max-w-6xl px-6 py-12 space-y-12 ">
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-none border border-border"
      >
        <img
          src={event.imageUrl}
          alt={event.title}
          className="aspect-[21/9] w-full object-cover"
        />
      </MotionDiv>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-none border border-border bg-transparent uppercase ">
                {event.category.name}
              </Badge>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              {event.title}
            </h1>
            <div className="flex items-center gap-3 pt-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={organizerImageUrl} />
                <AvatarFallback>
                  {event.organizer.firstName[0]}
                  {event.organizer.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="text-muted-foreground">Hosted by</p>
                <p className="font-medium">
                  {event.organizer.firstName} {event.organizer.lastName}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h2 className="font-display text-2xl font-semibold">About</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
              {event.description}
            </p>
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent text-sm mt-3 inline-flex items-center gap-1 font-serif transition-all duration-300 ease-in-out underline underline-offset-4 decoration-accent/20 hover:decoration-accent"
              >
                Official Resource
              </a>
            )}
          </div>

          <Separator className="lg:hidden" />

          <aside className="lg:hidden">
            <OrganizerSidebar {...sidebarProps} />
          </aside>
        </div>

        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:shadow-lg">
          <OrganizerSidebar {...sidebarProps} />
        </aside>
      </div>

      <Separator />

      <section className="my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        {isLoadingRelatedEvents ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex min-h-[380px] flex-col overflow-hidden border border-border"
              >
                <Skeleton className="h-64 w-full rounded-none" />
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EventCollection
            data={relatedEvents?.data ?? []}
            emptyTitle="No events match."
            emptyStateSubtext="Try a different category or clear your search."
            collectionType="All_Events"
            limit={3}
            page={page ?? "1"}
            totalPages={relatedEvents?.totalPages}
            userId={userId}
          />
        )}
      </section>
    </article>
  );
};

export default EventDetailsContent;
