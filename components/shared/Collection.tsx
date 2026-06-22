"use client";

import { useGetEventById } from "@/components/hooks/useEvents";
import { Pagination } from "@/components/ui/pagination";
import type { Event as EventType } from "@/types";
import Card from "./Card";

type CollectionProps = {
  data: EventType[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  userId?: string;
};

type CollectionItemProps = {
  event: EventType;
  hasOrderLink: boolean;
  hidePrice: boolean;
  index: number;
};

const CollectionItem = ({
  event,
  hasOrderLink,
  hidePrice,
  index,
}: CollectionItemProps) => {
  const { event: liveEvent } = useGetEventById(event._id.toString());

  return (
    <li className="flex justify-center">
      <Card
        event={liveEvent ?? event}
        hasOrderLink={hasOrderLink}
        hidePrice={hidePrice}
        index={index}
      />
    </li>
  );
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  userId,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10 mt-3">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event, index) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id.toString()} className="flex justify-center">
                  <Card
                    event={event}
                    // userId={userId}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              currentPage={Number(page)}
              urlParamName={urlParamName}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper border  min-h-25 w-full flex-col gap-3 border-dashed bg-grey-50 py-28 text-center">
          <h3 className="text-2xl md:h5-bold font-serif">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
