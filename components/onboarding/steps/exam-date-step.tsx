"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, ChevronRight, CheckCircle } from "lucide-react"
import { easeInOut } from "framer-motion"
import { Calendar } from "@/components/ui/calendar"

interface ExamDateStepProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
}

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
}

const pageTransition = {
  ease: easeInOut,
  duration: 0.4,
}

export default function ExamDateStep({
  selectedDate,
  onDateSelect,
}: ExamDateStepProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date)
    setTimeout(() => {
      setIsCalendarOpen(false)
    }, 300)
  }

  return (
    <motion.div
      key="step3"
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
          <CalendarIcon size={24} color="var(--primary)" />
        </motion.div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--foreground)",
            marginBottom: "0.5rem",
          }}
        >
          When is your exam?
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            margin: 0,
          }}
        >
          Select your scheduled exam date
        </p>
      </div>

      <div style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}>
        {/* Selected Date Display */}
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "var(--foreground)",
              marginBottom: "0.5rem",
            }}
          >
            Selected Date
          </label>
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              border: "2px solid var(--border)",
              borderRadius: "var(--radius)",
              backgroundColor: "var(--card)",
              fontSize: "1rem",
              color: selectedDate ? "var(--foreground)" : "var(--muted-foreground)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CalendarIcon size={16} color="var(--muted-foreground)" />
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Click to select date"}
            </div>
            <ChevronRight
              size={16}
              style={{
                transform: isCalendarOpen ? "rotate(90deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>
        </div>

        {/* Calendar - Conditionally rendered */}
        <AnimatePresence>
          {isCalendarOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                bottom: "100%",
                left: 0,
                right: 0,
                marginBottom: "0.5rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
                zIndex: 10,
              }}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                defaultMonth={selectedDate}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderRadius: "var(--radius)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <CheckCircle size={16} color="#10b981" />
              <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#10b981" }}>Date Confirmed</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "#10b981", margin: 0 }}>
              {selectedDate &&
                `${Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
