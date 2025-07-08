import { Star, Heart, ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ClothingProduct } from "@/types/clothing";

import Image from "next/image";
import { ColorSwatches } from "./ColorSwatches";
interface ProductCardProps {
  product: ClothingProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={400}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-green-500">New</Badge>}
          {product.isSale && (
            <Badge variant="destructive">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
            <Heart className="h-4 w-4" />
          </Button>
          {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {product.brand}
            </span>
          </div>

          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>

          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Material:</span>
              <span className="font-medium">{product.material}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Style:</span>
              <span className="font-medium">{product.style}</span>
            </div>
          </div>

          <ColorSwatches colors={product.colors} />

          <div className="flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <Badge key={size} variant="outline" className="text-xs">
                {size}
              </Badge>
            ))}
            {product.sizes.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{product.sizes.length - 4}
              </Badge>
            )}
          </div>

          <Button className="w-full mt-3" disabled={!product.inStock}>
            <ShoppingBag className="w-4 h-4 mr-2" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
