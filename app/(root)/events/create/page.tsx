import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-gray-100 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-display font-semibold tracking-tight text-balance ">
            Host a new Event
          </h1>
          <p className="mt-3 text-zinc-600">
            Tell people what&apos;s happening — and why they should be there.
          </p>
        </div>
      </section>

      <div className="wrapper my-8 px-6">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
