import { BrandForm } from "@/components/brand/BrandForm";
import { BrandTable } from "@/components/brand/BrandTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function BrandPage() {
  return (
    <div>
      <div className="flex justify-end mb-4">
        <BrandForm />
      </div>
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Brand</CardTitle>
          <CardDescription>
            All the list of brand that you have created.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BrandTable />
        </CardContent>
      </Card>
    </div>
  );
}
