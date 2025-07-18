"use client";
import { trpc } from "@/server/client";

import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { brandColumns } from "./Columns";
import { toast } from "sonner";

export const BrandTable = () => {
  const utils = trpc.useUtils();
  const { data, isLoading, isError } = trpc.adminRouter.getBrands.useQuery();
  const { mutate: deleteBrands } = trpc.adminRouter.deleteBrands.useMutation({
    onSuccess: () => {
      toast.success("Brands deleted");
      utils.adminRouter.getBrands.invalidate();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin size-8 text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-red-500">Failed to load brands.</div>
    );
  }

  return (
    <DataTable
      columns={brandColumns}
      data={data}
      onDelete={(ids) => deleteBrands({ ids })}
    />
  );
};
