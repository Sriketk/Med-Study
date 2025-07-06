"use client";

import {
  CheckCircle,
  XCircle,
  ThumbsUp,
  Scale,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  source?: string;
}

interface QuestionResult {
  selectedAnswer: string;
  isCorrect: boolean;
}

interface ComparisonCardProps {
  question1: Question;
  question2: Question;
  result1: QuestionResult;
  result2: QuestionResult;
  onSelectBetter: (betterQuestion: 1 | 2) => void;
  onSubmitComparison: () => void;
  selectedBetter: 1 | 2 | null;
  categoryColor: string;
}

function QuestionSummary({
  question,
  result,
  questionNumber,
  categoryColor,
  isSelected,
  onSelect,
}: {
  question: Question;
  result: QuestionResult;
  questionNumber: 1 | 2;
  categoryColor: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`bg-card border rounded-lg p-6 transition-all duration-200 cursor-pointer hover:shadow-md ${
        isSelected
          ? "border-2 shadow-lg"
          : "border-border hover:border-primary/50"
      }`}
      style={{
        borderColor: isSelected ? categoryColor : undefined,
      }}
      onClick={onSelect}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold"
            style={{ backgroundColor: categoryColor }}
          >
            {questionNumber}
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">
            Question {questionNumber}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {/* Performance Stats */}
          <div
            className={`flex items-center gap-1 text-sm ${
              result.isCorrect ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.isCorrect ? (
              <CheckCircle size={14} />
            ) : (
              <XCircle size={14} />
            )}
            <span>{result.isCorrect ? "Correct" : "Incorrect"}</span>
          </div>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-4">
        <p className="text-card-foreground leading-relaxed text-sm">
          {question.question}
        </p>
      </div>

      {/* Answer Choices (Compact) */}
      <div className="space-y-2 mb-4">
        {question.choices.map((choice, index) => {
          const letter = String.fromCharCode(65 + index);
          const isUserAnswer = choice === result.selectedAnswer;
          const isCorrectAnswer = choice === question.answer;

          return (
            <div
              key={index}
              className={`flex items-start gap-2 p-2 rounded text-sm ${
                isCorrectAnswer
                  ? "bg-green-500/10 border border-green-500/20"
                  : isUserAnswer && !isCorrectAnswer
                  ? "bg-red-500/10 border border-red-500/20"
                  : "bg-muted/30"
              }`}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-medium ${
                  isCorrectAnswer
                    ? "border-green-500 bg-green-500 text-white"
                    : isUserAnswer && !isCorrectAnswer
                    ? "border-red-500 bg-red-500 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {letter}
              </span>
              <span className="text-card-foreground">{choice}</span>
            </div>
          );
        })}
      </div>

      {/* Explanation Preview */}
      <div className="mb-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground mb-1">
          <strong>Explanation:</strong>
        </p>
        <p className="text-sm text-card-foreground leading-relaxed line-clamp-3">
          {question.explanation}
        </p>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div
          className="flex items-center justify-center gap-2 mt-4 p-2 rounded-lg"
          style={{ backgroundColor: `${categoryColor}20` }}
        >
          <Award size={16} style={{ color: categoryColor }} />
          <span
            className="text-sm font-medium"
            style={{ color: categoryColor }}
          >
            Selected as Better Question
          </span>
        </div>
      )}
    </div>
  );
}

export function ComparisonCard({
  question1,
  question2,
  result1,
  result2,
  onSelectBetter,
  onSubmitComparison,
  selectedBetter,
  categoryColor,
}: ComparisonCardProps) {
  return (
    <div className="space-y-6">
      {/* Comparison Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Scale size={32} style={{ color: categoryColor }} />
        </div>
        <h2 className="text-2xl font-bold text-card-foreground mb-2">
          Which question is better?
        </h2>
        <p className="text-muted-foreground">
          Compare both questions and select the one you think is higher quality
        </p>
      </div>

      {/* Questions Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuestionSummary
          question={question1}
          result={result1}
          questionNumber={1}
          categoryColor={categoryColor}
          isSelected={selectedBetter === 1}
          onSelect={() => onSelectBetter(1)}
        />

        <QuestionSummary
          question={question2}
          result={result2}
          questionNumber={2}
          categoryColor={categoryColor}
          isSelected={selectedBetter === 2}
          onSelect={() => onSelectBetter(2)}
        />
      </div>

      {/* Comparison Criteria */}
      {!selectedBetter && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-3">
            Consider these factors:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-card-foreground mb-2">
                Question Quality
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Clear and well-written</li>
                <li>• Clinically relevant</li>
                <li>• Appropriate difficulty level</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-card-foreground mb-2">
                Learning Value
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Comprehensive explanation</li>
                <li>• Teaches important concepts</li>
                <li>• Memorable and educational</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Submit Section */}
      <div className="text-center">
        {!selectedBetter ? (
          <p className="text-sm text-muted-foreground">
            Click on a question above to select it as the better one
          </p>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Question {selectedBetter} selected. You can change your selection
              or submit.
            </p>
            <Button
              onClick={onSubmitComparison}
              style={{ backgroundColor: categoryColor }}
              className="text-white hover:opacity-90 px-8 py-2"
            >
              Submit Comparison
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
