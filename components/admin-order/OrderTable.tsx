"use client";

import { trpc } from "@/server/client";
import { Loader2 } from "lucide-react";
import { DataTable } from "../DataTable";
import { toast } from "sonner";
import { customerOrderColumns } from "./Columns";
import { Loading } from "../Loading";

export const CustomerOrderTable = () => {
  const utils = trpc.useUtils();
  const {
    data: customerOrderData,
    isLoading,
    isError,
  } = trpc.adminRouter.getOrderByCustomer.useQuery();
  console.log("data: ", customerOrderData);

  if (isLoading) return <Loading className="h-[75vh]" />;

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
