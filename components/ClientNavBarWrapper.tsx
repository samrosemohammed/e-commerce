"use client";

import { useSession } from "next-auth/react";
import { NavBar } from "./NavBar";
import { useEffect, useState } from "react";

export const ClientNavBarWrapper = () => {
  const { data: session, status } = useSession();
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    // Show navbar if user is not admin or not logged in
    setShowNavBar(!session?.user?.role || session.user.role !== "admin");
  }, [session, status]);

  // Don't render anything while loading to prevent flash
  if (status === "loading") {
    return null;
  }

  return showNavBar ? <NavBar /> : null;
};
