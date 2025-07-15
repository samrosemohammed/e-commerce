import { FilterCategory } from "@/components/FilterCategory";
import { NavBar } from "@/components/NavBar";
import { ProductCard } from "@/components/product/ProductCard";

export default function Home() {
  return (
    <>
      <main>
        <NavBar />
        <div className="px-4 py-4 sm:py-10 max-w-screen-2xl mx-auto flex gap-8 w-full">
          <FilterCategory />
          <ProductCard />
        </div>
      </main>
    </>
  );
}
