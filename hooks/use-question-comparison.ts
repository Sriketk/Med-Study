import { useState, useEffect } from "react";
import { Step1Question, ComparisonQuestion } from "@/lib/types";
import { fetchQuestionsApi, transformApiQuestionForComparison } from "@/lib/utils";

interface QuestionPair {
  question1: ComparisonQuestion;
  question2: ComparisonQuestion;
}

interface UseQuestionComparisonResult {
  questionPair: QuestionPair | null;
  loading: boolean;
  error: string | null;
  fetchNewPair: () => Promise<void>;
}

export function useQuestionComparison(
  category: string
): UseQuestionComparisonResult {
  const [questionPair, setQuestionPair] = useState<QuestionPair | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  const selectRandomPair = (questions: ComparisonQuestion[]): QuestionPair => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return {
      question1: shuffled[0],
      question2: shuffled[1],
    };
  };

  const fetchNewPair = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching new question pair for category:", category);

      const apiQuestions = await fetchQuestionsApi(category, {
        limit: 20,
        minRequired: 2,
        context: "comparison",
      });
      const questions = apiQuestions.map((q, index) =>
        transformApiQuestionForComparison(q, index + 1)
      );
      const pair = selectRandomPair(questions);

      console.log("✨ Selected question pair:", {
        question1: pair.question1.question.substring(0, 50) + "...",
        question2: pair.question2.question.substring(0, 50) + "...",
      });

      setQuestionPair(pair);
    } catch (err) {
      console.error("💥 Error fetching questions:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Test function to verify API connectivity
  const testApiConnection = async () => {
    try {
      console.log("🧪 Testing API connection...");
      const data = await fetchQuestionsApi("biochemistry", { limit: 1 });
      console.log("🧪 Test result:", data);
      return data;
    } catch (err) {
      console.error("🧪 Test failed:", err);
      return null;
    }
  };

  useEffect(() => {
    console.log("🚀 Hook initialized with category:", category);

    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      fetchNewPair();
    }, 100);

    return () => clearTimeout(timer);
  }, [category]);

  // Expose test function for debugging
  if (typeof window !== "undefined") {
    (window as any).testApiConnection = testApiConnection;
  }

  return {
    questionPair,
    loading,
    error,
    fetchNewPair,
  };
}
