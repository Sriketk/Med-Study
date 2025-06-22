import { useReducer, useEffect, useMemo } from "react"
import { practiceQuestions } from "@/data/practice-questions"
import { analyticsStorage } from "@/lib/analytics-storage"
import { AnalyticsData, Question } from "@/types"

// --- State and Actions ---
interface PracticeState {
  questions: Question[]
  currentQuestionIndex: number
  answers: Record<number, number>
  showFeedback: boolean
  isComplete: boolean
  category: string | null
}

type PracticeAction =
  | { type: "START_SESSION"; category: string; questions: Question[] }
  | { type: "ANSWER"; questionId: number; answerIndex: number }
  | { type: "SUBMIT_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "PRACTICE_AGAIN" }
  | { type: "SESSION_FAILED" }

// --- Reducer ---
function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "START_SESSION":
      return { ...initialState, category: action.category, questions: action.questions }
    case "ANSWER":
      if (state.showFeedback) return state // Don't allow changing answer after submission
      return { ...state, answers: { ...state.answers, [action.questionId]: action.answerIndex } }
    case "SUBMIT_ANSWER":
      // Only allow submission if an answer is selected for the current question
      if (state.answers[state.questions[state.currentQuestionIndex].id] !== undefined) {
        return { ...state, showFeedback: true }
      }
      return state
    case "NEXT_QUESTION":
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, showFeedback: false }
      }
      return { ...state, isComplete: true }
    case "PRACTICE_AGAIN":
      return { ...state, currentQuestionIndex: 0, answers: {}, showFeedback: false, isComplete: false }
    case "SESSION_FAILED":
        return { ...state, category: null, questions: [] }
    default:
      return state
  }
}

const initialState: PracticeState = {
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  showFeedback: false,
  isComplete: false,
  category: null,
}

// --- Hook ---
export function usePracticeSession(category: string | null) {
  const [state, dispatch] = useReducer(practiceReducer, initialState)

  useEffect(() => {
    if (category && category in practiceQuestions) {
      const questions = practiceQuestions[category as keyof typeof practiceQuestions]
      dispatch({ type: "START_SESSION", category, questions })
    } else if (category) {
      dispatch({ type: "SESSION_FAILED" })
    }
  }, [category])

  // --- Analytics Update Effect ---
  useEffect(() => {
    if (state.isComplete && state.category) {
      const { category, questions, answers } = state
      const correctAnswers = questions.filter((q) => answers[q.id] === q.correct).length
      const score = Math.round((correctAnswers / questions.length) * 100)

      const newSession = {
        id: crypto.randomUUID(),
        type: "practice" as const,
        category,
        date: new Date(),
        score,
        correct: correctAnswers,
        total: questions.length,
      }

      const existingAnalytics = analyticsStorage.getData() ?? { sessions: [], categoryStats: {}, overallStats: { totalQuestions: 0, totalCorrect: 0, totalSessions: 0 } }
      const categoryStats = existingAnalytics.categoryStats[category] || { correct: 0, total: 0, sessions: 0 }

      const updatedAnalytics: AnalyticsData = {
        ...existingAnalytics,
        sessions: [...existingAnalytics.sessions, newSession],
        categoryStats: {
          ...existingAnalytics.categoryStats,
          [category]: {
            correct: categoryStats.correct + correctAnswers,
            total: categoryStats.total + questions.length,
            sessions: categoryStats.sessions + 1,
          },
        },
        overallStats: {
          totalQuestions: existingAnalytics.overallStats.totalQuestions + questions.length,
          totalCorrect: existingAnalytics.overallStats.totalCorrect + correctAnswers,
          totalSessions: existingAnalytics.overallStats.totalSessions + 1,
        },
      }
      analyticsStorage.setData(updatedAnalytics)
    }
  }, [state.isComplete, state.category, state.questions, state.answers])

  return { state, dispatch }
} 