"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
  duration?: number;
}

export default function NumberTicker({
  value,
  direction = "up",
  className,
  delay = 0,
  duration = 2,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const startValue = direction === "down" ? value : 0;
      const endValue = direction === "down" ? 0 : value;
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
        setDisplayValue(currentValue);
        
        if (progress >= 1) {
          clearInterval(interval);
        }
      }, 16);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [value, direction, delay, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

export { NumberTicker }; 