"use client";
import { CartItem, useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EmptyState } from "../Empty";
import { Heart, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { capitalizeWords } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const GetWishList = () => {
  const { wishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const router = useRouter();

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  const handleAddToCart = (item: (typeof wishlist)[number]) => {
    if (item.product.stockQuantity == null || item.product.stockQuantity <= 0) {
      toast.warning(`${item.product.name} is out of stock`);
      return;
    }

    const cartItem: CartItem = {
      product: item.product,
      quantity: 1,
      selectedSize: undefined,
      selectedColor: undefined,
    };

    addToCart(cartItem);
    toast.success(`${item.product.name} added to cart`);
  };

  const handleRemove = (item: (typeof wishlist)[number]) => {
    removeFromWishlist(item.product.id);
    toast.success(`${item.product.name} removed from wishlist`);
  };

  const handleViewDetails = (item: (typeof wishlist)[number]) => {
    router.push(`/product/${item.product.id}`);
  };
  const totalValue = wishlist.reduce(
    (sum, item) => sum + item.product.price,
    0
  );

  if (wishlist.length === 0) {
    return (
      <div className="space-y-6 max-w-screen-2xl mx-auto py-6 sm:px-0 px-2">
        <h1 className="font-semibold text-2xl">My Wishlist</h1>

        <EmptyState
          title="Your wishlist is empty"
          description="Start adding items you love to keep track of them and get notified about price changes"
          icon={
            <div className="bg-muted/20 rounded-full p-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
          }
          action={
            <Button onClick={() => router.push("/")}>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
              {wishlist.length > 0 &&
                ` • Total value: $${totalValue.toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>

      {/* Wishlist Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button variant="outline" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add All to Cart
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            wishlist.forEach((item) => removeFromWishlist(item.product.id));
            toast.success("Wishlist cleared");
          }}
          className="flex items-center gap-2 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          Clear Wishlist
        </Button>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item.product.id}
            className="border rounded-md hover:shadow-lg transition-all duration-200"
          >
            <div className="p-0">
              <div className="relative">
                <img
                  src={item.product.images[0] || "/placeholder.svg"}
                  alt={item.product.name}
                  className="w-full h-64 object-cover rounded-t-lg cursor-pointer"
                  onClick={() => router.push(`/product/${item.product.id}`)}
                />

                {/* Wishlist Heart Button */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90 hover:bg-white"
                  onClick={() =>
                    handleRemoveFromWishlist(item.product.id, item.product.name)
                  }
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>

              <div className="p-4 space-y-4">
                {/* Tags */}
                {item.product.tags && item.product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.product.tags.slice(0, 2).map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {capitalizeWords(tag)}
                      </Badge>
                    ))}
                    {item.product.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.product.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Product Info */}
                <div className="space-y-2">
                  <h3
                    className="font-semibold text-lg line-clamp-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => router.push(`/product/${item.product.id}`)}
                  >
                    {item.product.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleViewDetails(item)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    disabled={
                      item.product.stockQuantity == null ||
                      item.product.stockQuantity <= 0
                    }
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart />
                    {item.product.stockQuantity == null ||
                    item.product.stockQuantity <= 0
                      ? " Out of Stock"
                      : ""}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRemove(item)}
                    className="px-3"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
