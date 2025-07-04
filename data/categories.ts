import { Target, Heart, Pill, Shield, Baby, FlaskConical } from "lucide-react";
import { practiceQuestions } from "./practice-questions";

export const categories = [
  {
    name: "Cardiology",
    icon: Heart,
    color: "#ef4444",
    description: "Heart and cardiovascular system",
    questionCount: practiceQuestions["Cardiology"].length,
  },
  {
    name: "Pharmacology",
    icon: Pill,
    color: "#3b82f6",
    description: "Drug mechanisms and interactions",
    questionCount: practiceQuestions["Pharmacology"].length,
  },
  {
    name: "Endocrinology",
    icon: Target,
    color: "#10b981",
    description: "Hormones and metabolic disorders",
    questionCount: practiceQuestions["Endocrinology"].length,
  },
  {
    name: "Immunology",
    icon: Shield,
    color: "#8b5cf6",
    description: "Immune system and disorders",
    questionCount: practiceQuestions["Immunology"].length,
  },
  {
    name: "Pediatrics",
    icon: Baby,
    color: "#f59e0b",
    description: "Child health and development",
    questionCount: practiceQuestions["Pediatrics"].length,
  },
  {
    name: "Biochemistry",
    icon: FlaskConical,
    color: "#ec4899",
    description: "Biochemical processes and disorders",
    questionCount: 0, // No questions available yet
  },
];
