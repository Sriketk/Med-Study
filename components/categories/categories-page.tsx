"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Moon, Sun, ChevronRight } from "lucide-react"
import type { Category } from "@/types"

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
  const { theme, setTheme } = useTheme()

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
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-card text-foreground border border-border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-200 hover:bg-card/80"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                onClick={() => onSelectCategory(category.name)}
                className="bg-card border-2 border-border rounded-lg shadow-lg p-8 cursor-pointer transition-all duration-150"
                style={{
                  '--hover-border-color': category.color,
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = category.color
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = ''
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-xl)",
                }}
                transition={{ duration: 0.15 }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full mr-4"
                    style={{ backgroundColor: category.color }}
                  >
                    <Icon size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.questionCount} questions
                    </p>
                  </div>
                </div>

                <p className="text-base text-muted-foreground leading-6 mb-6">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-medium">
                    Click to start practicing
                  </span>
                  <ChevronRight size={20} className="text-muted-foreground" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
