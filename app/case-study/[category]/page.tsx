import CaseStudyQuestions from "@/components/case-study/case-study-page";
import { fetchQuestionsApi } from "@/lib/utils";
import { Suspense } from "react";
import CaseStudyLoading from "./loading";
import { Step2Question } from "@/lib/types";

export default async function CaseStudyPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;
  
  const apiQuestions = await fetchQuestionsApi(category, {
    limit: 10,
    examType: "Step-2",
    context: "case-study",
  });

  return (
    <Suspense fallback={<CaseStudyLoading />}>
      <CaseStudyQuestions questions={apiQuestions as Step2Question[]} />
    </Suspense>
  );
}
