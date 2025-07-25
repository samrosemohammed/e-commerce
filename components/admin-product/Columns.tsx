import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { trpc } from "@/server/client";
import { AdminProduct } from "@/types/product";
import { cn } from "@/lib/utils";

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

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.code || "—"}
      </span>
    ),
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

  {
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.category.name || "—"}
      </span>
    ),
  },
  {
    header: "Brand",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original?.brand?.name || "—"}
      </span>
    ),
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.gender || "—"}
      </span>
    ),
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.cost || "—"}
      </span>
    ),
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "stockQuantity",
    header: "Stock Quantity",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.stockQuantity || "—"}
      </span>
    ),
  },

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
          {String(status)}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const utils = trpc.useUtils();
      const { mutate: deleteProduct } =
        trpc.adminRouter.deleteProduct.useMutation({
          onSuccess: () => {
            toast.success("Product deleted");
            utils.adminRouter.getProduct.invalidate(); // Refresh product list
          },
          onError: () => {
            toast.error("Failed to delete product");
          },
        });

      const handleDelete = () => {
        const id = row.original.id;
        deleteProduct({ ids: [id] });
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <ExternalLink /> Visit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(row.original.id);
                toast.success("Product ID copied");
              }}
            >
              <Copy />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <EditBrandForm brand={brand} /> */}
            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
