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
