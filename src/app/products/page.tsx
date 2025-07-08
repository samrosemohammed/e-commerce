"use client";
import { FilterSidebar } from "@/components/products/FilterSidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SearchAndControls } from "@/components/products/SearchAndControls";
import { clothingProducts } from "@/data/clothings-data";
import { useProductFilters } from "@/hooks/use-product-filters";

const Page = () => {
  const { filters, filteredProducts, updateFilters, clearAllFilters } =
    useProductFilters(clothingProducts);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Fashion Collection</h1>
          <p className="text-muted-foreground">
            Discover the latest trends in fashion and style
          </p>
        </div>

        {/* Search and Controls */}
        <SearchAndControls
          filters={filters}
          onFiltersChange={updateFilters}
          onClearFilters={clearAllFilters}
        />

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-8 max-h-screen overflow-y-auto">
              <FilterSidebar
                filters={filters}
                onFiltersChange={updateFilters}
                onClearFilters={clearAllFilters}
              />
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid
            products={filteredProducts}
            totalProducts={clothingProducts.length}
            viewMode={filters.viewMode}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </div>
  );
};
export default Page;
