"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Moon, Sun, Brain, BookOpen, Target, TrendingUp, MessageSquare, Microscope } from "lucide-react"
import { OnboardingData } from "@/types"
import Link from "next/link"

interface HomePageProps {
  onboardingData: OnboardingData
  onStartQuiz: () => void
  onStartCaseStudy: () => void
  onStartPrepare: () => void
  onViewAnalytics: () => void
}

export default function HomePage({
  onboardingData,
  onStartQuiz,
  onStartCaseStudy,
  onStartPrepare,
  onViewAnalytics,
}: HomePageProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <div
        className="absolute -top-1/2 -right-1/4 w-2/5 h-full opacity-5 rounded-full transform -rotate-12"
        style={{
          background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
        }}
      />
      <div
        className="absolute -bottom-1/3 -left-1/4 w-1/3 h-3/5 opacity-5 rounded-full"
        style={{
          background: `linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)`,
        }}
      />

      <motion.button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-6 right-6 bg-card text-foreground border border-border rounded-lg p-3 cursor-pointer shadow-lg z-50 hover:bg-card/80 transition-colors duration-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <div className="flex items-center justify-center min-h-screen p-8 relative z-10">
        <div className="text-center max-w-7xl w-full">
          {/* Header with icon */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-8 shadow-xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Brain size={32} className="text-primary-foreground" />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-normal leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              USMLE Step 1
            </motion.h1>
            <motion.div
              className="text-xl md:text-2xl font-normal text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Preparation Platform
            </motion.div>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-normal italic max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Test your knowledge and study effectively
            </motion.p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Assessment Quiz Card */}
            <Link href="/quiz" passHref>
              <motion.div
                className="bg-card p-6 rounded-lg border border-border hover:border-2 hover:border-primary shadow-lg text-center cursor-pointer h-full flex flex-col transition-all duration-200"
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-xl)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Target size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3 min-h-[3rem] flex items-center justify-center">
                  Assessment Quiz
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[4rem] flex items-center">
                  Take a comprehensive quiz to gauge your current knowledge level
                </p>
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <BookOpen size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">5 Questions</span>
                </div>
              </motion.div>
            </Link>

            {/* Case Study Card */}
            <Link href="/case-study" passHref>
              <motion.div
                className="bg-card p-6 rounded-lg border border-border hover:border-2 hover:border-primary shadow-lg text-center cursor-pointer h-full flex flex-col transition-all duration-200"
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-xl)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3 min-h-[3rem] flex items-center justify-center">
                  Case Study
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[4rem] flex items-center">
                  Interactive clinical case with chat-based information gathering
                </p>
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <Brain size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Interactive</span>
                </div>
              </motion.div>
            </Link>

            {/* Study & Practice Card */}
            <Link href="/categories" passHref>
              <motion.div
                className="bg-card p-6 rounded-lg border border-border hover:border-2 hover:border-primary shadow-lg text-center cursor-pointer h-full flex flex-col transition-all duration-200"
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-xl)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Microscope size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3 min-h-[3rem] flex items-center justify-center">
                  Study & Practice
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[4rem] flex items-center">
                  Study specific topics with detailed explanations and immediate feedback
                </p>
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <BookOpen size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">5 Categories</span>
                </div>
              </motion.div>
            </Link>

            {/* Analytics Card */}
            <Link href="/analytics" passHref>
              <motion.div
                className="bg-card p-6 rounded-lg border border-border hover:border-2 hover:border-primary shadow-lg text-center cursor-pointer h-full flex flex-col transition-all duration-200"
                whileHover={{
                  y: -4,
                  boxShadow: "var(--shadow-xl)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <TrendingUp size={32} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-card-foreground mb-3 min-h-[3rem] flex items-center justify-center">
                   Analytics
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[4rem] flex items-center">
                  Track your progress and identify areas for improvement and growth
                </p>
                <div className="flex items-center justify-center gap-2 mt-auto">
                  <Target size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Progress Tracking</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-sm text-muted-foreground font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Choose your learning path to excel in your USMLE Step 1 preparation
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
