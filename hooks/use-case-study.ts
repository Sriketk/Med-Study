import { useReducer } from "react"
import { CaseStudyData } from "@/types"

// --- State and Actions ---
export interface ChatMessage {
  id: number
  type: "user" | "bot"
  content: string
}

interface CaseStudyState {
  messages: ChatMessage[]
  selectedAnswer: number | null
  isSubmitted: boolean
  showFeedback: boolean
}

type CaseStudyAction =
  | { type: "SELECT_ANSWER"; payload: number }
  | { type: "SUBMIT_ANSWER" }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "RESET" }

// --- Reducer ---
function caseStudyReducer(state: CaseStudyState, action: CaseStudyAction): CaseStudyState {
  switch (action.type) {
    case "SELECT_ANSWER":
      if (state.isSubmitted) return state
      return { ...state, selectedAnswer: action.payload }
    case "SUBMIT_ANSWER":
      if (state.selectedAnswer === null) return state
      return { ...state, isSubmitted: true, showFeedback: true }
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] }
    case "RESET":
      return { ...initialState }
    default:
      return state
  }
}

const initialState: CaseStudyState = {
  messages: [],
  selectedAnswer: null,
  isSubmitted: false,
  showFeedback: false,
}

// --- Hook ---
export function useCaseStudy(caseData: CaseStudyData) {
  const [state, dispatch] = useReducer(caseStudyReducer, initialState)

  const handleSendMessage = (messageContent: string) => {
    if (!messageContent.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: messageContent,
    }
    dispatch({ type: "ADD_MESSAGE", payload: userMessage })

    // Mock bot response
    const inputLower = messageContent.toLowerCase()
    let response = "I don't have specific information about that aspect of the case. Try asking about lab values, physical exam findings, patient history, or symptoms."

    for (const [key, value] of Object.entries(caseData.mockedResponses)) {
      if (inputLower.includes(key)) {
        response = value
        break
      }
    }

    const botMessage: ChatMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: response,
    }

    setTimeout(() => {
      dispatch({ type: "ADD_MESSAGE", payload: botMessage })
    }, 1000)
  }

  return { state, dispatch, handleSendMessage }
} 