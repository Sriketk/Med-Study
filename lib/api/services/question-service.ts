import { connectToDatabase } from "@/lib/api/mongo/mongodb";
import {
  QbankQuestionModel,
  QbankQuestionDocument,
} from "@/lib/api/schemas/question";
import { QbankQuestion, GetQuestionsParams, ValidationError } from "@/types";
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
    questions: QbankQuestion[];
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
      const [questions, totalCount] = await Promise.all([
        QbankQuestionModel.find(filter)
          .select("-__v") // Exclude version field
          .limit(limit)
          .skip(offset)
          .sort({ created_at: -1 })
          .lean() // Return plain JavaScript objects
          .exec(),
        QbankQuestionModel.countDocuments(filter).exec(),
      ]);

      // Transform MongoDB documents to our interface
      const transformedQuestions: QbankQuestion[] = questions.map((doc) => ({
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
      }));

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

      const stats = await QbankQuestionModel.aggregate([
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
      await QbankQuestionModel.findOne().limit(1).exec();

      return { status: "healthy", connected: true };
    } catch (error) {
      console.error("Health check failed:", error);
      return { status: "unhealthy", connected: false };
    }
  }
}
