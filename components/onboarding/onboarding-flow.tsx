"use client"

import { useReducer, useMemo, useState, useEffect } from "react"
import type React from "react"
import { ChevronLeft, ChevronRight, Brain } from "lucide-react"
import { DarkModeToggle } from "@/components/shared/dark-mode-toggle"
import AcademicYearStep from "./steps/academic-year-step"
import ExamTypeStep from "./steps/exam-type-step"
import ExamDateStep from "./steps/exam-date-step"
import FileUploadStep from "./steps/file-upload-step"
import type { OnboardingData } from "@/types"

// --- Constants (moved outside) ---
const onboardingSteps = [
  { id: 1, title: "Academic Year", description: "Tell us about your current academic status", component: AcademicYearStep },
  { id: 2, title: "Target Exam", description: "Which exam are you preparing for?", component: ExamTypeStep },
  { id: 3, title: "Exam Timeline", description: "When is your exam scheduled?", component: ExamDateStep },
  { id: 4, title: "Study Materials", description: "Upload your notes and study materials", component: FileUploadStep },
]

// --- Reducer Logic ---
interface OnboardingState {
  step: number
  formData: OnboardingData
}

type OnboardingAction =
  | { type: "NEXT_STEP" }
  | { type: "PREVIOUS_STEP" }
  | { type: "SET_ACADEMIC_YEAR"; payload: string }
  | { type: "SET_EXAM_TYPE"; payload: string }
  | { type: "SET_EXAM_DATE"; payload: Date | undefined }
  | { type: "ADD_FILES"; payload: File[] }
  | { type: "REMOVE_FILE"; payload: number }

const initialState: OnboardingState = {
  step: 1,
  formData: {
    academicYear: "",
    examType: "",
    examDate: undefined,
    uploadedFiles: [],
  },
}

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case "NEXT_STEP":
      if (state.step < onboardingSteps.length) {
        return { ...state, step: state.step + 1 }
      }
      return state
    case "PREVIOUS_STEP":
      if (state.step > 1) {
        return { ...state, step: state.step - 1 }
      }
      return state
    case "SET_ACADEMIC_YEAR":
      return { ...state, formData: { ...state.formData, academicYear: action.payload } }
    case "SET_EXAM_TYPE":
      return { ...state, formData: { ...state.formData, examType: action.payload } }
    case "SET_EXAM_DATE":
      return { ...state, formData: { ...state.formData, examDate: action.payload } }
    case "ADD_FILES":
      return { ...state, formData: { ...state.formData, uploadedFiles: [...state.formData.uploadedFiles, ...action.payload] } }
    case "REMOVE_FILE":
      return { ...state, formData: { ...state.formData, uploadedFiles: state.formData.uploadedFiles.filter((_, i) => i !== action.payload) } }
    default:
      return state
  }
}

// --- Component ---
interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState)
  const { step, formData } = state
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const canProceed = useMemo(() => {
    switch (step) {
      case 1:
        return formData.academicYear !== ""
      case 2:
        return formData.examType !== ""
      case 3:
        return true // Date is optional
      case 4:
        return true // Files are optional
      default:
        return false
    }
  }, [step, formData])

  const handleNext = () => {
    if (step < onboardingSteps.length) {
      dispatch({ type: "NEXT_STEP" })
    } else {
      onComplete(formData)
    }
  }

  const CurrentStepComponent = onboardingSteps.find((s) => s.id === step)?.component

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Brain size={20} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">MedPrep</h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main className="h-screen w-full flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full mx-auto bg-card rounded-lg shadow-lg p-8 border border-border">
          <div key={step}>
            {step === 1 && <AcademicYearStep selectedYear={formData.academicYear} onYearSelect={(year) => dispatch({ type: "SET_ACADEMIC_YEAR", payload: year })} />}
            {step === 2 && <ExamTypeStep selectedExam={formData.examType} onExamSelect={(exam) => dispatch({ type: "SET_EXAM_TYPE", payload: exam })} />}
            {step === 3 && <ExamDateStep selectedDate={formData.examDate} onDateSelect={(date) => dispatch({ type: "SET_EXAM_DATE", payload: date })} />}
            {step === 4 && <FileUploadStep uploadedFiles={formData.uploadedFiles} onFileUpload={(e) => dispatch({ type: "ADD_FILES", payload: Array.from(e.target.files || []) })} onFileRemove={(index) => dispatch({ type: "REMOVE_FILE", payload: index })} />}
          </div>

          <div className="flex justify-between mt-8 pt-8 border-t border-border">
            <button
              onClick={() => dispatch({ type: "PREVIOUS_STEP" })}
              disabled={step === 1}
              className={`bg-transparent border border-border rounded-lg px-6 py-3 text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                step === 1
                  ? "text-muted-foreground cursor-not-allowed opacity-50"
                  : "text-muted-foreground cursor-pointer hover:border-primary"
              }`}
            >
              <ChevronLeft size={16} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`rounded-lg px-6 py-3 text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
                canProceed
                  ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              }`}
            >
              {step === onboardingSteps.length ? "Finish" : "Next"}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
