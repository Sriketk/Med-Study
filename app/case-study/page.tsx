"use client"

import CaseStudyPage from "@/components/case-study/case-study-page"
import { caseStudyData } from "@/data/casestudydata"

export default function CaseStudy() {
  return (
    <CaseStudyPage
      caseData={caseStudyData}
    />
  )
} 