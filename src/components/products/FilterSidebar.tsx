"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { FilterState } from "@/types/clothing";
import { FilterSection } from "./FilterSection";
import { filterOptions } from "@/data/clothings-data";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const handleMultiSelectChange = (
    value: string,
    selectedArray: string[],
    key: keyof FilterState
  ) => {
    const newArray = selectedArray.includes(value)
      ? selectedArray.filter((item) => item !== value)
      : [...selectedArray, value];

    onFiltersChange({ [key]: newArray });
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          Clear All
        </Button>
      </div>

      <FilterSection
        title="Categories"
        items={filterOptions.categories}
        selected={filters.selectedCategories}
        onChange={(value) =>
          handleMultiSelectChange(
            value,
            filters.selectedCategories,
            "selectedCategories"
          )
        }
      />

      <Separator />

      <FilterSection
        title="Gender"
        items={filterOptions.genders}
        selected={filters.selectedGenders}
        onChange={(value) =>
          handleMultiSelectChange(
            value,
            filters.selectedGenders,
            "selectedGenders"
          )
        }
      />

      <Separator />

      <FilterSection
        title="Brands"
        items={filterOptions.brands}
        selected={filters.selectedBrands}
        onChange={(value) =>
          handleMultiSelectChange(
            value,
            filters.selectedBrands,
            "selectedBrands"
          )
        }
      />

      <Separator />

      <FilterSection
        title="Colors"
        items={filterOptions.colors}
        selected={filters.selectedColors}
        onChange={(value) =>
          handleMultiSelectChange(
            value,
            filters.selectedColors,
            "selectedColors"
          )
        }
      />

      <Separator />

      <FilterSection
        title="Sizes"
        items={filterOptions.sizes}
        selected={filters.selectedSizes}
        onChange={(value) =>
          handleMultiSelectChange(value, filters.selectedSizes, "selectedSizes")
        }
      />

      <Separator />

      <FilterSection
        title="Materials"
        items={filterOptions.materials}
        selected={filters.selectedMaterials}
        onChange={(value) =>
          handleMultiSelectChange(
            value,
            filters.selectedMaterials,
            "selectedMaterials"
          )
        }
      />

      <Separator />

      <FilterSection
        title="Styles"
        items={filterOptions.styles}
        selected={filters.selectedStyles}
        onChange={(value) =>
          handleMultiSelectChange(
            value,
            filters.selectedStyles,
            "selectedStyles"
          )
        }
      />

      <Separator />

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) =>
            onFiltersChange({ priceRange: value as [number, number] })
          }
          max={400}
          min={0}
          step={10}
          className="w-full"
        />
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Minimum Rating</Label>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.minRating === rating}
                onCheckedChange={(checked) =>
                  onFiltersChange({ minRating: checked ? rating : 0 })
                }
              />
              <Label
                htmlFor={`rating-${rating}`}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm">& up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Additional Filters */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Additional Filters</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.showInStockOnly}
              onCheckedChange={(checked) =>
                onFiltersChange({ showInStockOnly: !!checked })
              }
            />
            <Label
              htmlFor="in-stock"
              className="text-sm font-normal cursor-pointer"
            >
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={filters.showNewOnly}
              onCheckedChange={(checked) =>
                onFiltersChange({ showNewOnly: !!checked })
              }
            />
            <Label
              htmlFor="new-arrivals"
              className="text-sm font-normal cursor-pointer"
            >
              New Arrivals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.showSaleOnly}
              onCheckedChange={(checked) =>
                onFiltersChange({ showSaleOnly: !!checked })
              }
            />
            <Label
              htmlFor="on-sale"
              className="text-sm font-normal cursor-pointer"
            >
              On Sale
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};
