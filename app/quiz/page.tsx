"use client"

import { useRouter } from "next/navigation"
import { useQuiz } from "@/hooks/use-quiz"
import { quizResultsStorage } from "@/lib/quiz-results-storage"
import QuizPage from "@/components/quiz/quiz-page"

export default function Quiz() {
  const { state, dispatch, progress } = useQuiz()
  const router = useRouter()

  const handleSubmit = () => {
    quizResultsStorage.set(state.answers)
    router.push("/results")
  }

  return (
    <QuizPage
      questions={state.questions}
      currentQuestion={state.currentQuestionIndex}
      answers={state.answers}
      progress={progress}
      onAnswerSelect={(questionId, answerIndex) =>
        dispatch({ type: "ANSWER_QUESTION", questionId, answerIndex })
      }
      onNext={() => dispatch({ type: "NEXT_QUESTION" })}
      onPrevious={() => dispatch({ type: "PREVIOUS_QUESTION" })}
      onSubmit={handleSubmit}
      onQuestionNavigate={(index) =>
        dispatch({ type: "GOTO_QUESTION", questionIndex: index })
      }
    />
  )
} 