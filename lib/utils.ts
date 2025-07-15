import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Step1Question, Question, ComparisonQuestion } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Transform API question (Step1Question) to our UI Question interface
 */
export const transformApiQuestion = (
  apiQuestion: Step1Question,
  id: number
): Question => {
  return {
    id,
    question: apiQuestion.question,
    options: apiQuestion.choices,
    correct: apiQuestion.choices.indexOf(apiQuestion.answer),
    category: apiQuestion.topic,
    difficulty: "Medium", // Default difficulty since API doesn't provide it
    explanation: apiQuestion.explanation,
  };
};

/**
 * Transform API question to comparison format (for question comparison feature)
 */
export const transformApiQuestionForComparison = (
  apiQuestion: Step1Question,
  id: number
): ComparisonQuestion => {
  return {
    id,
    question: apiQuestion.question,
    choices: apiQuestion.choices,
    answer: apiQuestion.answer,
    explanation: apiQuestion.explanation,
    category: apiQuestion.topic,
    difficulty: "Medium", // Default difficulty since API doesn't provide it
  };
};

/**
 * Shared function to fetch questions from the API
 * @param category - The category to fetch questions for
 * @param options - Configuration options
 */
export const fetchQuestionsApi = async (
  category: string,
  options: {
    limit?: number;
    minRequired?: number;
    examType?: string;
    context?: string;
  } = {}
): Promise<Step1Question[]> => {
  const {
    limit = 50,
    minRequired = 1,
    examType = "Step-1",
    context = "questions",
  } = options;

  // Map category to topic name
  const topic = step1TopicMap[category.toLowerCase()] || category;
  const url = `/api/questions/${examType}?topic=${encodeURIComponent(
    topic
  )}&limit=${limit}`;

  console.log(`🔍 Fetching ${context} from:`, url);
  console.log("📝 Category mapping:", category, "->", topic);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ API Error:", response.status, errorText);
    throw new Error(
      `Failed to fetch questions: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  console.log("✅ API Response:", {
    success: data.success,
    count: data.count,
    dataLength: data.data?.length,
    topic: data.topic,
    message: data.message,
  });

  if (!data.success) {
    throw new Error(data.message || "API returned unsuccessful response");
  }

  if (!data.data || data.data.length < minRequired) {
    if (minRequired === 1) {
      throw new Error(
        `No questions available for "${topic}". Please try a different category.`
      );
    } else {
      throw new Error(
        `Not enough questions available for ${context} in "${topic}". Found ${
          data.data?.length || 0
        } questions, but need at least ${minRequired} for ${context}.`
      );
    }
  }

  console.log(
    "📊 Successfully fetched",
    data.data.length,
    "questions for",
    topic
  );
  return data.data;
};

export const step2TopicMap: { [key: string]: string } = {
  biochemistry: "Biochemistry",
  cardiology: "Cardiovascular",
  pharmacology: "Pharmacology",
  endocrinology: "EndocrineAndDiabetesAndMetabolism",
  immunology: "AllergiesAndImmunology",
  pediatrics: "Pediatrics", // This might not have questions yet
  microbiology: "Microbiology",
  dermatology: "Dermatology",
  pathology: "Pathology",
  genetics: "Genetics",
  hematology: "HematologyAndOncology",
  "infectious-diseases": "InfectiousDiseases",
  neurology: "NervousSystem",
  ophthalmology: "Ophthalmology",
  psychiatry: "PsychiatricAndSubstanceUseDisorders",
  "critical-care": "CriticalCare",
  renal: "RenalAndUrinary",
  rheumatology: "RheumatologyAndOrthopedics",
};

export const step1TopicMap: { [key: string]: string } = {
  biochemistry: "Biochemistry",
  cardiology: "Cardiovascular",
  pharmacology: "Pharmacology",
  endocrinology: "EndocrineAndDiabetesAndMetabolism",
  immunology: "AllergiesAndImmunology",
  pediatrics: "Pediatrics",
  microbiology: "Microbiology",
  dermatology: "Dermatology",
  pathology: "Pathology",
  genetics: "Genetics",
  hematology: "HematologyAndOncology",
  "infectious-diseases": "InfectiousDiseases",
  neurology: "NervousSystem",
  ophthalmology: "Ophthalmology",
  psychiatry: "PsychiatricAndSubstanceUseDisorders",
  "critical-care": "CriticalCare",
  renal: "RenalAndUrinary",
  rheumatology: "RheumatologyAndOrthopedics",
};
