"use client";

import { Award, ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, useEffect } from "react";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import { BackToCategoriesButton } from "@/components/shared/back-to-categories-button";

interface PracticeQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface PracticePageProps {
  selectedCategory: string;
  questions: PracticeQuestion[];
  currentQuestionIndex: number;
  answers: Record<number, number>;
  showFeedback: boolean;
  practiceComplete: boolean;
  loading: boolean;
  error: string | null;
  onAnswerSelect: (questionId: number, answerIndex: number) => void;
  onSubmitAnswer: () => void;
  onNextQuestion: () => void;
  onPracticeAgain: () => void;
}

export default function PracticePage({
  selectedCategory,
  questions,
  currentQuestionIndex,
  answers,
  showFeedback,
  practiceComplete,
  loading,
  error,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  onPracticeAgain,
}: PracticePageProps) {
  const [mounted, setMounted] = useState(false);
  const [questionFeedback, setQuestionFeedback] = useState<
    Record<number, "like" | "dislike" | null>
  >({});

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">
            Loading questions for {selectedCategory}...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            Unable to Load Questions
          </h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="flex justify-center">
            <BackToCategoriesButton href="/practice" />
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no questions
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-muted-foreground mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-4">
            No Questions Available
          </h2>
          <p className="text-muted-foreground mb-6">
                                  There are no practice questions available for {selectedCategory} at
             this time.
           </p>
           <div className="flex justify-center">
             <BackToCategoriesButton href="/practice" />
           </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (practiceComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
              <Award size={24} color="white" />
            </div>

            <h2 className="text-3xl font-black text-card-foreground mb-4">
              Practice Complete!
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              You've completed all {questions.length} questions in{" "}
              {selectedCategory}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onPracticeAgain}
                className="bg-primary text-primary-foreground border-none rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md transition-all duration-200 hover:opacity-90"
              >
                Practice Again
              </button>

              <BackToCategoriesButton
                href="/practice"
                label="Choose Another Category"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getOptionStyles = (index: number) => {
    const isSelected = answers[currentQuestion.id] === index;
    const isCorrect = index === currentQuestion.correct;
    const isUserAnswerIncorrect = showFeedback && isSelected && !isCorrect;
    const isCorrectAnswer = showFeedback && isCorrect;
    const isUnselectedInFeedback = showFeedback && !isSelected && !isCorrect;

    if (showFeedback) {
      if (isCorrectAnswer) {
        return "w-full p-4 text-left rounded-lg text-base transition-all duration-200 bg-green-100 border-2 border-green-500 text-green-900 cursor-not-allowed";
      } else if (isUserAnswerIncorrect) {
        return "w-full p-4 text-left rounded-lg text-base transition-all duration-200 bg-red-100 border-2 border-red-500 text-red-900 cursor-not-allowed";
      } else if (isUnselectedInFeedback) {
        return "w-full p-4 text-left rounded-lg text-base transition-all duration-200 bg-secondary border-2 border-border text-card-foreground opacity-60 cursor-not-allowed";
      }
    }

    // Non-feedback states - match quiz styling exactly
    if (isSelected) {
      return "w-full p-4 text-left rounded-lg text-base transition-all duration-200 bg-primary/20 border-2 border-primary text-primary-foreground";
    } else {
      return "w-full p-4 text-left rounded-lg text-base transition-all duration-200 bg-secondary border-2 border-border text-card-foreground hover:bg-primary/10";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-40">
        <div className="max-w-5xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {selectedCategory} Practice
              </h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <BackToCategoriesButton href="/practice" />
              <DarkModeToggle />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-4">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 pb-8">
        <div
          key={currentQuestionIndex}
          className="bg-card border border-border rounded-lg shadow-lg p-8 mb-8 min-h-[60vh] flex flex-col justify-between"
        >
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  {selectedCategory}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-card-foreground leading-relaxed">
                {currentQuestion.question}
              </h3>

              {/* Like/Dislike Buttons */}
              <div className="flex gap-4 mt-3 mb-2">
                <button
                  type="button"
                  aria-label="Like question"
                  className={`flex items-center gap-1 px-3 py-1 rounded-md border transition-colors duration-150 ${
                    questionFeedback[currentQuestion.id] === "like"
                      ? "bg-green-100 border-green-500 text-green-700"
                      : "bg-secondary border-border text-muted-foreground hover:bg-green-50"
                  }`}
                  onClick={() =>
                    setQuestionFeedback((fb) => ({
                      ...fb,
                      [currentQuestion.id]:
                        fb[currentQuestion.id] === "like" ? null : "like",
                    }))
                  }
                >
                  <ThumbsUp size={16} /> Like
                </button>
                <button
                  type="button"
                  aria-label="Dislike question"
                  className={`flex items-center gap-1 px-3 py-1 rounded-md border transition-colors duration-150 ${
                    questionFeedback[currentQuestion.id] === "dislike"
                      ? "bg-red-100 border-red-500 text-red-700"
                      : "bg-secondary border-border text-muted-foreground hover:bg-red-50"
                  }`}
                  onClick={() =>
                    setQuestionFeedback((fb) => ({
                      ...fb,
                      [currentQuestion.id]:
                        fb[currentQuestion.id] === "dislike" ? null : "dislike",
                    }))
                  }
                >
                  <ThumbsDown size={16} /> Dislike
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    !showFeedback && onAnswerSelect(currentQuestion.id, index)
                  }
                  disabled={showFeedback}
                  className={getOptionStyles(index)}
                >
                  <span className="font-semibold mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div className="mt-8">
            {!showFeedback ? (
              <button
                onClick={onSubmitAnswer}
                disabled={answers[currentQuestion.id] === undefined}
                className={`w-full rounded-lg px-8 py-4 text-base font-semibold shadow-md transition-all duration-200 ${
                  answers[currentQuestion.id] !== undefined
                    ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <div>
                <div
                  className={`p-4 rounded-lg mb-4 ${
                    answers[currentQuestion.id] === currentQuestion.correct
                      ? "bg-green-50 border border-green-500"
                      : "bg-red-50 border border-red-500"
                  }`}
                >
                  <h4
                    className={`text-base font-semibold mb-2 ${
                      answers[currentQuestion.id] === currentQuestion.correct
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {answers[currentQuestion.id] === currentQuestion.correct
                      ? "Correct!"
                      : "Incorrect"}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed ${
                      answers[currentQuestion.id] === currentQuestion.correct
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {currentQuestion.explanation}
                  </p>
                </div>

                <button
                  onClick={onNextQuestion}
                  className="w-full bg-primary text-primary-foreground border-none rounded-lg px-8 py-4 text-base font-semibold cursor-pointer shadow-md transition-all duration-200 hover:opacity-90"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "Complete Practice"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
