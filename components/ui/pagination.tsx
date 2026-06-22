"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formUrlQuery } from "@/lib/utils";
import { useProgress } from "@bprogress/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  className?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  pageButtonClassName?: string;
  activePageButtonClassName?: string;
  inactivePageButtonClassName?: string;
  prevIconClassName?: string;
  nextIconClassName?: string;
  hideOnSinglePage?: boolean;
  urlParamName?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className,
  prevButtonClassName,
  nextButtonClassName,
  pageButtonClassName,
  activePageButtonClassName,
  inactivePageButtonClassName,
  prevIconClassName,
  nextIconClassName,
  hideOnSinglePage = true,
  urlParamName,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { start } = useProgress();

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const queryKey = urlParamName || "page";

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      return;
    }

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: queryKey,
      value: page.toString(),
    });

    start();
    router.push(newUrl, { scroll: false });
  };

  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center mt-6 py-6 border-t w-full border-[#E5E7EB] px-6",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-10 border rounded-none transition-all ease-in-out duration-200 ",
            !canGoPrev || isLoading
              ? "cursor-not-allowed border-primary-gold/40 bg-transparent text-[#E5E5E5] card-border"
              : "bg-transparent text-black hover:bg-primary/50 border-primary cursor-pointer",
            prevButtonClassName,
          )}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!canGoPrev || isLoading}
        >
          <ChevronLeft className={cn("h-5 w-5", prevIconClassName)} />
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isCurrentPage = pageNumber === currentPage;

            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <Button
                  key={pageNumber}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-9 w-9 p-0 rounded-none transition-all ease-in-out duration-200",
                    isCurrentPage
                      ? "bg-black text-white hover:bg-primary-gold border border-black"
                      : "bg-primary-gold/50 text-black hover:text-white border border-primary-70 hover:bg-primary/50 cursor-pointer",
                    pageButtonClassName,
                    isCurrentPage
                      ? activePageButtonClassName
                      : inactivePageButtonClassName,
                  )}
                  onClick={() => handlePageChange(pageNumber)}
                  disabled={isLoading}
                >
                  {pageNumber}
                </Button>
              );
            }

            if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return (
                <span key={pageNumber} className="text-grey-accent">
                  ...
                </span>
              );
            }

            return null;
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-10 border rounded-none transition-all ease-in-out duration-200",
            !canGoNext || isLoading
              ? "cursor-not-allowed bg-transparent text-[#E5E5E5] card-border"
              : "bg-transparent text-black hover:bg-primary/50 border-primary cursor-pointer",
            nextButtonClassName,
          )}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!canGoNext || isLoading}
        >
          <ChevronRight className={cn("h-5 w-5", nextIconClassName)} />
        </Button>
      </div>
    </div>
  );
};

export { Pagination };
export type { PaginationProps };
