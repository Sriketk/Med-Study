"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animate?: boolean;
}

export default function GradientText({
  children,
  className,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4"],
  animate = false,
}: GradientTextProps) {
  const gradientColors = colors.join(", ");
  
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent",
        animate && "animate-gradient bg-[length:200%_200%]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${gradientColors})`,
      }}
    >
      {children}
    </span>
  );
} 