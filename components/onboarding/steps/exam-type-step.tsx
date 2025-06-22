"use client"

import { motion, Transition } from "framer-motion"
import { Target } from "lucide-react"

interface ExamTypeStepProps {
  selectedExam: string
  onExamSelect: (exam: string) => void
}

const examTypes = [
  "USMLE Step 1",
  "USMLE Step 2 CK",
  "USMLE Step 2 CS",
  "USMLE Step 3",
  "MCAT",
  "COMLEX Level 1",
  "COMLEX Level 2",
  "COMLEX Level 3",
  "Other",
]

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
}

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
}

const listContainerVariants = {
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function ExamTypeStep({ selectedExam, onExamSelect }: ExamTypeStepProps) {
  return (
    <motion.div
      key="step2"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Target size={24} className="text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Which exam are you studying for?
        </h2>
        <p className="text-muted-foreground">Select your target examination</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {examTypes.map((exam) => (
          <button
            key={exam}
            onClick={() => onExamSelect(exam)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedExam === exam
                ? "bg-accent border-primary text-primary"
                : "bg-card border-border text-foreground hover:border-primary/50"
            }`}
          >
            <span className="font-medium text-sm">{exam}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
