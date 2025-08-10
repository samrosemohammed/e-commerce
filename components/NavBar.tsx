"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { UserDropDown } from "./UserDropDown";
import { ThemeToggle } from "./ThemeToggle";
import { NavShoppingCartIcon } from "./NavShoppingCartIcon";
import { NavWishList } from "./NavWishList";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const NavBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  if (pathname.startsWith("/dashboard")) return null;
  if (session?.user.role === "admin") return null;
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
          <NavWishList />
          <ThemeToggle />
          <UserDropDown />
        </ul>
      </nav>
    </div>
  );
};
