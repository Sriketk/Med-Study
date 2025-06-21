"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CalendarIcon, ChevronRight, CheckCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

interface ExamDateStepProps {
  selectedDate: Date | undefined
  isCalendarOpen: boolean
  onDateSelect: (date: Date | undefined) => void
  onCalendarToggle: () => void
}

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

export default function ExamDateStep({
  selectedDate,
  isCalendarOpen,
  onDateSelect,
  onCalendarToggle,
}: ExamDateStepProps) {
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Selected Date Display */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
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
              onClick={onCalendarToggle}
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

          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: "1rem",
                backgroundColor: "#dcfce7",
                borderRadius: "var(--radius)",
                border: "1px solid #10b981",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <CheckCircle size={16} color="#10b981" />
                <span style={{ fontSize: "0.875rem", fontWeight: "600", color: "#065f46" }}>Date Confirmed</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "#047857", margin: 0 }}>
                {selectedDate &&
                  `${Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Calendar - Only show when open */}
        <AnimatePresence>
          {isCalendarOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  onDateSelect(date)
                  onCalendarToggle()
                }}
                disabled={(date) => date < new Date()}
                className="rounded-md"
                style={{
                  width: "100%",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
