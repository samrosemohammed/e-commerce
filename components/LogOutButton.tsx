"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export const LogOutDropDownItem = () => {
  return (
    <DropdownMenuItem
      onClick={() => signOut()}
      className="flex items-center gap-2"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </DropdownMenuItem>
  );
};
