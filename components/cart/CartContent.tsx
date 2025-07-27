"use client";

import { useCart } from "@/context/CartContext";
import CartItemsList from "./CartItemsList";
import EmptyCart from "./EmptyCart";
import CartSummary from "./CartSummary";
import { CartSummarySkeleton } from "../skeleton/CartSummarySkeleton";
import { CartItemsListSkeleton } from "../skeleton/CartItemsListSkeleton";

export default function CartContent() {
  const { cart, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemsListSkeleton />
        </div>
        <div className="lg:col-span-1">
          <CartSummarySkeleton />
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <CartItemsList />
      </div>
      <div className="lg:col-span-1">
        <div className="py-4 sticky top-14">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
