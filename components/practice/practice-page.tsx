"use client"

import { motion } from "framer-motion"
import { Moon, Sun, Award } from "lucide-react"

interface PracticeQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

interface PracticePageProps {
  selectedCategory: string
  questions: PracticeQuestion[]
  currentQuestionIndex: number
  answers: Record<number, number>
  showFeedback: boolean
  practiceComplete: boolean
  isDark: boolean
  toggleTheme: () => void
  onBackToCategories: () => void
  onAnswerSelect: (questionId: number, answerIndex: number) => void
  onSubmitAnswer: () => void
  onNextQuestion: () => void
  onPracticeAgain: () => void
}

export default function PracticePage({
  selectedCategory,
  questions,
  currentQuestionIndex,
  answers,
  showFeedback,
  practiceComplete,
  isDark,
  toggleTheme,
  onBackToCategories,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  onPracticeAgain,
}: PracticePageProps) {
  const currentQuestion = questions[currentQuestionIndex]

  if (practiceComplete) {
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
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <motion.div
            style={{
              textAlign: "center",
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "3rem",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                marginBottom: "1.5rem",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Award size={24} color="white" />
            </motion.div>

            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "900",
                color: "var(--card-foreground)",
                marginBottom: "1rem",
              }}
            >
              Practice Complete!
            </h2>

            <p
              style={{
                fontSize: "1.125rem",
                color: "var(--muted-foreground)",
                marginBottom: "2rem",
              }}
            >
              You've completed all {questions.length} questions in {selectedCategory}
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={onPracticeAgain}
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
                  transition: "all 0.2s ease",
                }}
              >
                Practice Again
              </button>

              <button
                onClick={onBackToCategories}
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
                  transition: "all 0.2s ease",
                }}
              >
                Choose Another Category
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

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
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--foreground)",
                marginBottom: "0.25rem",
              }}
            >
              {selectedCategory} Practice
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
              }}
            >
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={onBackToCategories}
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
              Back to Categories
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

        {/* Progress Bar */}
        <motion.div
          style={{
            width: "100%",
            height: "0.5rem",
            backgroundColor: "var(--muted)",
            borderRadius: "9999px",
            overflow: "hidden",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            style={{
              height: "100%",
              backgroundColor: "var(--primary)",
              borderRadius: "9999px",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Question Card */}
        <motion.div
          style={{
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            boxShadow: "var(--shadow-lg)",
            padding: "2rem",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "var(--card-foreground)",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            {currentQuestion.question}
          </h2>

          <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(currentQuestion.id, index)}
                disabled={showFeedback}
                style={{
                  width: "100%",
                  padding: "1rem",
                  textAlign: "left",
                  backgroundColor:
                    showFeedback && index === currentQuestion.correct
                      ? "#dcfce7"
                      : showFeedback && answers[currentQuestion.id] === index && index !== currentQuestion.correct
                        ? "#fee2e2"
                        : answers[currentQuestion.id] === index
                          ? "var(--accent)"
                          : "var(--secondary)",
                  border:
                    showFeedback && index === currentQuestion.correct
                      ? "2px solid #10b981"
                      : showFeedback && answers[currentQuestion.id] === index && index !== currentQuestion.correct
                        ? "2px solid #ef4444"
                        : answers[currentQuestion.id] === index
                          ? "2px solid var(--primary)"
                          : "2px solid var(--border)",
                  borderRadius: "var(--radius)",
                  color: "var(--card-foreground)",
                  cursor: showFeedback ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  fontSize: "1rem",
                  opacity:
                    showFeedback && index !== currentQuestion.correct && answers[currentQuestion.id] !== index
                      ? 0.6
                      : 1,
                }}
              >
                <span style={{ fontWeight: "600", marginRight: "0.5rem" }}>{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>

          {!showFeedback ? (
            <button
              onClick={onSubmitAnswer}
              disabled={answers[currentQuestion.id] === undefined}
              style={{
                width: "100%",
                backgroundColor: answers[currentQuestion.id] !== undefined ? "var(--primary)" : "var(--muted)",
                color:
                  answers[currentQuestion.id] !== undefined ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: answers[currentQuestion.id] !== undefined ? "pointer" : "not-allowed",
                boxShadow: "var(--shadow-md)",
                transition: "all 0.2s ease",
              }}
            >
              Submit Answer
            </button>
          ) : (
            <div>
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: answers[currentQuestion.id] === currentQuestion.correct ? "#dcfce7" : "#fee2e2",
                  border: `1px solid ${answers[currentQuestion.id] === currentQuestion.correct ? "#10b981" : "#ef4444"}`,
                  borderRadius: "var(--radius)",
                  marginBottom: "1rem",
                }}
              >
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: answers[currentQuestion.id] === currentQuestion.correct ? "#065f46" : "#991b1b",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {answers[currentQuestion.id] === currentQuestion.correct ? "Correct!" : "Incorrect"}
                </h4>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: answers[currentQuestion.id] === currentQuestion.correct ? "#047857" : "#dc2626",
                    margin: 0,
                    lineHeight: "1.4",
                  }}
                >
                  {currentQuestion.explanation}
                </p>
              </div>

              <button
                onClick={onNextQuestion}
                style={{
                  width: "100%",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-md)",
                  transition: "all 0.2s ease",
                }}
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Practice"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
