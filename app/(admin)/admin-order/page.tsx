import { CustomerOrderTable } from "@/components/admin-order/OrderTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function AdminOrder() {
  return (
    <div>
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Customer's Order</CardTitle>
          <CardDescription>
            All the list of order that have done by the customer.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerOrderTable />
        </CardContent>
      </Card>
    </div>
  );
}
