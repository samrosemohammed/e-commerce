"use client";

import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { FilterState } from "@/types/clothing";
import { FilterSidebar } from "./FilterSidebar";

interface SearchAndControlsProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}
export const SearchAndControls = ({
  filters,
  onFiltersChange,
  onClearFilters,
}: SearchAndControlsProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search clothing, brands, or styles..."
          value={filters.searchTerm}
          onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
          className="pl-10"
        />
      </div>
      <div className="flex gap-2">
        <Select
          value={filters.sortBy}
          onValueChange={(value) => onFiltersChange({ sortBy: value })}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex border rounded-md">
          <Button
            variant={filters.viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFiltersChange({ viewMode: "grid" })}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={filters.viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onFiltersChange({ viewMode: "list" })}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden bg-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your clothing search</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterSidebar
                filters={filters}
                onFiltersChange={onFiltersChange}
                onClearFilters={onClearFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
