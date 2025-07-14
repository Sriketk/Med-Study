"use client";

import type { Category } from "@/lib/types";
import { UnifiedCategoryCard } from "./unified-category-card";

interface CategoryCardProps {
  category: Category;
  href?: string;
  onClick?: () => void;
  variant?: "practice" | "comparison" | "case-study";
  actionText?: string;
}

export function CategoryCard({
  category,
  href,
  onClick,
  variant = "practice",
  actionText,
}: CategoryCardProps) {
  // Generate href based on variant if not provided
  const getHref = () => {
    if (href) return href;

    const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");

    switch (variant) {
      case "comparison":
        return `/question-comparison/${categorySlug}`;
      case "case-study":
        return `/case-study/${categorySlug}`;
      case "practice":
      default:
        return `/practice/${categorySlug}`;
    }
  };

  // Generate action text based on variant if not provided
  const getActionText = () => {
    if (actionText) return actionText;

    switch (variant) {
      case "comparison":
        return "Compare questions";
      case "case-study":
        return "Start case study";
      case "practice":
      default:
        return "Click to start practicing";
    }
  };

  return (
    <UnifiedCategoryCard
      category={category}
      href={getHref()}
      onClick={onClick}
      actionText={getActionText()}
    />
  );
}
