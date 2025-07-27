"use client";

import { trpc } from "@/server/client";
import { ImageGallery } from "./ImageGallery";
import { ProductContent } from "./ProductContent";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, TriangleAlert } from "lucide-react";

interface ProductDetailsProps {
  id: string;
}

export const ProductDetails = ({ id }: ProductDetailsProps) => {
  const { data: productData, isLoading } =
    trpc.adminRouter.getProductById.useQuery({ id });

  if (isLoading) {
    return (
      <div className="min-h-[70vh] max-w-screen-md mx-auto flex items-center justify-center">
        <Loader2 className="animate-spin w-16 h-16 text-muted-foreground" />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="py-4 max-w-screen-md mx-auto">
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Product Not Found</AlertTitle>
          <AlertDescription>
            We couldn't find the product you're looking for.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ImageGallery product={productData} />
        <ProductContent product={productData} />
      </div>
    </div>
  );
};
