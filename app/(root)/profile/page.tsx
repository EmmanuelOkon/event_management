import ProfileTabs from "@/components/shared/ProfileTabs";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

async function ProfileContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });
  const defaultTab =
    searchParams?.tab === "tickets" ? "tickets" : "organizing";

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between mx-auto max-w-6xl px-6">
          <div>
            <h1 className="text-4xl font-display font-semibold tracking-tight text-balance ">
              My Dashboard
            </h1>
            <p className="mt-3 text-zinc-600 max-w-xl">
              Switch between the events you&apos;re organizing and the tickets
              you&apos;ve purchased, all from one place.
            </p>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 mx-auto max-w-6xl px-6">
        <ProfileTabs
          defaultTab={defaultTab}
          organizingContent={
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-display font-semibold tracking-tight">
                    Organizing
                  </h2>
                  <p className="mt-2 max-w-xl text-zinc-600">
                    Manage your events, review ticket activity, and dive into
                    attendee details for every event you&apos;ve created.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-none"
                  >
                    <Link href="/orders">All Orders</Link>
                  </Button>
                  <Button asChild size="lg" className="button rounded-none">
                    <Link href="/events/create">Create New Event</Link>
                  </Button>
                </div>
              </div>

              <Collection
                data={organizedEvents?.data}
                emptyTitle="No events have been created yet"
                emptyStateSubtext="Go create some now"
                collectionType="Events_Organized"
                limit={3}
                page={eventsPage}
                urlParamName="eventsPage"
                totalPages={organizedEvents?.totalPages}
              />
            </div>
          }
          ticketsContent={
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-3xl font-display font-semibold tracking-tight">
                    My Tickets
                  </h2>
                  <p className="mt-2 max-w-xl text-zinc-600">
                    View and manage the events you&apos;ve purchased tickets for.
                  </p>
                </div>
                <Button asChild size="lg" className="button rounded-none">
                  <Link href="/#events">Explore More Events</Link>
                </Button>
              </div>

              <Collection
                data={orderedEvents}
                emptyTitle="No event tickets purchased yet"
                emptyStateSubtext="No worries - plenty of exciting events to explore!"
                collectionType="My_Tickets"
                limit={3}
                page={ordersPage}
                urlParamName="ordersPage"
                totalPages={orders?.totalPages}
              />
            </div>
          }
        />
      </section>
    </>
  );
}

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const resolvedSearchParams = await searchParams;

  if (!resolvedSearchParams?.tab) {
    redirect("/profile?tab=organizing");
  }

  return (
    <Suspense
      fallback={<Loading />}
      key={JSON.stringify(resolvedSearchParams)}
    >
      <ProfileContent searchParams={resolvedSearchParams} />
    </Suspense>
  );
};

export default ProfilePage;
