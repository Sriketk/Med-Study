"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedBeamProps {
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
  fromRef?: React.RefObject<HTMLElement>;
  toRef?: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  children?: ReactNode;
}

export default function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 2,
  delay = 0,
  pathColor = "#d1d5db",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  children,
}: AnimatedBeamProps) {
  const id = `animated-beam-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
            <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
            <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 10 50 Q 50 25 90 50"
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 10 50 Q 50 25 90 50"
          stroke={`url(#${id})`}
          strokeWidth={pathWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 10"
          className="animate-pulse"
        />
      </svg>
      {children}
    </div>
  );
}

export { AnimatedBeam }; 