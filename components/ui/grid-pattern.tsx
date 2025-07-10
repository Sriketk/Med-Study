"use client";

import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: string;
  className?: string;
  squares?: Array<[number, number]>;
}

export default function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  className,
  squares = [],
}: GridPatternProps) {
  const id = `grid-pattern-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
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
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      {squares.map(([x, y], index) => (
        <rect
          key={index}
          width={width - 1}
          height={height - 1}
          x={x * width + 1}
          y={y * height + 1}
          strokeWidth={0}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export { GridPattern }; 