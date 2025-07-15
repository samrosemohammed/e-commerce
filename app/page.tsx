import { FilterCategory } from "@/components/FilterCategory";
import { NavBar } from "@/components/NavBar";
import { ProductCard } from "@/components/product/ProductCard";

export default function Home() {
  return (
    <>
      <main>
        <NavBar />
        <div className="py-10 max-w-screen-2xl mx-auto flex gap-8 w-full">
          <FilterCategory />
          <ProductCard />
        </div>
      </main>
    </>
  );
}
