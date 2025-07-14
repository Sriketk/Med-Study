"use client";

import { BackToHomeButton } from "@/components/shared/back-to-home-button";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { categories } from "@/data/categories";
import { CategoryCard } from "@/components/shared/category-card";
import { Scale } from "lucide-react";

export default function Practice() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary">
              <Scale size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Practice
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Practice Questions
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <BackToHomeButton />
            <DarkModeToggle />
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              href={`/practice/${category.name.toLowerCase()}`}
              variant="practice"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
