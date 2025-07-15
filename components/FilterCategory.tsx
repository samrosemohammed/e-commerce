"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export const FilterCategory = () => {
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
    <div className="mt-13 p-4 sticky top-24 border overflow-y-auto h-fit max-h-[calc(100vh-8rem)] rounded-lg max-w-xs w-full">
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>

      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={[
          "trending",
          "gender",
          "clothes",
          "brand",
          "availability",
          "price",
        ]}
      >
        {categories.map((section) => (
          <AccordionItem
            key={section.title.toLowerCase()}
            value={section.title.toLowerCase()}
          >
            <AccordionTrigger className="text-base font-medium">
              {section.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {section.items.map((item) => (
                  <Label
                    key={item}
                    className="flex items-center gap-2 font-normal cursor-pointer hover:text-foreground/80"
                  >
                    <Checkbox />
                    {item}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
        {/* Price range filter */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4">
              <Slider
                defaultValue={priceRange}
                min={0}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={(value: [number, number]) =>
                  setPriceRange(value)
                }
              />
              <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
