"use client"

import { useReducer, useMemo } from "react"
import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight, Moon, Sun, Brain } from "lucide-react"
import ProgressIndicator from "./progress-indicator"
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
  const { theme, setTheme } = useTheme()
  const [state, dispatch] = useReducer(onboardingReducer, initialState)
  const { step, formData } = state

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
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="flex items-center justify-between max-w-7xl mx-auto mb-12"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Brain size={20} className="text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">MedPrep</h1>
        </div>
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
          className="bg-card text-foreground border border-border rounded-lg p-2 cursor-pointer shadow-sm transition-all duration-200 hover:bg-card/80"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </motion.div>

      <ProgressIndicator steps={onboardingSteps} currentStep={step} />

      <motion.div 
        className="max-w-4xl mx-auto bg-card rounded-lg shadow-lg p-12 border border-border" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          {CurrentStepComponent && (
            <div key={step}>
              {step === 1 && <AcademicYearStep selectedYear={formData.academicYear} onYearSelect={(year) => dispatch({ type: "SET_ACADEMIC_YEAR", payload: year })} />}
              {step === 2 && <ExamTypeStep selectedExam={formData.examType} onExamSelect={(exam) => dispatch({ type: "SET_EXAM_TYPE", payload: exam })} />}
              {step === 3 && <ExamDateStep selectedDate={formData.examDate} onDateSelect={(date) => dispatch({ type: "SET_EXAM_DATE", payload: date })} />}
              {step === 4 && <FileUploadStep uploadedFiles={formData.uploadedFiles} onFileUpload={(e) => dispatch({ type: "ADD_FILES", payload: Array.from(e.target.files || []) })} onFileRemove={(index) => dispatch({ type: "REMOVE_FILE", payload: index })} />}
            </div>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex justify-between mt-8 pt-8 border-t border-border" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.button 
            onClick={() => dispatch({ type: "PREVIOUS_STEP" })} 
            disabled={step === 1} 
            className={`bg-transparent border border-border rounded-lg px-6 py-3 text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
              step === 1 
                ? "text-muted-foreground cursor-not-allowed opacity-50" 
                : "text-muted-foreground cursor-pointer hover:border-primary"
            }`}
            whileHover={{ borderColor: step > 1 ? "var(--primary)" : "var(--border)" }} 
            whileTap={{ scale: 0.98 }}
          >
            <ChevronLeft size={16} /> Back
          </motion.button>
          <motion.button 
            onClick={handleNext} 
            disabled={!canProceed} 
            className={`rounded-lg px-6 py-3 text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
              canProceed 
                ? "bg-primary text-primary-foreground cursor-pointer hover:opacity-90" 
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            }`}
            whileHover={{ opacity: canProceed ? 0.9 : 0.6 }} 
            whileTap={{ scale: 0.98 }}
          >
            {step === onboardingSteps.length ? "Finish" : "Next"}
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
