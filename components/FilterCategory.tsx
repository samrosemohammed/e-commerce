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

export const FilterCategory = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    }
  };

  const categories = [
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
    <div className="p-4 mt-8 border overflow-y-auto h-fit rounded-lg max-w-sm w-full">
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>

      <Accordion type="multiple" className="w-full" defaultValue={["clothing"]}>
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
                    <Checkbox
                      checked={selectedCategories.includes(item)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(item, checked as boolean)
                      }
                    />
                    {item}
                  </Label>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {selectedCategories.length > 0 && (
        <div className="mt-6 p-3 bg-muted rounded-lg sticky bottom-0 z-10">
          <h3 className="text-sm font-medium mb-2">Selected Categories:</h3>
          <div className="flex flex-wrap gap-1">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
