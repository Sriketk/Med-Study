"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradientText({
  children,
  className,
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]",
        className,
      )}
    >
      {children}
    </span>
  );
} 