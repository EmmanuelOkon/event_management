"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";
import { useProgress } from "@bprogress/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { start } = useProgress();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const paramsString = searchParams.toString();
      const hasQueryParam = searchParams.has("query");

      if (!query && !hasQueryParam) {
        return;
      }

      let newUrl = "";

      if (query) {
        newUrl = formUrlQuery({
          params: paramsString,
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: paramsString,
          keysToRemove: ["query"],
        });
      }

      const currentUrl = `${window.location.pathname}${paramsString ? `?${paramsString}` : ""}`;

      if (newUrl !== currentUrl) {
        start();
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border border-border bg-card placeholder:text-grey-500 pl-12 pr-6 text-base h-12 rounded-none shadow-[var(--shadow-soft)] focus-visible:ring-accent focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-opacity-50 w-full"
      />
    </div>
  );
};

export default Search;
