import { ProductTable } from "@/components/admin-product/ProductTable";
import { ProductDialog } from "@/components/product/ProductDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <ProductDialog />
      </div>
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Product</CardTitle>
          <CardDescription>
            All the list of product that you have created.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable />
        </CardContent>
      </Card>
    </div>
  );
}
