import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CustomerOrder } from "@/types/product";
import { Checkbox } from "../ui/checkbox";

export const customerOrderColumns: ColumnDef<CustomerOrder[number]>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name", // important for filtering
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    cell: ({ row }) => (
      <div className="text-sm font-medium">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.email}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.phone}
      </span>
    ),
  },
  {
    accessorKey: "address",
    header: "Shipping Address",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {`${row.original.address}, ${row.original.city}, ${
          row.original.province || ""
        }, ${row.original.zip}`}
      </span>
    ),
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment",
    cell: ({ row }) => (
      <span className="text-sm capitalize text-muted-foreground">
        {row.original.paymentMethod}
      </span>
    ),
  },
  {
    accessorKey: "finalTotal",
    header: "Total",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        ${row.original.finalTotal.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "px-2 py-1 rounded text-xs font-semibold",
            status === "pending" && "bg-yellow-100 text-yellow-800",
            status === "completed" && "bg-green-100 text-green-700",
            status === "cancelled" && "bg-red-100 text-red-700"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString();
      return <span className="text-sm text-muted-foreground">{date}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.original.id);
                toast.success("Order ID copied");
              }}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Order ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/orders/${row.original.id}`} target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Order
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
