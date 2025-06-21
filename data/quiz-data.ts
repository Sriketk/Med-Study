export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  category: string
  difficulty: string
  explanation: string
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question:
      "A 45-year-old patient presents with chest pain and shortness of breath. ECG shows ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
    options: [
      "Left anterior descending artery",
      "Right coronary artery",
      "Left circumflex artery",
      "Left main coronary artery",
    ],
    correct: 1,
    category: "Cardiology",
    difficulty: "Medium",
    explanation:
      "ST-elevation in leads II, III, and aVF indicates an inferior wall MI, which is typically caused by occlusion of the right coronary artery (RCA). The RCA supplies the inferior wall of the left ventricle in most patients.",
  },
  {
    id: 2,
    question: "Which of the following best describes the mechanism of action of ACE inhibitors?",
    options: [
      "Block angiotensin II receptors",
      "Inhibit conversion of angiotensin I to angiotensin II",
      "Block calcium channels",
      "Inhibit beta-adrenergic receptors",
    ],
    correct: 1,
    category: "Pharmacology",
    difficulty: "Easy",
    explanation:
      "ACE inhibitors block the angiotensin-converting enzyme, preventing the conversion of angiotensin I to angiotensin II. This reduces vasoconstriction and aldosterone secretion, leading to decreased blood pressure.",
  },
  {
    id: 3,
    question:
      "A patient with diabetes mellitus type 1 presents with fruity breath odor and altered mental status. Laboratory results show glucose 450 mg/dL and ketones in urine. What is the most likely diagnosis?",
    options: ["Hyperosmolar hyperglycemic state", "Diabetic ketoacidosis", "Hypoglycemic coma", "Lactic acidosis"],
    correct: 1,
    category: "Endocrinology",
    difficulty: "Medium",
    explanation:
      "The combination of Type 1 diabetes, fruity breath (acetone), altered mental status, hyperglycemia, and ketonuria is classic for diabetic ketoacidosis (DKA). The fruity breath is due to acetone, a ketone body.",
  },
  {
    id: 4,
    question: "Which cell type is primarily responsible for antibody production?",
    options: ["T helper cells", "Plasma cells", "Natural killer cells", "Macrophages"],
    correct: 1,
    category: "Immunology",
    difficulty: "Easy",
    explanation:
      "Plasma cells are differentiated B cells that are specialized for antibody production. When B cells encounter their specific antigen and receive appropriate signals, they differentiate into plasma cells that secrete large amounts of antibodies.",
  },
  {
    id: 5,
    question:
      "A newborn presents with cyanosis that worsens with crying. Echocardiogram shows right ventricular hypertrophy and a ventricular septal defect. What is the most likely diagnosis?",
    options: ["Atrial septal defect", "Patent ductus arteriosus", "Tetralogy of Fallot", "Coarctation of aorta"],
    correct: 2,
    category: "Pediatrics",
    difficulty: "Hard",
    explanation:
      "Tetralogy of Fallot consists of four components: VSD, pulmonary stenosis, right ventricular hypertrophy, and overriding aorta. The cyanosis that worsens with crying is due to increased right-to-left shunting during periods of increased oxygen demand.",
  },
]

export interface PracticeQuestion {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

export const practiceQuestions: Record<string, PracticeQuestion[]> = {
  Cardiology: [
    {
      id: 101,
      question:
        "A 65-year-old man presents with crushing chest pain radiating to his left arm. Which enzyme is most specific for myocardial infarction?",
      options: ["CK-MB", "Troponin I", "LDH", "AST"],
      correct: 1,
      explanation:
        "Troponin I is the most specific marker for myocardial infarction. It's released when cardiac muscle cells are damaged and remains elevated for several days, making it both sensitive and specific for cardiac injury.",
    },
    {
      id: 102,
      question: "What is the most common cause of heart failure in developed countries?",
      options: ["Valvular disease", "Coronary artery disease", "Hypertension", "Cardiomyopathy"],
      correct: 1,
      explanation:
        "Coronary artery disease is the leading cause of heart failure in developed countries, accounting for approximately 60-70% of cases. It leads to heart failure through myocardial infarction and chronic ischemia.",
    },
    // ... (continuing with all cardiology questions)
  ],
  Pharmacology: [
    {
      id: 201,
      question: "Which of the following is a common side effect of ACE inhibitors?",
      options: ["Hyperkalemia", "Hypokalemia", "Hypernatremia", "Hyponatremia"],
      correct: 0,
      explanation:
        "ACE inhibitors commonly cause hyperkalemia by reducing aldosterone levels. Aldosterone normally promotes potassium excretion, so its reduction leads to potassium retention.",
    },
    // ... (continuing with all pharmacology questions)
  ],
  // ... (continuing with all other categories)
}

export interface Category {
  name: string
  icon: any
  color: string
  description: string
  questionCount: number
}

export const categories: Category[] = [
  {
    name: "Cardiology",
    icon: "Heart",
    color: "#ef4444",
    description: "Heart and cardiovascular system",
    questionCount: 10,
  },
  {
    name: "Pharmacology",
    icon: "Pill",
    color: "#3b82f6",
    description: "Drug mechanisms and interactions",
    questionCount: 10,
  },
  {
    name: "Endocrinology",
    icon: "Target",
    color: "#10b981",
    description: "Hormones and metabolic disorders",
    questionCount: 10,
  },
  {
    name: "Immunology",
    icon: "Shield",
    color: "#8b5cf6",
    description: "Immune system and disorders",
    questionCount: 10,
  },
  {
    name: "Pediatrics",
    icon: "Baby",
    color: "#f59e0b",
    description: "Child health and development",
    questionCount: 10,
  },
]
