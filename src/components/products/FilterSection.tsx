"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterSectionProps {
  title: string;
  items: string[];
  selected: string[];
  onChange: (value: string) => void;
}
export const FilterSection = ({
  title,
  items,
  selected,
  onChange,
}: FilterSectionProps) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{title}</Label>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {items.slice(1).map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Checkbox
              id={`${title}-${item}`}
              checked={selected.includes(item)}
              onCheckedChange={() => onChange(item)}
            />
            <Label
              htmlFor={`${title}-${item}`}
              className="text-sm font-normal cursor-pointer"
            >
              {item}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
