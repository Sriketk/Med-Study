"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import OnboardingFlow from "@/components/onboarding/onboarding-flow"
import HomePage from "@/components/home/home-page"
import QuizPage from "@/components/quiz/quiz-page"
import LoadingScreen from "@/components/shared/loading-screen"
import OtherExamPage from "@/components/shared/other-exam-page"
import CaseStudyPage from "@/components/case-study/case-study-page"
import CategoriesPage from "@/components/categories/categories-page"
import PracticePage from "@/components/practice/practice-page"
import AnalyticsPage from "@/components/analytics/analytics-page"
import ResultsPage from "@/components/results/results-page"
import { quizQuestions } from "@/data/quiz-data"
import { Target, Heart, Pill, Shield, Baby } from "lucide-react"

// Practice questions organized by category
const practiceQuestions = {
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
    {
      id: 103,
      question: "Which heart sound is associated with ventricular gallop?",
      options: ["S1", "S2", "S3", "S4"],
      correct: 2,
      explanation:
        "S3 gallop (ventricular gallop) occurs in early diastole and is associated with heart failure. It represents rapid ventricular filling and is often described as sounding like 'Kentucky' when combined with S1 and S2.",
    },
    {
      id: 104,
      question: "What is the first-line treatment for stable angina?",
      options: ["ACE inhibitors", "Beta-blockers", "Calcium channel blockers", "Nitrates"],
      correct: 1,
      explanation:
        "Beta-blockers are first-line therapy for stable angina as they reduce heart rate and contractility, thereby decreasing myocardial oxygen demand. They also have proven mortality benefits in patients with coronary artery disease.",
    },
    {
      id: 105,
      question: "Which arrhythmia is most commonly associated with Wolff-Parkinson-White syndrome?",
      options: ["Atrial fibrillation", "Supraventricular tachycardia", "Ventricular tachycardia", "Heart block"],
      correct: 1,
      explanation:
        "WPW syndrome is most commonly associated with supraventricular tachycardia (SVT), specifically AV reentrant tachycardia. The accessory pathway allows for reentrant circuits that can cause rapid heart rates.",
    },
    {
      id: 106,
      question: "What is the most common congenital heart defect?",
      options: ["Atrial septal defect", "Ventricular septal defect", "Patent ductus arteriosus", "Tetralogy of Fallot"],
      correct: 1,
      explanation:
        "Ventricular septal defect (VSD) is the most common congenital heart defect, accounting for about 20-25% of all congenital heart diseases. Many small VSDs close spontaneously during childhood.",
    },
    {
      id: 107,
      question: "Which medication is contraindicated in patients with severe aortic stenosis?",
      options: ["Beta-blockers", "ACE inhibitors", "Digoxin", "Diuretics"],
      correct: 1,
      explanation:
        "ACE inhibitors are relatively contraindicated in severe aortic stenosis because they can cause dangerous hypotension. The fixed obstruction prevents the heart from increasing cardiac output to compensate for vasodilation.",
    },
    {
      id: 108,
      question: "What is the most common cause of sudden cardiac death in young athletes?",
      options: [
        "Coronary artery disease",
        "Hypertrophic cardiomyopathy",
        "Long QT syndrome",
        "Arrhythmogenic right ventricular cardiomyopathy",
      ],
      correct: 1,
      explanation:
        "Hypertrophic cardiomyopathy is the most common cause of sudden cardiac death in young athletes. The condition can cause outflow tract obstruction and arrhythmias, particularly during intense physical activity.",
    },
    {
      id: 109,
      question: "Which finding is most suggestive of right heart failure?",
      options: ["Pulmonary edema", "Jugular venous distension", "S3 gallop", "Paroxysmal nocturnal dyspnea"],
      correct: 1,
      explanation:
        "Jugular venous distension (JVD) is most suggestive of right heart failure, indicating elevated right atrial pressure. The other options are more commonly associated with left heart failure.",
    },
    {
      id: 110,
      question: "What is the mechanism of action of digoxin?",
      options: ["Beta-blocker", "ACE inhibitor", "Na+/K+-ATPase inhibitor", "Calcium channel blocker"],
      correct: 2,
      explanation:
        "Digoxin inhibits the Na+/K+-ATPase pump, leading to increased intracellular sodium and subsequently increased intracellular calcium through the Na+/Ca2+ exchanger. This increases cardiac contractility.",
    },
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
    {
      id: 202,
      question: "What is the antidote for warfarin overdose?",
      options: ["Protamine sulfate", "Vitamin K", "Fresh frozen plasma", "Naloxone"],
      correct: 1,
      explanation:
        "Vitamin K is the antidote for warfarin overdose. Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X), and vitamin K administration helps restore normal coagulation.",
    },
    {
      id: 203,
      question: "Which antibiotic is associated with tendon rupture?",
      options: ["Penicillin", "Ciprofloxacin", "Erythromycin", "Cephalexin"],
      correct: 1,
      explanation:
        "Fluoroquinolones like ciprofloxacin are associated with tendon rupture, particularly the Achilles tendon. This risk is increased in elderly patients and those taking corticosteroids.",
    },
    {
      id: 204,
      question: "What is the mechanism of action of statins?",
      options: ["Inhibit cholesterol absorption", "Inhibit HMG-CoA reductase", "Bind bile acids", "Inhibit PCSK9"],
      correct: 1,
      explanation:
        "Statins inhibit HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis. This leads to decreased hepatic cholesterol production and upregulation of LDL receptors.",
    },
    {
      id: 205,
      question: "Which medication can cause cinchonism?",
      options: ["Quinidine", "Procainamide", "Lidocaine", "Amiodarone"],
      correct: 0,
      explanation:
        "Quinidine can cause cinchonism, a syndrome characterized by tinnitus, hearing loss, blurred vision, and confusion. It's related to quinidine's similarity to quinine.",
    },
    {
      id: 206,
      question: "What is the primary mechanism of aspirin's cardioprotective effect?",
      options: ["COX-2 inhibition", "COX-1 inhibition", "Thromboxane synthesis", "Prostacyclin inhibition"],
      correct: 1,
      explanation:
        "Aspirin's cardioprotective effect is primarily due to irreversible COX-1 inhibition in platelets, which prevents thromboxane A2 synthesis and reduces platelet aggregation.",
    },
    {
      id: 207,
      question: "Which drug interaction increases the risk of rhabdomyolysis with statins?",
      options: ["Warfarin", "Gemfibrozil", "Aspirin", "Metformin"],
      correct: 1,
      explanation:
        "Gemfibrozil significantly increases statin levels by inhibiting glucuronidation, leading to increased risk of rhabdomyolysis. This combination should generally be avoided.",
    },
    {
      id: 208,
      question: "What is the antidote for heparin overdose?",
      options: ["Vitamin K", "Protamine sulfate", "Fresh frozen plasma", "Aminocaproic acid"],
      correct: 1,
      explanation:
        "Protamine sulfate is the antidote for heparin overdose. It's a positively charged protein that binds to negatively charged heparin, neutralizing its anticoagulant effect.",
    },
    {
      id: 209,
      question: "Which medication is first-line for treating anaphylaxis?",
      options: ["Diphenhydramine", "Epinephrine", "Corticosteroids", "Albuterol"],
      correct: 1,
      explanation:
        "Epinephrine is the first-line treatment for anaphylaxis. It counteracts the massive histamine release by causing vasoconstriction, bronchodilation, and positive inotropic effects.",
    },
    {
      id: 210,
      question: "What is a common side effect of amiodarone?",
      options: ["Pulmonary fibrosis", "Renal failure", "Hepatotoxicity", "All of the above"],
      correct: 3,
      explanation:
        "Amiodarone can cause multiple serious side effects including pulmonary fibrosis, hepatotoxicity, thyroid dysfunction, and corneal deposits. Regular monitoring is required.",
    },
  ],
  Endocrinology: [
    {
      id: 301,
      question: "What is the most common cause of hyperthyroidism?",
      options: ["Toxic multinodular goiter", "Graves' disease", "Thyroiditis", "TSH-secreting adenoma"],
      correct: 1,
      explanation:
        "Graves' disease is the most common cause of hyperthyroidism, accounting for 70-80% of cases. It's an autoimmune condition caused by thyroid-stimulating immunoglobulins that mimic TSH.",
    },
    {
      id: 302,
      question: "Which hormone is deficient in Addison's disease?",
      options: ["Cortisol", "Aldosterone", "Both cortisol and aldosterone", "ACTH"],
      correct: 2,
      explanation:
        "Addison's disease (primary adrenal insufficiency) involves deficiency of both cortisol and aldosterone due to destruction of the adrenal cortex. This leads to both glucocorticoid and mineralocorticoid deficiency.",
    },
    {
      id: 303,
      question: "What is the target HbA1c for most diabetic patients?",
      options: ["<6%", "<7%", "<8%", "<9%"],
      correct: 1,
      explanation:
        "The target HbA1c for most diabetic patients is <7%. This represents good glycemic control while balancing the risk of hypoglycemia. Individual targets may vary based on patient factors.",
    },
    {
      id: 304,
      question: "Which test is most specific for diagnosing acromegaly?",
      options: ["Random GH level", "IGF-1 level", "Oral glucose tolerance test with GH", "MRI of pituitary"],
      correct: 2,
      explanation:
        "Oral glucose tolerance test with GH measurement is most specific for acromegaly. Normally, glucose suppresses GH to <1 ng/mL, but in acromegaly, GH fails to suppress appropriately.",
    },
    {
      id: 305,
      question: "What is the most common cause of Cushing's syndrome?",
      options: ["Pituitary adenoma", "Adrenal adenoma", "Ectopic ACTH", "Exogenous steroids"],
      correct: 3,
      explanation:
        "Exogenous steroid administration is the most common cause of Cushing's syndrome. Among endogenous causes, pituitary adenomas (Cushing's disease) are most common.",
    },
    {
      id: 306,
      question: "Which medication is first-line for type 2 diabetes?",
      options: ["Insulin", "Sulfonylureas", "Metformin", "Thiazolidinediones"],
      correct: 2,
      explanation:
        "Metformin is first-line therapy for type 2 diabetes. It decreases hepatic glucose production, improves insulin sensitivity, and has cardiovascular benefits with low risk of hypoglycemia.",
    },
    {
      id: 307,
      question: "What is the most common cause of hypothyroidism in developed countries?",
      options: ["Iodine deficiency", "Hashimoto's thyroiditis", "Surgical removal", "Radioactive iodine"],
      correct: 1,
      explanation:
        "Hashimoto's thyroiditis (chronic autoimmune thyroiditis) is the most common cause of hypothyroidism in developed countries where iodine deficiency is rare.",
    },
    {
      id: 308,
      question: "Which finding is characteristic of diabetic ketoacidosis?",
      options: ["High bicarbonate", "Low anion gap", "High anion gap", "Normal pH"],
      correct: 2,
      explanation:
        "DKA is characterized by high anion gap metabolic acidosis due to accumulation of ketoacids (beta-hydroxybutyrate and acetoacetate). The anion gap is typically >12 mEq/L.",
    },
    {
      id: 309,
      question: "What is the most sensitive test for primary hyperparathyroidism?",
      options: ["Serum calcium", "Serum phosphorus", "Serum PTH", "24-hour urine calcium"],
      correct: 2,
      explanation:
        "Serum PTH is the most sensitive test for primary hyperparathyroidism. An elevated or inappropriately normal PTH in the setting of hypercalcemia suggests primary hyperparathyroidism.",
    },
    {
      id: 310,
      question: "Which complication is most feared in thyroid storm?",
      options: ["Seizures", "Heart failure", "Coma", "All of the above"],
      correct: 3,
      explanation:
        "Thyroid storm can cause multiple life-threatening complications including heart failure, seizures, coma, and hyperthermia. It has a high mortality rate and requires immediate treatment.",
    },
  ],
  Immunology: [
    {
      id: 401,
      question: "Which immunoglobulin is most abundant in serum?",
      options: ["IgA", "IgG", "IgM", "IgE"],
      correct: 1,
      explanation:
        "IgG is the most abundant immunoglobulin in serum, comprising about 75% of total immunoglobulins. It provides long-term immunity and can cross the placenta.",
    },
    {
      id: 402,
      question: "What type of hypersensitivity reaction is anaphylaxis?",
      options: ["Type I", "Type II", "Type III", "Type IV"],
      correct: 0,
      explanation:
        "Anaphylaxis is a Type I (immediate) hypersensitivity reaction mediated by IgE antibodies and mast cell degranulation, leading to rapid release of histamine and other mediators.",
    },
    {
      id: 403,
      question: "Which cells are primarily responsible for cell-mediated immunity?",
      options: ["B cells", "T cells", "NK cells", "Macrophages"],
      correct: 1,
      explanation:
        "T cells are primarily responsible for cell-mediated immunity. CD8+ T cells directly kill infected cells, while CD4+ T cells coordinate immune responses and activate other immune cells.",
    },
    {
      id: 404,
      question: "What is the primary function of complement?",
      options: ["Antibody production", "Cell lysis and opsonization", "Antigen presentation", "Memory formation"],
      correct: 1,
      explanation:
        "The complement system's primary functions include cell lysis through membrane attack complex formation and opsonization to enhance phagocytosis. It also promotes inflammation.",
    },
    {
      id: 405,
      question: "Which HLA class is associated with organ transplant rejection?",
      options: ["HLA Class I only", "HLA Class II only", "Both Class I and II", "Neither"],
      correct: 2,
      explanation:
        "Both HLA Class I and Class II molecules are important in transplant rejection. Class I (HLA-A, B, C) are on all nucleated cells, while Class II (HLA-DR, DQ, DP) are on antigen-presenting cells.",
    },
    {
      id: 406,
      question: "What is the most common primary immunodeficiency?",
      options: ["SCID", "DiGeorge syndrome", "IgA deficiency", "Chronic granulomatous disease"],
      correct: 2,
      explanation:
        "Selective IgA deficiency is the most common primary immunodeficiency, affecting about 1 in 500 people. Many patients are asymptomatic, but some have recurrent respiratory infections.",
    },
    {
      id: 407,
      question: "Which cytokine is most important for Th1 differentiation?",
      options: ["IL-4", "IL-12", "IL-6", "TGF-β"],
      correct: 1,
      explanation:
        "IL-12 is crucial for Th1 differentiation. It's produced by dendritic cells and macrophages and promotes the development of Th1 cells that produce IFN-γ and support cell-mediated immunity.",
    },
    {
      id: 408,
      question: "What is the mechanism of action of cyclosporine?",
      options: ["Blocks IL-2 production", "Inhibits purine synthesis", "Blocks complement", "Depletes lymphocytes"],
      correct: 0,
      explanation:
        "Cyclosporine inhibits calcineurin, which prevents NFAT translocation to the nucleus and blocks IL-2 production. This prevents T cell activation and proliferation.",
    },
    {
      id: 409,
      question: "Which immunoglobulin is associated with allergic reactions?",
      options: ["IgA", "IgG", "IgM", "IgE"],
      correct: 3,
      explanation:
        "IgE is associated with allergic reactions and parasitic infections. It binds to mast cells and basophils, and upon antigen binding, triggers degranulation and release of inflammatory mediators.",
    },
    {
      id: 410,
      question: "What is the primary defect in severe combined immunodeficiency (SCID)?",
      options: ["B cell defect only", "T cell defect only", "Both B and T cell defects", "Complement deficiency"],
      correct: 2,
      explanation:
        "SCID involves defects in both B and T cell function, though the primary defect is usually in T cell development. Without functional T cells, B cells also cannot function properly.",
    },
  ],
  Pediatrics: [
    {
      id: 501,
      question: "At what age should solid foods typically be introduced?",
      options: ["2-4 months", "4-6 months", "6-8 months", "8-10 months"],
      correct: 1,
      explanation:
        "Solid foods should typically be introduced between 4-6 months of age. The infant should be able to sit with support, show interest in food, and have lost the tongue-thrust reflex.",
    },
    {
      id: 502,
      question: "What is the most common cause of pneumonia in children under 2 years?",
      options: [
        "Streptococcus pneumoniae",
        "Respiratory syncytial virus",
        "Haemophilus influenzae",
        "Mycoplasma pneumoniae",
      ],
      correct: 1,
      explanation:
        "Respiratory syncytial virus (RSV) is the most common cause of pneumonia in children under 2 years, especially in infants. It can cause severe bronchiolitis and pneumonia in this age group.",
    },
    {
      id: 503,
      question: "Which vaccine is contraindicated in immunocompromised children?",
      options: ["DTaP", "IPV", "MMR", "Hib"],
      correct: 2,
      explanation:
        "MMR is a live attenuated vaccine and is contraindicated in immunocompromised children due to risk of causing disease. Inactivated vaccines like DTaP, IPV, and Hib are safe.",
    },
    {
      id: 504,
      question: "What is the most common cause of bacterial meningitis in neonates?",
      options: [
        "Streptococcus pneumoniae",
        "Neisseria meningitidis",
        "Group B Streptococcus",
        "Haemophilus influenzae",
      ],
      correct: 2,
      explanation:
        "Group B Streptococcus (GBS) is the most common cause of bacterial meningitis in neonates. It's often acquired during passage through the birth canal from colonized mothers.",
    },
    {
      id: 505,
      question: "At what age do children typically begin walking independently?",
      options: ["9-12 months", "12-15 months", "15-18 months", "18-24 months"],
      correct: 1,
      explanation:
        "Most children begin walking independently between 12-15 months. There's normal variation, with some walking as early as 9 months and others not until 18 months.",
    },
    {
      id: 506,
      question: "What is the most common congenital heart defect?",
      options: [
        "Atrial septal defect",
        "Ventricular septal defect",
        "Patent ductus arteriosus",
        "Coarctation of aorta",
      ],
      correct: 1,
      explanation:
        "Ventricular septal defect (VSD) is the most common congenital heart defect, accounting for about 20-25% of all congenital heart diseases. Many small VSDs close spontaneously.",
    },
    {
      id: 507,
      question: "Which condition is associated with a 'barking' cough?",
      options: ["Bronchiolitis", "Croup", "Pneumonia", "Asthma"],
      correct: 1,
      explanation:
        "Croup (laryngotracheobronchitis) is characterized by a distinctive 'barking' cough, stridor, and hoarseness. It's usually caused by parainfluenza virus and affects the larynx and trachea.",
    },
    {
      id: 508,
      question: "What is the treatment of choice for mild to moderate croup?",
      options: ["Antibiotics", "Bronchodilators", "Corticosteroids", "Antihistamines"],
      correct: 2,
      explanation:
        "Corticosteroids (typically dexamethasone) are the treatment of choice for croup. They reduce airway inflammation and edema, improving symptoms and reducing the need for hospitalization.",
    },
    {
      id: 509,
      question: "Which reflex disappears by 6 months of age?",
      options: ["Moro reflex", "Rooting reflex", "Palmar grasp", "All of the above"],
      correct: 3,
      explanation:
        "The Moro reflex, rooting reflex, and palmar grasp reflex all typically disappear by 4-6 months of age as the nervous system matures and voluntary motor control develops.",
    },
    {
      id: 510,
      question: "What is the most common cause of failure to thrive in developed countries?",
      options: ["Malabsorption", "Inadequate caloric intake", "Chronic disease", "Genetic disorders"],
      correct: 1,
      explanation:
        "Inadequate caloric intake is the most common cause of failure to thrive in developed countries. This can be due to feeding difficulties, behavioral issues, or psychosocial factors.",
    },
  ],
}

const categories = [
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
]

const caseStudyData = {
  id: 1,
  title: "Clinical Case Study",
  scenario:
    "A 60-year-old man presents with fatigue and generalized weakness that has been worsening over the past 2 months.",
  question: "What is the most likely cause of this patient's anemia?",
  options: ["Folate deficiency", "Iron deficiency", "Pernicious anemia", "Thalassemia", "Sideroblastic anemia"],
  correct: 2,
  explanation:
    "The combination of macrocytic anemia (MCV 112 fL), low vitamin B12, and elevated methylmalonic acid is classic for pernicious anemia. The patient's age and presentation are also typical for this condition.",
  mockedResponses: {
    lab: "Hemoglobin is 8.1 g/dL, MCV is 112 fL, vitamin B12 is low at 150 pg/mL (normal 200-900), and methylmalonic acid is elevated at 500 nmol/L (normal <270).",
    labs: "Hemoglobin is 8.1 g/dL, MCV is 112 fL, vitamin B12 is low at 150 pg/mL (normal 200-900), and methylmalonic acid is elevated at 500 nmol/L (normal <270).",
    "lab values":
      "Hemoglobin is 8.1 g/dL, MCV is 112 fL, vitamin B12 is low at 150 pg/mL (normal 200-900), and methylmalonic acid is elevated at 500 nmol/L (normal <270).",
    "physical exam":
      "Physical examination reveals pale conjunctiva and nail beds. No hepatosplenomegaly. Neurological exam shows decreased vibration sense in the lower extremities and mild ataxia.",
    exam: "Physical examination reveals pale conjunctiva and nail beds. No hepatosplenomegaly. Neurological exam shows decreased vibration sense in the lower extremities and mild ataxia.",
    history:
      "Patient reports a 6-month history of gradually worsening fatigue, occasional numbness and tingling in his hands and feet, and difficulty with balance. He has a history of autoimmune thyroiditis. No history of GI bleeding or dietary restrictions.",
    "past medical history":
      "Patient has a history of autoimmune thyroiditis diagnosed 5 years ago, currently on levothyroxine. No other significant medical history. Family history is notable for autoimmune conditions in his sister.",
    symptoms:
      "Patient describes progressive fatigue over 2 months, making it difficult to perform daily activities. He also reports intermittent numbness and tingling in his extremities, and has noticed some difficulty with balance when walking.",
    medications:
      "Current medications include levothyroxine 100 mcg daily for hypothyroidism. No other regular medications. Denies use of metformin or proton pump inhibitors.",
    "family history":
      "Family history is significant for autoimmune thyroiditis in his sister and type 1 diabetes in his mother. No known history of hematologic disorders.",
    "social history":
      "Non-smoker, occasional alcohol use (1-2 drinks per week). Works as an accountant. No recent travel or dietary changes.",
    diet: "Patient follows a regular omnivorous diet with adequate meat and dairy intake. No vegetarian or vegan dietary restrictions. Reports good appetite until recently.",
    "gi symptoms":
      "Patient denies any gastrointestinal symptoms such as nausea, vomiting, diarrhea, or abdominal pain. No history of peptic ulcer disease or GI bleeding.",
    neurological:
      "Neurological symptoms include numbness and tingling in hands and feet (stocking-glove distribution), mild difficulty with balance, and decreased vibration sense on examination.",
  },
}

// Analytics types
interface AnalyticsSession {
  id: string
  type: "quiz" | "practice"
  category?: string
  date: Date
  score: number
  correct: number
  total: number
}

interface AnalyticsCategoryStats {
  correct: number
  total: number
  sessions: number
}

interface AnalyticsData {
  sessions: AnalyticsSession[]
  categoryStats: Record<string, AnalyticsCategoryStats>
  overallStats: {
    totalQuestions: number
    totalCorrect: number
    totalSessions: number
  }
}

interface OnboardingData {
  academicYear: string
  examType: string
  examDate: Date | undefined
  uploadedFiles: File[]
}

export default function USMLEQuizApp() {
  const [currentPage, setCurrentPage] = useState<
    | "onboarding"
    | "intro"
    | "quiz"
    | "loading"
    | "results"
    | "categories"
    | "practice"
    | "analytics"
    | "case-study"
    | "other-exam"
  >("onboarding")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isDark, setIsDark] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingStep, setLoadingStep] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [practiceQuestionIndex, setPracticeQuestionIndex] = useState(0)
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [practiceComplete, setPracticeComplete] = useState(false)
  const questionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Onboarding state
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    academicYear: "",
    examType: "",
    examDate: undefined,
    uploadedFiles: [],
  })

  // Analytics and performance tracking
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    sessions: [],
    categoryStats: {},
    overallStats: {
      totalQuestions: 0,
      totalCorrect: 0,
      totalSessions: 0,
    },
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  // Scroll tracking to update current question (only for quiz mode)
  const updateCurrentQuestionFromScroll = useCallback(() => {
    if (currentPage !== "quiz") return

    const scrollPosition = window.scrollY + window.innerHeight / 2
    let closestQuestionIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    questionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect()
        const elementCenter = rect.top + window.scrollY + rect.height / 2
        const distance = Math.abs(scrollPosition - elementCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestQuestionIndex = index
        }
      }
    })

    if (closestQuestionIndex !== currentQuestion) {
      setCurrentQuestion(closestQuestionIndex)
    }
  }, [currentPage, currentQuestion])

  useEffect(() => {
    const handleScroll = () => {
      updateCurrentQuestionFromScroll()
    }

    if (currentPage === "quiz") {
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [currentPage, updateCurrentQuestionFromScroll])

  const scrollToQuestion = (index: number) => {
    const questionElement = questionRefs.current[index]
    if (questionElement) {
      const header = document.querySelector("[data-header]") as HTMLElement
      const headerHeight = header ? header.offsetHeight : 80
      const elementTop = questionElement.offsetTop
      const scrollToPosition = elementTop - headerHeight - 20

      window.scrollTo({
        top: scrollToPosition,
        behavior: "smooth",
      })
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      const nextQuestion = currentQuestion + 1
      setCurrentQuestion(nextQuestion)
      scrollToQuestion(nextQuestion)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1
      setCurrentQuestion(prevQuestion)
      scrollToQuestion(prevQuestion)
    }
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handlePracticeAnswerSelect = (questionId: number, answerIndex: number) => {
    setPracticeAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const submitPracticeAnswer = () => {
    setShowFeedback(true)
  }

  const nextPracticeQuestion = () => {
    const currentQuestions = practiceQuestions[selectedCategory]
    if (practiceQuestionIndex < currentQuestions.length - 1) {
      setPracticeQuestionIndex(practiceQuestionIndex + 1)
      setShowFeedback(false)
    } else {
      // Update analytics when practice is complete
      const correctCount = currentQuestions.filter((q) => practiceAnswers[q.id] === q.correct).length
      const score = Math.round((correctCount / currentQuestions.length) * 100)

      updateAnalytics({
        type: "practice",
        category: selectedCategory,
        score: score,
        correct: correctCount,
        total: currentQuestions.length,
      })

      setPracticeComplete(true)
    }
  }

  const selectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setPracticeQuestionIndex(0)
    setPracticeAnswers({})
    setShowFeedback(false)
    setPracticeComplete(false)
    setCurrentPage("practice")
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const startQuiz = () => {
    setCurrentPage("quiz")
  }

  const startCaseStudy = () => {
    setCurrentPage("case-study")
  }

  const startPrepare = () => {
    setCurrentPage("categories")
  }

  const viewAnalytics = () => {
    setCurrentPage("analytics")
  }

  const updateAnalytics = (sessionData: {
    type: "quiz" | "practice"
    category?: string
    score: number
    correct: number
    total: number
    questions?: any[]
  }) => {
    const newSession = {
      id: Date.now().toString(),
      type: sessionData.type,
      category: sessionData.category,
      date: new Date(),
      score: sessionData.score,
      correct: sessionData.correct,
      total: sessionData.total,
    }

    setAnalyticsData((prev) => {
      const newSessions = [...prev.sessions, newSession]
      const newCategoryStats = { ...prev.categoryStats }
      const newOverallStats = {
        totalQuestions: prev.overallStats.totalQuestions + sessionData.total,
        totalCorrect: prev.overallStats.totalCorrect + sessionData.correct,
        totalSessions: prev.overallStats.totalSessions + 1,
      }

      // Update category stats
      if (sessionData.type === "quiz" && sessionData.questions) {
        sessionData.questions.forEach((q: any) => {
          const category = q.category
          const isCorrect = answers[q.id] === q.correct

          if (!newCategoryStats[category]) {
            newCategoryStats[category] = { correct: 0, total: 0, sessions: 0 }
          }
          newCategoryStats[category].total++
          if (isCorrect) newCategoryStats[category].correct++
        })
      } else if (sessionData.type === "practice" && sessionData.category) {
        if (!newCategoryStats[sessionData.category]) {
          newCategoryStats[sessionData.category] = { correct: 0, total: 0, sessions: 0 }
        }
        newCategoryStats[sessionData.category].total += sessionData.total
        newCategoryStats[sessionData.category].correct += sessionData.correct
        newCategoryStats[sessionData.category].sessions++
      }

      return {
        sessions: newSessions,
        categoryStats: newCategoryStats,
        overallStats: newOverallStats,
      }
    })
  }

  const submitQuiz = () => {
    setCurrentPage("loading")
    setLoadingProgress(0)

    const steps = [
      "Analyzing your answers...",
      "Calculating performance metrics...",
      "Identifying knowledge gaps...",
      "Generating personalized insights...",
      "Preparing your results...",
    ]

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + 20
        if (newProgress <= 100) {
          setLoadingStep(steps[Math.floor((newProgress - 1) / 20)] || steps[steps.length - 1])
          return newProgress
        }
        clearInterval(interval)

        // Update analytics when quiz is complete
        const results = calculateResults()
        updateAnalytics({
          type: "quiz",
          score: results.score,
          correct: results.correctAnswers,
          total: results.totalQuestions,
          questions: quizQuestions,
        })

        setTimeout(() => setCurrentPage("results"), 500)
        return 100
      })
    }, 800)
  }

  const calculateResults = () => {
    const totalQuestions = quizQuestions.length
    const correctAnswers = quizQuestions.filter((q) => answers[q.id] === q.correct).length
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    return {
      score,
      correctAnswers,
      totalQuestions,
    }
  }

  const resetApp = () => {
    setCurrentPage("intro")
    setCurrentQuestion(0)
    setAnswers({})
    setSelectedCategory("")
    setPracticeQuestionIndex(0)
    setPracticeAnswers({})
    setShowFeedback(false)
    setPracticeComplete(false)
  }

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data)
    if (data.examType === "USMLE Step 1") {
      setCurrentPage("intro")
    } else {
      setCurrentPage("other-exam")
    }
  }

  const handleTryStep1 = () => {
    setOnboardingData((prev) => ({ ...prev, examType: "USMLE Step 1" }))
    setCurrentPage("intro")
  }

  const handleGoBack = () => {
    setCurrentPage("onboarding")
  }

  const handlePracticeAgain = () => {
    setPracticeComplete(false)
    setPracticeQuestionIndex(0)
    setPracticeAnswers({})
    setShowFeedback(false)
  }

  // Render current page
  if (currentPage === "onboarding") {
    return <OnboardingFlow isDark={isDark} toggleTheme={toggleTheme} onComplete={handleOnboardingComplete} />
  }

  if (currentPage === "other-exam") {
    return <OtherExamPage examType={onboardingData.examType} onTryStep1={handleTryStep1} onGoBack={handleGoBack} />
  }

  if (currentPage === "intro") {
    return (
      <HomePage
        isDark={isDark}
        toggleTheme={toggleTheme}
        startQuiz={startQuiz}
        startCaseStudy={startCaseStudy}
        startPrepare={startPrepare}
        viewAnalytics={viewAnalytics}
      />
    )
  }

  if (currentPage === "quiz") {
    return (
      <QuizPage
        questions={quizQuestions}
        currentQuestion={currentQuestion}
        answers={answers}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={submitQuiz}
        onQuestionNavigate={scrollToQuestion}
      />
    )
  }

  if (currentPage === "loading") {
    return <LoadingScreen progress={loadingProgress} step={loadingStep} />
  }

  if (currentPage === "results") {
    return (
      <ResultsPage
        questions={quizQuestions}
        answers={answers}
        categories={categories}
        onTakeAnotherQuiz={resetApp}
        onPracticeByCategory={() => setCurrentPage("categories")}
        onViewAnalytics={() => setCurrentPage("analytics")}
      />
    )
  }

  if (currentPage === "case-study") {
    return (
      <CaseStudyPage
        caseData={caseStudyData}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onBackToHome={() => setCurrentPage("intro")}
      />
    )
  }

  if (currentPage === "categories") {
    return (
      <CategoriesPage
        categories={categories}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onBackToHome={() => setCurrentPage("intro")}
        onSelectCategory={selectCategory}
      />
    )
  }

  if (currentPage === "practice") {
    return (
      <PracticePage
        selectedCategory={selectedCategory}
        questions={practiceQuestions[selectedCategory]}
        currentQuestionIndex={practiceQuestionIndex}
        answers={practiceAnswers}
        showFeedback={showFeedback}
        practiceComplete={practiceComplete}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onBackToCategories={() => setCurrentPage("categories")}
        onAnswerSelect={handlePracticeAnswerSelect}
        onSubmitAnswer={submitPracticeAnswer}
        onNextQuestion={nextPracticeQuestion}
        onPracticeAgain={handlePracticeAgain}
      />
    )
  }

  if (currentPage === "analytics") {
    return (
      <AnalyticsPage
        analyticsData={analyticsData}
        categories={categories}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onBackToHome={() => setCurrentPage("intro")}
        onSelectCategory={selectCategory}
      />
    )
  }

  // Fallback for any unhandled pages
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Page: {currentPage}</h1>
        <button
          onClick={() => setCurrentPage("intro")}
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "var(--radius)",
            padding: "1rem 2rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
