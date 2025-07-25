import Link from "next/link";
import { Button } from "./ui/button";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "./ui/input";
import { UserDropDown } from "./UserDropDown";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/context/CartContext";
import { NavShoppingCartIcon } from "./NavShoppingCartIcon";

export const NavBar = () => {
  return (
    <div className="shadow px-4 py-4 sticky top-0 bg-white dark:bg-background dark:border-b z-[10]">
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
          <NavShoppingCartIcon />
          <ThemeToggle />
          <UserDropDown />
        </ul>
      </nav>
    </div>
  );
};
