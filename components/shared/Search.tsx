"use client";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
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
        router.push(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-md bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default Search;
