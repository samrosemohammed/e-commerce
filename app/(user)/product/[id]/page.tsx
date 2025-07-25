import { ProductDetails } from "@/components/product/ProductDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}
