"use client";

import {
  Heart,
  HelpCircle,
  LogIn,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  UserCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LogOutDropDownItem } from "./LogOutButton";

export const UserDropDown = () => {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = !!session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" disabled={isLoading}>
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {isLoggedIn ? (
          <>
            <DropdownMenuItem asChild>
              <Link href="/order" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <LogOutDropDownItem />
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup" className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" />
                Create Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/help" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Help / FAQ
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
