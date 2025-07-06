"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-card text-foreground border border-border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-200 hover:bg-card/80"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
} 