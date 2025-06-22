import { useState, useEffect } from "react"
import { AnalyticsData } from "@/types"
import { analyticsStorage } from "@/lib/analytics-storage"

const initialAnalyticsData: AnalyticsData = {
  sessions: [],
  categoryStats: {},
  overallStats: {
    totalQuestions: 0,
    totalCorrect: 0,
    totalSessions: 0,
  },
}

export function useAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(initialAnalyticsData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedData = analyticsStorage.getData()
    if (savedData) {
      setAnalyticsData(savedData)
    }
    setLoading(false)
  }, [])

  return { analyticsData, loading }
} 