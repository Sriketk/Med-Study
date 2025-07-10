"use client";

import { cn } from "@/lib/utils";
import { ReactNode, forwardRef } from "react";

interface RainbowButtonProps {
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

const RainbowButton = forwardRef<HTMLButtonElement, RainbowButtonProps & React.HTMLAttributes<HTMLButtonElement>>(
  ({ children, className, asChild = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-[#ff0000] via-[#ff7f00] via-[#ffff00] via-[#00ff00] via-[#0000ff] via-[#4b0082] to-[#9400d3] p-[1px] text-sm font-medium text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:shadow-lg hover:shadow-slate-400/25",
          className
        )}
        {...props}
      >
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all duration-300 group-hover:bg-slate-900">
          {children}
        </span>
      </button>
    );
  }
);

RainbowButton.displayName = "RainbowButton";

export default RainbowButton;
export { RainbowButton }; 