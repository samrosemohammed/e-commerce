"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";

export default function CartItemsList() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
      {cart.map((item) => (
        <Card
          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
        >
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={
                    item.product.images[0] ||
                    "/placeholder.svg?height=80&width=80"
                  }
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">
                  {item.product.name}
                </h3>
                {item.product.description && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.product.description}
                  </p>
                )}

                <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                  {item.selectedColor && (
                    <span>
                      Color:{" "}
                      <span className="font-medium">{item.selectedColor}</span>
                    </span>
                  )}
                  {item.selectedSize && (
                    <span>
                      Size:{" "}
                      <span className="font-medium">{item.selectedSize}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
