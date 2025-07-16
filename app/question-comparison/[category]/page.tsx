import { ComparisonExperiencePage } from "@/components/question-comparison/comparison-experience-page";

interface Params {
  category: string;
}

export default async function CategoryComparison({
  params,
}: {
  params: Params;
}) {
  const { category } = await params;
  console.log(category);
  return <ComparisonExperiencePage category={category} />;
}
