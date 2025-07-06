import { useState, useEffect } from "react"

// Transform API question to match our interface
interface ApiQuestion {
  topic: string
  subtopic: string
  question: string
  choices: string[]
  answer: string
  explanation: string
  source: string
  created_at: string
}

interface Question {
  id: number
  question: string
  choices: string[]
  answer: string
  explanation: string
  category: string
  difficulty: string
}

const transformQuestion = (apiQuestion: ApiQuestion, id: number): Question => {
  return {
    id,
    question: apiQuestion.question,
    choices: apiQuestion.choices,
    answer: apiQuestion.answer,
    explanation: apiQuestion.explanation,
    category: apiQuestion.topic,
    difficulty: 'Medium' // Default difficulty since API doesn't provide it
  }
}

interface QuestionPair {
  question1: Question
  question2: Question
}

interface UseQuestionComparisonResult {
  questionPair: QuestionPair | null
  loading: boolean
  error: string | null
  fetchNewPair: () => Promise<void>
}

export function useQuestionComparison(category: string): UseQuestionComparisonResult {
  const [questionPair, setQuestionPair] = useState<QuestionPair | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuestions = async (): Promise<ApiQuestion[]> => {
    // Map URL category to actual database topic names
    const topicMap: { [key: string]: string } = {
      'biochemistry': 'Biochemistry',
      'cardiology': 'Cardiovascular', 
      'pharmacology': 'Pharmacology',
      'endocrinology': 'EndocrineAndDiabetesAndMetabolism',
      'immunology': 'AllergiesAndImmunology',
      'pediatrics': 'Pediatrics', // This might not have questions yet
      'microbiology': 'Microbiology',
      'dermatology': 'Dermatology',
      'pathology': 'Pathology',
      'genetics': 'Genetics',
      'hematology': 'HematologyAndOncology',
      'infectious-diseases': 'InfectiousDiseases',
      'neurology': 'NervousSystem',
      'ophthalmology': 'Ophthalmology',
      'psychiatry': 'PsychiatricAndSubstanceUseDisorders',
      'critical-care': 'CriticalCare',
      'renal': 'RenalAndUrinary',
      'rheumatology': 'RheumatologyAndOrthopedics'
    }
    
    const topic = topicMap[category.toLowerCase()] || category
    const url = `/api/questions/Step-1?topic=${encodeURIComponent(topic)}&limit=20`
    
    console.log('🔍 Fetching questions from:', url)
    console.log('📝 Category mapping:', category, '->', topic)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error:', response.status, errorText)
      throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('✅ API Response:', {
      success: data.success,
      count: data.count,
      dataLength: data.data?.length,
      topic: data.topic,
      message: data.message
    })
    
    if (!data.success) {
      throw new Error(data.message || "API returned unsuccessful response")
    }
    
    if (!data.data || data.data.length < 2) {
      const actualTopic = topicMap[category.toLowerCase()] || category
      throw new Error(`Not enough questions available for comparison in "${actualTopic}". Found ${data.data?.length || 0} questions, but need at least 2 for comparison.`)
    }

    console.log('📊 Successfully fetched', data.data.length, 'questions for', topic)
    return data.data
  }

  const selectRandomPair = (questions: Question[]): QuestionPair => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    return {
      question1: shuffled[0],
      question2: shuffled[1]
    }
  }

  const fetchNewPair = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('🔄 Fetching new question pair for category:', category)
      
      const apiQuestions = await fetchQuestions()
      const questions = apiQuestions.map((q, index) => transformQuestion(q, index + 1))
      const pair = selectRandomPair(questions)
      
      console.log('✨ Selected question pair:', {
        question1: pair.question1.question.substring(0, 50) + '...',
        question2: pair.question2.question.substring(0, 50) + '...'
      })
      
      setQuestionPair(pair)
    } catch (err) {
      console.error('💥 Error fetching questions:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Test function to verify API connectivity
  const testApiConnection = async () => {
    try {
      console.log('🧪 Testing API connection...')
      const response = await fetch('/api/questions?topic=Biochemistry&limit=1')
      const data = await response.json()
      console.log('🧪 Test result:', data)
      return data
    } catch (err) {
      console.error('🧪 Test failed:', err)
      return null
    }
  }

  useEffect(() => {
    console.log('🚀 Hook initialized with category:', category)
    
    // Add a small delay to ensure the component is mounted
    const timer = setTimeout(() => {
      fetchNewPair()
    }, 100)

    return () => clearTimeout(timer)
  }, [category])

  // Expose test function for debugging
  if (typeof window !== 'undefined') {
    (window as any).testApiConnection = testApiConnection
  }

  return {
    questionPair,
    loading,
    error,
    fetchNewPair
  }
} 