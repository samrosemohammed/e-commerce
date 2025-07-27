"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function CartSummary() {
  const { cart, cartCount, cartTotal, clearCart } = useCart();

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shipping + tax;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Products List */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
              className="flex items-start justify-between"
            >
              {/* Left: Image and product details */}
              <div className="flex gap-3">
                <div className="relative w-14 h-14 flex-shrink-0">
                  <Image
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>

                <div className="text-sm">
                  <p className="font-medium">{item.product.name}</p>
                  <div className="text-xs text-muted-foreground">
                    {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                    {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              </div>

              {/* Right: Price */}
              <div className="text-sm font-medium whitespace-nowrap">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Pricing Summary */}
        <div className="space-y-2 text-sm">
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

        {/* Total */}
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>

        {/* Free shipping hint */}
        {cartTotal < 50 && (
          <p className="text-sm text-muted-foreground">
            Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
          </p>
        )}

        {/* Buttons */}
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
