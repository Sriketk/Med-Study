"use client"

import { useRouter } from "next/navigation"
import AnalyticsPage from "@/components/analytics/analytics-page"
import { categories } from "@/data/categories"
import LoadingScreen from "@/components/shared/loading-screen"
import { useAnalytics } from "@/hooks/use-analytics"

export default function Analytics() {
  const { analyticsData, loading } = useAnalytics()
  const router = useRouter()

  if (loading) {
    return <LoadingScreen progress={100} step="Loading analytics..." />
  }

  return (
    <AnalyticsPage
      analyticsData={analyticsData}
      categories={categories}
      onBackToHome={() => router.push("/")}
      onSelectCategory={(categoryName: string) =>
        router.push(`/practice/${categoryName}`)
      }
    />
  )
} 