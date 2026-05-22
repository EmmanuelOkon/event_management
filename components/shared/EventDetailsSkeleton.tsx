import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const EventDetailsSkeleton = () => {
  return (
    <article className="mx-auto max-w-7xl px-6 py-12 space-y-12">
      <Skeleton className="aspect-[21/9] w-full rounded-none" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 rounded-sm" />
            <Skeleton className="h-14 w-3/4 max-w-xl" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          <Separator className="lg:hidden" />

          <aside className="lg:hidden">
            <div className="rounded-none border border-border bg-card p-6 space-y-4">
              <Skeleton className="h-9 w-28" />
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-10 w-full rounded-none" />
              </div>
            </div>
          </aside>
        </div>

        <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-none border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-9 w-28" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-2/3" />
              {/* <Skeleton className="h-12 w-full" /> */}
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-full rounded-none" />
              <Skeleton className="h-10 w-full rounded-none" />
            </div>
          </div>
        </aside>
      </div>

      <Separator />

      <section className="my-8 flex flex-col gap-8 md:gap-12">
        <Skeleton className="h-9 w-48" />
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
      </section>
    </article>
  );
};

export default EventDetailsSkeleton;
