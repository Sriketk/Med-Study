"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Moon, Sun, ChevronRight } from "lucide-react"

interface Category {
  name: string
  icon: React.ComponentType<{ size: number; color: string }>
  color: string
  description: string
  questionCount: number
}

interface CategoriesPageProps {
  categories: Category[]
  isDark: boolean
  toggleTheme: () => void
  onBackToHome: () => void
  onSelectCategory: (categoryName: string) => void
}

export default function CategoriesPage({
  categories,
  isDark,
  toggleTheme,
  onBackToHome,
  onSelectCategory,
}: CategoriesPageProps) {
  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        padding: "2rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            >
              Study Categories
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
              }}
            >
              Choose a category to practice with detailed explanations
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={onBackToHome}
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Back to Home
            </button>
            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.name}
                onClick={() => onSelectCategory(category.name)}
                style={{
                  backgroundColor: "var(--card)",
                  border: "2px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "2rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-xl)",
                  borderColor: category.color,
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: category.color,
                      borderRadius: "50%",
                      marginRight: "1rem",
                    }}
                  >
                    <Icon size={24} color="white" />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "var(--card-foreground)",
                        margin: 0,
                      }}
                    >
                      {category.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--muted-foreground)",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {category.questionCount} questions
                    </p>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--muted-foreground)",
                    lineHeight: "1.5",
                    marginBottom: "1.5rem",
                  }}
                >
                  {category.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--muted-foreground)",
                      fontWeight: "500",
                    }}
                  >
                    Click to start practicing
                  </span>
                  <ChevronRight size={20} color="var(--muted-foreground)" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}
