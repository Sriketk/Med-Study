"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Moon, Sun, Brain } from "lucide-react"
import ProgressIndicator from "./progress-indicator"
import AcademicYearStep from "./steps/academic-year-step"
import ExamTypeStep from "./steps/exam-type-step"
import ExamDateStep from "./steps/exam-date-step"
import FileUploadStep from "./steps/file-upload-step"

interface OnboardingData {
  academicYear: string
  examType: string
  examDate: Date | undefined
  uploadedFiles: File[]
}

interface OnboardingFlowProps {
  isDark: boolean
  toggleTheme: () => void
  onComplete: (data: OnboardingData) => void
}

const onboardingSteps = [
  {
    id: 1,
    title: "Academic Year",
    description: "Tell us about your current academic status",
  },
  {
    id: 2,
    title: "Target Exam",
    description: "Which exam are you preparing for?",
  },
  {
    id: 3,
    title: "Exam Timeline",
    description: "When is your exam scheduled?",
  },
  {
    id: 4,
    title: "Study Materials",
    description: "Upload your notes and study materials",
  },
]

export default function OnboardingFlow({ isDark, toggleTheme, onComplete }: OnboardingFlowProps) {
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    academicYear: "",
    examType: "",
    examDate: undefined,
    uploadedFiles: [],
  })
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingSteps.length) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      onComplete(onboardingData)
    }
  }

  const handleOnboardingBack = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(onboardingStep - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setOnboardingData((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files],
    }))
  }

  const removeFile = (index: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }))
  }

  const canProceedOnboarding = () => {
    switch (onboardingStep) {
      case 1:
        return onboardingData.academicYear !== ""
      case 2:
        return onboardingData.examType !== ""
      case 3:
        return onboardingData.examDate !== undefined
      case 4:
        return true // File upload is optional
      default:
        return false
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        padding: "2rem",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "80rem",
          margin: "0 auto",
          marginBottom: "3rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              backgroundColor: "var(--primary)",
              borderRadius: "var(--radius)",
            }}
          >
            <Brain size={20} color="var(--primary-foreground)" />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--foreground)",
              margin: 0,
            }}
          >
            MedPrep
          </h1>
        </div>

        <button
          onClick={toggleTheme}
          style={{
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "0.5rem",
            cursor: "pointer",
            boxShadow: "var(--shadow-sm)",
            transition: "all 0.2s ease",
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </motion.div>

      {/* Progress Steps */}
      <ProgressIndicator steps={onboardingSteps} currentStep={onboardingStep} />

      {/* Main Content Card */}
      <motion.div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          backgroundColor: "var(--card)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-lg)",
          padding: "3rem",
          border: "1px solid var(--border)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {onboardingStep === 1 && (
            <AcademicYearStep
              selectedYear={onboardingData.academicYear}
              onYearSelect={(year) => setOnboardingData((prev) => ({ ...prev, academicYear: year }))}
            />
          )}

          {onboardingStep === 2 && (
            <ExamTypeStep
              selectedExam={onboardingData.examType}
              onExamSelect={(exam) => setOnboardingData((prev) => ({ ...prev, examType: exam }))}
            />
          )}

          {onboardingStep === 3 && (
            <ExamDateStep
              selectedDate={onboardingData.examDate}
              isCalendarOpen={isCalendarOpen}
              onDateSelect={(date) => setOnboardingData((prev) => ({ ...prev, examDate: date }))}
              onCalendarToggle={() => setIsCalendarOpen(!isCalendarOpen)}
            />
          )}

          {onboardingStep === 4 && (
            <FileUploadStep
              uploadedFiles={onboardingData.uploadedFiles}
              onFileUpload={handleFileUpload}
              onFileRemove={removeFile}
            />
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.button
            onClick={handleOnboardingBack}
            disabled={onboardingStep === 1}
            style={{
              backgroundColor: "transparent",
              color: onboardingStep === 1 ? "var(--muted-foreground)" : "var(--muted-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: onboardingStep === 1 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: onboardingStep === 1 ? 0.5 : 1,
            }}
            whileHover={onboardingStep !== 1 ? { scale: 1.02 } : {}}
            whileTap={onboardingStep !== 1 ? { scale: 0.98 } : {}}
          >
            <ChevronLeft size={16} />
            Back
          </motion.button>

          <motion.button
            onClick={handleOnboardingNext}
            disabled={!canProceedOnboarding()}
            style={{
              backgroundColor: canProceedOnboarding() ? "var(--primary)" : "var(--muted)",
              color: canProceedOnboarding() ? "var(--primary-foreground)" : "var(--muted-foreground)",
              border: "none",
              borderRadius: "var(--radius)",
              padding: "0.75rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: canProceedOnboarding() ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            whileHover={canProceedOnboarding() ? { scale: 1.02 } : {}}
            whileTap={canProceedOnboarding() ? { scale: 0.98 } : {}}
          >
            {onboardingStep === onboardingSteps.length ? "Get Started" : "Next"}
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
