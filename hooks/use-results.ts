import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { quizQuestions } from "@/data/quiz-data"
import { Question } from "@/types"

export interface QuizResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  answeredCorrectly: Question[]
  answeredIncorrectly: Question[]
}

function calculateResults(answers: Record<number, number>): QuizResult {
  const totalQuestions = quizQuestions.length
  const correctAnswers = quizQuestions.filter((q) => answers[q.id] === q.correct).length
  const score = Math.round((correctAnswers / totalQuestions) * 100)
  const answeredCorrectly = quizQuestions.filter((q) => answers[q.id] === q.correct)
  const answeredIncorrectly = quizQuestions.filter((q) => answers[q.id] !== q.correct)

  return { score, correctAnswers, totalQuestions, answeredCorrectly, answeredIncorrectly }
}

export function useResults() {
  const [results, setResults] = useState<QuizResult | null>(null)
  const [answers, setAnswers] = useState<Record<number, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const answersParam = searchParams.get('answers')
    if (answersParam) {
      try {
        const parsedAnswers = JSON.parse(decodeURIComponent(answersParam))
        const calculated = calculateResults(parsedAnswers)
        setResults(calculated)
        setAnswers(parsedAnswers)
      } catch (error) {
        console.error("Failed to parse quiz answers from URL", error)
      }
    }
    setLoading(false)
  }, [searchParams])

  return { results, answers, loading }
} 