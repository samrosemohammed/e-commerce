import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowRight,
  ChevronRight,
  CircleCheckBig,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="text-center max-w-md w-full shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <CircleCheckBig className="size-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
        </CardContent>
        <CardFooter className="mx-auto space-x-2">
          <Button asChild>
            <Link href={"/order"}>
              View Order Details
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant={"outline"}>
            <Link href={"/"}>
              <ShoppingBag />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
