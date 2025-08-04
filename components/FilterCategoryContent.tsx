"use client";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { trpc } from "@/server/client";
import { Loading } from "./Loading";
import { capitalizeWords } from "@/lib/utils";
import { useFilters } from "@/context/FilterContext";
import { Badge } from "./ui/badge";

export const FilterCategoryContent = () => {
  const { filters, updateFilter, resetFilters } = useFilters();
  const { data: filterOptions, isLoading } =
    trpc.userRouter.getFilters.useQuery();
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(
    filters.priceRange
  );

  // Update local price range when filters change
  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const handleCheckboxChange = (
    filterKey: keyof typeof filters,
    value: string,
    checked: boolean
  ) => {
    const currentValues = filters[filterKey] as string[];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    updateFilter(filterKey, newValues);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setLocalPriceRange(value);
    // Debounce the price update to avoid too many API calls
    const timeoutId = setTimeout(() => {
      updateFilter("priceRange", value);
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const categories = [
    {
      title: "Trending",
      items: filterOptions?.tags,
      filterKey: "tags" as const,
    },
    {
      title: "Gender",
      items: filterOptions?.genders,
      filterKey: "genders" as const,
    },
    {
      title: "Clothes",
      items: filterOptions?.categories,
      filterKey: "categories" as const,
    },
    {
      title: "Brand",
      items: filterOptions?.brands,
      filterKey: "brands" as const,
    },
    {
      title: "Availability",
      items: filterOptions?.availability,
      filterKey: "availability" as const,
    },
  ];

  if (isLoading) return <Loading className="h-[76vh]" />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filter by Category</h2>
        <Button variant="outline" size="xs" onClick={resetFilters}>
          Clear All
        </Button>
      </div>

      <Accordion
        type="multiple"
        className="w-full max-h-[650px]"
        defaultValue={[
          "trending",
          "gender",
          "clothes",
          "brand",
          "availability",
          "price",
        ]}
      >
        {categories.map((section) => (
          <AccordionItem
            key={section.title.toLowerCase()}
            value={section.title.toLowerCase()}
          >
            <AccordionTrigger className="text-base font-medium">
              <p className="flex gap-2 items-center">
                {section.title}
                {filters[section.filterKey].length > 0 && (
                  <Badge variant={"secondary"} className="rounded-full">
                    {filters[section.filterKey].length}
                  </Badge>
                )}
              </p>
            </AccordionTrigger>
            <AccordionContent className="max-h-[200px] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 gap-3 pt-2">
                {section?.items?.map((item) => (
                  <Label
                    key={item}
                    className="flex items-center gap-2 font-normal cursor-pointer hover:text-foreground/80"
                  >
                    <Checkbox
                      checked={filters[section.filterKey].includes(item!)}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(
                          section.filterKey,
                          item!,
                          checked as boolean
                        )
                      }
                    />
                    {capitalizeWords(item!)}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Slider
                min={filterOptions?.priceRange[0] || 0}
                max={filterOptions?.priceRange[1] || 1000}
                step={10}
                value={localPriceRange}
                onValueChange={handlePriceRangeChange}
              />
              <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                <span>${localPriceRange[0]}</span>
                <span>${localPriceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
