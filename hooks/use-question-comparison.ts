import { useState, useEffect } from "react";
import { Step1Question, ComparisonQuestion } from "@/lib/types";
import { step1TopicMap, transformApiQuestionForComparison } from "@/lib/utils";

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

  const fetchQuestions = async (): Promise<Step1Question[]> => {
    // Map URL category to actual database topic names

    const topic = step1TopicMap[category.toLowerCase()] || category;
    const url = `/api/questions/Step-1?topic=${encodeURIComponent(
      topic
    )}&limit=20`;

    console.log("🔍 Fetching questions from:", url);
    console.log("📝 Category mapping:", category, "->", topic);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ API Error:", response.status, errorText);
      throw new Error(
        `Failed to fetch questions: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("✅ API Response:", {
      success: data.success,
      count: data.count,
      dataLength: data.data?.length,
      topic: data.topic,
      message: data.message,
    });

    if (!data.success) {
      throw new Error(data.message || "API returned unsuccessful response");
    }

    if (!data.data || data.data.length < 2) {
      const actualTopic = step1TopicMap[category.toLowerCase()] || category;
      throw new Error(
        `Not enough questions available for comparison in "${actualTopic}". Found ${
          data.data?.length || 0
        } questions, but need at least 2 for comparison.`
      );
    }

    console.log(
      "📊 Successfully fetched",
      data.data.length,
      "questions for",
      topic
    );
    return data.data;
  };

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

      const apiQuestions = await fetchQuestions();
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
      const response = await fetch("/api/questions?topic=Biochemistry&limit=1");
      const data = await response.json();
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
