"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export const NavWishList = () => {
  const { wishListCount } = useWishlist();

  return (
    <Button variant="ghost" asChild className="relative">
      <Link href="/wishlist">
        <Heart />
        {wishListCount > 0 && (
          <span className="absolute -top-1 -right-1 text-[10px] bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center">
            {wishListCount}
          </span>
        )}
      </Link>
    </Button>
  );
};
