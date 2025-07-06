"use client";

import { ChevronRight, Scale } from "lucide-react";
import Link from "next/link";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  href?: string;
  onClick?: () => void;
  variant?: "practice" | "comparison";
  actionText?: string;
}

export function CategoryCard({
  category,
  href,
  onClick,
  variant = "practice",
  actionText,
}: CategoryCardProps) {
  const Icon = category.icon;
  
  const cardContent = (
    <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 cursor-pointer transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl h-52 flex flex-col">
              {variant === "comparison" ? (
          // Centered layout for comparison
          <div className="text-center flex flex-col h-full">
            {/* Icon Section - Fixed height */}
            <div className="flex justify-center items-center h-16 mb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary">
                <Icon size={24} color="white" />
              </div>
            </div>
            
            {/* Title Section - Fixed height */}
            <div className="h-16 flex items-center justify-center mb-2">
              <h3 className="text-2xl font-bold text-card-foreground text-center">
                {category.name}
              </h3>
            </div>
            
            {/* Description Section - Fixed height with overflow handling */}
            <div className="h-20 flex items-start justify-center mb-4">
              <p className="text-sm text-muted-foreground leading-relaxed text-center">
                {category.description}
              </p>
            </div>
            
            {/* Action Section - Fixed at bottom */}
            <div className="mt-auto flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Scale size={16} />
              <span>{actionText || "Compare questions"}</span>
            </div>
          </div>
        ) : (
          // Left-aligned layout for practice
          <div className="flex flex-col h-full">
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
                {actionText || "Click to start practicing"}
              </span>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </div>
        )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return (
    <div onClick={onClick}>
      {cardContent}
    </div>
  );
} 