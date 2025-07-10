"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function TextReveal({
  text,
  className,
  duration = 1,
  delay = 0,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={cn("overflow-hidden", className)}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: duration / words.length,
            delay: delay + (index * duration) / words.length,
            ease: "easeOut",
          }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export { TextReveal }; 