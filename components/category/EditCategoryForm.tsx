// EditCategoryForm.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { updateCategorySchema, UpdateCategoryInput } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Category } from "./Columns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const EditCategoryForm = ({ category }: { category: Category }) => {
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateCategoryInput>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      id: category.id,
      name: category.name,
      status: category.status,
    },
  });

  const { mutate: updateCategory, isPending } =
    trpc.adminRouter.updateCategory.useMutation({
      onSuccess: () => {
        toast.success("Category updated");
        setOpen(false);
        utils.adminRouter.getCategories.invalidate();
        // Optionally refetch here
      },
      onError: (err) => toast.error(err.message),
    });

  const onSubmit = (data: UpdateCategoryInput) => {
    updateCategory(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start p-0 px-2 text-primary/90 rounded-sm"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name")} placeholder="Category name" />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}

          <Select
            value={watch("status")}
            onValueChange={(value) =>
              setValue("status", value as "active" | "inactive")
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
