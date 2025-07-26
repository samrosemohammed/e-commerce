import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmptyCart() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6 text-center">
          Looks like you haven't added any items to your cart yet.
        </p>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
