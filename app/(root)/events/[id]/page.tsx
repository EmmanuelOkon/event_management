import EventDetailsContent from "@/components/shared/EventDetailsContent";
import { auth } from "@clerk/nextjs/server";

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

  return (
    <EventDetailsContent
      eventId={id}
      userId={userId}
      page={resolvedSearchParams.page as string}
    />
  );
};

export default EventDetails;
