"use client";

import { useState } from "react";
import { ArrowLeft, Scale, Trophy, Target, AlertCircle } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { useQuestionComparison } from "@/hooks/use-question-comparison";
import { QuestionCard } from "@/components/question-comparison/question-card";
import { ComparisonCard } from "@/components/question-comparison/comparison-card";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { BackToCategoriesButton } from "@/components/shared/back-to-categories-button";

interface ComparisonExperiencePageProps {
  category: string;
}

type ComparisonStep = "question1" | "question2" | "comparison";

interface QuestionResult {
  selectedAnswer: string;
  isCorrect: boolean;
}

export function ComparisonExperiencePage({
  category,
}: ComparisonExperiencePageProps) {
  const [currentStep, setCurrentStep] = useState<ComparisonStep>("question1");
  const [question1Result, setQuestion1Result] = useState<QuestionResult | null>(
    null
  );
  const [question2Result, setQuestion2Result] = useState<QuestionResult | null>(
    null
  );
  const [selectedBetterQuestion, setSelectedBetterQuestion] = useState<
    1 | 2 | null
  >(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Find category data
  const categoryData = categories.find(
    (cat) => cat.name.toLowerCase() === category.toLowerCase()
  );

  // Use the API hook to fetch questions
  const { questionPair, loading, error, fetchNewPair } =
    useQuestionComparison(category);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Category Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            Sorry, we couldn't find this category.
          </p>
          <div className="flex justify-center">
            <BackToCategoriesButton href="/question-comparison" />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Error Loading Questions
          </h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex justify-center">
            <BackToCategoriesButton href="/question-comparison" />
          </div>
        </div>
      </div>
    );
  }

  if (!questionPair) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            No Questions Available
          </h1>
          <p className="text-muted-foreground mb-4">
                                  Sorry, there aren't enough questions available for comparison in
             this category.
           </p>
           <div className="flex justify-center">
             <BackToCategoriesButton href="/question-comparison" />
           </div>
        </div>
      </div>
    );
  }

  const handleQuestion1Answer = (
    selectedAnswer: string,
    isCorrect: boolean
  ) => {
    setQuestion1Result({
      selectedAnswer,
      isCorrect,
    });
    setCurrentStep("question2");
  };

  const handleQuestion2Answer = (
    selectedAnswer: string,
    isCorrect: boolean
  ) => {
    setQuestion2Result({
      selectedAnswer,
      isCorrect,
    });
    setCurrentStep("comparison");
  };

  const handleComparisonSelection = (betterQuestion: 1 | 2) => {
    setSelectedBetterQuestion(betterQuestion);
  };

  const handleSubmitComparison = async () => {
    if (!selectedBetterQuestion) return;

    // Here you could save the comparison result to your backend
    console.log("User selected question", selectedBetterQuestion, "as better");

    // Show success message
    setShowSuccessMessage(true);

    // Reset for next comparison after showing success message
    setTimeout(async () => {
      await fetchNewPair();
      setQuestion1Result(null);
      setQuestion2Result(null);
      setSelectedBetterQuestion(null);
      setShowSuccessMessage(false);
      setCurrentStep("question1");
    }, 1500);
  };

  const IconComponent = categoryData.icon;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
              <IconComponent size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {categoryData.name} Comparison
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {categoryData.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <BackToCategoriesButton href="/question-comparison" />
            <DarkModeToggle />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
              currentStep === "question1"
                ? "bg-primary text-primary-foreground"
                : question1Result
                ? "bg-green-500/20 text-green-600"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Target size={16} />
            Question 1
          </div>
          <div className="w-8 h-px bg-border"></div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
              currentStep === "question2"
                ? "bg-primary text-primary-foreground"
                : question2Result
                ? "bg-green-500/20 text-green-600"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Target size={16} />
            Question 2
          </div>
          <div className="w-8 h-px bg-border"></div>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors ${
              currentStep === "comparison"
                ? "bg-primary text-primary-foreground"
                : selectedBetterQuestion
                ? "bg-green-500/20 text-green-600"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Scale size={16} />
            Compare
          </div>
        </div>

        {/* Question Content */}
        <div key={currentStep}>
          {currentStep === "question1" && (
            <QuestionCard
              question={questionPair.question1}
              questionNumber={1}
              onAnswer={handleQuestion1Answer}
              categoryColor={categoryData.color}
            />
          )}

          {currentStep === "question2" && (
            <QuestionCard
              question={questionPair.question2}
              questionNumber={2}
              onAnswer={handleQuestion2Answer}
              categoryColor={categoryData.color}
            />
          )}

          {currentStep === "comparison" &&
            question1Result &&
            question2Result && (
              <ComparisonCard
                question1={questionPair.question1}
                question2={questionPair.question2}
                result1={question1Result}
                result2={question2Result}
                onSelectBetter={handleComparisonSelection}
                onSubmitComparison={handleSubmitComparison}
                selectedBetter={selectedBetterQuestion}
                categoryColor={categoryData.color}
              />
            )}
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border border-border rounded-lg p-8 text-center max-w-md mx-4">
              <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-card-foreground mb-2">
                Thanks for your feedback!
              </h2>
              <p className="text-muted-foreground mb-4">
                Your comparison helps us improve question quality.
              </p>
              <p className="text-sm text-muted-foreground">
                Loading next pair...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
