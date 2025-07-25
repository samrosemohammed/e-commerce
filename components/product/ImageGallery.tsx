import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Product } from "@/types/product";

interface ImageGallery {
  product: Product;
}
export const ImageGallery = ({ product }: ImageGallery) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const { price, comparePrice, images, status } = product;
  const discountPercentage = comparePrice
    ? Math.round(((comparePrice - price) / comparePrice) * 100)
    : 0;
  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          alt="Images"
          src={images?.[selectedImage] || "/placeholder.svg"}
          fill
          className="object-cover"
          priority
        />
        {discountPercentage > 0 && (
          <Badge className="absolute top-4 left-4 bg-red-500">
            -{discountPercentage}%
          </Badge>
        )}
        {status === "Draft" && (
          <Badge variant="secondary" className="absolute top-4 right-4">
            Draft
          </Badge>
        )}
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex space-x-2 overflow-x-auto">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
              selectedImage === index ? "border-primary" : "border-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${index + 1}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
