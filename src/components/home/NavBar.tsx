import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/button";
import { Bell, Heart, ShoppingCart, User } from "lucide-react";

export const NavBar = () => {
  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Contact",
      href: "/contact",
    },
    {
      name: "Sell",
      href: "/seller",
    },
  ];
  return (
    <div className="">
      <nav className="px-4 mt-2 flex items-center justify-between py-1.5 max-w-screen-2xl mx-auto">
        <div>
          <Link href={"/"}>Kapada Pasal</Link>
        </div>
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="hover:bg-secondary p-2 rounded-md"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant={"ghost"} size={"sm"}>
            <Heart />
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <Bell />
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <User />
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            <ShoppingCart />
          </Button>
        </div>
      </nav>
    </div>
  );
};
