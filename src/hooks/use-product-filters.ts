"use client";

import { useState, useMemo } from "react";
import type { ClothingProduct, FilterState } from "@/types/clothing";

const initialFilters: FilterState = {
  searchTerm: "",
  selectedCategories: [],
  selectedBrands: [],
  selectedColors: [],
  selectedSizes: [],
  selectedMaterials: [],
  selectedStyles: [],
  selectedGenders: [],
  priceRange: [0, 400],
  minRating: 0,
  showInStockOnly: false,
  showNewOnly: false,
  showSaleOnly: false,
  sortBy: "featured",
  viewMode: "grid",
};

export function useProductFilters(products: ClothingProduct[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.name
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          product.brand
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(filters.searchTerm.toLowerCase())
          );

        const matchesCategory =
          filters.selectedCategories.length === 0 ||
          filters.selectedCategories.includes(product.category);
        const matchesBrand =
          filters.selectedBrands.length === 0 ||
          filters.selectedBrands.includes(product.brand);
        const matchesColor =
          filters.selectedColors.length === 0 ||
          product.colors.some((color) =>
            filters.selectedColors.includes(color)
          );
        const matchesSize =
          filters.selectedSizes.length === 0 ||
          product.sizes.some((size) => filters.selectedSizes.includes(size));
        const matchesMaterial =
          filters.selectedMaterials.length === 0 ||
          filters.selectedMaterials.includes(product.material);
        const matchesStyle =
          filters.selectedStyles.length === 0 ||
          filters.selectedStyles.includes(product.style);
        const matchesGender =
          filters.selectedGenders.length === 0 ||
          filters.selectedGenders.includes(product.gender);
        const matchesPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];
        const matchesRating = product.rating >= filters.minRating;
        const matchesStock = !filters.showInStockOnly || product.inStock;
        const matchesNew = !filters.showNewOnly || product.isNew;
        const matchesSale = !filters.showSaleOnly || product.isSale;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
          matchesColor &&
          matchesSize &&
          matchesMaterial &&
          matchesStyle &&
          matchesGender &&
          matchesPrice &&
          matchesRating &&
          matchesStock &&
          matchesNew &&
          matchesSale
        );
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "price-low":
            return a.price - b.price;
          case "price-high":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "reviews":
            return b.reviews - a.reviews;
          case "name":
            return a.name.localeCompare(b.name);
          case "newest":
            return b.isNew ? 1 : -1;
          case "featured":
          default:
            return b.isSale ? 1 : -1;
        }
      });
  }, [products, filters]);

  return {
    filters,
    filteredProducts,
    updateFilters,
    clearAllFilters,
  };
}
