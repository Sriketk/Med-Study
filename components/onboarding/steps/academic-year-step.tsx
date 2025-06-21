"use client"

import { motion } from "framer-motion"
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

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
}

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
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            backgroundColor: "var(--accent)",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <GraduationCap size={24} color="var(--primary)" />
        </motion.div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--foreground)",
            marginBottom: "0.5rem",
          }}
        >
          What year are you in?
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            margin: 0,
          }}
        >
          Help us understand your academic background
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {academicYears.map((year, index) => (
          <motion.button
            key={year}
            onClick={() => onYearSelect(year)}
            style={{
              width: "100%",
              padding: "1rem",
              textAlign: "left",
              backgroundColor: selectedYear === year ? "var(--accent)" : "var(--card)",
              border: selectedYear === year ? "2px solid var(--primary)" : "2px solid var(--border)",
              borderRadius: "var(--radius)",
              color: selectedYear === year ? "var(--primary)" : "var(--foreground)",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {year}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
