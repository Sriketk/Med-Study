import { ComparisonExperiencePage } from "@/components/question-comparison/comparison-experience-page";

interface Params {
  category: string;
}

export default function CategoryComparison({ params }: { params: Params }) {
  return <ComparisonExperiencePage category={params.category} />;
}
