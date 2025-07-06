"use client"

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

export default function AcademicYearStep({ selectedYear, onYearSelect }: AcademicYearStepProps) {
  return (
    <div key="step1">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-4">
          <GraduationCap size={24} className="text-primary" />
        </div>
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
    </div>
  )
}
