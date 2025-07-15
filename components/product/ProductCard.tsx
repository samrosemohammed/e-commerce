"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Grid, Grid2x2, List, Menu } from "lucide-react";
import { useState } from "react";
import { MobileFilterCategory } from "../MobileFilterCategory";

export const ProductCard = () => {
  const [view, setView] = useState<"grid" | "list">("grid");

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
            onValueChange={(val) => val && setView(val as "grid" | "list")}
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

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-8"
        }
      >
        {products.map((product, i) => (
          <Card
            key={"@" + i}
            className="transition duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
          >
            <CardHeader className="p-0">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-lg font-semibold mb-2">
                {product.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </CardDescription>
              <p className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </p>
            </CardContent>
            <CardFooter
              className={
                view === "list"
                  ? "flex justify-end items-center gap-2 p-4"
                  : "flex justify-between p-4 pt-0"
              }
            >
              <Button variant="outline">View Details</Button>
              <Button>Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
