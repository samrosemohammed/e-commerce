"use client";

import { trpc } from "@/server/client";
import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { productColumns } from "./Columns";

export const ProductTable = () => {
  const {
    data: productData,
    isLoading,
    isError,
  } = trpc.adminRouter.getProduct.useQuery();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin size-8 text-muted-foreground" />
      </div>
    );
  }

  // if (isError || !data) {
  //   return (
  //     <div className="text-center text-red-500">Failed to load brands.</div>
  //   );
  // }
  console.log(productData);
  return (
    <DataTable
      columns={productColumns}
      data={productData}
      //   onDelete={(ids) => deleteBrands({ ids })}
    />
  );
};
