"use client";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import { useState } from "react";
import { FilterCategoryContent } from "./FilterCategoryContent";

export const MobileFilterCategory = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const categories = [
    {
      title: "Trending",
      items: ["New Arrivals", "Sale", "Discount"],
    },
    {
      title: "Gender",
      items: ["Male", "Female", "Kids", "Others"],
    },
    {
      title: "Clothes",
      items: ["T-shirt", "Pant", "Jacket", "Hoody"],
    },
    {
      title: "Brand",
      items: ["Gucci", "Nike", "Addidas", "BooyForce"],
    },
    {
      title: "Availability",
      items: ["On-Stock", "Out of Stock"],
    },
  ];
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-4 z-[999] overflow-y-auto">
        <SheetHeader className="hidden">
          <SheetTitle>Filter Category</SheetTitle>
        </SheetHeader>
        <FilterCategoryContent />
      </SheetContent>
    </Sheet>
  );
};
