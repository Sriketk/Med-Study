"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: string
  explanation: string
}

interface Category {
  name: string
  icon: any
  color: string
  description: string
  questionCount: number
}

interface ResultsPageProps {
  questions: Question[]
  answers: Record<number, number>
  categories: Category[]
  onTakeAnotherQuiz: () => void
  onPracticeByCategory: () => void
  onViewAnalytics: () => void
}

export default function ResultsPage({
  questions,
  answers,
  categories,
  onTakeAnotherQuiz,
  onPracticeByCategory,
  onViewAnalytics,
}: ResultsPageProps) {
  const calculateResults = () => {
    const totalQuestions = questions.length
    const correctAnswers = questions.filter((q) => answers[q.id] === q.correct).length
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    // Category performance
    const categoryStats = questions.reduce(
      (acc, question) => {
        const isCorrect = answers[question.id] === question.correct
        if (!acc[question.category]) {
          acc[question.category] = { correct: 0, total: 0 }
        }
        acc[question.category].total++
        if (isCorrect) acc[question.category].correct++
        return acc
      },
      {} as Record<string, { correct: number; total: number }>,
    )

    // Difficulty performance
    const difficultyStats = questions.reduce(
      (acc, question) => {
        const isCorrect = answers[question.id] === question.correct
        if (!acc[question.difficulty]) {
          acc[question.difficulty] = { correct: 0, total: 0 }
        }
        acc[question.difficulty].total++
        if (isCorrect) acc[question.difficulty].correct++
        return acc
      },
      {} as Record<string, { correct: number; total: number }>,
    )

    return {
      score,
      correctAnswers,
      totalQuestions,
      categoryStats,
      difficultyStats,
    }
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "var(--primary)", icon: Award }
    if (score >= 80) return { level: "Good", color: "#10b981", icon: TrendingUp }
    if (score >= 70) return { level: "Fair", color: "#f59e0b", icon: AlertCircle }
    return { level: "Needs Improvement", color: "#ef4444", icon: TrendingDown }
  }

  const results = calculateResults()
  const performance = getPerformanceLevel(results.score)
  const PerformanceIcon = performance.icon

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
            textAlign: "center",
            marginBottom: "3rem",
          }}
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
              backgroundColor: performance.color,
              borderRadius: "50%",
              marginBottom: "1.5rem",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PerformanceIcon size={32} color="white" />
          </motion.div>

          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "900",
              color: "var(--foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Quiz Complete!
          </h1>

          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: performance.color,
              marginBottom: "1rem",
            }}
          >
            {performance.level}
          </p>

          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--muted-foreground)",
            }}
          >
            You scored {results.score}% ({results.correctAnswers}/{results.totalQuestions} correct)
          </p>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Category Performance */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Performance by Category
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {Object.entries(results.categoryStats).map(([category, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100)
                const categoryInfo = categories.find((cat) => cat.name === category)

                return (
                  <div
                    key={category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {categoryInfo && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2rem",
                            height: "2rem",
                            backgroundColor: categoryInfo.color,
                            borderRadius: "50%",
                          }}
                        >
                          <categoryInfo.icon size={16} color="white" />
                        </div>
                      )}
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "var(--card-foreground)",
                            margin: 0,
                          }}
                        >
                          {category}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--muted-foreground)",
                            margin: 0,
                          }}
                        >
                          {stats.correct}/{stats.total} correct
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444",
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Difficulty Performance */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Performance by Difficulty
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {Object.entries(results.difficultyStats).map(([difficulty, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100)

                return (
                  <div
                    key={difficulty}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "var(--card-foreground)",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        {difficulty}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--muted-foreground)",
                          margin: 0,
                        }}
                      >
                        {stats.correct}/{stats.total} correct
                      </p>
                    </div>

                    <div
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "700",
                        color: percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444",
                      }}
                    >
                      {percentage}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.button
            onClick={onTakeAnotherQuiz}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "var(--radius)",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Take Another Quiz
          </motion.button>

          <motion.button
            onClick={onPracticeByCategory}
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--secondary-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Practice by Category
          </motion.button>

          <motion.button
            onClick={onViewAnalytics}
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--secondary-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Analytics
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
