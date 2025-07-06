import { useReducer, useEffect, useMemo } from "react"
import { analyticsStorage } from "@/lib/analytics-storage"
import { AnalyticsData, Question } from "@/types"

// Transform API question to match our interface
interface ApiQuestion {
  topic: string
  subtopic: string
  question: string
  choices: string[]
  answer: string
  explanation: string
  source: string
  created_at: string
}

const transformQuestion = (apiQuestion: ApiQuestion, id: number): Question => {
  return {
    id,
    question: apiQuestion.question,
    options: apiQuestion.choices,
    correct: apiQuestion.choices.indexOf(apiQuestion.answer),
    category: apiQuestion.topic,
    difficulty: 'Medium', // Default difficulty since API doesn't provide it
    explanation: apiQuestion.explanation
  }
}

// --- State and Actions ---
interface PracticeState {
  questions: Question[]
  currentQuestionIndex: number
  answers: Record<number, number>
  showFeedback: boolean
  isComplete: boolean
  category: string | null
  loading: boolean
  error: string | null
}

type PracticeAction =
  | { type: "START_LOADING"; category: string }
  | { type: "LOAD_SUCCESS"; category: string; questions: Question[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "ANSWER"; questionId: number; answerIndex: number }
  | { type: "SUBMIT_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "PRACTICE_AGAIN" }
  | { type: "SESSION_FAILED" }

// --- Reducer ---
function practiceReducer(state: PracticeState, action: PracticeAction): PracticeState {
  switch (action.type) {
    case "START_LOADING":
      return { ...initialState, category: action.category, loading: true }
    case "LOAD_SUCCESS":
      return { ...state, questions: action.questions, loading: false, error: null }
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.error, category: null }
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
        return { ...state, category: null, questions: [], loading: false, error: "Failed to load questions" }
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
  loading: false,
  error: null,
}

// Category name mapping
const categoryTopicMap: { [key: string]: string } = {
  'biochemistry': 'Biochemistry',
  'cardiology': 'Cardiovascular', 
  'pharmacology': 'Pharmacology',
  'endocrinology': 'EndocrineAndDiabetesAndMetabolism',
  'immunology': 'AllergiesAndImmunology',
  'pediatrics': 'Pediatrics',
  'microbiology': 'Microbiology',
  'dermatology': 'Dermatology',
  'pathology': 'Pathology',
  'genetics': 'Genetics',
  'hematology': 'HematologyAndOncology',
  'infectious-diseases': 'InfectiousDiseases',
  'neurology': 'NervousSystem',
  'ophthalmology': 'Ophthalmology',
  'psychiatry': 'PsychiatricAndSubstanceUseDisorders',
  'critical-care': 'CriticalCare',
  'renal': 'RenalAndUrinary',
  'rheumatology': 'RheumatologyAndOrthopedics'
}

// --- Hook ---
export function usePracticeSession(category: string | null) {
  const [state, dispatch] = useReducer(practiceReducer, initialState)

  const fetchQuestions = async (category: string): Promise<ApiQuestion[]> => {
    // Map category to topic name
    const topic = categoryTopicMap[category.toLowerCase()] || category
    
    // Fetch ALL questions by setting a very high limit
    const url = `/api/questions/Step-1?topic=${encodeURIComponent(topic)}&limit=1000`
    
    console.log('🔍 Fetching ALL practice questions from:', url)
    console.log('📝 Category mapping:', category, '->', topic)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error:', response.status, errorText)
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ API Response:', {
      success: data.success,
      count: data.count,
      dataLength: data.data?.length,
      topic: data.topic,
      message: data.message
    })
    
    if (!data.success) {
      throw new Error(data.message || "API returned unsuccessful response")
    }
    
    if (!data.data || data.data.length === 0) {
      throw new Error(`No questions available for "${topic}". Please try a different category.`)
    }

    console.log('📊 Successfully fetched', data.data.length, 'questions for', topic)
    return data.data
  }

  useEffect(() => {
    if (category) {
      const loadQuestions = async () => {
        try {
          dispatch({ type: "START_LOADING", category })
          console.log('🚀 Loading practice questions for category:', category)
          
          const apiQuestions = await fetchQuestions(category)
          const questions = apiQuestions.map((q, index) => transformQuestion(q, index + 1))
          
          console.log('✨ Loaded', questions.length, 'questions for practice session')
          dispatch({ type: "LOAD_SUCCESS", category, questions })
        } catch (err) {
          console.error('💥 Error loading practice questions:', err)
          const errorMessage = err instanceof Error ? err.message : 'Failed to load questions'
          dispatch({ type: "LOAD_ERROR", error: errorMessage })
        }
      }

      loadQuestions()
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