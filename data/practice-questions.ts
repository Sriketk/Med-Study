export const practiceQuestions = {
    Cardiology: [
      {
        id: 101,
        question:
          "A 65-year-old man presents with crushing chest pain radiating to his left arm. Which enzyme is most specific for myocardial infarction?",
        options: ["CK-MB", "Troponin I", "LDH", "AST"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Easy",
        explanation:
          "Troponin I is the most specific marker for myocardial infarction. It's released when cardiac muscle cells are damaged and remains elevated for several days, making it both sensitive and specific for cardiac injury.",
      },
      {
        id: 102,
        question: "What is the most common cause of heart failure in developed countries?",
        options: ["Valvular disease", "Coronary artery disease", "Hypertension", "Cardiomyopathy"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Easy",
        explanation:
          "Coronary artery disease is the leading cause of heart failure in developed countries, accounting for approximately 60-70% of cases. It leads to heart failure through myocardial infarction and chronic ischemia.",
      },
      {
        id: 103,
        question: "Which heart sound is associated with ventricular gallop?",
        options: ["S1", "S2", "S3", "S4"],
        correct: 2,
        category: "Cardiology",
        difficulty: "Medium",
        explanation:
          "S3 gallop (ventricular gallop) occurs in early diastole and is associated with heart failure. It represents rapid ventricular filling and is often described as sounding like 'Kentucky' when combined with S1 and S2.",
      },
      {
        id: 104,
        question: "What is the first-line treatment for stable angina?",
        options: ["ACE inhibitors", "Beta-blockers", "Calcium channel blockers", "Nitrates"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Medium",
        explanation:
          "Beta-blockers are first-line therapy for stable angina as they reduce heart rate and contractility, thereby decreasing myocardial oxygen demand. They also have proven mortality benefits in patients with coronary artery disease.",
      },
      {
        id: 105,
        question: "Which arrhythmia is most commonly associated with Wolff-Parkinson-White syndrome?",
        options: ["Atrial fibrillation", "Supraventricular tachycardia", "Ventricular tachycardia", "Heart block"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Hard",
        explanation:
          "WPW syndrome is most commonly associated with supraventricular tachycardia (SVT), specifically AV reentrant tachycardia. The accessory pathway allows for reentrant circuits that can cause rapid heart rates.",
      },
      {
        id: 106,
        question: "What is the most common congenital heart defect?",
        options: ["Atrial septal defect", "Ventricular septal defect", "Patent ductus arteriosus", "Tetralogy of Fallot"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Easy",
        explanation:
          "Ventricular septal defect (VSD) is the most common congenital heart defect, accounting for about 20-25% of all congenital heart diseases. Many small VSDs close spontaneously during childhood.",
      },
      {
        id: 107,
        question: "Which medication is contraindicated in patients with severe aortic stenosis?",
        options: ["Beta-blockers", "ACE inhibitors", "Digoxin", "Diuretics"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Medium",
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
        category: "Cardiology",
        difficulty: "Medium",
        explanation:
          "Hypertrophic cardiomyopathy is the most common cause of sudden cardiac death in young athletes. The condition can cause outflow tract obstruction and arrhythmias, particularly during intense physical activity.",
      },
      {
        id: 109,
        question: "Which finding is most suggestive of right heart failure?",
        options: ["Pulmonary edema", "Jugular venous distension", "S3 gallop", "Paroxysmal nocturnal dyspnea"],
        correct: 1,
        category: "Cardiology",
        difficulty: "Medium",
        explanation:
          "Jugular venous distension (JVD) is most suggestive of right heart failure, indicating elevated right atrial pressure. The other options are more commonly associated with left heart failure.",
      },
      {
        id: 110,
        question: "What is the mechanism of action of digoxin?",
        options: ["Beta-blocker", "ACE inhibitor", "Na+/K+-ATPase inhibitor", "Calcium channel blocker"],
        correct: 2,
        category: "Cardiology",
        difficulty: "Medium",
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
        category: "Pharmacology",
        difficulty: "Easy",
        explanation:
          "ACE inhibitors commonly cause hyperkalemia by reducing aldosterone levels. Aldosterone normally promotes potassium excretion, so its reduction leads to potassium retention.",
      },
      {
        id: 202,
        question: "What is the antidote for warfarin overdose?",
        options: ["Protamine sulfate", "Vitamin K", "Fresh frozen plasma", "Naloxone"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Medium",
        explanation:
          "Vitamin K is the antidote for warfarin overdose. Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X), and vitamin K administration helps restore normal coagulation.",
      },
      {
        id: 203,
        question: "Which antibiotic is associated with tendon rupture?",
        options: ["Penicillin", "Ciprofloxacin", "Erythromycin", "Cephalexin"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Medium",
        explanation:
          "Fluoroquinolones like ciprofloxacin are associated with tendon rupture, particularly the Achilles tendon. This risk is increased in elderly patients and those taking corticosteroids.",
      },
      {
        id: 204,
        question: "What is the mechanism of action of statins?",
        options: ["Inhibit cholesterol absorption", "Inhibit HMG-CoA reductase", "Bind bile acids", "Inhibit PCSK9"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Medium",
        explanation:
          "Statins inhibit HMG-CoA reductase, the rate-limiting enzyme in cholesterol synthesis. This leads to decreased hepatic cholesterol production and upregulation of LDL receptors.",
      },
      {
        id: 205,
        question: "Which medication can cause cinchonism?",
        options: ["Quinidine", "Procainamide", "Lidocaine", "Amiodarone"],
        correct: 0,
        category: "Pharmacology",
        difficulty: "Hard",
        explanation:
          "Quinidine can cause cinchonism, a syndrome characterized by tinnitus, hearing loss, blurred vision, and confusion. It's related to quinidine's similarity to quinine.",
      },
      {
        id: 206,
        question: "What is the primary mechanism of aspirin's cardioprotective effect?",
        options: ["COX-2 inhibition", "COX-1 inhibition", "Thromboxane synthesis", "Prostacyclin inhibition"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Easy",
        explanation:
          "Aspirin's cardioprotective effect is primarily due to irreversible COX-1 inhibition in platelets, which prevents thromboxane A2 synthesis and reduces platelet aggregation.",
      },
      {
        id: 207,
        question: "Which drug interaction increases the risk of rhabdomyolysis with statins?",
        options: ["Warfarin", "Gemfibrozil", "Aspirin", "Metformin"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Hard",
        explanation:
          "Gemfibrozil significantly increases statin levels by inhibiting glucuronidation, leading to increased risk of rhabdomyolysis. This combination should generally be avoided.",
      },
      {
        id: 208,
        question: "What is the antidote for heparin overdose?",
        options: ["Vitamin K", "Protamine sulfate", "Fresh frozen plasma", "Aminocaproic acid"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Medium",
        explanation:
          "Protamine sulfate is the antidote for heparin overdose. It's a positively charged protein that binds to negatively charged heparin, neutralizing its anticoagulant effect.",
      },
      {
        id: 209,
        question: "Which medication is first-line for treating anaphylaxis?",
        options: ["Diphenhydramine", "Epinephrine", "Corticosteroids", "Albuterol"],
        correct: 1,
        category: "Pharmacology",
        difficulty: "Medium",
        explanation:
          "Epinephrine is the first-line treatment for anaphylaxis. It counteracts the massive histamine release by causing vasoconstriction, bronchodilation, and positive inotropic effects.",
      },
      {
        id: 210,
        question: "What is a common side effect of amiodarone?",
        options: ["Pulmonary fibrosis", "Renal failure", "Hepatotoxicity", "All of the above"],
        correct: 3,
        category: "Pharmacology",
        difficulty: "Hard",
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
        category: "Endocrinology",
        difficulty: "Easy",
        explanation:
          "Graves' disease is the most common cause of hyperthyroidism, accounting for 70-80% of cases. It's an autoimmune condition caused by thyroid-stimulating immunoglobulins that mimic TSH.",
      },
      {
        id: 302,
        question: "Which hormone is deficient in Addison's disease?",
        options: ["Cortisol", "Aldosterone", "Both cortisol and aldosterone", "ACTH"],
        correct: 2,
        category: "Endocrinology",
        difficulty: "Medium",
        explanation:
          "Addison's disease (primary adrenal insufficiency) involves deficiency of both cortisol and aldosterone due to destruction of the adrenal cortex. This leads to both glucocorticoid and mineralocorticoid deficiency.",
      },
      {
        id: 303,
        question: "What is the target HbA1c for most diabetic patients?",
        options: ["<6%", "<7%", "<8%", "<9%"],
        correct: 1,
        category: "Endocrinology",
        difficulty: "Easy",
        explanation:
          "The target HbA1c for most diabetic patients is <7%. This represents good glycemic control while balancing the risk of hypoglycemia. Individual targets may vary based on patient factors.",
      },
      {
        id: 304,
        question: "Which test is most specific for diagnosing acromegaly?",
        options: ["Random GH level", "IGF-1 level", "Oral glucose tolerance test with GH", "MRI of pituitary"],
        correct: 2,
        category: "Endocrinology",
        difficulty: "Medium",
        explanation:
          "Oral glucose tolerance test with GH measurement is most specific for acromegaly. Normally, glucose suppresses GH to <1 ng/mL, but in acromegaly, GH fails to suppress appropriately.",
      },
      {
        id: 305,
        question: "What is the most common cause of Cushing's syndrome?",
        options: ["Pituitary adenoma", "Adrenal adenoma", "Ectopic ACTH", "Exogenous steroids"],
        correct: 3,
        category: "Endocrinology",
        difficulty: "Medium",
        explanation:
          "Exogenous steroid administration is the most common cause of Cushing's syndrome. Among endogenous causes, pituitary adenomas (Cushing's disease) are most common.",
      },
      {
        id: 306,
        question: "Which medication is first-line for type 2 diabetes?",
        options: ["Insulin", "Sulfonylureas", "Metformin", "Thiazolidinediones"],
        correct: 2,
        category: "Endocrinology",
        difficulty: "Medium",
        explanation:
          "Metformin is first-line therapy for type 2 diabetes. It decreases hepatic glucose production, improves insulin sensitivity, and has cardiovascular benefits with low risk of hypoglycemia.",
      },
      {
        id: 307,
        question: "What is the most common cause of hypothyroidism in developed countries?",
        options: ["Iodine deficiency", "Hashimoto's thyroiditis", "Surgical removal", "Radioactive iodine"],
        correct: 1,
        category: "Endocrinology",
        difficulty: "Easy",
        explanation:
          "Hashimoto's thyroiditis (chronic autoimmune thyroiditis) is the most common cause of hypothyroidism in developed countries where iodine deficiency is rare.",
      },
      {
        id: 308,
        question: "Which finding is characteristic of diabetic ketoacidosis?",
        options: ["High bicarbonate", "Low anion gap", "High anion gap", "Normal pH"],
        correct: 2,
        category: "Endocrinology",
        difficulty: "Medium",
        explanation:
          "DKA is characterized by high anion gap metabolic acidosis due to accumulation of ketoacids (beta-hydroxybutyrate and acetoacetate). The anion gap is typically >12 mEq/L.",
      },
      {
        id: 309,
        question: "What is the most sensitive test for primary hyperparathyroidism?",
        options: ["Serum calcium", "Serum phosphorus", "Serum PTH", "24-hour urine calcium"],
        correct: 2,
        category: "Endocrinology",
        difficulty: "Medium",
        explanation:
          "Serum PTH is the most sensitive test for primary hyperparathyroidism. An elevated or inappropriately normal PTH in the setting of hypercalcemia suggests primary hyperparathyroidism.",
      },
      {
        id: 310,
        question: "Which complication is most feared in thyroid storm?",
        options: ["Seizures", "Heart failure", "Coma", "All of the above"],
        correct: 3,
        category: "Endocrinology",
        difficulty: "Hard",
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
        category: "Immunology",
        difficulty: "Easy",
        explanation:
          "IgG is the most abundant immunoglobulin in serum, comprising about 75% of total immunoglobulins. It provides long-term immunity and can cross the placenta.",
      },
      {
        id: 402,
        question: "What type of hypersensitivity reaction is anaphylaxis?",
        options: ["Type I", "Type II", "Type III", "Type IV"],
        correct: 0,
        category: "Immunology",
        difficulty: "Easy",
        explanation:
          "Anaphylaxis is a Type I (immediate) hypersensitivity reaction mediated by IgE antibodies and mast cell degranulation, leading to rapid release of histamine and other mediators.",
      },
      {
        id: 403,
        question: "Which cells are primarily responsible for cell-mediated immunity?",
        options: ["B cells", "T cells", "NK cells", "Macrophages"],
        correct: 1,
        category: "Immunology",
        difficulty: "Easy",
        explanation:
          "T cells are primarily responsible for cell-mediated immunity. CD8+ T cells directly kill infected cells, while CD4+ T cells coordinate immune responses and activate other immune cells.",
      },
      {
        id: 404,
        question: "What is the primary function of complement?",
        options: ["Antibody production", "Cell lysis and opsonization", "Antigen presentation", "Memory formation"],
        correct: 1,
        category: "Immunology",
        difficulty: "Easy",
        explanation:
          "The complement system's primary functions include cell lysis through membrane attack complex formation and opsonization to enhance phagocytosis. It also promotes inflammation.",
      },
      {
        id: 405,
        question: "Which HLA class is associated with organ transplant rejection?",
        options: ["HLA Class I only", "HLA Class II only", "Both Class I and II", "Neither"],
        correct: 2,
        category: "Immunology",
        difficulty: "Medium",
        explanation:
          "Both HLA Class I and Class II molecules are important in transplant rejection. Class I (HLA-A, B, C) are on all nucleated cells, while Class II (HLA-DR, DQ, DP) are on antigen-presenting cells.",
      },
      {
        id: 406,
        question: "What is the most common primary immunodeficiency?",
        options: ["SCID", "DiGeorge syndrome", "IgA deficiency", "Chronic granulomatous disease"],
        correct: 2,
        category: "Immunology",
        difficulty: "Medium",
        explanation:
          "Selective IgA deficiency is the most common primary immunodeficiency, affecting about 1 in 500 people. Many patients are asymptomatic, but some have recurrent respiratory infections.",
      },
      {
        id: 407,
        question: "Which cytokine is most important for Th1 differentiation?",
        options: ["IL-4", "IL-12", "IL-6", "TGF-β"],
        correct: 1,
        category: "Immunology",
        difficulty: "Medium",
        explanation:
          "IL-12 is crucial for Th1 differentiation. It's produced by dendritic cells and macrophages and promotes the development of Th1 cells that produce IFN-γ and support cell-mediated immunity.",
      },
      {
        id: 408,
        question: "What is the mechanism of action of cyclosporine?",
        options: ["Blocks IL-2 production", "Inhibits purine synthesis", "Blocks complement", "Depletes lymphocytes"],
        correct: 0,
        category: "Immunology",
        difficulty: "Hard",
        explanation:
          "Cyclosporine inhibits calcineurin, which prevents NFAT translocation to the nucleus and blocks IL-2 production. This prevents T cell activation and proliferation.",
      },
      {
        id: 409,
        question: "Which immunoglobulin is associated with allergic reactions?",
        options: ["IgA", "IgG", "IgM", "IgE"],
        correct: 3,
        category: "Immunology",
        difficulty: "Medium",
        explanation:
          "IgE is associated with allergic reactions and parasitic infections. It binds to mast cells and basophils, and upon antigen binding, triggers degranulation and release of inflammatory mediators.",
      },
      {
        id: 410,
        question: "What is the primary defect in severe combined immunodeficiency (SCID)?",
        options: ["B cell defect only", "T cell defect only", "Both B and T cell defects", "Complement deficiency"],
        correct: 2,
        category: "Immunology",
        difficulty: "Hard",
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
        category: "Pediatrics",
        difficulty: "Easy",
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
        category: "Pediatrics",
        difficulty: "Easy",
        explanation:
          "Respiratory syncytial virus (RSV) is the most common cause of pneumonia in children under 2 years, especially in infants. It can cause severe bronchiolitis and pneumonia in this age group.",
      },
      {
        id: 503,
        question: "Which vaccine is contraindicated in immunocompromised children?",
        options: ["DTaP", "IPV", "MMR", "Hib"],
        correct: 2,
        category: "Pediatrics",
        difficulty: "Medium",
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
        category: "Pediatrics",
        difficulty: "Medium",
        explanation:
          "Group B Streptococcus (GBS) is the most common cause of bacterial meningitis in neonates. It's often acquired during passage through the birth canal from colonized mothers.",
      },
      {
        id: 505,
        question: "At what age do children typically begin walking independently?",
        options: ["9-12 months", "12-15 months", "15-18 months", "18-24 months"],
        correct: 1,
        category: "Pediatrics",
        difficulty: "Easy",
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
        category: "Pediatrics",
        difficulty: "Easy",
        explanation:
          "Ventricular septal defect (VSD) is the most common congenital heart defect, accounting for about 20-25% of all congenital heart diseases. Many small VSDs close spontaneously.",
      },
      {
        id: 507,
        question: "Which condition is associated with a 'barking' cough?",
        options: ["Bronchiolitis", "Croup", "Pneumonia", "Asthma"],
        correct: 1,
        category: "Pediatrics",
        difficulty: "Easy",
        explanation:
          "Croup (laryngotracheobronchitis) is characterized by a distinctive 'barking' cough, stridor, and hoarseness. It's usually caused by parainfluenza virus and affects the larynx and trachea.",
      },
      {
        id: 508,
        question: "What is the treatment of choice for mild to moderate croup?",
        options: ["Antibiotics", "Bronchodilators", "Corticosteroids", "Antihistamines"],
        correct: 2,
        category: "Pediatrics",
        difficulty: "Medium",
        explanation:
          "Corticosteroids (typically dexamethasone) are the treatment of choice for croup. They reduce airway inflammation and edema, improving symptoms and reducing the need for hospitalization.",
      },
      {
        id: 509,
        question: "Which reflex disappears by 6 months of age?",
        options: ["Moro reflex", "Rooting reflex", "Palmar grasp", "All of the above"],
        correct: 3,
        category: "Pediatrics",
        difficulty: "Easy",
        explanation:
          "The Moro reflex, rooting reflex, and palmar grasp reflex all typically disappear by 4-6 months of age as the nervous system matures and voluntary motor control develops.",
      },
      {
        id: 510,
        question: "What is the most common cause of failure to thrive in developed countries?",
        options: ["Malabsorption", "Inadequate caloric intake", "Chronic disease", "Genetic disorders"],
        correct: 1,
        category: "Pediatrics",
        difficulty: "Medium",
        explanation:
          "Inadequate caloric intake is the most common cause of failure to thrive in developed countries. This can be due to feeding difficulties, behavioral issues, or psychosocial factors.",
      },
    ],
  }