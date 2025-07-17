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
import { CategoryFormData, categorySchema } from "@/lib/zodSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/server/client";
import { toast } from "sonner";

export const CategoryForm = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(categorySchema),
  });
  const { mutate: createCategory, isPending } =
    trpc.adminRouter.createCategory.useMutation({
      onSuccess: () => {
        console.log("Categories created successfully!");
        toast.success("Categories created successfully!");
        setOpen(false); // <-- close the dialog here
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  const [categories, setCategories] = useState<string[]>([""]);
  const addCategory = () => setCategories([...categories, ""]);
  const removeCategory = (index: number) => {
    const updated = categories.filter((_, i) => i !== index);
    setCategories(updated);
  };
  const clearAll = () => {
    setCategories([""]);
  };
  const handleCategoryChange = (index: number, value: string) => {
    const updated = [...categories];
    updated[index] = value;
    setCategories(updated);
  };

  const onSubmit = (data: CategoryFormData) => {
    console.log("Submitted Categories:", data.categories);
    createCategory({ categories: data.categories });
  };

  const handlePaste =
    (index: number) => (e: React.ClipboardEvent<HTMLInputElement>) => {
      const pastedText = e.clipboardData.getData("text");
      const splitValues = pastedText
        .split(/[\n,;\t]+/) // handle comma, newlines, tabs
        .map((val) => val.trim())
        .filter(Boolean);

      if (splitValues.length > 1) {
        e.preventDefault(); // prevent default paste
        const updated = [...categories];
        updated.splice(index, 1, ...splitValues); // replace the current row
        setCategories(updated);
      }
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)} action="" className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add a new Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 max-h-[450px] overflow-y-auto">
            {categories.map((category, index) => (
              <div key={"@" + index} className="space-y-1">
                <div className="flex items-center gap-2">
                  <Input
                    {...register(`categories.${index}`)}
                    value={category}
                    placeholder="e.g. Jackets"
                    onChange={(e) =>
                      handleCategoryChange(index, e.target.value)
                    }
                    onPaste={handlePaste(index)}
                  />
                  {
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addCategory}
                    >
                      <Plus size={18} />
                    </Button>
                  }
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => removeCategory(index)}
                    disabled={categories.length === 1}
                    className="text-destructive hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
                {errors.categories?.[index] && (
                  <p className="text-sm text-red-500">
                    {errors.categories[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="flex flex-wrap gap-2 justify-between">
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
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}{" "}
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
