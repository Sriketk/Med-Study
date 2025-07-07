import { OnboardingData } from "@/lib/types"

const ONBOARDING_COMPLETE_KEY = "onboardingComplete"
const ONBOARDING_DATA_KEY = "onboardingData"

/**
 * Service for interacting with localStorage for onboarding data.
 */
export const onboardingStorage = {
  getIsComplete: (): boolean => {
    if (typeof window === "undefined") return false
    return window.localStorage.getItem(ONBOARDING_COMPLETE_KEY) === "true"
  },

  getData: (): OnboardingData | null => {
    if (typeof window === "undefined") return null
    const data = window.localStorage.getItem(ONBOARDING_DATA_KEY)
    if (!data) {
      return null
    }
    try {
      const parsed = JSON.parse(data) as Omit<OnboardingData, "uploadedFiles"> & {
        examDate?: string
      }

      return {
        ...parsed,
        examDate: parsed.examDate ? new Date(parsed.examDate) : undefined,
        uploadedFiles: [], // Files are not stored in localStorage
      }
    } catch (error) {
      console.error("Failed to parse onboarding data from localStorage", error)
      return null
    }
  },

  setData: (data: OnboardingData) => {
    if (typeof window === "undefined") return
    try {
      // WARNING: File objects cannot be serialized into JSON.
      // This implementation intentionally omits them to prevent errors.
      // A proper implementation should handle file uploads to a server
      // and store URLs or identifiers instead.
      const serializableData = {
        ...data,
        uploadedFiles: undefined,
      }
      window.localStorage.setItem(ONBOARDING_DATA_KEY, JSON.stringify(serializableData))
      window.localStorage.setItem(ONBOARDING_COMPLETE_KEY, "true")
    } catch (error) {
      console.error("Failed to save onboarding data to localStorage", error)
    }
  },

  clear: () => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(ONBOARDING_DATA_KEY)
    window.localStorage.removeItem(ONBOARDING_COMPLETE_KEY)
  },
} 