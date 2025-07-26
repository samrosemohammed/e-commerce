"use client";

import { useCart } from "@/context/CartContext";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";

export default function CartContent() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItemsList />
      </div>
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
}
