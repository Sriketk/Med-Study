"use client"

import { motion, Transition } from "framer-motion"
import { GraduationCap } from "lucide-react"

interface AcademicYearStepProps {
  selectedYear: string
  onYearSelect: (year: string) => void
}

const academicYears = [
  "Pre-med student",
  "1st year medical student",
  "2nd year medical student",
  "3rd year medical student",
  "4th year medical student",
  "Resident",
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

export default function AcademicYearStep({ selectedYear, onYearSelect }: AcademicYearStepProps) {
  return (
    <motion.div
      key="step1"
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
          <GraduationCap size={24} className="text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          What year are you in?
        </h2>
        <p className="text-muted-foreground">
          Help us understand your academic background
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {academicYears.map((year) => (
          <button
            key={year}
            onClick={() => onYearSelect(year)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedYear === year
                ? "bg-accent border-primary text-primary"
                : "bg-card border-border text-foreground hover:border-primary/50"
            }`}
          >
            <span className="font-medium text-sm">{year}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
