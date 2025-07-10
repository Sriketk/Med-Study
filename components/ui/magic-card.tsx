"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MagicCardProps {
  children: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

export default function MagicCard({
  children,
  className,
  gradientSize = 300,
  gradientColor = "#3b82f6",
  gradientOpacity = 0.8,
}: MagicCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-white/5 to-white/20 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:from-gray-900/50 dark:to-gray-800/50",
        className,
      )}
      style={{
        "--gradient-size": `${gradientSize}px`,
        "--gradient-color": gradientColor,
        "--gradient-opacity": gradientOpacity,
      } as React.CSSProperties}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(var(--gradient-size) circle at var(--mouse-x, 0) var(--mouse-y, 0), ${gradientColor}${Math.round(gradientOpacity * 255).toString(16).padStart(2, '0')}, transparent 50%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 