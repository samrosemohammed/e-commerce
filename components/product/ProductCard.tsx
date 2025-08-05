"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Grid2x2, Heart, List } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileFilterCategory } from "../MobileFilterCategory";
import { trpc } from "@/server/client";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { SkeletonProductCard } from "../skeleton/ProductCard";
import { Badge } from "../ui/badge";
import { capitalizeWords } from "@/lib/utils";
import { useFilters } from "@/context/FilterContext";
import { useWishlist } from "@/context/WishlistContext";

export const ProductCard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const { filters, updateFilter } = useFilters();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const { data: session } = useSession();

  // Use the filtered products query instead of the general one
  const {
    data: productData,
    isLoading,
    refetch,
  } = trpc.userRouter.getFilteredProducts.useQuery({
    categories: filters.categories.length > 0 ? filters.categories : undefined,
    brands: filters.brands.length > 0 ? filters.brands : undefined,
    genders: filters.genders.length > 0 ? filters.genders : undefined,
    tags: filters.tags.length > 0 ? filters.tags : undefined,
    availability:
      filters.availability.length > 0 ? filters.availability : undefined,
    priceMin: filters.priceRange[0],
    priceMax: filters.priceRange[1],
    sortBy: filters.sortBy as any,
  });

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    if (!session) {
      toast.warning("Please login to use the wishlist.");
      router.push("/login");
      return;
    }

    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist.");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist.");
    }
  };

  const handleViewChange = (newView: string) => {
    if (newView && (newView === "grid" || newView === "list")) {
      setView(newView as "grid" | "list");
      localStorage.setItem("productView", newView);
    }
  };

  const handleSortChange = (value: string) => {
    updateFilter("sortBy", value);
  };

  useEffect(() => {
    const savedView = localStorage.getItem("productView");
    if (savedView === "grid" || savedView === "list") {
      setView(savedView);
    }
  }, []);

  // Show active filter count
  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    filters.genders.length +
    filters.tags.length +
    filters.availability.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="lg:hidden">
          <MobileFilterCategory />
        </div>

        {/* Show results count and active filters */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${productData?.length || 0} products found`}
          </span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary">
              {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""}{" "}
              active
            </Badge>
          )}
        </div>

        <div />

        <div className="flex gap-2 sm:gap-4">
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[150px] sm:w-[250px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={handleViewChange}
          >
            <ToggleGroupItem value="grid" aria-label="Grid View">
              <Grid2x2 className="w-5 h-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List View">
              <List className="w-5 h-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      {isLoading ? (
        <SkeletonProductCard view={view} />
      ) : productData?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            No products found
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filters or search criteria
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Clear all filters
          </Button>
        </div>
      ) : view === "grid" ? (
        // Grid View - same as your existing code
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productData?.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="border rounded-lg overflow-hidden transition hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              <div className="relative">
                <img
                  alt={product.name}
                  src={product.images[0] || "/placeholder.svg"}
                  className="w-full h-64 aspect-square object-cover rounded-t-lg"
                />

                <button
                  className="absolute top-1 right-2 bg-white  text-black rounded-full p-2 shadow"
                  onClick={(e) => toggleWishlist(e, product)}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted(product.id) && session?.user.id
                        ? "fill-red-500 text-red-500"
                        : ""
                    }`}
                  />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {capitalizeWords(tag)}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View - same as your existing code
        <div className="space-y-4">
          {productData?.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/${product.id}`)}
              className="border rounded-lg overflow-hidden transition hover:shadow-lg cursor-pointer p-4"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-40 sm:h-40 flex-shrink-0">
                  <img
                    alt={product.name}
                    src={product.images[0] || "/placeholder.svg"}
                    className="w-full h-40 sm:h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 p-6">
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-2">
                        {product.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {capitalizeWords(tag)}
                          </Badge>
                        ))}
                      </div>
                      <button
                        className="bg-white  text-black rounded-full p-2 shadow"
                        onClick={(e) => toggleWishlist(e, product)}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted(product.id) && session?.user.id
                              ? "fill-red-500 text-red-500"
                              : ""
                          }`}
                        />
                      </button>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full">
                    <div className="flex-1 space-y-2 mb-4 sm:mb-0">
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
