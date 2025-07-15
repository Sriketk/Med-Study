import { caseStudyData } from "@/data/casestudydata";
import CaseStudyQuestions from "@/components/case-study/case-study-page";

export default async function CaseStudyPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  console.log(category);
  return <CaseStudyQuestions caseData={caseStudyData} />;
}
