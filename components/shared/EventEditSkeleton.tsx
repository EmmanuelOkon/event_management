import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const EventEditSkeleton = () => {
  return (
    <>
      {/* <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper mx-auto max-w-7xl px-6 space-y-3">
          <Skeleton className="h-10 w-80 max-w-full" />
          <Skeleton className="h-5 w-96 max-w-full" />
        </div>
      </section> */}

      <div className="wrapper my-8 px-6 mx-auto max-w-5xl border border-foreground/20">
        <div className="w-full flex flex-col gap-6 py-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="aspect-[21/9] w-full rounded-none" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-none" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-36 w-full rounded-none" />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-none" />
            </div>
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full rounded-none" />
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-10 w-full rounded-none" />
              <Skeleton className="h-10 w-full rounded-none" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-10 w-full rounded-none" />
              <Skeleton className="h-10 w-full rounded-none" />
            </div>
          </div>

          <Separator />

          <div className="grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-40 w-full rounded-none" />
            <Skeleton className="h-40 w-full rounded-none" />
          </div>

          <Separator />

          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-none" />
          </div>

          <Skeleton className="h-11 w-full rounded-none" />
        </div>
      </div>
    </>
  );
};

export default EventEditSkeleton;
