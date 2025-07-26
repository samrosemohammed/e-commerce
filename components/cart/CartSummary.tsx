"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function CartSummary() {
  const { cartCount, cartTotal, clearCart } = useCart();

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08; // 8% tax
  const finalTotal = cartTotal + shipping + tax;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Items ({cartCount})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {cartTotal < 50 && (
          <p className="text-sm text-muted-foreground">
            Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
          </p>
        )}

        <div className="space-y-2 pt-4">
          <Button className="w-full" size="lg">
            Proceed to Checkout
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={clearCart}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
