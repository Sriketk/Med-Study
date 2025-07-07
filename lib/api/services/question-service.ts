import { connectToDatabase } from "@/lib/api/mongo/mongodb";
import {
  Step1QuestionModel,
  Step1QuestionDocument,
} from "@/lib/api/schemas/question";
import {
  Step2QuestionModel,
  Step2QuestionDocument,
} from "@/lib/api/schemas/step2questions";
import {
  Step1Question,
  Step2Question,
  MedExamQuestion,
  GetQuestionsParams,
  ValidationError,
} from "@/lib/types";
import {
  isValidTopic,
  isValidSubtopic,
  isValidExamType,
  getTopicNames,
  getSubtopics,
} from "@/data/topics";

/**
 * Service layer for question bank operations
 * Handles all database interactions and business logic
 */
export class QuestionService {
  /**
   * Validate topic and subtopic parameters
   */
  static validateParams(
    topic: string,
    subtopic?: string,
    examType?: string
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!topic) {
      errors.push({
        field: "topic",
        message: "Topic is required",
      });
      return errors;
    }

    if (!isValidTopic(topic)) {
      errors.push({
        field: "topic",
        message: `Invalid topic. Valid topics are: ${getTopicNames().join(
          ", "
        )}`,
      });
      return errors;
    }

    if (subtopic && !isValidSubtopic(topic, subtopic)) {
      errors.push({
        field: "subtopic",
        message: `Invalid subtopic for ${topic}. Valid subtopics are: ${getSubtopics(
          topic
        ).join(", ")}`,
      });
    }

    if (examType && !isValidExamType(examType)) {
      errors.push({
        field: "examType",
        message: "Invalid exam type",
      });
    }
    return errors;
  }

  /**
   * Get questions by topic and optional subtopic
   */
  static async getQuestions(params: GetQuestionsParams): Promise<{
    questions: MedExamQuestion[];
    count: number;
    topic: string;
    subtopic?: string;
    examType?: string;
  }> {
    const { topic, subtopic, limit = 50, offset = 0, examType } = params;

    // Validate topic and subtopic
    const validationErrors = this.validateParams(topic, subtopic, examType);
    if (validationErrors.length > 0) {
      throw new Error(
        `Validation failed: ${validationErrors
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    try {
      // Ensure database connection
      await connectToDatabase();

      // Build query filter
      //initializing the filter object with topic
      const filter: { topic: string; subtopic?: string; examType?: string } = {
        topic,
      };
      if (examType) {
        filter.examType = examType;
      }
      if (subtopic) {
        filter.subtopic = subtopic;
      }

      // Execute query with pagination
      let questions: Step1QuestionDocument[] | Step2QuestionDocument[] = [];
      let totalCount: number = 0;
      if (examType === "Step-1") {
        questions = await Step1QuestionModel.find(filter)
          .select("-__v") // Exclude version field
          .limit(limit)
          .skip(offset)
          .sort({ created_at: -1 })
          .lean() // Return plain JavaScript objects
          .exec();
        totalCount = await Step1QuestionModel.countDocuments(filter).exec();
      } else {
        questions = await Step2QuestionModel.find(filter)
          .select("-__v") // Exclude version field
          .limit(limit)
          .skip(offset)
          .sort({ created_at: -1 })
          .lean() // Return plain JavaScript objects
          .exec();
        totalCount = await Step2QuestionModel.countDocuments(filter).exec();
      }

      // Transform MongoDB documents to our interface
      //if the question is a step 1 question, return a step 1 question
      const transformedQuestions: MedExamQuestion[] = questions.map((doc) => {
        const question: Step1Question = {
          examType: doc.examType,
          topic: doc.topic,
          subtopic: doc.subtopic,
          question: doc.question,
          choices: doc.choices,
          answer: doc.answer,
          explanation: doc.explanation,
          source: doc.source,
          created_at: doc.created_at,
          embedding: doc.embedding,
        };

        // Check if it's a Step2 question and add additional fields
        if (doc.examType === "Step-2") {
          //TYPE ASSERTION TO STEP 2 DOCUMENT
          const step2Doc = doc as Step2QuestionDocument;
          const step2Question: Step2Question = {
            ...question,
            baseQuestion: step2Doc.baseQuestion,
            patientDetails: step2Doc.patientDetails,
            entireQuestion: step2Doc.entireQuestion,
            shelfSubject: step2Doc.shelfSubject,
          };
          return step2Question;
        }

        // Return base question for Step1
        return question;
      });

      return {
        questions: transformedQuestions,
        count: totalCount,
        topic,
        subtopic,
        examType,
      };
    } catch (error) {
      console.error("Error fetching questions:", error);

      if (
        error instanceof Error &&
        error.message.includes("Validation failed")
      ) {
        throw error;
      }

      throw new Error("Failed to fetch questions from database");
    }
  }

  /**
   * Get question statistics by topic
   */
  static async getQuestionStats(): Promise<{ topic: string; count: number }[]> {
    try {
      await connectToDatabase();

      const stats = await Step1QuestionModel.aggregate([
        {
          $group: {
            _id: "$topic",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            topic: "$_id",
            count: 1,
          },
        },
        {
          $sort: { topic: 1 },
        },
      ]).exec();

      return stats;
    } catch (error) {
      console.error("Error fetching question stats:", error);
      throw new Error("Failed to fetch question statistics");
    }
  }

  /**
   * Health check for the service
   */
  static async healthCheck(): Promise<{ status: string; connected: boolean }> {
    try {
      await connectToDatabase();

      // Simple query to test connection
      await Step1QuestionModel.findOne().limit(1).exec();

      return { status: "healthy", connected: true };
    } catch (error) {
      console.error("Health check failed:", error);
      return { status: "unhealthy", connected: false };
    }
  }
}
