"use client"

import type React from "react"
import type { Category } from "@/types"
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle"
import { CategoryCard } from "@/components/shared/category-card"

interface CategoriesPageProps {
  categories: Category[]
  onBackToHome: () => void
  onSelectCategory: (categoryName: string) => void
}

export default function CategoriesPage({
  categories,
  onBackToHome,
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
            <button
              onClick={onBackToHome}
              className="bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-secondary/80"
            >
              Back to Home
            </button>
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
