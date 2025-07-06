"use client";

import { useState, useRef } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle";
import type { CaseStudyData } from "@/types";
import { useCaseStudy } from "@/hooks/use-case-study";
import { useGraph } from "@/hooks/use-graph";
import ReactMarkdown from "react-markdown";

interface CaseStudyPageProps {
  caseData: CaseStudyData;
  onBackToHome: () => void;
}

export default function CaseStudyPage({
  caseData,
  onBackToHome,
}: CaseStudyPageProps) {
  const [sendMessages, setSendMessages] = useState("");
  const [questionFeedback, setQuestionFeedback] = useState<'like' | 'dislike' | null>(null);

  const { state, dispatch, handleSendMessage, streamBotMessage } = useCaseStudy(caseData);
  const [userInput, setUserInput] = useState("");
  const streamingContentRef = useRef("");

  const { messages, selectedAnswer, isSubmitted, showFeedback } = state;
  console.log(sendMessages)
  console.log(isSubmitted)

  const userSelection = caseData.options[selectedAnswer ?? 0];
  const onMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    handleSendMessage(userInput);
    setUserInput("");
    streamingContentRef.current = "";
    await useGraph({
      question: caseData.question,
      answer: "Pernicious anemia",
      userAnswer: userSelection,
      context: caseData.scenario,
      options: caseData.options,
      chatMessage: userInput,
      questionAnswered: isSubmitted,
      setSendMessages: (updater) => {
        // updater is (prev: string) => string
        streamingContentRef.current = updater(streamingContentRef.current);
        streamBotMessage(streamingContentRef.current);
      },
    });
  };

  return (
    <div className="h-screen bg-background text-foreground p-6 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-black text-foreground mb-1">
              {caseData.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Interactive clinical case study
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBackToHome}
              className="bg-secondary text-secondary-foreground border border-border rounded-lg px-4 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-secondary/80"
            >
              Back to Home
            </button>
            <DarkModeToggle />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
          {/* Case Information and Question */}
          <div className="flex flex-col gap-4 min-h-0">
            
            {/* Case Scenario */}
            <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl flex-shrink-0">
              <h2 className="text-xl font-bold text-card-foreground mb-3">
                Case Scenario
                
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {caseData.scenario}
              </p>
            </div>

            {/* Question and Answer */}
            <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl flex-1 min-h-0 flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <h2 className="text-xl font-bold text-card-foreground mb-3">
                  What is the next best step?
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {caseData.question}
                </p>

                {/* Like/Dislike Buttons */}
                <div className="flex gap-4 mt-1 mb-4">
                  <button
                    type="button"
                    aria-label="Like question"
                    className={`flex items-center gap-1 px-3 py-1 rounded-md border transition-colors duration-150 ${questionFeedback === 'like' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-secondary border-border text-muted-foreground hover:bg-green-50'}`}
                    onClick={() => setQuestionFeedback(fb => fb === 'like' ? null : 'like')}
                  >
                    <ThumbsUp size={16} /> Like
                  </button>
                  <button
                    type="button"
                    aria-label="Dislike question"
                    className={`flex items-center gap-1 px-3 py-1 rounded-md border transition-colors duration-150 ${questionFeedback === 'dislike' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-secondary border-border text-muted-foreground hover:bg-red-50'}`}
                    onClick={() => setQuestionFeedback(fb => fb === 'dislike' ? null : 'dislike')}
                  >
                    <ThumbsDown size={16} /> Dislike
                  </button>
                </div>

                <div className="grid gap-3 mb-4">
                  {caseData.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        dispatch({ type: "SELECT_ANSWER", payload: index })
                      }
                      className={`w-full p-4 text-left text-base border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedAnswer === index
                          ? showFeedback
                            ? index === caseData.correct
                              ? "bg-green-100 text-green-900 border-green-500"
                              : "bg-red-100 text-red-900 border-red-500"
                            : "bg-primary/20 border-primary text-primary-foreground"
                          : "bg-secondary border-border text-card-foreground hover:bg-primary/10"
                      } ${isSubmitted ? "cursor-not-allowed" : ""}`}
                      disabled={isSubmitted}
                    >
                      <span className="font-semibold mr-2">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                {showFeedback && (
                  <div
                    className={`p-4 bg-secondary rounded-md border mb-4 ${
                      selectedAnswer === caseData.correct
                        ? "border-green-500"
                        : "border-red-500"
                    }`}
                  >
                    <h3
                      className={`text-base font-bold mb-2 ${
                        selectedAnswer === caseData.correct
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {selectedAnswer === caseData.correct
                        ? "Correct"
                        : "Incorrect"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {caseData.explanation}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end mt-4 flex-shrink-0">
                {isSubmitted ? (
                  <button
                    onClick={() => dispatch({ type: "RESET" })}
                    className="px-4 py-2 text-sm bg-primary text-primary-foreground border-none rounded-md cursor-pointer hover:bg-primary/90 transition-colors duration-200"
                  >
                    Try Another Case
                  </button>
                ) : (
                  <button
                    onClick={() => dispatch({ type: "SUBMIT_ANSWER" })}
                    disabled={selectedAnswer === null}
                    className={`px-4 py-2 text-sm border-none rounded-md cursor-pointer transition-colors duration-200 ${
                      selectedAnswer !== null
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    Submit Answer
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 transition-all duration-150 hover:border-primary hover:-translate-y-1 hover:shadow-xl flex flex-col min-h-0">
            <h2 className="text-xl font-bold text-card-foreground mb-2">
              Ask about the case
            </h2>

            <div className="border border-border rounded-lg bg-secondary flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground text-center text-sm">
                    Ask a question to begin your investigation.
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-3 ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-md text-sm ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-card-foreground border border-border"
                        }`}
                      >
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form
                onSubmit={onMessageSubmit}
                className="flex p-3 border-t border-border gap-2 flex-shrink-0"
              >
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="e.g., 'What are the patient's vitals?'"
                  className="flex-1 p-2 text-sm bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-sm bg-primary text-primary-foreground border-none rounded-md cursor-pointer hover:bg-primary/90 transition-colors duration-200"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
