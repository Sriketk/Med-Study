"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonGradientCardProps {
  children: ReactNode;
  className?: string;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: {
    firstColor: string;
    secondColor: string;
  };
}

export default function NeonGradientCard({
  children,
  className,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#3b82f6",
    secondColor: "#8b5cf6",
  },
}: NeonGradientCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm",
        className,
      )}
      style={{
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-xl opacity-75 blur-sm"
        style={{
          background: `linear-gradient(90deg, ${neonColors.firstColor}, ${neonColors.secondColor}, ${neonColors.firstColor})`,
          backgroundSize: "200% 100%",
          animation: "gradient-shift 3s ease-in-out infinite",
        }}
      />
      
      {/* Content container */}
      <div
        className="relative z-10 h-full w-full rounded-xl bg-background/90 backdrop-blur-sm dark:bg-background/80"
        style={{
          margin: `${borderSize}px`,
          borderRadius: `${borderRadius - borderSize}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
} 