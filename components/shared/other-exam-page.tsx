"use client"

import { motion } from "framer-motion"
import { Brain } from "lucide-react"

interface OtherExamPageProps {
  examType: string
  onTryStep1: () => void
  onGoBack: () => void
}

export default function OtherExamPage({ examType, onTryStep1, onGoBack }: OtherExamPageProps) {
  return (
    <motion.div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow-lg)",
          padding: "3rem",
          textAlign: "center",
          maxWidth: "32rem",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "4rem",
            height: "4rem",
            backgroundColor: "#f59e0b",
            borderRadius: "50%",
            marginBottom: "1.5rem",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Brain size={24} color="white" />
        </motion.div>

        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "900",
            color: "var(--card-foreground)",
            marginBottom: "1rem",
          }}
        >
          Coming Soon!
        </h2>

        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--muted-foreground)",
            marginBottom: "1.5rem",
          }}
        >
          We're working on study materials for {examType}.
        </p>

        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            marginBottom: "2rem",
          }}
        >
          In the meantime, you can explore our USMLE Step 1 content or check back later for updates.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <motion.button
            onClick={onTryStep1}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "var(--radius)",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try USMLE Step 1
          </motion.button>

          <motion.button
            onClick={onGoBack}
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--secondary-foreground)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
