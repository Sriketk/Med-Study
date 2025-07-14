import { caseStudyData } from "@/data/casestudydata";
import CaseStudyQuestions from "@/components/case-study/case-study-page"

export default function CaseStudyPage() {
  return <CaseStudyQuestions caseData={caseStudyData} />;
}
