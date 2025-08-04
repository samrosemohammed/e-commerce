"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface FilterState {
  categories: string[];
  brands: string[];
  genders: string[];
  tags: string[];
  availability: string[];
  priceRange: [number, number];
  sortBy: string;
}

interface FilterContextType {
  filters: FilterState;
  updateFilter: (key: keyof FilterState, value: any) => void;
  resetFilters: () => void;
}

const defaultFilters: FilterState = {
  categories: [],
  brands: [],
  genders: [],
  tags: [],
  availability: [],
  priceRange: [0, 1000],
  sortBy: "default",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within FilterProvider");
  }
  return context;
};
