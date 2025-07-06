"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Question } from "@/types"
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle"

interface QuizPageProps {
  questions: Question[]
  currentQuestion: number
  answers: Record<number, number>
  progress: number
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
  progress,
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

  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-50 text-green-800"
      case "Medium":
        return "bg-yellow-50 text-yellow-800"
      case "Hard":
        return "bg-red-50 text-red-800"
      default:
        return "bg-gray-50 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div
        data-header
        className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-40"
      >
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Assessment Quiz</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => onQuestionNavigate(index)}
                    className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-200 ${
                      index === currentQuestion
                        ? "bg-primary"
                        : answers[questions[index].id] !== undefined
                          ? "bg-green-500"
                          : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              <DarkModeToggle />
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Single Question */}
      <div className="max-w-5xl mx-auto p-4 pb-8">
        <div
          key={currentQuestion}
          className="bg-card border border-border rounded-lg shadow-lg p-8 mb-8 min-h-[60vh] flex flex-col justify-between"
        >
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Question {currentQuestion + 1}
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {currentQuestionData.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyStyles(currentQuestionData.difficulty)}`}>
                  {currentQuestionData.difficulty}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-card-foreground leading-relaxed">
                {currentQuestionData.question}
              </h3>
            </div>

            <div className="grid gap-3">
              {currentQuestionData.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => onAnswerSelect(currentQuestionData.id, optionIndex)}
                  className={`w-full p-4 text-left rounded-lg text-base transition-all hover:border-primary hover:bg-primary/10 duration-200 border-2 ${
                    answers[currentQuestionData.id] === optionIndex
                      ? " bg-primary/20 border-primary text-primary-foreground dark:text-white"
                      : "bg-secondary border-border text-card-foreground hover:bg-primary/10"
                  }`}
                >
                  <span className="font-semibold mr-2">
                    {String.fromCharCode(65 + optionIndex)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation and Submit Panel */}
        <div className="sticky bottom-8 bg-card border border-border rounded-lg shadow-lg p-4 flex items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={onPrevious}
              disabled={currentQuestion === 0}
              className={`bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                currentQuestion === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-secondary/80"
              }`}
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            <button
              onClick={onNext}
              disabled={currentQuestion === questions.length - 1}
              className={`bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                currentQuestion === questions.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:bg-secondary/80"
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {Object.keys(answers).length} of {questions.length} answered
            </span>

            <button
              onClick={onSubmit}
              disabled={!canSubmitQuiz()}
              className={`rounded-lg px-8 py-3 text-base font-semibold shadow-md transition-all duration-200 ${
                canSubmitQuiz()
                  ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
