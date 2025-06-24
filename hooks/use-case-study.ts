import { useReducer } from "react";
import { CaseStudyData } from "@/types";

// --- State and Actions ---
export interface ChatMessage {
  id: number;
  type: "user" | "bot";
  content: string;
}

interface CaseStudyState {
  messages: ChatMessage[];
  selectedAnswer: number | null;
  isSubmitted: boolean;
  showFeedback: boolean;
}

type CaseStudyAction =
  | { type: "SELECT_ANSWER"; payload: number }
  | { type: "SUBMIT_ANSWER" }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "UPDATE_LAST_BOT_MESSAGE"; payload: string }
  | { type: "RESET" };

// --- Reducer ---
function caseStudyReducer(
  state: CaseStudyState,
  action: CaseStudyAction
): CaseStudyState {
  switch (action.type) {
    case "SELECT_ANSWER":
      if (state.isSubmitted) return state;
      return { ...state, selectedAnswer: action.payload };
    case "SUBMIT_ANSWER":
      if (state.selectedAnswer === null) return state;
      return { ...state, isSubmitted: true, showFeedback: true };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "UPDATE_LAST_BOT_MESSAGE": {
      const updatedMessages = [...state.messages];
      // Find last bot message
      for (let i = updatedMessages.length - 1; i >= 0; i--) {
        if (updatedMessages[i].type === "bot") {
          updatedMessages[i] = { ...updatedMessages[i], content: action.payload };
          break;
        }
      }
      return { ...state, messages: updatedMessages };
    }
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const initialState: CaseStudyState = {
  messages: [],
  selectedAnswer: null,
  isSubmitted: false,
  showFeedback: false,
};

// --- Hook ---
export function useCaseStudy(caseData: CaseStudyData) {
  const [state, dispatch] = useReducer(caseStudyReducer, initialState);

  const handleSendMessage = (messageContent: string) => {
    if (!messageContent.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now(),
      type: "user",
      content: messageContent,
    };
    dispatch({ type: "ADD_MESSAGE", payload: userMessage });
    // Add placeholder bot message
    const botMessage: ChatMessage = {
      id: Date.now() + 1,
      type: "bot",
      content: "",
    };
    dispatch({ type: "ADD_MESSAGE", payload: botMessage });
  };

  // This function will be called with each new chunk of the bot's response
  const streamBotMessage = (content: string) => {
    dispatch({ type: "UPDATE_LAST_BOT_MESSAGE", payload: content });
  };

  return { state, dispatch, handleSendMessage, streamBotMessage };
}
