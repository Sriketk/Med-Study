import { useReducer, useMemo } from "react"
import { quizQuestions } from "@/data/quiz-data"

export interface QuizState {
  questions: typeof quizQuestions
  currentQuestionIndex: number
  answers: Record<number, number>
}

type QuizAction =
  | { type: "ANSWER_QUESTION"; questionId: number; answerIndex: number }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "GOTO_QUESTION"; questionIndex: number }
  | { type: "RESET_QUIZ" }

const initialState: QuizState = {
  questions: quizQuestions,
  currentQuestionIndex: 0,
  answers: {},
}

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "ANSWER_QUESTION":
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answerIndex },
      }
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, state.questions.length - 1),
      }
    case "PREVIOUS_QUESTION":
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      }
    case "GOTO_QUESTION":
      return {
        ...state,
        currentQuestionIndex: action.questionIndex,
      }
    case "RESET_QUIZ":
      return initialState
    default:
      return state
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  const answeredQuestionsCount = useMemo(() => Object.keys(state.answers).length, [state.answers])
  const progress = useMemo(() => (answeredQuestionsCount / state.questions.length) * 100, [answeredQuestionsCount, state.questions.length])

  return { state, dispatch, progress }
} 