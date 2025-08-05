import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface MaxWidthWrapperProps {
  className?: string;
}
export const MaxWidthWrapper = ({
  children,
  className,
}: PropsWithChildren & MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "max-w-screen-2xl mx-auto sm:px-0 px-4 sm:py-10 py-4",
        className
      )}
    >
      {children}
    </div>
  );
};
