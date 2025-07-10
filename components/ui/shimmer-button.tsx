"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  asChild?: boolean;
}

export default function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "150px",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "radial-gradient(ellipse 80% 80% at 50% 120%, rgba(120, 119, 198, 0.3), transparent)",
  asChild = false,
  ...props
}: ShimmerButtonProps & React.HTMLAttributes<HTMLElement>) {
  
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--border-radius": borderRadius,
          "--shimmer-duration": shimmerDuration,
          "--background": background,
        } as React.CSSProperties
      }
      className={cn(
        "relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950 px-6 py-2 text-slate-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-slate-400/25",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        className
      )}
      {...props as any}
    >
      {children}
    </button>
  );
}

export { ShimmerButton }; 