"use client";
import { trpc } from "@/server/client";
import { columns } from "./Columns";

import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { toast } from "sonner";
import { Loading } from "../Loading";

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
  if (isLoading) return <Loading className="h-[70vh]" />;

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
