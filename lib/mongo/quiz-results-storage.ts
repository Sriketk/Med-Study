const QUIZ_RESULTS_KEY = "quizResults"

/**
 * Service for passing quiz results via localStorage.
 */
export const quizResultsStorage = {
  get: (): Record<number, number> | null => {
    if (typeof window === "undefined") return null
    const data = window.localStorage.getItem(QUIZ_RESULTS_KEY)
    // Clear the data after reading it to prevent it from being used again
    window.localStorage.removeItem(QUIZ_RESULTS_KEY)
    if (!data) {
      return null
    }
    try {
      return JSON.parse(data)
    } catch (error) {
      console.error("Failed to parse quiz results from localStorage", error)
      return null
    }
  },

  set: (answers: Record<number, number>) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(answers))
    } catch (error) {
      console.error("Failed to save quiz results to localStorage", error)
    }
  },
} 