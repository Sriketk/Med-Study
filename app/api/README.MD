# Med Study App API Documentation

## Overview

The Med Study App API provides endpoints for managing medical education question banks. This documentation focuses on the **Questions API** which handles medical questions for studying and practice.

## Architecture

The API follows a layered architecture pattern:

```
app/api/questions/
├── route.ts              # HTTP handlers (GET, POST, OPTIONS)
├── lib/services/         # Business logic layer
├── lib/schemas/          # Database models
├── lib/utils/           # Utility functions
├── data/                # Static data and validation
└── types/               # TypeScript interfaces
```

## Questions API (`/api/questions`)

### Overview

The Questions API provides endpoints to retrieve and create medical education questions organized by topics and subtopics.

### File Structure

#### Core Files

1. **`app/api/questions/route.ts`** - Main API route handlers
2. **`lib/services/question-service.ts`** - Business logic and database operations
3. **`lib/schemas/question.ts`** - MongoDB schema definition
4. **`types/index.ts`** - TypeScript type definitions

#### Supporting Files

1. **`lib/utils/validation.ts`** - Parameter validation utilities
2. **`lib/utils/errors.ts`** - Error handling and response utilities
3. **`lib/mongodb.ts`** - Database connection management
4. **`data/topics.ts`** - Medical topics and subtopics definitions

### Endpoints

#### GET `/api/questions`

**Purpose**: Retrieve questions filtered by topic and optional subtopic

**Query Parameters**:
- `topic` (required): Medical topic name
- `subtopic` (optional): Specific subtopic within the topic
- `limit` (optional): Number of questions to return (default: 50, max: 100)
- `offset` (optional): Number of questions to skip for pagination (default: 0)

**Example Requests**:
```bash
# Get all cardiovascular questions
GET /api/questions?topic=Cardiovascular

# Get specific subtopic questions
GET /api/questions?topic=Cardiovascular&subtopic=Heart Disease

# Get questions with pagination
GET /api/questions?topic=Cardiovascular&limit=10&offset=20
```

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "topic": "Cardiovascular",
      "subtopic": "Heart Disease",
      "question": "What is the most common cause of heart failure?",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "explanation": "Detailed explanation...",
      "source": "Medical textbook reference",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 150,
  "topic": "Cardiovascular",
  "subtopic": "Heart Disease",
  "message": "Retrieved 10 questions"
}
```

**Status Codes**:
- `200`: Success
- `400`: Bad request (missing/invalid parameters)
- `500`: Internal server error

#### POST `/api/questions`

**Purpose**: Create a new question in the database

**Request Body**:
```json
{
  "topic": "Cardiovascular",
  "subtopic": "Heart Disease",
  "question": "What is the most common cause of heart failure?",
  "choices": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "Option A",
  "explanation": "Detailed explanation of the correct answer...",
  "source": "Medical textbook or journal reference"
}
```

**Required Fields**:
- `topic`: Must be a valid medical topic
- `subtopic`: Must be a valid subtopic for the given topic
- `question`: The question text
- `choices`: Array with at least 2 choices
- `answer`: The correct answer
- `explanation`: Explanation of the correct answer
- `source`: Reference source

**Response Format**:
```json
{
  "success": true,
  "data": [
    {
      "topic": "Cardiovascular",
      "subtopic": "Heart Disease",
      "question": "What is the most common cause of heart failure?",
      "choices": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "explanation": "Detailed explanation...",
      "source": "Medical textbook reference",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Question created successfully"
}
```

**Status Codes**:
- `201`: Created successfully
- `400`: Bad request (validation errors)
- `500`: Internal server error

#### OPTIONS `/api/questions`

**Purpose**: Handle CORS preflight requests

**Response Headers**:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

### Data Models

#### QbankQuestion Interface

```typescript
interface QbankQuestion {
  topic: string;           // Medical topic (e.g., "Cardiovascular")
  subtopic: string;        // Subtopic (e.g., "Heart Disease")
  question: string;        // Question text
  choices: string[];       // Array of answer choices
  answer: string;          // Correct answer
  explanation: string;     // Detailed explanation
  source: string;          // Reference source
  created_at: string;      // ISO timestamp
  embedding?: number[];    // Optional vector embeddings
}
```

#### Database Schema

The MongoDB schema includes:

```javascript
{
  topic: { type: String, required: true, index: true },
  subtopic: { type: String, required: true, index: true },
  question: { type: String, required: true },
  choices: { 
    type: [String], 
    required: true,
    validate: { validator: (v) => v.length >= 2 }
  },
  answer: { type: String, required: true },
  explanation: { type: String, required: true },
  source: { type: String, required: true },
  created_at: { type: String, required: true },
  embedding: { type: [Number], default: [] }
}
```

**Indexes**:
- `topic` (single field index)
- `subtopic` (single field index)
- `topic + subtopic` (compound index)
- `topic + createdAt` (compound index)

### Medical Topics

The API supports the following medical topics:

```typescript
const MEDICAL_TOPICS = {
  Biochemistry: ["AMINO_ACIDS_PROTEINS_AND_ENZYMES", "BIOENERGETICS_AND_CARBOHYDRATE_METABOLISM", ...],
  Genetics: ["Inheritance Patterns", "Genetic Disorders", ...],
  Cardiovascular: ["Heart Disease", "Arrhythmias", "Vascular Disorders", ...],
  Microbiology: ["Bacteria", "Viruses", "Fungi", "Parasites", ...],
  // ... and 20+ other topics
}
```

### Error Handling

The API implements comprehensive error handling:

#### Error Response Format

```json
{
  "error": "Error Type",
  "details": "Detailed error message",
  "validationErrors": [
    {
      "field": "topic",
      "message": "Topic is required"
    }
  ]
}
```

#### Error Types

1. **Validation Errors** (400)
   - Missing required parameters
   - Invalid topic/subtopic
   - Invalid data format

2. **Database Errors** (503)
   - Connection failures
   - Query execution errors

3. **Not Found Errors** (404)
   - Resource not found

4. **Internal Server Errors** (500)
   - Unexpected application errors

### Validation

#### Parameter Validation

1. **Query Parameters**:
   - `topic`: Must be a valid medical topic from the predefined list
   - `subtopic`: Must be a valid subtopic for the given topic
   - `limit`: Integer between 1 and 100
   - `offset`: Non-negative integer

2. **Request Body Validation**:
   - All required fields must be present
   - `choices` must be an array with at least 2 elements
   - Topic/subtopic must be valid combinations

#### Validation Utilities

Located in `lib/utils/validation.ts`:

```typescript
// Parse and validate limit parameter
parseLimit(limitParam: string | null, defaultLimit: number = 50, maxLimit: number = 100): number

// Parse and validate offset parameter
parseOffset(offsetParam: string | null, defaultOffset: number = 0): number

// Validate required fields in request body
validateRequiredFields(data: Record<string, any>, requiredFields: string[]): string[]
```

### Service Layer

The `QuestionService` class handles business logic:

#### Methods

1. **`getQuestions(params)`** - Retrieve questions with filtering and pagination
2. **`createQuestion(questionData)`** - Create a new question
3. **`validateParams(topic, subtopic)`** - Validate topic and subtopic parameters
4. **`getQuestionStats()`** - Get question statistics by topic
5. **`healthCheck()`** - Database health check

#### Features

- Parameter validation using topic definitions
- Database connection management
- Error handling and logging
- Data transformation for API responses
- Pagination support

### Database Connection

Database connectivity is managed through `lib/mongodb.ts`:

```typescript
export async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(uri);
  isConnected = true;
}
```

**Configuration**:
- Uses MongoDB connection string from `MONGODB_URI` environment variable
- Implements connection pooling through Mongoose
- Singleton pattern to prevent multiple connections

### Cache Strategy

The API implements caching headers for optimal performance:

```typescript
headers: {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
  "Content-Type": "application/json"
}
```

- Cache duration: 5 minutes
- Stale-while-revalidate: 10 minutes

### Security Considerations

1. **Input Validation**: All inputs are validated and sanitized
2. **CORS**: Configured to allow cross-origin requests
3. **Error Handling**: Sensitive information is not exposed in error messages
4. **Rate Limiting**: Can be implemented at the infrastructure level

### Performance Optimizations

1. **Database Indexes**: Optimized for common query patterns
2. **Pagination**: Prevents large result sets
3. **Lean Queries**: Returns plain JavaScript objects instead of Mongoose documents
4. **Connection Pooling**: Reuses database connections

### Example Usage

#### JavaScript/TypeScript Client

```typescript
// Get questions
const response = await fetch('/api/questions?topic=Cardiovascular&limit=10');
const data = await response.json();

// Create question
const newQuestion = {
  topic: "Cardiovascular",
  subtopic: "Heart Disease",
  question: "What is the most common cause of heart failure?",
  choices: ["Hypertension", "Diabetes", "Coronary artery disease", "Valvular disease"],
  answer: "Coronary artery disease",
  explanation: "Coronary artery disease is the leading cause of heart failure...",
  source: "Braunwald's Heart Disease Textbook"
};

const response = await fetch('/api/questions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newQuestion)
});
```

#### cURL Examples

```bash
# Get questions
curl "http://localhost:3000/api/questions?topic=Cardiovascular&limit=5"

# Create question
curl -X POST "http://localhost:3000/api/questions" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Cardiovascular",
    "subtopic": "Heart Disease",
    "question": "What is the most common cause of heart failure?",
    "choices": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option A",
    "explanation": "Detailed explanation...",
    "source": "Medical reference"
  }'
```

### Development Setup

1. **Environment Variables**:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/med-study-db
   ```

2. **Dependencies**:
   - `next`: Next.js framework
   - `mongoose`: MongoDB ODM
   - `mongodb`: MongoDB driver

3. **Database Setup**:
   - MongoDB instance running
   - Database name: `med-study-db`
   - Collection: `qbanks`

### Testing

The API can be tested using:

1. **Unit Tests**: Test individual functions and utilities
2. **Integration Tests**: Test API endpoints with database
3. **Manual Testing**: Using tools like Postman or curl

### Future Enhancements

1. **Search Functionality**: Full-text search across questions
2. **Bulk Operations**: Create multiple questions at once
3. **Question Updates**: PATCH endpoint for updating questions
4. **Question Deletion**: DELETE endpoint for removing questions
5. **Advanced Filtering**: Filter by difficulty, source, etc.
6. **Analytics**: Track question usage and performance

---

## Additional Resources

- [Next.js API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
