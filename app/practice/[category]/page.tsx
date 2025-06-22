"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { usePracticeSession } from "@/hooks/use-practice-session"
import PracticePage from "@/components/practice/practice-page"
import LoadingScreen from "@/components/shared/loading-screen"

export default function Practice() {
  const params = useParams()
  const router = useRouter()
  const category = params.category ? decodeURIComponent(params.category as string) : null
  const { state, dispatch } = usePracticeSession(category)

  // Redirect if the category is invalid after the hook has processed it
  useEffect(() => {
    if (category && state.category === null && state.questions.length === 0) {
      router.push("/categories")
    }
  }, [state.category, state.questions, category, router])

  if (!state.category) {
    return <LoadingScreen progress={100} step="Loading category..." />
  }

  return (
    <PracticePage
      selectedCategory={state.category}
      questions={state.questions}
      currentQuestionIndex={state.currentQuestionIndex}
      answers={state.answers}
      showFeedback={state.showFeedback}
      practiceComplete={state.isComplete}
      onBackToCategories={() => router.push("/categories")}
      onAnswerSelect={(questionId, answerIndex) =>
        dispatch({ type: "ANSWER", questionId, answerIndex })
      }
      onSubmitAnswer={() => dispatch({ type: "SUBMIT_ANSWER" })}
      onNextQuestion={() => dispatch({ type: "NEXT_QUESTION" })}
      onPracticeAgain={() => dispatch({ type: "PRACTICE_AGAIN" })}
    />
  )
} 