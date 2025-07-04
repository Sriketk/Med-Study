import { QbankTopics } from '@/types'

/**
 * Medical education topics and their associated subtopics
 * Used for question categorization and validation
 */
export const MEDICAL_TOPICS: QbankTopics = {
  Biochemistry: [
    "AMINO_ACIDS_PROTEINS_AND_ENZYMES",
    "BIOENERGETICS_AND_CARBOHYDRATE_METABOLISM",
    "LIPID_METABOLISM",
    "CELL_AND_MOLECULAR_BIOLOGY",
  ],
  Genetics: [
    "Inheritance Patterns",
    "Genetic Disorders",
    "Gene Expression",
    "Mutations",
  ],
  AllergyAndImmunology: [
    "Hypersensitivity",
    "Autoimmune Disorders",
    "Immunodeficiencies",
  ],
  Cardiovascular: [
    "Heart Disease",
    "Arrhythmias",
    "Vascular Disorders",
    "Congenital Heart Disease",
  ],
  Microbiology: [
    "Bacteria", 
    "Viruses", 
    "Fungi", 
    "Parasites", 
    "Lab Techniques"
  ],
  Dermatology: [
    "Skin Lesions",
    "Infections",
    "Inflammatory Conditions",
    "Neoplasms",
  ],
  Pathology: [
    "Cell Injury", 
    "Inflammation", 
    "Neoplasia", 
    "Disease Mechanisms"
  ],
  Pharmacology: [
    "Drug Classes",
    "Pharmacokinetics",
    "Drug Interactions",
    "Adverse Effects",
  ],
  EarNoseAndThroat: [
    "Hearing Loss",
    "Sinusitis",
    "Throat Disorders",
    "Balance Disorders",
  ],
  BiostatsAndEpidemiology: [
    "Study Design",
    "Statistical Tests",
    "Disease Measures",
    "Population Health",
  ],
  EndocrineAndDiabetesAndMetabolism: [
    "Thyroid",
    "Diabetes",
    "Adrenal Disorders",
    "Metabolic Syndromes",
  ],
  PoisoningAndEnvironmentalExposure: [
    "Toxins",
    "Environmental Hazards",
    "Occupational Exposures",
  ],
  PsychiatricAndSubstanceUseDisorders: [
    "Mood Disorders",
    "Anxiety",
    "Substance Abuse",
    "Personality Disorders",
  ],
  SocialSciences: [
    "Ethics",
    "Communication",
    "Healthcare Systems",
    "Cultural Competency",
  ],
  HematologyAndOncology: [
    "Anemias",
    "Leukemias",
    "Solid Tumors",
    "Coagulation Disorders",
  ],
  InfectiousDiseases: [
    "Bacterial Infections",
    "Viral Infections",
    "Fungal Infections",
    "STIs",
  ],
  MaleReproductiveSystem: [
    "Prostate",
    "Testicular Disorders",
    "Sexual Dysfunction",
    "Infertility",
  ],
  NervousSystem: [
    "CNS Disorders",
    "PNS Disorders",
    "Neurodegenerative Disease",
    "Stroke",
  ],
  Ophthalmology: [
    "Retinal Disorders",
    "Glaucoma",
    "Visual Pathways",
    "Eye Infections",
  ],
  PregnancyChildbirthAndPuerperium: [
    "Prenatal Care",
    "Labor & Delivery",
    "Complications",
    "Postpartum",
  ],
  CriticalCare: [
    "Shock",
    "Respiratory Failure",
    "Multi-organ Failure",
    "Emergency Medicine",
  ],
  RenalAndUrinary: [
    "Kidney Disease",
    "Electrolyte Disorders",
    "UTIs",
    "Stones",
  ],
  RheumatologyAndOrthopedics: [
    "Arthritis",
    "Autoimmune Disease",
    "Bone Disorders",
    "Joint Problems",
  ],
} as const

export const EXAM_TYPES = ["Step-1", "Step-2"]

/**
 * Get all available topic names
 */
export const getTopicNames = (): string[] => {
  return Object.keys(MEDICAL_TOPICS)
}

/**
 * Get subtopics for a specific topic
 */
export const getSubtopics = (topic: string): string[] => {
  return MEDICAL_TOPICS[topic] || []
}

/**
 * Check if a topic exists
 */
export const isValidTopic = (topic: string): boolean => {
  return topic in MEDICAL_TOPICS
}

export const isValidExamType = (examType: string): boolean => {
  return EXAM_TYPES.includes(examType)
}

/**
 * Check if a subtopic exists for a given topic
 */
export const isValidSubtopic = (topic: string, subtopic: string): boolean => {
  const subtopics = getSubtopics(topic)
  return subtopics.includes(subtopic)
} 