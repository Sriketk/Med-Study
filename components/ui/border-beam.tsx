"use client";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export default function BorderBeam({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden rounded-[inherit] [mask:linear-gradient(white,white)]",
        className,
      )}
    >
      <div
        className="absolute aspect-square w-full rotate-[-90deg] animate-border-beam"
        style={{
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${anchor}deg, transparent 0deg, ${colorFrom} 72deg, ${colorTo} 144deg, transparent 216deg)`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      </div>
    </div>
  );
}

export { BorderBeam }; 