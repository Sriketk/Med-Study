import { Target, Heart, Pill, Shield, Baby, FlaskConical } from "lucide-react";

export const categories = [
  {
    name: "Cardiology",
    icon: Heart,
    color: "#ef4444",
    description: "Heart and cardiovascular system",
    questionCount: null, // Will be fetched dynamically
  },
  {
    name: "Pharmacology",
    icon: Pill,
    color: "#3b82f6",
    description: "Drug mechanisms and interactions",
    questionCount: null, // Will be fetched dynamically
  },
  {
    name: "Endocrinology",
    icon: Target,
    color: "#10b981",
    description: "Hormones and metabolic disorders",
    questionCount: null, // Will be fetched dynamically
  },
  {
    name: "Immunology",
    icon: Shield,
    color: "#8b5cf6",
    description: "Immune system and disorders",
    questionCount: null, // Will be fetched dynamically
  },
  {
    name: "Pediatrics",
    icon: Baby,
    color: "#f59e0b",
    description: "Child health and development",
    questionCount: null, // Will be fetched dynamically
  },
  {
    name: "Biochemistry",
    icon: FlaskConical,
    color: "#ec4899",
    description: "Biochemical processes and disorders",
    questionCount: null, // Will be fetched dynamically
  },
];
