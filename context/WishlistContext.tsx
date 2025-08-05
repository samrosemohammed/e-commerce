"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "@/types/product";

interface WishlistItem {
  product: Product;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishListCount: number;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Optional: persist to localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.some((item) => item.product.id === product.id)
        ? prev
        : [...prev, { product }]
    );
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const isWishlisted = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        wishListCount: wishlist.length,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
