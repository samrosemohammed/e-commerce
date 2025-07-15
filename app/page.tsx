import { FilterCategory } from "@/components/FilterCategory";
import { NavBar } from "@/components/NavBar";

export default function Home() {
  return (
    <>
      <main>
        <NavBar />
        <div className="max-w-screen-2xl mx-auto flex gap-2">
          <FilterCategory />
        </div>
      </main>
    </>
  );
}
