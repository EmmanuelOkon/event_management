import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import { MotionDiv } from "@/components/shared/MotionWrapper";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
// import User from "@/lib/database/models/user.model";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { auth } from "@clerk/nextjs/server";
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
import { Calendar, Clock, MapPin, Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDateLong, formatPrice, formatTime } from "@/lib/utils";
import Link from "next/link";

type EventDetailsProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const EventDetails = async ({ params, searchParams }: EventDetailsProps) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const id = resolvedParams?.id;

  if (!id) {
    throw new Error("Event id is required");
  }
  const event = await getEventById(id);
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const capacity = event.capacity ?? 0;
  const ticketsAvailable = event.ticketsAvailable ?? capacity;
  const attendeesCount = Math.max(capacity - ticketsAvailable, 0);
  const startDate = new Date(event.startDateTime);
  const endDate = new Date(event.endDateTime);
  const isSameEventDay = startDate.toDateString() === endDate.toDateString();
  const eventTimeRange = isSameEventDay
    ? `${formatTime(event.startDateTime)} - ${formatTime(event.endDateTime)}`
    : `${formatTime(event.startDateTime)} - ${formatDateLong(
        event.endDateTime,
      )}, ${formatTime(event.endDateTime)}`;

  // Get current user session
  // const { userId: clerkId } = auth();

  // Get current user's MongoDB ID from database
  // let currentUserId = null;
  // if (clerkId) {
  //   await connectToDatabase();
  //   const currentUser = await User.findOne({ clerkId });
  //   currentUserId = currentUser?._id?.toString();
  // }

  // Check if current user is the event organizer
  const isOrganizer = userId === event?.organizer?._id;

  console.log("organizer", event?.organizer?._id);
  console.log("currentUserId", userId);
  console.log("isOrganizer", isOrganizer);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: resolvedSearchParams.page as string,
  });

  console.log("relatedEvents", event);

  return (
    <article className="mx-auto max-w-7xl px-6 py-12 space-y-12 ">
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
              <Badge variant="secondary" className="rounded-sm">
                {event.category.name}
              </Badge>
            </div>

            <h1 className="font-display text-5xl font-semibold tracking-tight text-balance">
              {event.title}
            </h1>
            <div className="flex items-center gap-3 pt-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src={event.organizer.imageUrl} />
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
          </div>

          <Separator className="lg:hidden" />

          <aside className="lg:hidden">
            <div className="rounded-none border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="mb-4 flex items-baseline gap-1">
                <span
                  className={`${hasEventFinished ? "line-through text-ring" : ""} font-display text-3xl font-semibold`}
                >
                  {event?.price ? "" : "Free"}{" "}
                  {event.price ? formatPrice(event.price) : ""}
                </span>

                {!event.isFree && (
                  <span className="text-xs text-muted-foreground">
                    per ticket
                  </span>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-accent" />
                  <div>
                    <p className="font-medium">
                      {formatDateLong(event.startDateTime)}
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
                <CheckoutButton event={event} />
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
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="flex-1 text-destructive hover:text-destructive rounded-none text-sm hover:bg-red-100 border border-border hover:border-destructive cursor-pointer transition-all duration-300 ease-in-out"
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete this event?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove{" "}
                            <span className="font-semibold text-black">
                              {event.title}
                            </span>
                            . This cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="hover:bg-muted-foreground rounded-none cursor-pointer transition-all duration-300 ease-in-out">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            // onClick={handleDelete}
                            className="bg-destructive text-white rounded-none cursor-pointer hover:bg-red-700 transition-all duration-300 ease-in-out"
                          >
                            Delete event
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>

        {/* Side card */}
        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-none border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-baseline gap-1">
              <span
                className={`${hasEventFinished ? "line-through text-ring" : ""} font-display text-3xl font-semibold`}
              >
                {event?.price ? "" : "Free"}{" "}
                {event.price ? formatPrice(event.price) : ""}
              </span>

              {!event.isFree && (
                <span className="text-xs text-muted-foreground">
                  per ticket
                </span>
              )}
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 text-accent" />
                <div>
                  <p className="font-medium">
                    {formatDateLong(event.startDateTime)}
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
              <CheckoutButton event={event} />
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex-1 text-destructive hover:text-destructive rounded-none text-sm hover:bg-red-100 border border-border hover:border-destructive cursor-pointer transition-all duration-300 ease-in-out"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete this event?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently remove{" "}
                          <span className="font-semibold text-black">
                            {event.title}
                          </span>
                          . This cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="hover:bg-muted-foreground rounded-none cursor-pointer transition-all duration-300 ease-in-out">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          // onClick={handleDelete}
                          className="bg-destructive text-white rounded-none cursor-pointer hover:bg-red-700 transition-all duration-300 ease-in-out"
                        >
                          Delete event
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>

      <Separator />

      <section className="my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No events match."
          emptyStateSubtext="Try a different category or clear your search."
          collectionType="All_Events"
          limit={3}
          page={resolvedSearchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </article>
  );
};

export default EventDetails;
