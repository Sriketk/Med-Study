"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/lib/types";

interface UnifiedCategoryCardProps {
  category: Category;
  href?: string;
  onClick?: () => void;
  actionText?: string;
}

export function UnifiedCategoryCard({
  category,
  href,
  onClick,
  actionText,
}: UnifiedCategoryCardProps) {
  const Icon = category.icon;

  const cardContent = (
    <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 cursor-pointer transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl h-52 flex flex-col">
      {/* Header Section - Fixed height */}
      <div className="h-16 flex items-center mb-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full mr-4 bg-primary">
          <Icon size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-card-foreground">
            {category.name}
          </h3>
        </div>
      </div>

      {/* Description Section - Fixed height with overflow handling */}
      <div className="h-20 mb-4">
        <p className="text-base text-muted-foreground leading-6">
          {category.description}
        </p>
      </div>

      {/* Action Section - Fixed at bottom */}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">
          {actionText}
        </span>
        <ChevronRight size={20} className="text-muted-foreground" />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return <div onClick={onClick}>{cardContent}</div>;
}
