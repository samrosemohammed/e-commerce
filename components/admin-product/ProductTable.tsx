"use client";

import { trpc } from "@/server/client";
import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { productColumns } from "./Columns";
import { toast } from "sonner";
import { Loading } from "../Loading";

export const ProductTable = () => {
  const utils = trpc.useUtils();
  const {
    data: productData,
    isLoading,
    isError,
  } = trpc.adminRouter.getProduct.useQuery();
  const { mutate: deleteProducts } = trpc.adminRouter.deleteProduct.useMutation(
    {
      onSuccess: () => {
        toast.success("Products deleted");
        utils.adminRouter.getProduct.invalidate();
      },
      onError: () => {
        toast.error("Failed to delete products");
      },
    }
  );
  if (isLoading) return <Loading className="h-[70vh]" />;

  if (isError || !productData) {
    return (
      <div className="text-center text-red-500">Failed to load brands.</div>
    );
  }
  console.log(productData);
  return (
    <DataTable
      columns={productColumns}
      data={productData}
      onDelete={(ids) => deleteProducts({ ids })}
    />
  );
};
