import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { capitalizeWords, cn } from "@/lib/utils";
import { toast } from "sonner";
import { trpc } from "@/server/client";
import { AdminProduct } from "@/types/product";

export const productColumns: ColumnDef<AdminProduct>[] = [
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

  { accessorKey: "name", header: "Name" },
  { accessorKey: "code", header: "Code" },

  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        ${row.getValue("price").toFixed(2)}
      </div>
    ),
  },
  { accessorKey: "cost", header: "Cost" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "stockQuantity", header: "Stock Quantity" },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <span
          className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            status === "Active" && "bg-green-100 text-green-700",
            status === "Archived" && "bg-red-100 text-red-700",
            status !== "Active" &&
              status !== "Archived" &&
              "bg-gray-200 text-gray-600"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      const images = row.getValue("images") as string[];
      const firstImage = images?.[0];
      return firstImage ? (
        <img
          src={firstImage}
          alt="Product"
          className="h-10 w-10 object-cover rounded"
        />
      ) : (
        <span className="text-muted-foreground">No Image</span>
      );
    },
  },
  // Optional: if you populate relations with Prisma include
  {
    header: "Brand",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original?.brand?.name || "—"}
      </span>
    ),
  },
  {
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.category.name || "—"}
      </span>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];
