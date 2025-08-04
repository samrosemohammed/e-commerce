"use client";
import { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { capitalizeWords } from "@/lib/utils";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { authOptions } from "@/lib/authOptions";
import { useRouter } from "next/navigation";
import { useWishlist } from "@/context/WishlistContext";

interface ProductContentProps {
  product: Product;
}
export const ProductContent = ({ product }: ProductContentProps) => {
  const {
    brand,
    category,
    price,
    comparePrice,
    description,
    sizes,
    colors,
    stockQuantity,
    name,
    code,
  } = product;
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();

  const discountPercentage = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  const DESCRIPTION_CHAR_LIMIT = 150; // Adjust this value as needed
  const shouldShowReadMore =
    description && description.length > DESCRIPTION_CHAR_LIMIT;
  const displayDescription =
    shouldShowReadMore && !isDescriptionExpanded
      ? description.substring(0, DESCRIPTION_CHAR_LIMIT) + "..."
      : description;

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard !!");
  };

  const handleAddToCart = () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color");
      return;
    }
    addToCart({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
    toast.success("Add to cart");
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {brand && (
            <Badge variant="outline">{capitalizeWords(brand.name)}</Badge>
          )}
          <Badge variant="outline">{capitalizeWords(category?.name)}</Badge>
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {product.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        {code && <p className="text-sm text-muted-foreground">SKU: {code}</p>}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(4.8) 124 reviews</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">${price.toFixed(2)}</span>
        {comparePrice && (
          <span className="text-xl text-muted-foreground line-through">
            ${comparePrice.toFixed(2)}
          </span>
        )}
        {discountPercentage > 0 && (
          <Badge className="bg-green-100 text-green-800">
            Save {discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="text-muted-foreground leading-relaxed space-y-2">
        <p>{displayDescription}</p>
        {shouldShowReadMore && (
          <p
            onClick={() => setIsDescriptionExpanded((prev) => !prev)}
            className="text-sm hover:underline cursor-pointer"
          >
            {isDescriptionExpanded ? "Show less" : "Read more"}
          </p>
        )}
      </div>
      {sizes.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                onClick={() => setSelectedSize(size)}
                variant={selectedSize === size ? "default" : "outline"}
                className="transition-colors"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                onClick={() => setSelectedColor(color)}
                variant={selectedColor === color ? "default" : "outline"}
                className="transition-colors"
              >
                {color}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="font-semibold mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded-md divide-x dark:border-gray-700">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity === 1}
              className="rounded-none"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 min-w-[60px] text-center select-none">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setQuantity((prev) =>
                  stockQuantity != null
                    ? Math.min(stockQuantity, prev + 1)
                    : prev + 1
                )
              }
              disabled={stockQuantity != null && quantity >= stockQuantity}
              className="rounded-none"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {stockQuantity != null && (
            <span className="text-sm text-muted-foreground">
              {stockQuantity} in stock
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={stockQuantity === 0}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            isWishlisted(product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
        <Button onClick={handleLinkCopy} variant="outline" size="lg">
          <Copy className="w-5 h-5" />
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <div className="flex items-center gap-2 text-sm">
          <Truck className="w-5 h-5 text-green-600" />
          <span>Free Shipping</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-5 h-5 text-blue-600" />
          <span>2 Year Warranty</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <RotateCcw className="w-5 h-5 text-orange-600" />
          <span>30 Day Returns</span>
        </div>
      </div>
    </div>
  );
};
