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
import { zodResolver } from "@hookform/resolvers/zod";
import { updateBrandSchema, UpdateBrandInput } from "@/lib/zodSchemas";
import { trpc } from "@/server/client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brand } from "./Columns";

export const EditBrandForm = ({ brand }: { brand: Brand }) => {
  const utils = trpc.useUtils();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateBrandInput>({
    resolver: zodResolver(updateBrandSchema),
    defaultValues: {
      id: brand.id,
      name: brand.name,
      status: brand.status,
    },
  });

  const { mutate: updateBrand, isPending } =
    trpc.adminRouter.updateBrand.useMutation({
      onSuccess: () => {
        toast.success("Brand updated");
        setOpen(false);
        utils.adminRouter.getBrands.invalidate(); // refetch updated data
      },
      onError: (err) => toast.error(err.message),
    });

  const onSubmit = (data: UpdateBrandInput) => {
    updateBrand(data);
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
          <DialogTitle>Edit Brand</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input {...register("name")} placeholder="Brand name" />
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
