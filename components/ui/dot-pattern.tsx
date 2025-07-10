"use client";

import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
}

export default function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 0.5,
  cy = 0.5,
  cr = 0.5,
  className,
}: DotPatternProps) {
  // Use a stable ID instead of Math.random() to prevent hydration mismatches
  const id = `dot-pattern-${width}-${height}-${cx}-${cy}-${cr}`;

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className,
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export { DotPattern }; 