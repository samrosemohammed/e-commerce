"use client";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
export const LogOutDropDownItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogOut = async () => {
    setIsLoading(true);
    await signOut({
      callbackUrl: "/",
    });
    setIsLoading(false);
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="cursor-alias flex items-center gap-1.5 px-2.5 py-1 text-sm hover:bg-accent rounded-sm">
            <LogOut className="w-4 h-4 opacity-70" />
            Logout
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You&#39;ll be signed out of your account and redirected to the
              homepage. You can log back in at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={handleLogOut}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isLoading ? "Loggin Out.." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
