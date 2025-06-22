"use client"

import { motion } from "framer-motion"

interface LoadingScreenProps {
  progress: number
  step: string
  showButton?: boolean
  buttonText?: string
  onButtonClick?: () => void
}

export default function LoadingScreen({
  progress,
  step,
  showButton = false,
  buttonText = "Retry",
  onButtonClick,
}: LoadingScreenProps) {
  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ textAlign: "center", maxWidth: "24rem" }}>
        <motion.div
          style={{
            width: "4rem",
            height: "4rem",
            border: "4px solid var(--muted)",
            borderTop: "4px solid var(--primary)",
            borderRadius: "50%",
            margin: "0 auto 2rem auto",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--foreground)",
            marginBottom: "1rem",
          }}
        >
          Analyzing Your Performance
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            marginBottom: "2rem",
          }}
        >
          {step}
        </p>
        <div
          style={{
            width: "100%",
            height: "0.5rem",
            backgroundColor: "var(--muted)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              height: "100%",
              backgroundColor: "var(--primary)",
              borderRadius: "9999px",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--muted-foreground)",
            marginTop: "1rem",
          }}
        >
          {progress}% complete
        </p>
        {showButton && (
          <motion.button
            onClick={onButtonClick}
            style={{
              marginTop: "2rem",
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "var(--radius)",
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
            }}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.98 }}
          >
            {buttonText}
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
