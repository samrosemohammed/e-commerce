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
import { Eye, Grid, Grid2x2, List, Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileFilterCategory } from "../MobileFilterCategory";
import { trpc } from "@/server/client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SkeletonProductCard } from "../skeleton/ProductCard";
import { Badge } from "../ui/badge";
import { capitalizeWords } from "@/lib/utils";

export const ProductCard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const { data: productData, isLoading } =
    trpc.userRouter.getProduct.useQuery();
  const { addToCart } = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  const handleAddToCart = (product: Product) => {
    if (!session) {
      toast.warning("You need to login to add products to your cart");
      router.push("/login");
      return;
    }
    addToCart({
      product,
      quantity: 1,
      selectedColor: product.sizes?.[0] ?? undefined,
      selectedSize: product.colors?.[0] ?? undefined,
    });
    toast.success("Product added to the cart");
  };
  console.log(productData);

  // Save view preference whenever it changes
  const handleViewChange = (newView: string) => {
    if (newView && (newView === "grid" || newView === "list")) {
      setView(newView as "grid" | "list");
      localStorage.setItem("productView", newView);
    }
  };

  // Load saved view preference on component mount
  useEffect(() => {
    const savedView = localStorage.getItem("productView");
    if (savedView === "grid" || savedView === "list") {
      setView(savedView);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="lg:hidden">
          {/* <Menu className="lg:hidden block" /> */}
          <MobileFilterCategory />
        </div>
        <div />
        <div className="flex gap-2 sm:gap-4">
          <Select defaultValue="default">
            <SelectTrigger className="w-[150px] sm:w-[250px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
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
      ) : view === "grid" ? (
        // Grid View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productData?.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
              className="border rounded-lg overflow-hidden transition hover:shadow-lg hover:scale-[1.01] cursor-pointer"
            >
              <div>
                <img
                  alt={product.name}
                  src={product.images[0] || "/placeholder.svg"}
                  className="w-full h-64 aspect-square object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 space-y-4">
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
        <div className="space-y-4">
          {productData?.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                router.push(`/product/${product.id}`);
              }}
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-full">
                    <div className="flex-1 space-y-2 mb-4 sm:mb-0">
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {product.description}
                      </p>
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
