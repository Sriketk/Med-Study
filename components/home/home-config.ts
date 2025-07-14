import {
  Target,
  MessageSquare,
  Microscope,
  BookOpen,
  Brain,
  Scale,
  LucideIcon,
} from "lucide-react";

// Configuration interface for home page cards
export interface CardConfig {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconColor?: string;
  badge: {
    icon: LucideIcon;
    text: string;
  };
}

/**
 * 🚀 HOME PAGE CARDS CONFIGURATION
 *
 * To add a new section:
 * 1. Add a new object to this array
 * 2. Import any new icons at the top
 * 3. The component will automatically handle the rest!
 *
 * Template:
 * {
 *   title: "Your Title",
 *   description: "Your description text",
 *   href: "/your-route",
 *   icon: YourIconName,
 *   badge: {
 *     icon: YourBadgeIcon,
 *     text: "Badge Text"
 *   }
 * }
 */
export const HOME_CARDS: CardConfig[] = [
  // {
  //   title: "Assessment Quiz",
  //   description:
  //     "Take a comprehensive quiz to gauge your current knowledge level",
  //   href: "/quiz",
  //   icon: Target,
  //   badge: {
  //     icon: BookOpen,
  //     text: "5 Questions",
  //   },
  // },
  {
    title: "Clinicals",
    description:
      "Interactive clinical case with chat-based information gathering",
    href: "/case-study",
    icon: MessageSquare,
    badge: {
      icon: Brain,
      text: "Interactive",
    },
  },
  {
    title: "Study & Practice",
    description:
      "Study specific topics with detailed explanations and immediate feedback",
    href: "/practice",
    icon: Microscope,
    badge: {
      icon: BookOpen,
      text: "5 Categories",
    },
  },

  {
    title: "Question Comparison",
    description: "Compare pairs of questions and help identify the better ones",
    href: "/question-comparison",
    icon: Scale,
    badge: {
      icon: Target,
      text: "Compare & Rate",
    },
  },

  // 💡 EXAMPLE: Add new sections here:
  // {
  //   title: "Flashcards",
  //   description: "Review key concepts with interactive flashcards",
  //   href: "/flashcards",
  //   icon: BookOpen,
  //   badge: {
  //     icon: Brain,
  //     text: "Memory Boost"
  //   }
  // }
];

// Export individual sections if needed
export const CASE_STUDY_CARD = HOME_CARDS[0];
export const PRACTICE_CARD = HOME_CARDS[1];
export const QUESTION_COMPARISON_CARD = HOME_CARDS[2];
