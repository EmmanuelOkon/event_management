"use client";

import {
  cn,
  formUrlQuery,
  removeKeysFromQuery,
} from "@/lib/utils";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "All";

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    // start();
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      {["All", ...categories.map((category) => category.name)].map(
        (categoryName) => {
          const isActive = selectedCategory === categoryName;

          return (
            <button
              key={categoryName}
              type="button"
              onClick={() => onSelectCategory(categoryName)}
              className={cn(
                "rounded-none border px-5 py-2 text-sm transition-colors cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "border-black bg-black text-white hover:bg-primary/90"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:text-white hover:bg-primary/50",
              )}
            >
              {categoryName}
            </button>
          );
        },
      )}
    </div>
  );
};

export default CategoryFilter;
