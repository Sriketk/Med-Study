"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: string
  explanation: string
}

interface QuizPageProps {
  questions: Question[]
  currentQuestion: number
  answers: Record<number, number>
  isDark: boolean
  toggleTheme: () => void
  onAnswerSelect: (questionId: number, answerIndex: number) => void
  onNext: () => void
  onPrevious: () => void
  onSubmit: () => void
  onQuestionNavigate: (index: number) => void
}

export default function QuizPage({
  questions,
  currentQuestion,
  answers,
  isDark,
  toggleTheme,
  onAnswerSelect,
  onNext,
  onPrevious,
  onSubmit,
  onQuestionNavigate,
}: QuizPageProps) {
  const canSubmitQuiz = () => {
    return Object.keys(answers).length === questions.length
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div
        data-header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "var(--background)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border)",
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--foreground)" }}>Assessment Quiz</h1>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.25rem" }}>
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onQuestionNavigate(index)}
                    style={{
                      width: "0.75rem",
                      height: "0.75rem",
                      borderRadius: "50%",
                      backgroundColor:
                        index === currentQuestion
                          ? "var(--primary)"
                          : answers[questions[index].id] !== undefined
                            ? "#10b981"
                            : "var(--muted)",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={toggleTheme}
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "0.5rem",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.2s ease",
                }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Single Question */}
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
        <motion.div
          key={currentQuestion}
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-lg)",
            padding: "2rem",
            marginBottom: "2rem",
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <span
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  Question {currentQuestion + 1}
                </span>
                <span
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                >
                  {currentQuestionData.category}
                </span>
                <span
                  style={{
                    backgroundColor:
                      currentQuestionData.difficulty === "Easy"
                        ? "#dcfce7"
                        : currentQuestionData.difficulty === "Medium"
                          ? "#fef3c7"
                          : "#fee2e2",
                    color:
                      currentQuestionData.difficulty === "Easy"
                        ? "#065f46"
                        : currentQuestionData.difficulty === "Medium"
                          ? "#92400e"
                          : "#991b1b",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                >
                  {currentQuestionData.difficulty}
                </span>
              </div>

              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "var(--card-foreground)",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {currentQuestionData.question}
              </h3>
            </div>

            <div style={{ display: "grid", gap: "0.75rem" }}>
              {currentQuestionData.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => onAnswerSelect(currentQuestionData.id, optionIndex)}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    textAlign: "left",
                    backgroundColor:
                      answers[currentQuestionData.id] === optionIndex ? "var(--accent)" : "var(--secondary)",
                    border:
                      answers[currentQuestionData.id] === optionIndex
                        ? "2px solid var(--primary)"
                        : "2px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--card-foreground)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    if (answers[currentQuestionData.id] !== optionIndex) {
                      e.currentTarget.style.backgroundColor = "var(--accent)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[currentQuestionData.id] !== optionIndex) {
                      e.currentTarget.style.backgroundColor = "var(--secondary)"
                    }
                  }}
                >
                  <span style={{ fontWeight: "600", marginRight: "0.5rem" }}>
                    {String.fromCharCode(65 + optionIndex)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Navigation and Submit Panel */}
        <div
          style={{
            position: "sticky",
            bottom: "2rem",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-lg)",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={onPrevious}
              disabled={currentQuestion === 0}
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                opacity: currentQuestion === 0 ? 0.5 : 1,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              onClick={onNext}
              disabled={currentQuestion === questions.length - 1}
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: currentQuestion === questions.length - 1 ? "not-allowed" : "pointer",
                opacity: currentQuestion === questions.length - 1 ? 0.5 : 1,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {Object.keys(answers).length} of {questions.length} answered
            </span>

            <button
              onClick={onSubmit}
              disabled={!canSubmitQuiz()}
              style={{
                backgroundColor: canSubmitQuiz() ? "var(--primary)" : "var(--muted)",
                color: canSubmitQuiz() ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: canSubmitQuiz() ? "pointer" : "not-allowed",
                boxShadow: "var(--shadow-md)",
                transition: "all 0.2s ease",
              }}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
