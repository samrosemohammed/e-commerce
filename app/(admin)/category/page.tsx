import { CategoryTable } from "@/components/category/CategoryTable";
import { CategoryForm } from "@/components/category/CategorytForm";
import { Category, columns } from "@/components/category/Columns";
import { DataTable } from "@/components/category/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authOptions } from "@/lib/authOptions";
import { appRouter } from "@/server";
import { getServerSession } from "next-auth";

// const getData = async (): Promise<Category[]> => {
//   const session = await getServerSession(authOptions); // if you're using auth

//   const caller = appRouter.createCaller({ session }); // assuming your router needs session context
//   const data = await caller.adminRouter.getCategories(); // call the tRPC query
//   return data;
// };
export default async function CategoryPage() {
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
          <CategoryTable />
        </CardContent>
      </Card>
    </div>
  );
}
