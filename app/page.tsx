import { FilterCategory } from "@/components/FilterCategory";
import { NavBar } from "@/components/NavBar";
import { ProductCard } from "@/components/product/ProductCard";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log("Logged-in user session:", session);

  return (
    <>
      <main>
        {/* <NavBar /> */}
        <div className="px-4 py-4 sm:py-10 max-w-screen-2xl mx-auto flex gap-8 w-full">
          <FilterCategory />
          <ProductCard />
        </div>
      </main>
    </>
  );
}
