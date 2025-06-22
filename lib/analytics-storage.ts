import { AnalyticsData } from "@/types"

const ANALYTICS_DATA_KEY = "analyticsData"

/**
 * Service for interacting with localStorage for analytics data.
 */
export const analyticsStorage = {
  getData: (): AnalyticsData | null => {
    if (typeof window === "undefined") return null
    const data = window.localStorage.getItem(ANALYTICS_DATA_KEY)
    if (!data) {
      return null
    }
    try {
      const parsed = JSON.parse(data) as AnalyticsData
      // Convert date strings back to Date objects
      if (parsed.sessions) {
        parsed.sessions = parsed.sessions.map((session) => ({
          ...session,
          date: new Date(session.date),
        }))
      }
      return parsed
    } catch (error) {
      console.error("Failed to parse analytics data from localStorage", error)
      return null
    }
  },

  setData: (data: AnalyticsData) => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(ANALYTICS_DATA_KEY, JSON.stringify(data))
    } catch (error) {
      console.error("Failed to save analytics data to localStorage", error)
    }
  },

  clear: () => {
    if (typeof window === "undefined") return
    window.localStorage.removeItem(ANALYTICS_DATA_KEY)
  },
} 