"use client";
import { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import {
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
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;

  const handleLinkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard !!");
  };

  const handleAddToCart = () => {
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
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {brand && (
            <Badge variant="outline">{capitalizeWords(brand.name)}</Badge>
          )}
          <Badge variant="outline">{capitalizeWords(category?.name)}</Badge>
        </div>
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

      {description && (
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      )}

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
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-4 py-2 min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          {stockQuantity && (
            <span className="text-sm text-muted-foreground">
              {stockQuantity} in stock
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button size="lg" className="flex-1" onClick={handleAddToCart}>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          <Heart
            className={`w-5 h-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : ""
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
