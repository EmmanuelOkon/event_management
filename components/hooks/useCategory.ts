import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";
import { CreateCategoryParams } from "@/types";
import { toast } from "sonner";

// FETCH ALL CATEGORIES
export const useGetAllCategories = () => {
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isSuccess: isGetCategoriesSuccess,
    isError: isGetCategoriesError,
    error: getCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return {
    categories,
    isLoadingCategories,
    isGetCategoriesSuccess,
    isGetCategoriesError,
    getCategoriesError,
  };
};

// CREATE CATEGORY
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createNewCategory,
    isPending: isCreatingCategory,
    isSuccess: isCreateCategorySuccess,
    isError: isCreateCategoryError,
    error: createCategoryError,
  } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category created successfully!");
    },
  });

  return {
    createNewCategory,
    isCreatingCategory,
    isCreateCategorySuccess,
    isCreateCategoryError,
    createCategoryError,
  };
};
