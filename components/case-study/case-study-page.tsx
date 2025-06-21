"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

interface CaseStudyData {
  id: number
  title: string
  scenario: string
  question: string
  options: string[]
  correct: number
  explanation: string
  mockedResponses: Record<string, string>
}

interface CaseStudyPageProps {
  caseData: CaseStudyData
  isDark: boolean
  toggleTheme: () => void
  onBackToHome: () => void
}

export default function CaseStudyPage({ caseData, isDark, toggleTheme, onBackToHome }: CaseStudyPageProps) {
  const [caseStudyAnswer, setCaseStudyAnswer] = useState<number | null>(null)
  const [caseStudyMessages, setCaseStudyMessages] = useState<
    Array<{ id: number; type: "user" | "bot"; content: string }>
  >([])
  const [caseStudyInput, setCaseStudyInput] = useState("")
  const [caseStudySubmitted, setCaseStudySubmitted] = useState(false)
  const [showCaseStudyFeedback, setShowCaseStudyFeedback] = useState(false)

  const handleCaseStudyMessage = () => {
    if (!caseStudyInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: caseStudyInput,
    }

    setCaseStudyMessages((prev) => [...prev, userMessage])

    // Find matching response
    const inputLower = caseStudyInput.toLowerCase()
    let response =
      "I don't have specific information about that aspect of the case. Try asking about lab values, physical exam findings, patient history, or symptoms."

    for (const [key, value] of Object.entries(caseData.mockedResponses)) {
      if (inputLower.includes(key)) {
        response = value
        break
      }
    }

    const botMessage = {
      id: Date.now() + 1,
      type: "bot" as const,
      content: response,
    }

    setTimeout(() => {
      setCaseStudyMessages((prev) => [...prev, botMessage])
    }, 1000)

    setCaseStudyInput("")
  }

  const handleCaseStudyAnswerSelect = (answerIndex: number) => {
    setCaseStudyAnswer(answerIndex)
  }

  const submitCaseStudyAnswer = () => {
    setCaseStudySubmitted(true)
    setShowCaseStudyFeedback(true)
  }

  const resetCaseStudy = () => {
    setCaseStudyAnswer(null)
    setCaseStudyMessages([])
    setCaseStudyInput("")
    setCaseStudySubmitted(false)
    setShowCaseStudyFeedback(false)
  }

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        padding: "2rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "2rem",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: "900",
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            >
              {caseData.title}
            </h1>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
              }}
            >
              Interactive clinical case study
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={onBackToHome}
              style={{
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem 1rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              Back to Home
            </button>
            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.75rem",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* Case Information */}
          <motion.div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
              height: "fit-content",
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1rem",
              }}
            >
              Case Scenario
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                lineHeight: "1.6",
                marginBottom: "2rem",
              }}
            >
              {caseData.scenario}
            </p>

            {/* Chat Interface */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--secondary)",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  borderRadius: "var(--radius) var(--radius) 0 0",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "var(--card-foreground)",
                    margin: 0,
                  }}
                >
                  Ask about the case
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-foreground)",
                    margin: "0.25rem 0 0 0",
                  }}
                >
                  Try: "lab values", "physical exam", "history", "symptoms"
                </p>
              </div>

              <div
                style={{
                  height: "300px",
                  overflowY: "auto",
                  padding: "1rem",
                }}
              >
                {caseStudyMessages.length === 0 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      color: "var(--muted-foreground)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Start by asking about the patient's condition
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: "1rem" }}>
                    {caseStudyMessages.map((message) => (
                      <div
                        key={message.id}
                        style={{
                          display: "flex",
                          justifyContent: message.type === "user" ? "flex-end" : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "80%",
                            padding: "0.75rem 1rem",
                            borderRadius: "var(--radius)",
                            backgroundColor: message.type === "user" ? "var(--primary)" : "var(--card)",
                            color: message.type === "user" ? "var(--primary-foreground)" : "var(--card-foreground)",
                            border: message.type === "bot" ? "1px solid var(--border)" : "none",
                          }}
                        >
                          <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: "1.4" }}>{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: "1rem",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: "0.5rem",
                }}
              >
                <input
                  type="text"
                  value={caseStudyInput}
                  onChange={(e) => setCaseStudyInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleCaseStudyMessage()}
                  placeholder="Ask about the case..."
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    backgroundColor: "var(--background)",
                    color: "var(--foreground)",
                    fontSize: "0.875rem",
                  }}
                />
                <button
                  onClick={handleCaseStudyMessage}
                  disabled={!caseStudyInput.trim()}
                  style={{
                    backgroundColor: caseStudyInput.trim() ? "var(--primary)" : "var(--muted)",
                    color: caseStudyInput.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    border: "none",
                    borderRadius: "var(--radius)",
                    padding: "0.75rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: caseStudyInput.trim() ? "pointer" : "not-allowed",
                    transition: "all 0.2s ease",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>

          {/* Question and Answer */}
          <motion.div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
              height: "fit-content",
            }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1rem",
              }}
            >
              Diagnosis Question
            </h2>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                lineHeight: "1.6",
                marginBottom: "2rem",
              }}
            >
              {caseData.question}
            </p>

            <div style={{ display: "grid", gap: "0.75rem", marginBottom: "2rem" }}>
              {caseData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleCaseStudyAnswerSelect(index)}
                  disabled={caseStudySubmitted}
                  style={{
                    width: "100%",
                    padding: "1rem",
                    textAlign: "left",
                    backgroundColor:
                      caseStudySubmitted && index === caseData.correct
                        ? "#dcfce7"
                        : caseStudySubmitted && caseStudyAnswer === index && index !== caseData.correct
                          ? "#fee2e2"
                          : caseStudyAnswer === index
                            ? "var(--accent)"
                            : "var(--secondary)",
                    border:
                      caseStudySubmitted && index === caseData.correct
                        ? "2px solid #10b981"
                        : caseStudySubmitted && caseStudyAnswer === index && index !== caseData.correct
                          ? "2px solid #ef4444"
                          : caseStudyAnswer === index
                            ? "2px solid var(--primary)"
                            : "2px solid var(--border)",
                    borderRadius: "var(--radius)",
                    color: "var(--card-foreground)",
                    cursor: caseStudySubmitted ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "1rem",
                    opacity: caseStudySubmitted && index !== caseData.correct && caseStudyAnswer !== index ? 0.6 : 1,
                  }}
                >
                  <span style={{ fontWeight: "600", marginRight: "0.5rem" }}>{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {!caseStudySubmitted ? (
              <button
                onClick={submitCaseStudyAnswer}
                disabled={caseStudyAnswer === null}
                style={{
                  width: "100%",
                  backgroundColor: caseStudyAnswer !== null ? "var(--primary)" : "var(--muted)",
                  color: caseStudyAnswer !== null ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: caseStudyAnswer !== null ? "pointer" : "not-allowed",
                  boxShadow: "var(--shadow-md)",
                  transition: "all 0.2s ease",
                }}
              >
                Submit Answer
              </button>
            ) : (
              <div>
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: caseStudyAnswer === caseData.correct ? "#dcfce7" : "#fee2e2",
                    border: `1px solid ${caseStudyAnswer === caseData.correct ? "#10b981" : "#ef4444"}`,
                    borderRadius: "var(--radius)",
                    marginBottom: "1rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: caseStudyAnswer === caseData.correct ? "#065f46" : "#991b1b",
                      margin: "0 0 0.5rem 0",
                    }}
                  >
                    {caseStudyAnswer === caseData.correct ? "Correct!" : "Incorrect"}
                  </h4>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: caseStudyAnswer === caseData.correct ? "#047857" : "#dc2626",
                      margin: 0,
                      lineHeight: "1.4",
                    }}
                  >
                    {caseData.explanation}
                  </p>
                </div>

                <button
                  onClick={resetCaseStudy}
                  style={{
                    width: "100%",
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-md)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Try Another Case
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
