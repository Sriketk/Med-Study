"use client"

import { useRouter } from "next/navigation"
import { useResults } from "@/hooks/use-results"
import { quizQuestions } from "@/data/quiz-data"
import { categories } from "@/data/categories"
import ResultsPage from "@/components/results/results-page"
import LoadingScreen from "@/components/shared/loading-screen"

export default function Results() {
  const { results, answers, loading } = useResults()
  const router = useRouter()

  if (loading) {
    return <LoadingScreen progress={100} step="Calculating results..." />
  }

  if (!results || !answers) {
    return (
      <LoadingScreen
        progress={100}
        step="No results found. Please take a quiz first."
        showButton={true}
        buttonText="Back to Home"
        onButtonClick={() => router.push("/")}
      />
    )
  }

  return (
    <ResultsPage
      results={results}
      questions={quizQuestions}
      answers={answers}
      categories={categories}
      onTakeAnotherQuiz={() => router.push("/quiz")}
      onPracticeByCategory={() => router.push("/categories")}
      onViewAnalytics={() => router.push("/analytics")}
    />
  )
} 