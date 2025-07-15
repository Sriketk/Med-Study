import { useReducer, useEffect, useMemo } from "react";
import { Question, Step1Question } from "@/lib/types";
import { fetchQuestionsApi, transformApiQuestion } from "@/lib/utils";

// --- State and Actions ---
interface PracticeState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<number, number>;
  showFeedback: boolean;
  isComplete: boolean;
  category: string | null;
  loading: boolean;
  error: string | null;
}

type PracticeAction =
  | { type: "START_LOADING"; category: string }
  | { type: "LOAD_SUCCESS"; category: string; questions: Question[] }
  | { type: "LOAD_ERROR"; error: string }
  | { type: "ANSWER"; questionId: number; answerIndex: number }
  | { type: "SUBMIT_ANSWER" }
  | { type: "NEXT_QUESTION" }
  | { type: "PRACTICE_AGAIN" }
  | { type: "SESSION_FAILED" };

// --- Reducer ---
function practiceReducer(
  state: PracticeState,
  action: PracticeAction
): PracticeState {
  switch (action.type) {
    case "START_LOADING":
      return { ...initialState, category: action.category, loading: true };
    case "LOAD_SUCCESS":
      return {
        ...state,
        questions: action.questions,
        loading: false,
        error: null,
      };
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.error, category: null };
    case "ANSWER":
      if (state.showFeedback) return state; // Don't allow changing answer after submission
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.answerIndex },
      };
    case "SUBMIT_ANSWER":
      // Only allow submission if an answer is selected for the current question
      if (
        state.answers[state.questions[state.currentQuestionIndex].id] !==
        undefined
      ) {
        return { ...state, showFeedback: true };
      }
      return state;
    case "NEXT_QUESTION":
      if (state.currentQuestionIndex < state.questions.length - 1) {
        return {
          ...state,
          currentQuestionIndex: state.currentQuestionIndex + 1,
          showFeedback: false,
        };
      }
      return { ...state, isComplete: true };
    case "PRACTICE_AGAIN":
      return {
        ...state,
        currentQuestionIndex: 0,
        answers: {},
        showFeedback: false,
        isComplete: false,
      };
    case "SESSION_FAILED":
      return {
        ...state,
        category: null,
        questions: [],
        loading: false,
        error: "Failed to load questions",
      };
    default:
      return state;
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
};

// Category name mapping

// --- Hook ---
export function usePracticeSession(category: string | null) {
  const [state, dispatch] = useReducer(practiceReducer, initialState);



  useEffect(() => {
    if (category) {
      const loadQuestions = async () => {
        try {
          dispatch({ type: "START_LOADING", category });
          console.log("🚀 Loading practice questions for category:", category);

          const apiQuestions = await fetchQuestionsApi(category, {
            limit: 1000,
            minRequired: 1,
            context: "practice",
          });
          const questions = apiQuestions.map((q, index) =>
            transformApiQuestion(q, index + 1)
          );

          console.log(
            "✨ Loaded",
            questions.length,
            "questions for practice session"
          );
          dispatch({ type: "LOAD_SUCCESS", category, questions });
        } catch (err) {
          console.error("💥 Error loading practice questions:", err);
          const errorMessage =
            err instanceof Error ? err.message : "Failed to load questions";
          dispatch({ type: "LOAD_ERROR", error: errorMessage });
        }
      };

      loadQuestions();
    }
  }, [category]);

  return { state, dispatch };
}
