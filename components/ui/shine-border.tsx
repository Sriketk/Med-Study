"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ShineBorderProps {
  children: ReactNode;
  className?: string;
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
}

export default function ShineBorder({
  children,
  className,
  borderRadius = 12,
  borderWidth = 1,
  duration = 3,
  color = ["#3b82f6", "#8b5cf6", "#06b6d4"],
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color : [color];
  
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
        className,
      )}
      style={{
        borderRadius: `${borderRadius}px`,
        padding: `${borderWidth}px`,
      }}
    >
      {/* Animated shine border */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          backgroundSize: "200% 100%",
          animation: `shine ${duration}s ease-in-out infinite`,
        }}
      />
      
      {/* Content */}
      <div
        className="relative z-10 rounded-lg bg-background/95 backdrop-blur-sm dark:bg-background/90"
        style={{
          borderRadius: `${borderRadius - borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
} 