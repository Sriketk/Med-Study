"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface ProgressIndicatorProps {
  steps: Array<{
    id: number
    title: string
    description: string
  }>
  currentStep: number
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        maxWidth: "60rem",
        margin: "0 auto 3rem auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          position: "relative",
        }}
      >
        {/* Progress line */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "12.5%",
            right: "12.5%",
            height: "2px",
            backgroundColor: "var(--border)",
            zIndex: 1,
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            top: "1rem",
            left: "12.5%",
            height: "2px",
            backgroundColor: "var(--primary)",
            zIndex: 2,
          }}
          initial={{ width: "0%" }}
          animate={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 75}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              position: "relative",
              zIndex: 3,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* Step circle */}
            <motion.div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                backgroundColor: step.id <= currentStep ? "var(--primary)" : "var(--border)",
                color: step.id <= currentStep ? "var(--primary-foreground)" : "var(--muted-foreground)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
                fontWeight: "600",
                position: "relative",
                border: "3px solid var(--background)",
                boxShadow: "var(--shadow-sm)",
              }}
              animate={{
                backgroundColor: step.id <= currentStep ? "var(--primary)" : "var(--border)",
                color: step.id <= currentStep ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
              transition={{ duration: 0.3 }}
            >
              {step.id < currentStep ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                  <CheckCircle size={16} />
                </motion.div>
              ) : (
                step.id
              )}
            </motion.div>

            {/* Step info */}
            <div style={{ textAlign: "center", marginTop: "0.75rem", maxWidth: "8rem" }}>
              <h3
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: step.id <= currentStep ? "var(--foreground)" : "var(--muted-foreground)",
                  margin: "0 0 0.25rem 0",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  margin: 0,
                  lineHeight: "1.3",
                }}
              >
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
