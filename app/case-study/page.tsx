"use client"

import { useRouter } from "next/navigation"
import CaseStudyPage from "@/components/case-study/case-study-page"
import { caseStudyData } from "@/data/casestudydata"

export default function CaseStudy() {
  const router = useRouter()

  return (
    <CaseStudyPage
      caseData={caseStudyData}
      onBackToHome={() => router.push("/")}
    />
  )
} 