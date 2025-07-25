"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export const NavShoppingCartIcon = () => {
  const { cartCount } = useCart();

  return (
    <Button variant="ghost" asChild className="relative">
      <Link href="/cart">
        <ShoppingCart />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
};
