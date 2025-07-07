"use client"

import type React from "react"
import type { Category } from "@/lib/types"
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle"
import { CategoryCard } from "@/components/shared/category-card"
import { BackToHomeButton } from "@/components/shared/back-to-home-button"

interface CategoriesPageProps {
  categories: Category[]
  onSelectCategory: (categoryName: string) => void
}

export default function CategoriesPage({
  categories,
  onSelectCategory,
}: CategoriesPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-foreground mb-2">
              Study Categories
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose a category to practice with detailed explanations
            </p>
          </div>

          <div className="flex gap-3">
            <BackToHomeButton />
            <DarkModeToggle />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              onClick={() => onSelectCategory(category.name)}
              variant="practice"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
