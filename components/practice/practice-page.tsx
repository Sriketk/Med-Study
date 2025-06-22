"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
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
  onBackToCategories,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  onPracticeAgain,
}: PracticePageProps) {
  const { theme, setTheme } = useTheme()
  const currentQuestion = questions[currentQuestionIndex]

  if (practiceComplete) {
    return (
      <motion.div
        className="min-h-screen bg-background text-foreground p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center bg-card border border-border rounded-lg shadow-lg p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Award size={24} color="white" />
            </motion.div>

            <h2 className="text-3xl font-black text-card-foreground mb-4">
              Practice Complete!
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              You've completed all {questions.length} questions in {selectedCategory}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onPracticeAgain}
                className="bg-primary text-primary-foreground border-none rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md transition-all duration-200 hover:opacity-90"
              >
                Practice Again
              </button>

              <button
                onClick={onBackToCategories}
                className="bg-secondary text-secondary-foreground border border-border rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md transition-all duration-200 hover:bg-secondary/80"
              >
                Choose Another Category
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  const getOptionStyles = (index: number) => {
    const isSelected = answers[currentQuestion.id] === index
    const isCorrect = index === currentQuestion.correct
    const isUserAnswerIncorrect = showFeedback && isSelected && !isCorrect
    const isCorrectAnswer = showFeedback && isCorrect
    const isUnselectedInFeedback = showFeedback && !isSelected && !isCorrect

    let baseClasses = "w-full p-4 text-left rounded-lg text-base transition-all duration-200 "
    
    if (isCorrectAnswer) {
      baseClasses += "bg-green-50 border-2 border-green-500 text-card-foreground cursor-not-allowed"
    } else if (isUserAnswerIncorrect) {
      baseClasses += "bg-red-50 border-2 border-red-500 text-card-foreground cursor-not-allowed"
    } else if (isSelected) {
      baseClasses += "bg-accent border-2 border-primary text-card-foreground cursor-pointer"
    } else {
      baseClasses += "bg-secondary border-2 border-border text-card-foreground hover:bg-secondary/80"
      baseClasses += showFeedback ? " cursor-not-allowed" : " cursor-pointer"
    }

    if (isUnselectedInFeedback) {
      baseClasses += " opacity-60"
    }

    return baseClasses
  }

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">
              {selectedCategory} Practice
            </h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBackToCategories}
              className="bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-secondary/80"
            >
              Back to Categories
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="bg-card text-foreground border border-border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-200 hover:bg-card/80"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full h-2 bg-muted rounded-full overflow-hidden mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Question Card */}
        <motion.div
          className="bg-card border border-border rounded-lg shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-card-foreground leading-relaxed mb-8">
            {currentQuestion.question}
          </h2>

          <div className="grid gap-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(currentQuestion.id, index)}
                disabled={showFeedback}
                className={getOptionStyles(index)}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>

          {!showFeedback ? (
            <button
              onClick={onSubmitAnswer}
              disabled={answers[currentQuestion.id] === undefined}
              className={`w-full rounded-lg px-8 py-4 text-base font-semibold shadow-md transition-all duration-200 ${
                answers[currentQuestion.id] !== undefined
                  ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <div>
              <div
                className={`p-4 rounded-lg mb-4 ${
                  answers[currentQuestion.id] === currentQuestion.correct
                    ? "bg-green-50 border border-green-500"
                    : "bg-red-50 border border-red-500"
                }`}
              >
                <h4
                  className={`text-base font-semibold mb-2 ${
                    answers[currentQuestion.id] === currentQuestion.correct
                      ? "text-green-800"
                      : "text-red-800"
                  }`}
                >
                  {answers[currentQuestion.id] === currentQuestion.correct ? "Correct!" : "Incorrect"}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${
                    answers[currentQuestion.id] === currentQuestion.correct
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {currentQuestion.explanation}
                </p>
              </div>

              <button
                onClick={onNextQuestion}
                className="w-full bg-primary text-primary-foreground border-none rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md transition-all duration-200 hover:opacity-90"
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
