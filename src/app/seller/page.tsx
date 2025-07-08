import { SellerAuthTabs } from "@/components/seller/SellerAuthTabs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Portal | Fashion Collection",
  description: "Create a seller account or login to manage your clothing store",
};

export default function SellerAuthPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Seller Portal</h1>
          <p className="text-muted-foreground">
            Create or manage your clothing store
          </p>
        </div>

        <div className="bg-accent/50 rounded-lg shadow-lg p-6">
          <SellerAuthTabs />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Looking to shop?{" "}
            <a
              href="/products"
              className="font-medium underline hover:text-primary"
            >
              Return to store
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
