"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateCategory,
  useGetAllCategories,
} from "@/components/hooks";
import { ICategory } from "@/lib/database/models/category.model";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { PenLine } from "lucide-react";

type DropdownProps = {
  value?: string;
  onChangeHandler?: (value: string) => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [newCategory, setNewCategory] = useState("");
  const { categories, isLoadingCategories } = useGetAllCategories();
  const { createNewCategory, isCreatingCategory } = useCreateCategory();

  const handleAddCategory = () => {
    const categoryName = newCategory.trim();
    if (!categoryName) return;

    createNewCategory(
      { categoryName },
      {
        onSuccess: (category) => {
          setNewCategory("");
          if (category?._id) {
            onChangeHandler?.(String(category._id));
          }
        },
      },
    );
  };

  return (
    <Select
      onValueChange={onChangeHandler}
      value={value ?? ""}
      disabled={isLoadingCategories}
    >
      <SelectTrigger className="select-field rounded-none">
        <SelectValue
          placeholder={
            isLoadingCategories
              ? "Loading categories..."
              : "Pick a category for your event"
          }
        />
      </SelectTrigger>
      <SelectContent className="border-[#DBDFE6]">
        {categories &&
          categories.length > 0 &&
          (categories as ICategory[]).map((category) => (
            <SelectItem
              key={category._id.toString()}
              value={category._id.toString()}
              className="hover:bg-primary-50 cursor-pointer"
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="flex items-center text-sm w-full rounded-none h-11 pl-8 text-primary-500 hover:bg-popover-foreground/60 cursor-pointer hover:text-white">
            <PenLine className="mr-2 h-4 w-4" />
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleAddCategory}
                disabled={isCreatingCategory || !newCategory.trim()}
              >
                {isCreatingCategory ? "Adding..." : "Add"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
