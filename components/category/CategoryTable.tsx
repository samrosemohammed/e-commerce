"use client";
import { trpc } from "@/server/client";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { Loader2 } from "lucide-react";

export const CategoryTable = () => {
  const { data, isLoading, isError } =
    trpc.adminRouter.getCategories.useQuery();
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

  return <DataTable columns={columns} data={data} />;
};
