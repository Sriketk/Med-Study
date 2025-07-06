# Medical Study App - API Documentation

## Overview

This API provides access to a medical question bank system with proper TypeScript typing, validation, error handling, and industry-standard practices.

## Architecture

### 📁 File Structure

```
lib/
├── schemas/
│   └── question.ts         # Step1 MongoDB schema definitions
│   └── step2questions.ts   # Step2 MongoDB schema definitions
├── services/
│   └── question-service.ts # Business logic and database operations
├── utils/
│   ├── validation.ts       # Validation utilities
│   └── errors.ts           # Error handling utilities
└── mongo/
    └── mongodb.ts          # Database connection
```

```
data/
└── topics.ts              # Medical topics and subtopics data
```

```
types/
└── index.ts               # TypeScript type definitions
```

```
app/api/
└── questions/
    └── route.ts           # API route handlers
```

## API Endpoints

### GET /api/questions

Retrieves questions based on topic, optional subtopic, and exam type (Step-1 or Step-2).

#### Query Parameters

| Parameter   | Type   | Required | Default | Description                                 |
|-------------|--------|----------|---------|---------------------------------------------|
| `topic`     | string | Yes      | -       | Medical topic (e.g., "Cardiovascular")      |
| `subtopic`  | string | No       | -       | Specific subtopic (e.g., "Heart Disease")   |
| `limit`     | number | No       | 50      | Number of questions (1-100)                 |
| `offset`    | number | No       | 0       | Number of questions to skip                 |
| `examType`  | string | No       | -       | Exam type: "Step-1" or "Step-2"            |

#### Example Request (Step-1)

```http
GET /api/questions?topic=Cardiovascular&subtopic=Heart%20Disease&limit=10&offset=0&examType=Step-1
```

#### Example Response (Step-1)

```json
{
  "success": true,
  "data": [
    {
      "examType": "Step-1",
      "topic": "Cardiovascular",
      "subtopic": "Heart Disease",
      "question": "What is the most common cause of myocardial infarction?",
      "choices": [
        "Coronary artery spasm",
        "Coronary artery thrombosis",
        "Coronary artery embolism",
        "Coronary artery rupture"
      ],
      "answer": "Coronary artery thrombosis",
      "explanation": "The most common cause of myocardial infarction is coronary artery thrombosis...",
      "source": "Harrison's Principles of Internal Medicine",
      "created_at": "2023-07-05T10:30:00.000Z"
    }
  ],
  "count": 1,
  "topic": "Cardiovascular",
  "subtopic": "Heart Disease",
  "examType": "Step-1",
  "message": "Retrieved 1 questions"
}
```

#### Example Request (Step-2)

```http
GET /api/questions?topic=Cardiovascular&subtopic=Heart%20Disease&limit=10&offset=0&examType=Step-2
```

#### Example Response (Step-2)

```json
{
  "success": true,
  "data": [
    {
      "examType": "Step-2",
      "topic": "Cardiovascular",
      "subtopic": "Heart Disease",
      "question": "A 65-year-old man presents with chest pain...",
      "choices": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "answer": "Option B",
      "explanation": "This scenario describes...",
      "source": "Step 2 Reference",
      "created_at": "2023-07-05T10:30:00.000Z",
      "baseQuestion": "What is the diagnosis?",
      "patientDetails": { "age": 65, "sex": "M", "symptoms": ["chest pain"] },
      "entireQuestion": "A 65-year-old man presents... What is the diagnosis?",
      "shelfSubject": "Internal Medicine"
    }
  ],
  "count": 1,
  "topic": "Cardiovascular",
  "subtopic": "Heart Disease",
  "examType": "Step-2",
  "message": "Retrieved 1 questions"
}
```

### POST /api/questions

Creates a new question in the database. The request body must match the Step1 or Step2 question structure depending on the `examType`.

#### Request Body (Step-1)

```json
{
  "examType": "Step-1",
  "topic": "Cardiovascular",
  "subtopic": "Heart Disease",
  "question": "What is the most common cause of myocardial infarction?",
  "choices": [
    "Coronary artery spasm",
    "Coronary artery thrombosis",
    "Coronary artery embolism",
    "Coronary artery rupture"
  ],
  "answer": "Coronary artery thrombosis",
  "explanation": "The most common cause of myocardial infarction is coronary artery thrombosis...",
  "source": "Harrison's Principles of Internal Medicine"
}
```

#### Request Body (Step-2)

```json
{
  "examType": "Step-2",
  "topic": "Cardiovascular",
  "subtopic": "Heart Disease",
  "question": "A 65-year-old man presents with chest pain...",
  "choices": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Option B",
  "explanation": "This scenario describes...",
  "source": "Step 2 Reference",
  "baseQuestion": "What is the diagnosis?",
  "patientDetails": { "age": 65, "sex": "M", "symptoms": ["chest pain"] },
  "entireQuestion": "A 65-year-old man presents... What is the diagnosis?",
  "shelfSubject": "Internal Medicine"
}
```

#### Example Response (Step-2)

```json
{
  "success": true,
  "data": [
    {
      "examType": "Step-2",
      "topic": "Cardiovascular",
      "subtopic": "Heart Disease",
      "question": "A 65-year-old man presents with chest pain...",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option B",
      "explanation": "This scenario describes...",
      "source": "Step 2 Reference",
      "created_at": "2023-07-05T10:30:00.000Z",
      "baseQuestion": "What is the diagnosis?",
      "patientDetails": { "age": 65, "sex": "M", "symptoms": ["chest pain"] },
      "entireQuestion": "A 65-year-old man presents... What is the diagnosis?",
      "shelfSubject": "Internal Medicine"
    }
  ],
  "message": "Question created successfully"
}
```

## Step1 vs Step2 Questions

- **Step1Question**: Standard question fields (topic, subtopic, question, choices, answer, explanation, source, created_at, embedding)
- **Step2Question**: All Step1 fields **plus**:
  - `baseQuestion`: string
  - `patientDetails`: object
  - `entireQuestion`: string
  - `shelfSubject`: string

## Available Topics

- `Biochemistry`
- `Genetics`
- `AllergiesAndImmunology`
- `Cardiovascular`
- `Microbiology`
- `Dermatology`
- `Pathology`
- `Pharmacology`
- `EarNoseAndThroat`
- `BiostatsAndEpidemiology`
- `EndocrineAndDiabetesAndMetabolism`
- `PoisoningAndEnvironmentalExposure`
- `PsychiatricAndSubstanceUseDisorders`
- `SocialSciences`
- `HematologyAndOncology`
- `InfectiousDiseases`
- `MaleReproductiveSystem`
- `NervousSystem`
- `Ophthalmology`
- `PregnancyChildbirthAndPuerperium`
- `CriticalCare`
- `RenalAndUrinary`
- `RheumatologyAndOrthopedics`

## Error Responses

All errors follow a consistent format:

```json
{
  "error": "Error Type",
  "details": "Detailed error message",
  "validationErrors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized |
| 404 | Not Found |
| 429 | Rate Limit Exceeded |
| 500 | Internal Server Error |
| 503 | Service Unavailable (database issues) |

## TypeScript Support

### Core Types

```typescript
interface Step1Question {
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

interface Step2Question extends Step1Question {
  baseQuestion: string;
  patientDetails: object;
  entireQuestion: string;
  shelfSubject: string;
}

type MedExamQuestion = Step1Question | Step2Question;

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface QuestionsApiResponse extends ApiResponse<MedExamQuestion[]> {
  count?: number;
  topic?: string;
  subtopic?: string;
  examType?: string;
}
```

## Service Layer

### QuestionService

The `QuestionService` class provides methods for database operations:

```typescript
// Get questions with filtering and pagination
const result = await QuestionService.getQuestions({
  topic: 'Cardiovascular',
  subtopic: 'Heart Disease',
  limit: 10,
  offset: 0,
  examType: 'Step-2',
})

// Create a new question
const newQuestion = await QuestionService.createQuestion(questionData)

// Get question statistics
const stats = await QuestionService.getQuestionStats()

// Health check
const health = await QuestionService.healthCheck()
```

## Validation

### Built-in Validations

- **Topic validation**: Must be one of the predefined medical topics
- **Subtopic validation**: Must be valid for the specified topic
- **Exam type validation**: Must be "Step-1" or "Step-2"
- **Required fields**: All required fields are validated
- **Choices validation**: Must have at least 2 choices
- **Parameter validation**: Limit and offset parameters are validated

### Custom Validation Utilities

```typescript
import { 
  parseLimit, 
  parseOffset, 
  validateRequiredFields,
  isValidString,
  isValidArray 
} from '@/lib/utils/validation'
```

## Error Handling

### Custom Error Classes

```typescript
import { 
  ValidationErrorClass,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
  RateLimitError
} from '@/lib/utils/errors'
```

### Error Handler

```typescript
import { handleApiError } from '@/lib/utils/errors'

// In your API route
try {
  // Your logic here
} catch (error) {
  return handleApiError(error, 'API Context')
}
```

## Performance Features

- **Caching**: GET requests are cached with appropriate cache headers
- **Database Indexes**: Optimized MongoDB indexes for topic and subtopic queries
- **Pagination**: Built-in pagination support to handle large datasets
- **Connection Pooling**: MongoDB connection pooling for better performance

## Best Practices

1. **Separation of Concerns**: Business logic is separated from route handlers
2. **Type Safety**: Full TypeScript support with proper typing
3. **Error Handling**: Consistent error handling across all endpoints
4. **Validation**: Input validation using utility functions
5. **Documentation**: Comprehensive JSDoc comments
6. **Testing**: Structure supports easy unit and integration testing
7. **Scalability**: Modular architecture supports easy scaling

## Usage Examples

### Frontend Integration

```typescript
// TypeScript fetch example
async function getQuestions(topic: string, subtopic?: string, examType?: string) {
  const params = new URLSearchParams({ topic })
  if (subtopic) params.append('subtopic', subtopic)
  if (examType) params.append('examType', examType)
  
  const response = await fetch(`/api/questions?${params}`)
  const data: QuestionsApiResponse = await response.json()
  
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch questions')
  }
  
  return data.data
}
```

### Error Handling in Frontend

```typescript
try {
  const questions = await getQuestions('Cardiovascular', undefined, 'Step-2')
  // Handle success
} catch (error) {
  // Handle error
  console.error('Failed to load questions:', error.message)
}
``` 