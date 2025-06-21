"use client"

import { motion } from "framer-motion"
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

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
}

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
          <Target size={24} color="var(--primary)" />
        </motion.div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--foreground)",
            marginBottom: "0.5rem",
          }}
        >
          Which exam are you studying for?
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            margin: 0,
          }}
        >
          Select your target examination
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {examTypes.map((exam, index) => (
          <motion.button
            key={exam}
            onClick={() => onExamSelect(exam)}
            style={{
              width: "100%",
              padding: "1rem",
              textAlign: "left",
              backgroundColor: selectedExam === exam ? "var(--accent)" : "var(--card)",
              border: selectedExam === exam ? "2px solid var(--primary)" : "2px solid var(--border)",
              borderRadius: "var(--radius)",
              color: selectedExam === exam ? "var(--primary)" : "var(--foreground)",
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
            {exam}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
