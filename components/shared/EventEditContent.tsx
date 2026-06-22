"use client";

import EventForm from "@/components/shared/EventForm";
import EventEditSkeleton from "@/components/shared/EventEditSkeleton";
import { useGetAllCategories } from "@/components/hooks";
import { useGetEventById } from "@/components/hooks/useEvents";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EventEditContentProps = {
  eventId: string;
  userId: string;
};

const EventEditContent = ({ eventId, userId }: EventEditContentProps) => {
  const { event, isLoadingEvent, isGetEventError, getEventError } =
    useGetEventById(eventId);
  const {
    isLoadingCategories,
    isGetCategoriesError,
    getCategoriesError,
  } = useGetAllCategories();

  const isPageLoading = isLoadingEvent || isLoadingCategories;

  if (isPageLoading) {
    return <EventEditSkeleton />;
  }

  if (isGetEventError || !event) {
    return (
      <div className="wrapper my-8 px-6 mx-auto max-w-5xl text-center space-y-4 py-24">
        <p className="text-lg text-muted-foreground">
          {getEventError instanceof Error
            ? getEventError.message
            : "Event not found"}
        </p>
        <Button asChild variant="outline" className="rounded-none">
          <Link href="/profile">Back to profile</Link>
        </Button>
      </div>
    );
  }

  if (isGetCategoriesError) {
    return (
      <div className="wrapper my-8 px-6 mx-auto max-w-5xl text-center space-y-4 py-24">
        <p className="text-lg text-muted-foreground">
          {getCategoriesError instanceof Error
            ? getCategoriesError.message
            : "Failed to load categories"}
        </p>
        <Button asChild variant="outline" className="rounded-none">
          <Link href={`/events/${eventId}`}>Back to event</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="wrapper my-8 px-6 mx-auto max-w-5xl border border-foreground/20">
      <EventForm
        key={event._id}
        type="Update"
        eventId={event._id}
        userId={userId}
        event={event}
      />
    </div>
  );
};

export default EventEditContent;
