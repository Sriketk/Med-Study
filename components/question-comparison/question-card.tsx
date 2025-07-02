"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Question {
  question: string
  choices: string[]
  answer: string
  explanation: string
  source?: string
}

interface QuestionCardProps {
  question: Question
  questionNumber: 1 | 2
  onAnswer: (selectedAnswer: string, isCorrect: boolean, timeSpent: number) => void
  categoryColor: string
}

export function QuestionCard({ question, questionNumber, onAnswer, categoryColor }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [startTime] = useState(Date.now())
  const [timeSpent, setTimeSpent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    
    const finalTimeSpent = Math.floor((Date.now() - startTime) / 1000)
    const isCorrect = selectedAnswer === question.answer
    setShowResult(true)
    
    // Auto-advance after showing result
    setTimeout(() => {
      onAnswer(selectedAnswer, isCorrect, finalTimeSpent)
    }, 3000)
  }

  const handleContinue = () => {
    if (!selectedAnswer) return
    
    const finalTimeSpent = Math.floor((Date.now() - startTime) / 1000)
    const isCorrect = selectedAnswer === question.answer
    onAnswer(selectedAnswer, isCorrect, finalTimeSpent)
  }

  return (
    <motion.div
      className="bg-card border border-border rounded-lg p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div 
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold"
            style={{ backgroundColor: categoryColor }}
          >
            {questionNumber}
          </div>
          <h2 className="text-xl font-semibold text-card-foreground">
            Question {questionNumber}
          </h2>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={16} />
          <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="mb-6">
        <p className="text-lg text-card-foreground leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Answer Choices */}
      <div className="space-y-3 mb-6">
        {question.choices.map((choice, index) => {
          const letter = String.fromCharCode(65 + index) // A, B, C, D
          const isSelected = selectedAnswer === choice
          const isCorrect = choice === question.answer
          const isIncorrect = showResult && isSelected && !isCorrect
          
          return (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(choice)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                showResult
                  ? isCorrect
                    ? "border-green-500 bg-green-500/10"
                    : isIncorrect
                    ? "border-red-500 bg-red-500/10"
                    : "border-border bg-card"
                  : isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50 hover:bg-card/80"
              }`}
              whileHover={!showResult ? { scale: 1.01 } : {}}
              whileTap={!showResult ? { scale: 0.99 } : {}}
            >
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  showResult
                    ? isCorrect
                      ? "border-green-500 bg-green-500 text-white"
                      : isIncorrect
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-gray-300 text-gray-500"
                    : isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-gray-300 text-gray-500"
                }`}>
                  {showResult && isCorrect ? (
                    <CheckCircle size={16} />
                  ) : showResult && isIncorrect ? (
                    <XCircle size={16} />
                  ) : (
                    letter
                  )}
                </div>
                <span className="text-card-foreground">{choice}</span>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Result Section */}
      {showResult && (
        <motion.div
          className="mb-6 p-4 rounded-lg border"
          style={{ 
            borderColor: selectedAnswer === question.answer ? "#10b981" : "#ef4444",
            backgroundColor: selectedAnswer === question.answer ? "#10b98110" : "#ef444410"
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            {selectedAnswer === question.answer ? (
              <CheckCircle size={20} className="text-green-600" />
            ) : (
              <XCircle size={20} className="text-red-600" />
            )}
            <span className="font-medium text-card-foreground">
              {selectedAnswer === question.answer ? "Correct!" : "Incorrect"}
            </span>
          </div>
          
          <div className="text-sm text-card-foreground">
            <p className="mb-2"><strong>Explanation:</strong></p>
            <p className="leading-relaxed">{question.explanation}</p>
            {question.source && (
              <p className="mt-2 text-muted-foreground">
                <strong>Source:</strong> {question.source}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Action Button */}
      <div className="flex justify-center">
        {showResult ? (
          <Button 
            onClick={handleContinue}
            style={{ backgroundColor: categoryColor }}
            className="text-white hover:opacity-90"
          >
            Continue to Question {questionNumber === 1 ? "2" : "Comparison"}
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            style={{ backgroundColor: categoryColor }}
            className="text-white hover:opacity-90 disabled:opacity-50"
          >
            Submit Answer
          </Button>
        )}
      </div>
    </motion.div>
  )
} 