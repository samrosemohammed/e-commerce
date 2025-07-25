"use client";
import { trpc } from "@/server/client";
import { ImageGallery } from "./ImageGallery";
import { ProductContent } from "./ProductContent";

interface ProductDetailsProps {
  id: string;
}
export const ProductDetails = ({ id }: ProductDetailsProps) => {
  const { data: productData, isLoading } =
    trpc.adminRouter.getProductById.useQuery({
      id,
    });
  if (isLoading) return <div>Loading...</div>;
  if (!productData) return <div>Product not found</div>;
  return (
    <div className="py-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ImageGallery product={productData} />
        <ProductContent product={productData} />
      </div>
    </div>
  );
};
