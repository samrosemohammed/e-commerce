"use client";
import { trpc } from "@/server/client";
import { columns } from "./Columns";

import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { toast } from "sonner";

export const CategoryTable = () => {
  const utils = trpc.useUtils();
  const { data, isLoading, isError } =
    trpc.adminRouter.getCategories.useQuery();
  const { mutate: deleteCategories } =
    trpc.adminRouter.deleteCategories.useMutation({
      onSuccess: () => {
        toast.success("Categories deleted");
        utils.adminRouter.getCategories.invalidate();
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
      <div className="text-center text-red-500">Failed to load categories.</div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      onDelete={(ids) => deleteCategories({ ids })}
    />
  );
};
