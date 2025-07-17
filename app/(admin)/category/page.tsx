import { CategoryForm } from "@/components/category/CategorytForm";
import { columns, Payment } from "@/components/category/Columns";
import { DataTable } from "@/components/category/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}
export default async function CategoryPage() {
  const data = await getData();
  return (
    <div>
      <div className="flex justify-end mb-4">
        <CategoryForm />
      </div>
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Category</CardTitle>
          <CardDescription>
            All the list of categroy that you have created.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
