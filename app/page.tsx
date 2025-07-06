"use client"

import { useRouter } from "next/navigation"
import HomePage from "@/components/home/home-page"
import LoadingScreen from "@/components/shared/loading-screen"
import { useOnboarding } from "@/hooks/use-onboarding"

export default function Home() {
  const { status, onboardingData } = useOnboarding()
  const router = useRouter()

  if (status !== "authenticated" || !onboardingData) {
    // This screen will be shown during 'loading' and 'redirecting' states
    return <LoadingScreen progress={100} step="Loading..." />
  }

  return (
    <HomePage
      onboardingData={onboardingData}
      onStartQuiz={() => router.push("/quiz")}
      onStartCaseStudy={() => router.push("/case-study")}
      onStartPrepare={() => router.push("/categories")}

    />
  )
}
