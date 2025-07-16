"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { usePracticeSession } from "@/hooks/use-practice-session";
import PracticePage from "@/components/practice/practice-page";
import LoadingScreen from "@/components/shared/loading-screen";

export default function Practice() {
  const params = useParams();
  const router = useRouter();
  const category = params.category
    ? decodeURIComponent(params.category as string)
    : null;
  const { state, dispatch } = usePracticeSession(category);
  const [isInitialized, setIsInitialized] = useState(false);

  // Track when the hook has finished initializing
  useEffect(() => {
    if (category && (state.category !== null || state.questions.length > 0)) {
      setIsInitialized(true);
    } else if (
      category &&
      state.category === null &&
      state.questions.length === 0
    ) {
      // Only set initialized after a brief delay to ensure the hook has had time to process
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [category, state.category, state.questions]);

  // // Only redirect if we're initialized and the category is definitely invalid
  // useEffect(() => {
  //   if (
  //     isInitialized &&
  //     category &&
  //     state.category === null &&
  //     state.questions.length === 0
  //   ) {
  //     console.log("Redirecting - invalid category:", category);
  //     router.push("/categories");
  //   }
  // }, [isInitialized, category, state.category, state.questions, router]);

  // Show loading while initializing or if no category is set yet
  if (!isInitialized || !state.category) {
    return <LoadingScreen progress={100} step="Loading category..." />;
  }

  return (
    <PracticePage
      selectedCategory={state.category}
      questions={state.questions}
      currentQuestionIndex={state.currentQuestionIndex}
      answers={state.answers}
      showFeedback={state.showFeedback}
      practiceComplete={state.isComplete}
      loading={state.loading}
      error={state.error}

      onAnswerSelect={(questionId, answerIndex) =>
        dispatch({ type: "ANSWER", questionId, answerIndex })
      }
      onSubmitAnswer={() => dispatch({ type: "SUBMIT_ANSWER" })}
      onNextQuestion={() => dispatch({ type: "NEXT_QUESTION" })}
      onPracticeAgain={() => dispatch({ type: "PRACTICE_AGAIN" })}
    />
  );
}
