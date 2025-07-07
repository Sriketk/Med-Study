"use client"

import { Award, TrendingUp, TrendingDown, AlertCircle } from "lucide-react"
import type { Question, Category } from "@/lib/types"
import type { QuizResult } from "@/hooks/use-results"

interface ResultsPageProps {
  results: QuizResult
  questions: Question[]
  answers: Record<number, number>
  categories: Category[]
  onTakeAnotherQuiz: () => void
  onPracticeByCategory: () => void
}

const getPerformanceLevel = (score: number) => {
  if (score >= 90) return { level: "Excellent", color: "var(--primary)", icon: Award }
  if (score >= 80) return { level: "Good", color: "#10b981", icon: TrendingUp }
  if (score >= 70) return { level: "Fair", color: "#f59e0b", icon: AlertCircle }
  return { level: "Needs Improvement", color: "#ef4444", icon: TrendingDown }
}

export default function ResultsPage({
  results,
  questions,
  answers,
  categories,
  onTakeAnotherQuiz,
  onPracticeByCategory,
}: ResultsPageProps) {
  const performance = getPerformanceLevel(results.score)
  const PerformanceIcon = performance.icon

  // Helper to get category stats by calculating from current quiz answers
  const getCategoryStats = (categoryName: string) => {
    // This part is complex to refactor without a larger state management solution.
    // For now, we'll recalculate it here for simplicity, acknowledging it's not ideal.
    const categoryQuestions = questions.filter(q => q.category === categoryName);
    const correctCount = categoryQuestions.filter(q => answers[q.id] === q.correct).length;
    return { correct: correctCount, total: categoryQuestions.length };
  }

  const getDifficultyStats = (difficulty: string) => {
    const difficultyQuestions = questions.filter(q => q.difficulty === difficulty);
    const correctCount = difficultyQuestions.filter(q => answers[q.id] === q.correct).length;
    return { correct: correctCount, total: difficultyQuestions.length };
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-500"
    if (percentage >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const allCategories = [...new Set(questions.map(q => q.category))];
  const allDifficulties = [...new Set(questions.map(q => q.difficulty))];

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-primary">
            <PerformanceIcon size={32} color="white" />
          </div>

          <h1 className="text-5xl font-black text-foreground mb-2">
            Quiz Complete!
          </h1>

          <p className="text-2xl font-semibold mb-4 text-primary">
            {performance.level}
          </p>

          <p className="text-xl text-muted-foreground">
            You scored {results.score}% ({results.correctAnswers}/{results.totalQuestions} correct)
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Category Performance */}
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Performance by Category
            </h3>

            <div className="space-y-4">
              {allCategories.map((category) => {
                const stats = getCategoryStats(category);
                const percentage = Math.round((stats.correct / stats.total) * 100)
                const categoryInfo = categories.find((cat) => cat.name === category)

                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 bg-secondary rounded-md border border-border"
                  >
                    <div className="flex items-center gap-3">
                      {categoryInfo && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary">
                          <categoryInfo.icon size={16} color="white" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-base font-semibold text-card-foreground">
                          {category}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {stats.correct}/{stats.total} correct
                        </p>
                      </div>
                    </div>

                    <div className={`text-xl font-bold ${getPerformanceColor(percentage)}`}>
                      {percentage}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Difficulty Performance */}
          <div className="bg-card border border-border rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">
              Performance by Difficulty
            </h3>

            <div className="space-y-4">
              {allDifficulties.map((difficulty) => {
                 const stats = getDifficultyStats(difficulty);
                 const percentage = Math.round((stats.correct / stats.total) * 100)

                return (
                  <div key={difficulty}>
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-md border border-border">
                      <div>
                        <h4 className="text-base font-semibold text-card-foreground mb-1">
                          {difficulty}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {stats.correct}/{stats.total} correct
                        </p>
                      </div>

                      <div className="text-right">
                        <div className={`text-xl font-bold ${getPerformanceColor(percentage)}`}>
                          {percentage}%
                        </div>
                        <div className="w-16 h-1 bg-muted rounded-full overflow-hidden mt-1">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(percentage)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={onTakeAnotherQuiz}
            className="bg-primary text-primary-foreground border-0 rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Take Another Quiz
          </button>

          <button
            onClick={onPracticeByCategory}
            className="bg-secondary text-secondary-foreground border border-border rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md hover:bg-secondary/80 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Practice by Category
          </button>


        </div>
      </div>
    </div>
  )
}
