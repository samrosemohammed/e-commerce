import { FilterCategory } from "@/components/FilterCategory";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterProvider } from "@/context/FilterContext";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <FilterProvider>
      <main>
        <div className="px-4 py-4 sm:py-10 max-w-screen-2xl mx-auto flex gap-8 w-full">
          <FilterCategory />
          <ProductCard />
        </div>
      </main>
    </FilterProvider>
  );
}
