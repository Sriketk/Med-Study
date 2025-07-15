import { caseStudyData } from "@/data/casestudydata";
import CaseStudyQuestions from "@/components/case-study/case-study-page";
import { step2TopicMap } from "@/lib/utils";

export default async function CaseStudyPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  const topic = step2TopicMap[category.toLowerCase()] || category;
  const url = `/api/questions/Step-2?topic=${encodeURIComponent(
    topic
  )}&limit=20`;
  console.log(category);
  return <CaseStudyQuestions caseData={caseStudyData} />;
}
