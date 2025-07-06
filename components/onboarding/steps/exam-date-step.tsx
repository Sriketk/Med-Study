"use client"

import { useState } from "react"
import { CalendarIcon, ChevronRight, CheckCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

interface ExamDateStepProps {
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
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
    <div key="step3">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-4">
          <CalendarIcon size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          When is your exam?
        </h2>
        <p className="text-muted-foreground">
          Select your scheduled exam date
        </p>
      </div>

      <div className="relative max-w-sm mx-auto">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Selected Date
          </label>
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="w-full flex items-center justify-between p-3 border-2 border-border rounded-lg bg-card text-left"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-muted-foreground" />
              <span className={selectedDate ? "text-foreground" : "text-muted-foreground"}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Click to select date"}
              </span>
            </div>
            <ChevronRight
              size={16}
              className={`transform transition-transform duration-200 ${isCalendarOpen ? "rotate-90" : ""}`}
            />
          </button>
        </div>

        {isCalendarOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 z-10">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
              defaultMonth={selectedDate}
              className="rounded-md border bg-card shadow-lg"
            />
          </div>
        )}

        {selectedDate && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="text-sm font-semibold text-green-600">Date Confirmed</span>
            </div>
            <p className="text-xs text-green-600">
              {`${Math.ceil((selectedDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
