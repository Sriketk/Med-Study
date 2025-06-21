"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  Brain,
  BookOpen,
  Target,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Award,
  AlertCircle,
  Heart,
  Pill,
  Microscope,
  Shield,
  Baby,
  ArrowRight,
  MessageSquare,
  Send,
  User,
  Bot,
} from "lucide-react"

// Expanded questions with explanations and better categorization
const quizQuestions = [
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

// ----------  Analytics types ----------
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
// --------------------------------------

export default function USMLEQuizApp() {
  const [currentTab, setCurrentTab] = useState<"quiz" | "prepare">("quiz")
  const [currentPage, setCurrentPage] = useState<
    "intro" | "quiz" | "loading" | "results" | "categories" | "practice" | "analytics" | "case-study"
  >("intro")
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

  const [caseStudyAnswer, setCaseStudyAnswer] = useState<number | null>(null)
  const [caseStudyMessages, setCaseStudyMessages] = useState<
    Array<{ id: number; type: "user" | "bot"; content: string }>
  >([])
  const [caseStudyInput, setCaseStudyInput] = useState("")
  const [caseStudySubmitted, setCaseStudySubmitted] = useState(false)
  const [showCaseStudyFeedback, setShowCaseStudyFeedback] = useState(false)

  //  Analytics and performance tracking
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

  const startQuiz = () => {
    setCurrentTab("quiz")
    setCurrentPage("quiz")
  }

  const startPrepare = () => {
    setCurrentTab("prepare")
    setCurrentPage("categories")
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

  const canSubmitQuiz = () => {
    return Object.keys(answers).length === quizQuestions.length
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

    // Category performance
    const categoryStats = quizQuestions.reduce(
      (acc, question) => {
        const isCorrect = answers[question.id] === question.correct
        if (!acc[question.category]) {
          acc[question.category] = { correct: 0, total: 0 }
        }
        acc[question.category].total++
        if (isCorrect) acc[question.category].correct++
        return acc
      },
      {} as Record<string, { correct: number; total: number }>,
    )

    // Difficulty performance
    const difficultyStats = quizQuestions.reduce(
      (acc, question) => {
        const isCorrect = answers[question.id] === question.correct
        if (!acc[question.difficulty]) {
          acc[question.difficulty] = { correct: 0, total: 0 }
        }
        acc[question.difficulty].total++
        if (isCorrect) acc[question.difficulty].correct++
        return acc
      },
      {} as Record<string, { correct: number; total: number }>,
    )

    return {
      score,
      correctAnswers,
      totalQuestions,
      categoryStats,
      difficultyStats,
    }
  }

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: "Excellent", color: "var(--primary)", icon: Award }
    if (score >= 80) return { level: "Good", color: "#10b981", icon: TrendingUp }
    if (score >= 70) return { level: "Fair", color: "#f59e0b", icon: AlertCircle }
    return { level: "Needs Improvement", color: "#ef4444", icon: TrendingDown }
  }

  const resetApp = () => {
    setCurrentTab("quiz")
    setCurrentPage("intro")
    setCurrentQuestion(0)
    setAnswers({})
    setSelectedCategory("")
    setPracticeQuestionIndex(0)
    setPracticeAnswers({})
    setShowFeedback(false)
    setPracticeComplete(false)
  }

  const handleCaseStudyMessage = () => {
    if (!caseStudyInput.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user" as const,
      content: caseStudyInput,
    }

    setCaseStudyMessages((prev) => [...prev, userMessage])

    // Find matching response
    const inputLower = caseStudyInput.toLowerCase()
    let response =
      "I don't have specific information about that aspect of the case. Try asking about lab values, physical exam findings, patient history, or symptoms."

    for (const [key, value] of Object.entries(caseStudyData.mockedResponses)) {
      if (inputLower.includes(key)) {
        response = value
        break
      }
    }

    const botMessage = {
      id: Date.now() + 1,
      type: "bot" as const,
      content: response,
    }

    setTimeout(() => {
      setCaseStudyMessages((prev) => [...prev, botMessage])
    }, 1000)

    setCaseStudyInput("")
  }

  const handleCaseStudyAnswerSelect = (answerIndex: number) => {
    setCaseStudyAnswer(answerIndex)
  }

  const submitCaseStudyAnswer = () => {
    setCaseStudySubmitted(true)
    setShowCaseStudyFeedback(true)
  }

  const resetCaseStudy = () => {
    setCaseStudyAnswer(null)
    setCaseStudyMessages([])
    setCaseStudyInput("")
    setCaseStudySubmitted(false)
    setShowCaseStudyFeedback(false)
  }

  const startCaseStudy = () => {
    setCurrentTab("prepare")
    setCurrentPage("case-study")
  }

  if (currentPage === "intro") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "40%",
            height: "100%",
            background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
            opacity: 0.05,
            borderRadius: "50%",
            transform: "rotate(-15deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "30%",
            height: "60%",
            background: `linear-gradient(45deg, var(--primary) 0%, var(--accent) 100%)`,
            opacity: 0.03,
            borderRadius: "50%",
          }}
        />

        {/* Navigation Tabs */}
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "9999px",
            padding: "0.25rem",
            boxShadow: "var(--shadow-lg)",
            zIndex: 10,
            display: "flex",
            gap: "0.25rem",
          }}
        >
          <button
            onClick={() => setCurrentPage("intro")}
            style={{
              backgroundColor: currentPage === "intro" ? "var(--primary)" : "transparent",
              color: currentPage === "intro" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              border: "none",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("analytics")}
            style={{
              backgroundColor: currentPage === "analytics" ? "var(--primary)" : "transparent",
              color: currentPage === "analytics" ? "var(--primary-foreground)" : "var(--muted-foreground)",
              border: "none",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Analytics
          </button>
        </div>

        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "0.75rem",
            cursor: "pointer",
            boxShadow: "var(--shadow-lg)",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)"
          }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "42rem" }}>
            {/* Header with icon */}
            <div style={{ marginBottom: "3rem" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "5rem",
                  height: "5rem",
                  backgroundColor: "var(--primary)",
                  borderRadius: "50%",
                  marginBottom: "2rem",
                  boxShadow: "var(--shadow-xl)",
                }}
              >
                <Brain size={32} color="var(--primary-foreground)" />
              </div>

              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "var(--foreground)",
                  marginBottom: "1rem",
                  letterSpacing: "var(--tracking-normal)",
                  lineHeight: "1.1",
                }}
              >
                USMLE Step 1
              </h1>
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "400",
                  color: "var(--foreground)",
                  marginBottom: "1.5rem",
                }}
              >
                Preparation Platform
              </div>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "var(--muted-foreground)",
                  fontWeight: "400",
                  fontStyle: "italic",
                  maxWidth: "28rem",
                  margin: "0 auto",
                }}
              >
                Test your knowledge and study effectively
              </p>
            </div>

            {/* Mode Selection */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
                marginBottom: "3rem",
                maxWidth: "60rem",
                margin: "0 auto 3rem auto",
              }}
            >
              <div
                onClick={startQuiz}
                style={{
                  backgroundColor: "var(--card)",
                  padding: "2rem",
                  borderRadius: "var(--radius)",
                  border: "2px solid var(--border)",
                  boxShadow: "var(--shadow-lg)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "var(--shadow-xl)"
                  e.currentTarget.style.borderColor = "var(--primary)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)"
                  e.currentTarget.style.borderColor = "var(--border)"
                }}
              >
                <Target size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--card-foreground)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Assessment Quiz
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                  Take a comprehensive quiz to gauge your current knowledge level
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <BookOpen size={16} color="var(--muted-foreground)" />
                  <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>5 Questions</span>
                </div>
              </div>

              <div
                onClick={startCaseStudy}
                style={{
                  backgroundColor: "var(--card)",
                  padding: "2rem",
                  borderRadius: "var(--radius)",
                  border: "2px solid var(--border)",
                  boxShadow: "var(--shadow-lg)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "var(--shadow-xl)"
                  e.currentTarget.style.borderColor = "var(--primary)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)"
                  e.currentTarget.style.borderColor = "var(--border)"
                }}
              >
                <MessageSquare size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--card-foreground)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Case Study
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                  Interactive clinical case with chat-based information gathering
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <Brain size={16} color="var(--muted-foreground)" />
                  <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Interactive</span>
                </div>
              </div>

              <div
                onClick={() => {
                  setCurrentTab("prepare")
                  setCurrentPage("categories")
                }}
                style={{
                  backgroundColor: "var(--card)",
                  padding: "2rem",
                  borderRadius: "var(--radius)",
                  border: "2px solid var(--border)",
                  boxShadow: "var(--shadow-lg)",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)"
                  e.currentTarget.style.boxShadow = "var(--shadow-xl)"
                  e.currentTarget.style.borderColor = "var(--primary)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)"
                  e.currentTarget.style.borderColor = "var(--border)"
                }}
              >
                <Microscope size={32} color="var(--primary)" style={{ margin: "0 auto 1rem auto" }} />
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--card-foreground)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Study & Practice
                </h3>
                <p style={{ fontSize: "1rem", color: "var(--muted-foreground)", margin: "0 0 1rem 0" }}>
                  Study specific topics with detailed explanations and immediate feedback
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <BookOpen size={16} color="var(--muted-foreground)" />
                  <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>5 Categories</span>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                fontWeight: "300",
              }}
            >
              Choose your learning path to excel in your USMLE Step 1 preparation
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentPage === "analytics") {
    const getPerformanceTrend = () => {
      const recentSessions = analyticsData.sessions.slice(-5)
      return recentSessions.map((session) => session.score)
    }

    const getWeakestCategories = () => {
      return Object.entries(analyticsData.categoryStats)
        .map(([category, stats]) => ({
          category,
          percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
          ...stats,
        }))
        .sort((a, b) => a.percentage - b.percentage)
        .slice(0, 3)
    }

    const getStrongestCategories = () => {
      return Object.entries(analyticsData.categoryStats)
        .map(([category, stats]) => ({
          category,
          percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
          ...stats,
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 3)
    }

    const overallPercentage =
      analyticsData.overallStats.totalQuestions > 0
        ? Math.round((analyticsData.overallStats.totalCorrect / analyticsData.overallStats.totalQuestions) * 100)
        : 0

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Navigation Tabs */}
        <div
          style={{
            position: "fixed",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "9999px",
            padding: "0.25rem",
            boxShadow: "var(--shadow-lg)",
            zIndex: 10,
            display: "flex",
            gap: "0.25rem",
          }}
        >
          <button
            onClick={() => setCurrentPage("intro")}
            style={{
              backgroundColor: "transparent",
              color: "var(--muted-foreground)",
              border: "none",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("analytics")}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "9999px",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Analytics
          </button>
        </div>

        <button
          onClick={toggleTheme}
          style={{
            position: "fixed",
            top: "1.5rem",
            right: "1.5rem",
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "0.75rem",
            cursor: "pointer",
            boxShadow: "var(--shadow-lg)",
            transition: "all 0.2s ease",
            zIndex: 10,
          }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "6rem 2rem 2rem 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "900",
                color: "var(--foreground)",
                marginBottom: "1rem",
              }}
            >
              Performance Analytics
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "var(--muted-foreground)",
              }}
            >
              Track your progress and identify areas for improvement
            </p>
          </div>

          {analyticsData.sessions.length === 0 ? (
            <div
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <Brain size={48} color="var(--muted-foreground)" style={{ margin: "0 auto 1rem auto" }} />
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--card-foreground)",
                  marginBottom: "1rem",
                }}
              >
                No Data Yet
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--muted-foreground)",
                  marginBottom: "2rem",
                }}
              >
                Take a quiz or complete practice sessions to see your analytics
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                <button
                  onClick={startQuiz}
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    border: "none",
                    borderRadius: "var(--radius)",
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-md)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Take Assessment Quiz
                </button>
                <button
                  onClick={startPrepare}
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "1rem 2rem",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-md)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Start Practice
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "2rem" }}>
              {/* Overall Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: "900",
                      color: "var(--primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {overallPercentage}%
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--card-foreground)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Overall Accuracy
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    {analyticsData.overallStats.totalCorrect} / {analyticsData.overallStats.totalQuestions} correct
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: "900",
                      color: "#10b981",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {analyticsData.overallStats.totalSessions}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--card-foreground)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Total Sessions
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                    Quizzes and practice sessions
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: "900",
                      color: "#f59e0b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {Object.keys(analyticsData.categoryStats).length}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "var(--card-foreground)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Categories Practiced
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Medical specialties covered</p>
                </div>
              </div>

              {/* Performance by Category */}
              <div
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--card-foreground)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Performance by Category
                </h3>

                <div style={{ display: "grid", gap: "1rem" }}>
                  {Object.entries(analyticsData.categoryStats).map(([category, stats]) => {
                    const percentage = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
                    const categoryInfo = categories.find((cat) => cat.name === category)

                    return (
                      <div
                        key={category}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem",
                          backgroundColor: "var(--secondary)",
                          borderRadius: "calc(var(--radius) - 2px)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          {categoryInfo && (
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "2rem",
                                height: "2rem",
                                backgroundColor: categoryInfo.color,
                                borderRadius: "50%",
                              }}
                            >
                              <categoryInfo.icon size={16} color="white" />
                            </div>
                          )}
                          <div>
                            <h4
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "var(--card-foreground)",
                                margin: 0,
                              }}
                            >
                              {category}
                            </h4>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "var(--muted-foreground)",
                                margin: 0,
                              }}
                            >
                              {stats.correct}/{stats.total} correct • {stats.sessions} sessions
                            </p>
                          </div>
                        </div>

                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: "700",
                              color: percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444",
                            }}
                          >
                            {percentage}%
                          </div>

                          <div
                            style={{
                              width: "6rem",
                              height: "0.5rem",
                              backgroundColor: "var(--muted)",
                              borderRadius: "9999px",
                              overflow: "hidden",
                              marginTop: "0.5rem",
                            }}
                          >
                            <div
                              style={{
                                width: `${percentage}%`,
                                height: "100%",
                                backgroundColor:
                                  percentage >= 80 ? "#10b981" : percentage >= 60 ? "#f59e0b" : "#ef4444",
                                borderRadius: "9999px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                {/* Strongest Areas */}
                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "var(--card-foreground)",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <TrendingUp size={24} color="#10b981" />
                    Strongest Areas
                  </h3>

                  {getStrongestCategories().length > 0 ? (
                    <div style={{ display: "grid", gap: "1rem" }}>
                      {getStrongestCategories().map((item, index) => (
                        <div
                          key={item.category}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1rem",
                            backgroundColor: "#dcfce7",
                            borderRadius: "calc(var(--radius) - 2px)",
                            border: "1px solid #10b981",
                          }}
                        >
                          <div>
                            <h4
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#065f46",
                                margin: "0 0 0.25rem 0",
                              }}
                            >
                              {item.category}
                            </h4>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#047857",
                                margin: 0,
                              }}
                            >
                              {item.correct}/{item.total} correct
                            </p>
                          </div>
                          <div
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "700",
                              color: "#10b981",
                            }}
                          >
                            {item.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                      Complete more sessions to see your strongest areas
                    </p>
                  )}
                </div>

                {/* Areas for Improvement */}
                <div
                  style={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "2rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "var(--card-foreground)",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <TrendingDown size={24} color="#ef4444" />
                    Areas for Improvement
                  </h3>

                  {getWeakestCategories().length > 0 ? (
                    <div style={{ display: "grid", gap: "1rem" }}>
                      {getWeakestCategories().map((item, index) => (
                        <div
                          key={item.category}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1rem",
                            backgroundColor: "#fee2e2",
                            borderRadius: "calc(var(--radius) - 2px)",
                            border: "1px solid #ef4444",
                          }}
                        >
                          <div>
                            <h4
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "#991b1b",
                                margin: "0 0 0.25rem 0",
                              }}
                            >
                              {item.category}
                            </h4>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "#dc2626",
                                margin: "0 0 0.5rem 0",
                              }}
                            >
                              {item.correct}/{item.total} correct
                            </p>
                            <button
                              onClick={() => selectCategory(item.category)}
                              style={{
                                backgroundColor: "#ef4444",
                                color: "white",
                                border: "none",
                                borderRadius: "calc(var(--radius) - 4px)",
                                padding: "0.25rem 0.75rem",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                                border: "none",
                                borderRadius: "calc(var(--radius) - 4px)",
                                padding: "0.25rem 0.75rem",
                                fontSize: "0.75rem",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                            >
                              Practice Now
                            </button>
                          </div>
                          <div
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "700",
                              color: "#ef4444",
                            }}
                          >
                            {item.percentage}%
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                      Complete more sessions to identify areas for improvement
                    </p>
                  )}
                </div>
              </div>

              {/* Recent Sessions */}
              <div
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "2rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--card-foreground)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Recent Sessions
                </h3>

                <div style={{ display: "grid", gap: "1rem" }}>
                  {analyticsData.sessions
                    .slice(-5)
                    .reverse()
                    .map((session, index) => (
                      <div
                        key={session.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "1rem",
                          backgroundColor: "var(--secondary)",
                          borderRadius: "calc(var(--radius) - 2px)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "2rem",
                              height: "2rem",
                              backgroundColor: session.type === "quiz" ? "var(--primary)" : "#10b981",
                              borderRadius: "50%",
                            }}
                          >
                            {session.type === "quiz" ? (
                              <Target size={16} color="white" />
                            ) : (
                              <BookOpen size={16} color="white" />
                            )}
                          </div>
                          <div>
                            <h4
                              style={{
                                fontSize: "1rem",
                                fontWeight: "600",
                                color: "var(--card-foreground)",
                                margin: 0,
                              }}
                            >
                              {session.type === "quiz" ? "Assessment Quiz" : `${session.category} Practice`}
                            </h4>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                color: "var(--muted-foreground)",
                                margin: 0,
                              }}
                            >
                              {session.date.toLocaleDateString()} • {session.correct}/{session.total} correct
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "700",
                            color: session.score >= 80 ? "#10b981" : session.score >= 60 ? "#f59e0b" : "#ef4444",
                          }}
                        >
                          {session.score}%
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (currentPage === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "24rem" }}>
          <div
            style={{
              width: "4rem",
              height: "4rem",
              border: "4px solid var(--muted)",
              borderTop: "4px solid var(--primary)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 2rem auto",
            }}
          />
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--foreground)",
              marginBottom: "1rem",
            }}
          >
            Analyzing Your Performance
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--muted-foreground)",
              marginBottom: "2rem",
            }}
          >
            {loadingStep}
          </p>
          <div
            style={{
              width: "100%",
              height: "0.5rem",
              backgroundColor: "var(--muted)",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${loadingProgress}%`,
                height: "100%",
                backgroundColor: "var(--primary)",
                borderRadius: "9999px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              marginTop: "1rem",
            }}
          >
            {loadingProgress}% complete
          </p>
        </div>

        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (currentPage === "categories") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Header */}
        <div
          data-header
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "var(--background)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--border)",
            zIndex: 40,
          }}
        >
          <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--foreground)" }}>Study Categories</h1>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Choose a category to practice</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={() => setCurrentPage("intro")}
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Back to Home
                </button>

                <button
                  onClick={toggleTheme}
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "0.5rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <div
                  key={category.name}
                  onClick={() => selectCategory(category.name)}
                  style={{
                    backgroundColor: "var(--card)",
                    border: "2px solid var(--border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "var(--shadow-lg)",
                    padding: "2rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "var(--shadow-xl)"
                    e.currentTarget.style.borderColor = category.color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)"
                    e.currentTarget.style.borderColor = "var(--border)"
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "4rem",
                      height: "4rem",
                      backgroundColor: category.color,
                      borderRadius: "50%",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <IconComponent size={24} color="white" />
                  </div>

                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      color: "var(--card-foreground)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {category.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "1rem",
                      color: "var(--muted-foreground)",
                      marginBottom: "1rem",
                    }}
                  >
                    {category.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      fontSize: "0.875rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <BookOpen size={16} />
                    <span>{category.questionCount} questions</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (currentPage === "practice") {
    const currentQuestions = practiceQuestions[selectedCategory]
    const currentPracticeQuestion = currentQuestions[practiceQuestionIndex]

    if (practiceComplete) {
      const correctCount = currentQuestions.filter((q) => practiceAnswers[q.id] === q.correct).length
      const score = Math.round((correctCount / currentQuestions.length) * 100)
      const performance = getPerformanceLevel(score)
      const PerformanceIcon = performance.icon

      return (
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "3rem",
              textAlign: "center",
              maxWidth: "32rem",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                backgroundColor: performance.color,
                borderRadius: "50%",
                marginBottom: "1.5rem",
              }}
            >
              <PerformanceIcon size={24} color="white" />
            </div>

            <h2
              style={{
                fontSize: "2rem",
                fontWeight: "900",
                color: "var(--card-foreground)",
                marginBottom: "0.5rem",
              }}
            >
              Practice Complete!
            </h2>

            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: performance.color,
                marginBottom: "1rem",
              }}
            >
              {performance.level}
            </p>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                marginBottom: "2rem",
              }}
            >
              You scored {score}% ({correctCount}/{currentQuestions.length} correct) in {selectedCategory}
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setPracticeQuestionIndex(0)
                  setPracticeAnswers({})
                  setShowFeedback(false)
                  setPracticeComplete(false)
                }}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  border: "none",
                  borderRadius: "var(--radius)",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-md)",
                  transition: "all 0.2s ease",
                }}
              >
                Practice Again
              </button>

              <button
                onClick={() => setCurrentPage("categories")}
                style={{
                  backgroundColor: "var(--secondary)",
                  color: "var(--secondary-foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "1rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-md)",
                  transition: "all 0.2s ease",
                }}
              >
                Choose Another Category
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Header */}
        <div
          data-header
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "var(--background)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--border)",
            zIndex: 40,
          }}
        >
          <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--foreground)" }}>
                  {selectedCategory} Practice
                </h1>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                  Question {practiceQuestionIndex + 1} of {currentQuestions.length}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={() => setCurrentPage("categories")}
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Back to Categories
                </button>

                <button
                  onClick={toggleTheme}
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "0.5rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
            }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "calc(var(--radius) - 2px)",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Q{practiceQuestionIndex + 1}
                </span>
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Practice Mode</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                    backgroundColor: "var(--secondary)",
                    padding: "0.125rem 0.375rem",
                    borderRadius: "calc(var(--radius) - 4px)",
                  }}
                >
                  {selectedCategory}
                </span>
              </div>
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "var(--card-foreground)",
                  lineHeight: "1.6",
                }}
              >
                {currentPracticeQuestion.question}
              </h2>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              {currentPracticeQuestion.options.map((option, optionIndex) => {
                const isSelected = practiceAnswers[currentPracticeQuestion.id] === optionIndex
                const isCorrect = optionIndex === currentPracticeQuestion.correct
                const isIncorrect = showFeedback && isSelected && !isCorrect
                const optionLabel = String.fromCharCode(65 + optionIndex)

                let backgroundColor = "var(--card)"
                let borderColor = "var(--border)"
                let textColor = "var(--card-foreground)"

                if (showFeedback) {
                  if (isCorrect) {
                    backgroundColor = "#dcfce7"
                    borderColor = "#10b981"
                    textColor = "#065f46"
                  } else if (isIncorrect) {
                    backgroundColor = "#fee2e2"
                    borderColor = "#ef4444"
                    textColor = "#991b1b"
                  }
                } else if (isSelected) {
                  backgroundColor = "var(--accent)"
                  borderColor = "var(--primary)"
                  textColor = "var(--accent-foreground)"
                }

                return (
                  <button
                    key={optionIndex}
                    onClick={() => !showFeedback && handlePracticeAnswerSelect(currentPracticeQuestion.id, optionIndex)}
                    disabled={showFeedback}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1rem",
                      borderRadius: "var(--radius)",
                      border: `2px solid ${borderColor}`,
                      backgroundColor: backgroundColor,
                      color: textColor,
                      cursor: showFeedback ? "default" : "pointer",
                      marginBottom: "0.75rem",
                      transition: "all 0.2s ease",
                      boxShadow: isSelected && !showFeedback ? "var(--shadow-md)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!showFeedback && !isSelected) {
                        e.currentTarget.style.backgroundColor = "var(--accent)"
                        e.currentTarget.style.borderColor = "var(--accent-foreground)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!showFeedback && !isSelected) {
                        e.currentTarget.style.backgroundColor = "var(--card)"
                        e.currentTarget.style.borderColor = "var(--border)"
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <span
                        style={{
                          flexShrink: 0,
                          width: "1.5rem",
                          height: "1.5rem",
                          borderRadius: "50%",
                          border: `2px solid ${showFeedback && isCorrect ? "#10b981" : showFeedback && isIncorrect ? "#ef4444" : isSelected ? "var(--primary)" : "var(--muted-foreground)"}`,
                          backgroundColor:
                            showFeedback && isCorrect
                              ? "#10b981"
                              : showFeedback && isIncorrect
                                ? "#ef4444"
                                : isSelected
                                  ? "var(--primary)"
                                  : "transparent",
                          color:
                            showFeedback && (isCorrect || isIncorrect)
                              ? "white"
                              : isSelected
                                ? "var(--primary-foreground)"
                                : "var(--muted-foreground)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                        }}
                      >
                        {showFeedback && isCorrect ? (
                          <CheckCircle size={16} />
                        ) : showFeedback && isIncorrect ? (
                          <XCircle size={16} />
                        ) : (
                          optionLabel
                        )}
                      </span>
                      <span style={{ fontWeight: "500", lineHeight: "1.6" }}>{option}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {showFeedback && (
              <div
                style={{
                  backgroundColor: "var(--accent)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "var(--accent-foreground)",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Brain size={20} />
                  Explanation
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--accent-foreground)",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {currentPracticeQuestion.explanation}
                </p>
              </div>
            )}

            <div
              style={{
                paddingTop: "1.5rem",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                {practiceAnswers[currentPracticeQuestion.id] !== undefined && !showFeedback && (
                  <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
                    Answer selected: {String.fromCharCode(65 + practiceAnswers[currentPracticeQuestion.id])}
                  </p>
                )}
              </div>

              <div>
                {!showFeedback && practiceAnswers[currentPracticeQuestion.id] !== undefined ? (
                  <button
                    onClick={submitPracticeAnswer}
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      border: "none",
                      borderRadius: "var(--radius)",
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-sm)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Submit Answer
                  </button>
                ) : showFeedback ? (
                  <button
                    onClick={nextPracticeQuestion}
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "var(--radius)",
                      padding: "0.75rem 1.5rem",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-sm)",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {practiceQuestionIndex === currentQuestions.length - 1 ? "Complete Practice" : "Next Question"}
                    <ArrowRight size={16} />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPage === "case-study") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Header */}
        <div
          data-header
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "var(--background)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--border)",
            zIndex: 40,
          }}
        >
          <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--foreground)" }}>
                  {caseStudyData.title}
                </h1>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Interactive Clinical Case</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button
                  onClick={() => setCurrentPage("intro")}
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--secondary-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "0.5rem 1rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  Back to Home
                </button>

                <button
                  onClick={toggleTheme}
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "0.5rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.2s ease",
                    zIndex: 10,
                  }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "2rem 1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", height: "calc(100vh - 200px)" }}>
            {/* Left Column - Case and Question */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Clinical Scenario */}
              <div
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "2rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "700",
                    color: "var(--card-foreground)",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Brain size={20} color="var(--primary)" />
                  Clinical Scenario
                </h2>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                  }}
                >
                  {caseStudyData.scenario}
                </p>

                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "var(--card-foreground)",
                    marginBottom: "1rem",
                  }}
                >
                  Case Question:
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  {caseStudyData.question}
                </p>
              </div>

              {/* Answer Choices */}
              <div
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  boxShadow: "var(--shadow-lg)",
                  padding: "2rem",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "var(--card-foreground)",
                    marginBottom: "1.5rem",
                  }}
                >
                  Answer Choices:
                </h3>

                <div style={{ marginBottom: "2rem" }}>
                  {caseStudyData.options.map((option, optionIndex) => {
                    const isSelected = caseStudyAnswer === optionIndex
                    const isCorrect = optionIndex === caseStudyData.correct
                    const isIncorrect = showCaseStudyFeedback && isSelected && !isCorrect
                    const optionLabel = String.fromCharCode(65 + optionIndex)

                    let backgroundColor = "var(--card)"
                    let borderColor = "var(--border)"
                    let textColor = "var(--card-foreground)"

                    if (showCaseStudyFeedback) {
                      if (isCorrect) {
                        backgroundColor = "#dcfce7"
                        borderColor = "#10b981"
                        textColor = "#065f46"
                      } else if (isIncorrect) {
                        backgroundColor = "#fee2e2"
                        borderColor = "#ef4444"
                        textColor = "#991b1b"
                      }
                    } else if (isSelected) {
                      backgroundColor = "var(--accent)"
                      borderColor = "var(--primary)"
                      textColor = "var(--accent-foreground)"
                    }

                    return (
                      <button
                        key={optionIndex}
                        onClick={() => !showCaseStudyFeedback && handleCaseStudyAnswerSelect(optionIndex)}
                        disabled={showCaseStudyFeedback}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "1rem",
                          borderRadius: "var(--radius)",
                          border: `2px solid ${borderColor}`,
                          backgroundColor: backgroundColor,
                          color: textColor,
                          cursor: showCaseStudyFeedback ? "default" : "pointer",
                          marginBottom: "0.75rem",
                          transition: "all 0.2s ease",
                          boxShadow: isSelected && !showCaseStudyFeedback ? "var(--shadow-md)" : "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                          <span
                            style={{
                              flexShrink: 0,
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              border: `2px solid ${showCaseStudyFeedback && isCorrect ? "#10b981" : showCaseStudyFeedback && isIncorrect ? "#ef4444" : isSelected ? "var(--primary)" : "var(--muted-foreground)"}`,
                              backgroundColor:
                                showCaseStudyFeedback && isCorrect
                                  ? "#10b981"
                                  : showCaseStudyFeedback && isIncorrect
                                    ? "#ef4444"
                                    : isSelected
                                      ? "var(--primary)"
                                      : "transparent",
                              color:
                                showCaseStudyFeedback && (isCorrect || isIncorrect)
                                  ? "white"
                                  : isSelected
                                    ? "var(--primary-foreground)"
                                    : "var(--muted-foreground)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                            }}
                          >
                            {showCaseStudyFeedback && isCorrect ? (
                              <CheckCircle size={16} />
                            ) : showCaseStudyFeedback && isIncorrect ? (
                              <XCircle size={16} />
                            ) : (
                              optionLabel
                            )}
                          </span>
                          <span style={{ fontWeight: "500", lineHeight: "1.6" }}>{option}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Submit Button */}
                {caseStudyAnswer !== null && !showCaseStudyFeedback && (
                  <button
                    onClick={submitCaseStudyAnswer}
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      border: "none",
                      borderRadius: "var(--radius)",
                      padding: "1rem 2rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-md)",
                      transition: "all 0.2s ease",
                      width: "100%",
                    }}
                  >
                    Submit Answer
                  </button>
                )}

                {/* Explanation */}
                {showCaseStudyFeedback && (
                  <div
                    style={{
                      backgroundColor: "var(--accent)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "1.5rem",
                      marginTop: "1rem",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--accent-foreground)",
                        marginBottom: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Brain size={20} />
                      Explanation
                    </h4>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--accent-foreground)",
                        lineHeight: "1.6",
                        margin: 0,
                      }}
                    >
                      {caseStudyData.explanation}
                    </p>
                  </div>
                )}

                {/* Reset Button */}
                {showCaseStudyFeedback && (
                  <button
                    onClick={resetCaseStudy}
                    style={{
                      backgroundColor: "var(--secondary)",
                      color: "var(--secondary-foreground)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      padding: "1rem 2rem",
                      fontSize: "1rem",
                      fontWeight: "600",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-md)",
                      transition: "all 0.2s ease",
                      width: "100%",
                      marginTop: "1rem",
                    }}
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>

            {/* Right Column - Chat Interface */}
            <div
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Chat Header */}
              <div
                style={{
                  padding: "1.5rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "var(--card-foreground)",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <MessageSquare size={20} color="var(--primary)" />
                  Ask Questions About the Patient
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--muted-foreground)",
                    margin: "0.5rem 0 0 0",
                  }}
                >
                  Gather more information before making your diagnosis
                </p>
              </div>

              {/* Chat Messages */}
              <div
                style={{
                  flex: 1,
                  padding: "1rem",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  minHeight: 0,
                }}
              >
                {caseStudyMessages.length === 0 && (
                  <div
                    style={{
                      textAlign: "center",
                      color: "var(--muted-foreground)",
                      fontSize: "0.875rem",
                      padding: "2rem",
                    }}
                  >
                    <Bot size={32} color="var(--muted-foreground)" style={{ margin: "0 auto 1rem auto" }} />
                    <p style={{ margin: 0 }}>
                      Start by asking about lab values, physical exam findings, patient history, or symptoms.
                    </p>
                  </div>
                )}

                {caseStudyMessages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      flexDirection: message.type === "user" ? "row-reverse" : "row",
                    }}
                  >
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        backgroundColor: message.type === "user" ? "var(--primary)" : "var(--secondary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {message.type === "user" ? (
                        <User size={16} color="var(--primary-foreground)" />
                      ) : (
                        <Bot size={16} color="var(--secondary-foreground)" />
                      )}
                    </div>
                    <div
                      style={{
                        backgroundColor: message.type === "user" ? "var(--primary)" : "var(--secondary)",
                        color: message.type === "user" ? "var(--primary-foreground)" : "var(--secondary-foreground)",
                        padding: "0.75rem 1rem",
                        borderRadius: "var(--radius)",
                        maxWidth: "80%",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div
                style={{
                  padding: "1rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={caseStudyInput}
                    onChange={(e) => setCaseStudyInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleCaseStudyMessage()}
                    placeholder="Ask about lab values, physical exam, history..."
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      backgroundColor: "var(--background)",
                      color: "var(--foreground)",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                  />
                  <button
                    onClick={handleCaseStudyMessage}
                    disabled={!caseStudyInput.trim()}
                    style={{
                      backgroundColor: caseStudyInput.trim() ? "var(--primary)" : "var(--muted)",
                      color: caseStudyInput.trim() ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      border: "none",
                      borderRadius: "var(--radius)",
                      padding: "0.75rem",
                      cursor: caseStudyInput.trim() ? "pointer" : "not-allowed",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentPage === "results") {
    const results = calculateResults()
    const performance = getPerformanceLevel(results.score)
    const PerformanceIcon = performance.icon

    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        }}
      >
        {/* Header */}
        <div
          data-header
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "var(--background)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid var(--border)",
            zIndex: 40,
          }}
        >
          <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--foreground)" }}>Quiz Results</h1>
                <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Your performance analysis</p>
              </div>

              <button
                onClick={toggleTheme}
                style={{
                  backgroundColor: "var(--card)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "0.5rem",
                  cursor: "pointer",
                  boxShadow: "var(--shadow-sm)",
                  transition: "all 0.2s ease",
                }}
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
          {/* Overall Score */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "4rem",
                height: "4rem",
                backgroundColor: performance.color,
                borderRadius: "50%",
                marginBottom: "1rem",
              }}
            >
              <PerformanceIcon size={24} color="white" />
            </div>

            <h2
              style={{
                fontSize: "3rem",
                fontWeight: "900",
                color: "var(--card-foreground)",
                marginBottom: "0.5rem",
              }}
            >
              {results.score}%
            </h2>

            <p
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: performance.color,
                marginBottom: "0.5rem",
              }}
            >
              {performance.level}
            </p>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
              }}
            >
              You got {results.correctAnswers} out of {results.totalQuestions} questions correct
            </p>
          </div>

          {/* Performance by Category */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Performance by Category
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {Object.entries(results.categoryStats).map(([category, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100)
                const isStrong = percentage >= 80

                return (
                  <div
                    key={category}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      {isStrong ? <CheckCircle size={20} color="#10b981" /> : <XCircle size={20} color="#ef4444" />}
                      <div>
                        <h4
                          style={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "var(--card-foreground)",
                            margin: 0,
                          }}
                        >
                          {category}
                        </h4>
                        <p
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--muted-foreground)",
                            margin: 0,
                          }}
                        >
                          {stats.correct}/{stats.total} correct
                        </p>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: isStrong ? "#10b981" : "#ef4444",
                        }}
                      >
                        {percentage}%
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Performance by Difficulty */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Performance by Difficulty
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {Object.entries(results.difficultyStats).map(([difficulty, stats]) => {
                const percentage = Math.round((stats.correct / stats.total) * 100)

                return (
                  <div
                    key={difficulty}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "calc(var(--radius) - 2px)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "var(--card-foreground)",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        {difficulty}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--muted-foreground)",
                          margin: 0,
                        }}
                      >
                        {stats.correct}/{stats.total} correct
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "700",
                          color: "var(--card-foreground)",
                        }}
                      >
                        {percentage}%
                      </div>

                      {/* Progress bar */}
                      <div
                        style={{
                          width: "6rem",
                          height: "0.5rem",
                          backgroundColor: "var(--muted)",
                          borderRadius: "9999px",
                          overflow: "hidden",
                          marginTop: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            width: `${percentage}%`,
                            height: "100%",
                            backgroundColor: "var(--primary)",
                            borderRadius: "9999px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-lg)",
              padding: "2rem",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--card-foreground)",
                marginBottom: "1.5rem",
              }}
            >
              Recommendations
            </h3>

            <div style={{ display: "grid", gap: "1rem" }}>
              {results.score >= 80 ? (
                <div
                  style={{
                    padding: "1rem",
                    backgroundColor: "#10b981",
                    color: "white",
                    borderRadius: "calc(var(--radius) - 2px)",
                  }}
                >
                  <h4 style={{ fontSize: "1rem", fontWeight: "600", margin: "0 0 0.5rem 0" }}>🎉 Excellent Work!</h4>
                  <p style={{ fontSize: "0.875rem", margin: 0 }}>
                    You're demonstrating strong knowledge across multiple areas. Keep up the great work and continue
                    practicing to maintain your performance level.
                  </p>
                </div>
              ) : (
                <>
                  {Object.entries(results.categoryStats)
                    .filter(([_, stats]) => stats.correct / stats.total < 0.7)
                    .map(([category, stats]) => (
                      <div
                        key={category}
                        style={{
                          padding: "1rem",
                          backgroundColor: "#fef3c7",
                          color: "#92400e",
                          borderRadius: "calc(var(--radius) - 2px)",
                          border: "1px solid #fbbf24",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <h4 style={{ fontSize: "1rem", fontWeight: "600", margin: 0 }}>📚 Focus on {category}</h4>
                          <button
                            onClick={() => selectCategory(category)}
                            style={{
                              backgroundColor: "#f59e0b",
                              color: "white",
                              border: "none",
                              borderRadius: "var(--radius)",
                              padding: "0.5rem 1rem",
                              fontSize: "0.875rem",
                              fontWeight: "500",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#d97706"
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "#f59e0b"
                            }}
                          >
                            Practice Now
                            <ArrowRight size={14} />
                          </button>
                        </div>
                        <p style={{ fontSize: "0.875rem", margin: 0 }}>
                          You scored {Math.round((stats.correct / stats.total) * 100)}% in this area. Consider reviewing
                          key concepts and practicing more questions in {category}.
                        </p>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
              onClick={() => {
                setCurrentPage("intro")
                setAnswers({})
                setCurrentQuestion(0)
              }}
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                border: "none",
                borderRadius: "var(--radius)",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "var(--shadow-md)",
                transition: "all 0.2s ease",
              }}
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header */}
      <div
        data-header
        style={{
          position: "sticky",
          top: 0,
          backgroundColor: "var(--background)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid var(--border)",
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "var(--foreground)" }}>USMLE Step 1 Quiz</h1>
              <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
                Question {currentQuestion + 1} of {quizQuestions.length}
              </p>
            </div>

            <button
              onClick={toggleTheme}
              style={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "0.5rem",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)"
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div style={{ maxWidth: "64rem", margin: "0 auto", padding: "2rem 1rem" }}>
        {quizQuestions.map((question, index) => (
          <div
            key={question.id}
            ref={(el) => (questionRefs.current[index] = el)}
            style={{
              minHeight: "80vh",
              display: "flex",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                width: "100%",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                boxShadow: "var(--shadow-lg)",
                padding: "2rem",
              }}
            >
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                      padding: "0.25rem 0.5rem",
                      borderRadius: "calc(var(--radius) - 2px)",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    Q{question.id}
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Single Choice</span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted-foreground)",
                      backgroundColor: "var(--secondary)",
                      padding: "0.125rem 0.375rem",
                      borderRadius: "calc(var(--radius) - 4px)",
                    }}
                  >
                    {question.category}
                  </span>
                </div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "var(--card-foreground)",
                    lineHeight: "1.6",
                  }}
                >
                  {question.question}
                </h2>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = answers[question.id] === optionIndex
                  const optionLabel = String.fromCharCode(65 + optionIndex) // A, B, C, D

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(question.id, optionIndex)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "1rem",
                        borderRadius: "var(--radius)",
                        border: isSelected ? "2px solid var(--primary)" : "2px solid var(--border)",
                        backgroundColor: isSelected ? "var(--accent)" : "var(--card)",
                        color: isSelected ? "var(--accent-foreground)" : "var(--card-foreground)",
                        cursor: "pointer",
                        marginBottom: "0.75rem",
                        transition: "all 0.2s ease",
                        boxShadow: isSelected ? "var(--shadow-md)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--accent)"
                          e.currentTarget.style.borderColor = "var(--accent-foreground)"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "var(--card)"
                          e.currentTarget.style.borderColor = "var(--border)"
                        }
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <span
                          style={{
                            flexShrink: 0,
                            width: "1.5rem",
                            height: "1.5rem",
                            borderRadius: "50%",
                            border: isSelected ? "2px solid var(--primary)" : "2px solid var(--muted-foreground)",
                            backgroundColor: isSelected ? "var(--primary)" : "transparent",
                            color: isSelected ? "var(--primary-foreground)" : "var(--muted-foreground)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                          }}
                        >
                          {optionLabel}
                        </span>
                        <span style={{ fontWeight: "500", lineHeight: "1.6" }}>{option}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Navigation buttons - only show when answer is selected */}
              {answers[question.id] !== undefined && (
                <div
                  style={{
                    paddingTop: "1.5rem",
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)", margin: 0 }}>
                      Answer selected: {String.fromCharCode(65 + answers[question.id])}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      style={{
                        backgroundColor: "var(--secondary)",
                        color: "var(--secondary-foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: "var(--radius)",
                        padding: "0.75rem 1.25rem",
                        cursor: currentQuestion === 0 ? "not-allowed" : "pointer",
                        opacity: currentQuestion === 0 ? 0.5 : 1,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (currentQuestion !== 0) {
                          e.currentTarget.style.backgroundColor = "var(--muted)"
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentQuestion !== 0) {
                          e.currentTarget.style.backgroundColor = "var(--secondary)"
                        }
                      }}
                    >
                      <ChevronLeft size={16} />
                      Back
                    </button>

                    {currentQuestion === quizQuestions.length - 1 ? (
                      <button
                        onClick={submitQuiz}
                        disabled={!canSubmitQuiz()}
                        style={{
                          backgroundColor: canSubmitQuiz() ? "#10b981" : "var(--muted)",
                          color: "white",
                          border: "none",
                          borderRadius: "var(--radius)",
                          padding: "0.75rem 1.25rem",
                          cursor: canSubmitQuiz() ? "pointer" : "not-allowed",
                          opacity: canSubmitQuiz() ? 1 : 0.5,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          boxShadow: "var(--shadow-sm)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (canSubmitQuiz()) {
                            e.currentTarget.style.transform = "translateY(-1px)"
                            e.currentTarget.style.boxShadow = "var(--shadow-md)"
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (canSubmitQuiz()) {
                            e.currentTarget.style.transform = "translateY(0)"
                            e.currentTarget.style.boxShadow = "var(--shadow-sm)"
                          }
                        }}
                      >
                        Submit Quiz
                        <CheckCircle size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)",
                          border: "none",
                          borderRadius: "var(--radius)",
                          padding: "0.75rem 1.25rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          boxShadow: "var(--shadow-sm)",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-1px)"
                          e.currentTarget.style.boxShadow = "var(--shadow-md)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)"
                          e.currentTarget.style.boxShadow = "var(--shadow-sm)"
                        }}
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div
        style={{
          position: "fixed",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: "9999px",
          padding: "0.5rem 1rem",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {quizQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentQuestion(index)
                scrollToQuestion(index)
              }}
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "50%",
                border: "none",
                backgroundColor:
                  index === currentQuestion
                    ? "var(--primary)"
                    : answers[quizQuestions[index].id] !== undefined
                      ? "var(--accent)"
                      : "var(--muted)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
