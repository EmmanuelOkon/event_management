import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between mx-auto max-w-6xl px-6">
          <div className="space-y-4 w-full max-w-xl">
            <Skeleton className="h-10 w-64 max-w-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </div>
        </div>
      </section>

      <section className="wrapper my-8 mx-auto max-w-6xl px-6">
        <div className="space-y-8">
          {/* Tabs skeleton */}
          <div className="flex gap-4 border-b border-border pb-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-4 w-full max-w-xl">
                <Skeleton className="h-9 w-48" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-11 w-32 rounded-none" />
                <Skeleton className="h-11 w-40 rounded-none" />
              </div>
            </div>

            {/* Collection Cards Skeleton */}
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
          </div>
        </div>
      </section>
    </>
  );
}
