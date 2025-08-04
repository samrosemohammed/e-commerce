"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { trpc } from "@/server/client";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, CircleCheckBig, Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, cartCount, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);
  const hasRunRef = useRef(false);

  const createOrder = trpc.userRouter.createOrder.useMutation({
    onSuccess: () => {
      toast.success("Order placed successfully!");
      clearCart();
      localStorage.removeItem("pendingOrder");
      setOrderCreated(true);
      setLoading(false);
    },
    onError: (err) => {
      toast.error("Failed to create order");
      console.error(err);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const encodedData = searchParams.get("data");
    const paymentType = searchParams.get("payment");

    if (paymentType === "cash") {
      const storedOrder = localStorage.getItem("pendingOrder");
      if (!storedOrder) {
        toast.error("No order data found.");
        router.push("/");
        return;
      }

      const orderData = JSON.parse(storedOrder);

      createOrder.mutate(orderData);

      return;
    }

    if (!encodedData) {
      toast.error("Missing payment confirmation.");
      router.push("/");
      return;
    }

    try {
      const decoded = atob(encodedData);
      const responseParams = JSON.parse(decoded);
      const { status, transaction_uuid } = responseParams;

      if (status !== "COMPLETE") {
        toast.error("Payment was not successful.");
        router.push("/failure");
        return;
      }

      const storedOrder = localStorage.getItem("pendingOrder");
      if (!storedOrder) {
        toast.error("No order data found.");
        router.push("/");
        return;
      }

      const orderData = JSON.parse(storedOrder);

      createOrder.mutate(orderData);
    } catch (err) {
      console.error("Failed to process eSewa response:", err);
      toast.error("Could not verify payment.");
      router.push("/");
    }
  }, []);

  // Show loading while order is being created
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="space-y-2 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin w-12 h-12 text-muted-foreground" />
          <p className="text-lg font-medium">Processing your payment...</p>
        </div>
      </div>
    );
  }

  // Show success card after order is created
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
