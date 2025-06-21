"use client"

import { motion } from "framer-motion"
import { Moon, Sun, Brain, BookOpen, Target, TrendingUp, MessageSquare, Microscope } from "lucide-react"

interface HomePageProps {
  isDark: boolean
  toggleTheme: () => void
  startQuiz: () => void
  startCaseStudy: () => void
  startPrepare: () => void
  viewAnalytics: () => void
}

export default function HomePage({
  isDark,
  toggleTheme,
  startQuiz,
  startCaseStudy,
  startPrepare,
  viewAnalytics,
}: HomePageProps) {
  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-50%",
          right: "-20%",
          width: "40%",
          height: "100%",
          background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
          opacity: 0.05,
          borderRadius: "50%",
          transform: "rotate(-15deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-10%",
          width: "30%",
          height: "60%",
          background: `linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)`,
          opacity: 0.03,
          borderRadius: "50%",
        }}
      />

      <motion.button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "1.5rem",
          right: "1.5rem",
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "0.75rem",
          cursor: "pointer",
          boxShadow: "var(--shadow-lg)",
          zIndex: 10,
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "42rem" }}>
          {/* Header with icon */}
          <motion.div
            style={{ marginBottom: "3rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "5rem",
                height: "5rem",
                backgroundColor: "var(--primary)",
                borderRadius: "50%",
                marginBottom: "2rem",
                boxShadow: "var(--shadow-xl)",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Brain size={32} color="var(--primary-foreground)" />
            </motion.div>

            <motion.h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "900",
                color: "var(--foreground)",
                marginBottom: "1rem",
                letterSpacing: "var(--tracking-normal)",
                lineHeight: "1.1",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              USMLE Step 1
            </motion.h1>
            <motion.div
              style={{
                fontSize: "1.5rem",
                fontWeight: "400",
                color: "var(--foreground)",
                marginBottom: "1.5rem",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Preparation Platform
            </motion.div>
            <motion.p
              style={{
                fontSize: "1.25rem",
                color: "var(--muted-foreground)",
                fontWeight: "400",
                fontStyle: "italic",
                maxWidth: "28rem",
                margin: "0 auto",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Test your knowledge and study effectively
            </motion.p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
              maxWidth: "80rem",
              margin: "0 auto 3rem auto",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Assessment Quiz Card */}
            <motion.div
              onClick={startQuiz}
              style={{
                backgroundColor: "var(--card)",
                padding: "2rem",
                borderRadius: "var(--radius)",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                textAlign: "center",
                cursor: "pointer",
              }}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-xl)",
                borderColor: "var(--primary)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Target size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--card-foreground)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Assessment Quiz
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                Take a comprehensive quiz to gauge your current knowledge level
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <BookOpen size={16} color="var(--muted-foreground)" />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>5 Questions</span>
              </div>
            </motion.div>

            {/* Case Study Card */}
            <motion.div
              onClick={startCaseStudy}
              style={{
                backgroundColor: "var(--card)",
                padding: "2rem",
                borderRadius: "var(--radius)",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                textAlign: "center",
                cursor: "pointer",
              }}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-xl)",
                borderColor: "var(--primary)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--card-foreground)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Case Study
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                Interactive clinical case with chat-based information gathering
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Brain size={16} color="var(--muted-foreground)" />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Interactive</span>
              </div>
            </motion.div>

            {/* Study & Practice Card */}
            <motion.div
              onClick={startPrepare}
              style={{
                backgroundColor: "var(--card)",
                padding: "2rem",
                borderRadius: "var(--radius)",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                textAlign: "center",
                cursor: "pointer",
              }}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-xl)",
                borderColor: "var(--primary)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Microscope size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--card-foreground)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Study & Practice
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                Study specific topics with detailed explanations and immediate feedback
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <BookOpen size={16} color="var(--muted-foreground)" />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>5 Categories</span>
              </div>
            </motion.div>

            {/* Analytics Card */}
            <motion.div
              onClick={viewAnalytics}
              style={{
                backgroundColor: "var(--card)",
                padding: "2rem",
                borderRadius: "var(--radius)",
                border: "2px solid var(--border)",
                boxShadow: "var(--shadow-lg)",
                textAlign: "center",
                cursor: "pointer",
              }}
              whileHover={{
                y: -4,
                boxShadow: "var(--shadow-xl)",
                borderColor: "var(--primary)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <TrendingUp size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--card-foreground)",
                  margin: "0 0 0.5rem 0",
                }}
              >
                Performance Analytics
              </h3>
              <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                Track your progress and identify areas for improvement
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Target size={16} color="var(--muted-foreground)" />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Progress Tracking</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              fontWeight: "300",
            }}
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
