"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackToCategoriesButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export function BackToCategoriesButton({
  href,
  label = "Back to Categories",
  className = "",
}: BackToCategoriesButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant="outline"
        className={`flex items-center gap-2 ${className}`}
      >
        <ArrowLeft size={16} />
        {label}
      </Button>
    </Link>
  );
}
