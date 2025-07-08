"use client";

import { Button } from "@/components/ui/button";
import type { ClothingProduct } from "@/types/clothing";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: ClothingProduct[];
  totalProducts: number;
  viewMode: "grid" | "list";
  onClearFilters: () => void;
}
export const ProductGrid = ({
  products,
  totalProducts,
  viewMode,
  onClearFilters,
}: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">
          No clothing items found
        </p>
        <Button onClick={onClearFilters}>Clear all filters</Button>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {products.length} of {totalProducts} items
        </p>
      </div>

      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
