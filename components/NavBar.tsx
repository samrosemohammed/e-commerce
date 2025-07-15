import Link from "next/link";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";

export const NavBar = () => {
  return (
    <div className="shadow py-4 sticky top-0 bg-white z-[999]">
      <nav className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <Link href={"/"}>Kapada Pasal</Link>
        <ul className="flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-[200px] xl:w-[450px]"
            />
          </div>
          <Button variant={"ghost"} asChild>
            <Link href={"/cart"}>
              <ShoppingCart />
            </Link>
          </Button>
          <Button variant={"ghost"} asChild>
            <Link href={"/user"}>
              <User />
            </Link>
          </Button>
        </ul>
      </nav>
    </div>
  );
};
