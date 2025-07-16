import { FilterCategoryContent } from "./FilterCategoryContent";

export const FilterCategory = () => {
  return (
    <div className="hidden lg:block mt-13 p-4 sticky top-24 border overflow-y-auto h-fit max-h-[calc(100vh-8rem)] rounded-lg max-w-xs w-full">
      <FilterCategoryContent />
    </div>
  );
};
