import EventForm from "@/components/shared/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

type EditEventProps = {
  params: Promise<{ id: string }>;
};

const EditEvent = async ({ params }: EditEventProps) => {
  const { id } = await params;
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-display font-semibold tracking-tight text-balance  ">
            Refine your Event details
          </h1>

          <p className="mt-3 text-zinc-600">
            Keep your guests in the loop with the latest updates and schedules.
          </p>
        </div>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          eventId={event._id}
          userId={userId}
          event={event}
        />
      </div>
    </>
  );
};

export default EditEvent;
