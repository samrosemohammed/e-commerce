"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // or your preferred icon

interface LoadingProps {
  className?: string;
  text?: string;
}

export const Loading = ({ className, text = "Loading..." }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 py-8 text-muted-foreground h-[80vh]",
        className
      )}
    >
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>{text}</span>
    </div>
  );
};
