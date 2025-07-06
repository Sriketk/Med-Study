export interface OnboardingData {
  academicYear: string;
  examType: string;
  examDate: Date | undefined;
  uploadedFiles: File[];
}

export interface AnalyticsSession {
  id: string;
  type: "quiz" | "practice";
  category?: string;
  date: Date;
  score: number;
  correct: number;
  total: number;
}

export interface AnalyticsCategoryStats {
  correct: number;
  total: number;
  sessions: number;
}

export interface AnalyticsData {
  sessions: AnalyticsSession[];
  categoryStats: Record<string, AnalyticsCategoryStats>;
  overallStats: {
    totalQuestions: number;
    totalCorrect: number;
    totalSessions: number;
  };
}

export interface Category {
  name: string;
  icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  description: string;
  questionCount: number | null;
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: string;
  explanation: string;
}

export interface CaseStudyData {
  id: number;
  title: string;
  scenario: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  mockedResponses: Record<string, string>;
}

// New types for the question bank system
export interface Step1Question {
  examType: string;
  topic: string;
  subtopic: string;
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  source: string;
  created_at: string;
  embedding?: number[];
}

export interface Step2Question extends Step1Question {
  baseQuestion: string;
  patientDetails: Object;
  entireQuestion: string;
  shelfSubject: string;
}

export type MedExamQuestion = Step1Question | Step2Question;

export interface QbankTopic {
  name: string;
  subtopics: string[];
}

export interface QbankTopics {
  [key: string]: string[];
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface QuestionsApiResponse extends ApiResponse<Step1Question[]> {
  examType?: string;
  count?: number;
  topic?: string;
  subtopic?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiError {
  error: string;
  details: string;
  validationErrors?: ValidationError[];
}

// Request parameter types
export interface GetQuestionsParams {
  examType?: string;
  topic: string;
  subtopic?: string;
  limit?: number;
  offset?: number;
}

// Database connection types
export interface DatabaseConnectionConfig {
  uri: string;
  options?: any;
}
