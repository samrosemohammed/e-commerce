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
