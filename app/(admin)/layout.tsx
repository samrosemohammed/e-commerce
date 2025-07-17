import { PropsWithChildren } from "react";
import {
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSideBar } from "@/components/AppSideBar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSideBar />
      <main className="w-full">
        <header className="border-b flex items-center justify-between px-4 md:px-6 py-2">
          <SidebarTrigger />
          <nav className="flex items-center justify-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 w-[200px] xl:w-[350px]"
              />
            </div>
            <Button variant={"ghost"}>
              <Bell />
            </Button>
            <ThemeToggle />
            <Avatar className="rounded-lg">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </nav>
        </header>
        <div className="px-4 md:px-6 py-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
