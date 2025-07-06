import { NextRequest, NextResponse } from "next/server";
import { QuestionService } from "@/lib/api/services/question-service";
import { QuestionsApiResponse, GetQuestionsParams, ApiError } from "@/types";
import {
  parseLimit,
  parseOffset,
  validateRequiredFields,
} from "@/lib/api/utils/validation";
import { handleApiError, createErrorResponse } from "@/lib/api/utils/errors";

/**
 * GET /api/questions
 *
 * Retrieves questions based on topic and optional subtopic
 *
 * Query Parameters:
 * - topic (required): The medical topic
 * - subtopic (optional): Specific subtopic within the topic
 * - limit (optional): Number of questions to return (default: 50, max: 100)
 * - offset (optional): Number of questions to skip (default: 0)
 *
 * Example: /api/questions?topic=Cardiovascular&subtopic=Heart%20Disease&limit=10
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ exam: string }> }
): Promise<NextResponse> {
  try {
    // Extract query parameters
    const exam = (await params).exam;
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");
    const subtopic = searchParams.get("subtopic");
    const limitParam = searchParams.get("limit");
    const offsetParam = searchParams.get("offset");

    // Validate required parameters
    if (!exam) {
      return createErrorResponse(
        "Missing required parameter",
        "Exam parameter is required",
        400
      );
    }
    if (!topic) {
      return createErrorResponse(
        "Missing required parameter",
        "Topic parameter is required",
        400
      );
    }

    // Parse and validate optional parameters using utilities
    // making sure the limit is a number between 1 and 100
    const limit = parseLimit(limitParam);
    const offset = parseOffset(offsetParam);

    // Prepare parameters for service
    const questionParams: GetQuestionsParams = {
      topic,
      limit,
      offset,
    };

    if (subtopic) {
      questionParams.subtopic = subtopic;
    }

    if (exam) {
      questionParams.examType = exam;
    }

    // Call service to get questions
    const result = await QuestionService.getQuestions(questionParams);

    // Format successful response
    const response: QuestionsApiResponse = {
      success: true,
      data: result.questions,
      count: result.count,
      examType: result.examType,
      topic: result.topic,
      subtopic: result.subtopic,
      message: `Retrieved ${result.questions.length} questions`,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return handleApiError(error, "GET /api/questions");
  }
}

/**
 * OPTIONS /api/questions
 *
 * Handle CORS preflight requests
 */
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
