"use client";

import { trpc } from "@/server/client";
import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { toast } from "sonner";
import { customerOrderColumns } from "./Columns";

export const CustomerOrderTable = () => {
  const utils = trpc.useUtils();
  const {
    data: customerOrderData,
    isLoading,
    isError,
  } = trpc.adminRouter.getOrderByCustomer.useQuery();
  console.log("data: ", customerOrderData);
  //   const { mutate: deleteProducts } = trpc.adminRouter.deleteProduct.useMutation(
  //     {
  //       onSuccess: () => {
  //         toast.success("Products deleted");
  //         utils.adminRouter.getProduct.invalidate();
  //       },
  //       onError: () => {
  //         toast.error("Failed to delete products");
  //       },
  //     }
  //   );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="animate-spin size-8 text-muted-foreground" />
      </div>
    );
  }

  if (isError || !customerOrderData) {
    return (
      <div className="text-center text-red-500">Failed to load brands.</div>
    );
  }
  console.log(customerOrderData);
  return (
    <DataTable
      columns={customerOrderColumns}
      data={customerOrderData}
      //   onDelete={(ids) => deleteProducts({ ids })}
    />
  );
};
