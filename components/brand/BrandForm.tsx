"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { BrandFormData, brandSchema } from "@/lib/zodSchemas";

export const BrandForm = () => {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandSchema),
  });

  const { mutate: createBrand, isPending } =
    trpc.adminRouter.createBrand.useMutation({
      onSuccess: () => {
        toast.success("Brands created successfully!");
        setOpen(false);
        utils.adminRouter.getBrands.invalidate();
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const [brands, setBrands] = useState<string[]>([""]);

  const addBrand = () => setBrands([...brands, ""]);

  const removeBrand = (index: number) => {
    const updated = brands.filter((_, i) => i !== index);
    setBrands(updated);
  };

  const clearAll = () => {
    setBrands([""]);
  };

  const handleBrandChange = (index: number, value: string) => {
    const updated = [...brands];
    updated[index] = value;
    setBrands(updated);
  };

  const handlePaste =
    (index: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = e.clipboardData.getData("text");
      const splitValues = pastedText
        .split(/[\n,;\t]+/)
        .map((val) => val.trim())
        .filter(Boolean);

      if (splitValues.length > 1) {
        e.preventDefault();
        const updated = [...brands];
        updated.splice(index, 1, ...splitValues);
        setBrands(updated);
      }
    };

  const onSubmit = (data: BrandFormData) => {
    createBrand({ brands: data.brands });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Brand</DialogTitle>
            <DialogDescription>
              Add one or more brands at once. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 max-h-[450px] overflow-y-auto">
            {brands.map((brand, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    {...register(`brands.${index}`)}
                    value={brand}
                    placeholder="e.g. Nike"
                    onChange={(e) => handleBrandChange(index, e.target.value)}
                    onPaste={handlePaste(index)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={addBrand}
                  >
                    <Plus size={18} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBrand(index)}
                    disabled={brands.length === 1}
                    className="text-destructive hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
                {errors.brands?.[index] && (
                  <p className="text-sm text-red-500">
                    {errors.brands[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="flex justify-between flex-wrap gap-2">
            <div className="flex gap-2">
              <Button
                disabled={isPending}
                variant="outline"
                type="button"
                onClick={clearAll}
              >
                Clear All
              </Button>
              <DialogClose asChild>
                <Button disabled={isPending} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </div>
            <Button disabled={isPending} type="submit">
              {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
