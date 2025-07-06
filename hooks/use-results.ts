import { useState, useEffect } from "react"
import { quizQuestions } from "@/data/quiz-data"
import { quizResultsStorage } from "@/lib/quiz-results-storage"
import { analyticsStorage } from "@/lib/analytics-storage"
import { AnalyticsData, Question } from "@/types"

export interface QuizResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  answeredCorrectly: Question[]
  answeredIncorrectly: Question[]
}

const initialAnalyticsData: AnalyticsData = {
  sessions: [],
  categoryStats: {},
  overallStats: {
    totalQuestions: 0,
    totalCorrect: 0,
    totalSessions: 0,
  },
}

function calculateResults(answers: Record<number, number>): QuizResult {
  const totalQuestions = quizQuestions.length
  const correctAnswers = quizQuestions.filter((q) => answers[q.id] === q.correct).length
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const answeredCorrectly = quizQuestions.filter((q) => answers[q.id] === q.correct)
  const answeredIncorrectly = quizQuestions.filter((q) => answers[q.id] !== q.correct)

  return { score, correctAnswers, totalQuestions, answeredCorrectly, answeredIncorrectly }
}

function updateAnalytics(result: QuizResult, answers: Record<number, number>) {
  const newSession = {
    id: crypto.randomUUID(),
    type: "quiz" as const,
    date: new Date(),
    score: result.score,
    correct: result.correctAnswers,
    total: result.totalQuestions,
  }

  const existingAnalytics = analyticsStorage.getData() ?? initialAnalyticsData
  const updatedCategoryStats = { ...existingAnalytics.categoryStats }

  quizQuestions.forEach((question) => {
    const category = question.category
    if (!updatedCategoryStats[category]) {
      updatedCategoryStats[category] = { correct: 0, total: 0, sessions: 0 }
    }
    updatedCategoryStats[category].total++
    if (answers[question.id] === question.correct) {
      updatedCategoryStats[category].correct++
    }
  })

  const categoriesInQuiz = [...new Set(quizQuestions.map((q) => q.category))]
  categoriesInQuiz.forEach((category) => {
    updatedCategoryStats[category].sessions++
  })

  const updatedAnalytics: AnalyticsData = {
    ...existingAnalytics,
    sessions: [...existingAnalytics.sessions, newSession],
    categoryStats: updatedCategoryStats,
    overallStats: {
      totalQuestions: existingAnalytics.overallStats.totalQuestions + result.totalQuestions,
      totalCorrect: existingAnalytics.overallStats.totalCorrect + result.correctAnswers,
      totalSessions: existingAnalytics.overallStats.totalSessions + 1,
    },
  }

  analyticsStorage.setData(updatedAnalytics)
}

export function useResults() {
  const [results, setResults] = useState<QuizResult | null>(null)
  const [answers, setAnswers] = useState<Record<number, number> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedAnswers = quizResultsStorage.get()
    if (storedAnswers) {
      const calculated = calculateResults(storedAnswers)
      setResults(calculated)
      setAnswers(storedAnswers)
      updateAnalytics(calculated, storedAnswers)
    }
    setLoading(false)
  }, [])

  return { results, answers, loading }
} 