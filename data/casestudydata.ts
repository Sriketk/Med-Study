export const caseStudyData = {
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