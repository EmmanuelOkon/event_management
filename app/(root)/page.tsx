import { useGetAllEvents } from "@/components/hooks";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Hero from "@/components/shared/Hero";
import Search from "@/components/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";


export default async function Home({ searchParams }: SearchParamProps) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const searchText = (resolvedSearchParams?.query as string) || "";
  const category = (resolvedSearchParams?.category as string) || "";



  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <Hero eventCount={40} />
      <section
        id="events"
        className="wrapper my-7 flex flex-col gap-8 md:gap-12 z-10"
      >
        <div className="flex flex-col gap-3">
          <h2 className="h2-bold">
            {/* Discover <br /> Thousands of Events and go Beyond Boundaries! */}
            {/* <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl"> */}
            Discover Events, <br />{" "}
            <span className="text-accent">Near and Far!</span>
            {/* </h1> */}
          </h2>
          <p className="text-lg text-gray-600">
            Hand-picked happenings, updated in real time.
          </p>
        </div>

        <Search placeholder="Search events, places, or vibes…" />
        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No events match."
          emptyStateSubtext="Try a different category or clear your search."
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
