import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Bell, Heart, ShoppingCart, User } from "lucide-react";

export const NavBar = () => {
  return (
    <div className="">
      <nav className="px-4 rounded-full text-sm flex items-center justify-between py-1.5 max-w-[1280px] mx-auto">
        <div>
          <Link href={"/"}>Kapada Pasal</Link>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <Link href={"/about"}>About</Link>
          </li>
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <Link href={"/contact"}>Contact</Link>
          </li>
          <li>
            <Link href={"/cart"}>Cart</Link>
          </li>
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant={"ghost"} size={"xs"}>
            <Heart />
          </Button>
          <Button variant={"ghost"} size={"xs"}>
            <Bell />
          </Button>
          <Button variant={"ghost"} size={"xs"}>
            <User />
          </Button>
          <Button variant={"ghost"} size={"xs"}>
            <ShoppingCart />
          </Button>
        </div>
      </nav>
    </div>
  );
};
