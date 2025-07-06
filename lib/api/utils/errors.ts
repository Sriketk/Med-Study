import { NextResponse } from "next/server";
import { ApiError, ValidationError } from "@/types";

/**
 * Custom error classes for different types of application errors
 */

export class ValidationErrorClass extends Error {
  public validationErrors: ValidationError[];

  constructor(message: string, validationErrors: ValidationError[] = []) {
    super(message);
    this.name = "ValidationError";
    this.validationErrors = validationErrors;
  }
}

export class DatabaseError extends Error {
  constructor(message: string = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class RateLimitError extends Error {
  constructor(message: string = "Rate limit exceeded") {
    super(message);
    this.name = "RateLimitError";
  }
}

/**
 * Error response generators
 */

export function createErrorResponse(
  error: string,
  details: string,
  status: number = 500,
  validationErrors?: ValidationError[]
): NextResponse {
  const errorResponse: ApiError = {
    error,
    details,
    ...(validationErrors && { validationErrors }),
  };

  return NextResponse.json(errorResponse, {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createValidationErrorResponse(
  message: string,
  validationErrors: ValidationError[] = []
): NextResponse {
  return createErrorResponse(
    "Validation Error",
    message,
    400,
    validationErrors
  );
}

export function createDatabaseErrorResponse(
  message: string = "Database operation failed"
): NextResponse {
  return createErrorResponse("Database Error", message, 503);
}

export function createNotFoundErrorResponse(
  message: string = "Resource not found"
): NextResponse {
  return createErrorResponse("Not Found", message, 404);
}

export function createUnauthorizedErrorResponse(
  message: string = "Unauthorized access"
): NextResponse {
  return createErrorResponse("Unauthorized", message, 401);
}

export function createRateLimitErrorResponse(
  message: string = "Rate limit exceeded"
): NextResponse {
  return createErrorResponse("Rate Limit Exceeded", message, 429);
}

export function createInternalServerErrorResponse(
  message: string = "An unexpected error occurred"
): NextResponse {
  return createErrorResponse("Internal Server Error", message, 500);
}

/**
 * Main error handler for API routes
 */
export function handleApiError(
  error: unknown,
  context: string = "API"
): NextResponse {
  // Log the error for debugging
  console.error(`${context} Error:`, error);

  // Handle custom error types
  if (error instanceof ValidationErrorClass) {
    return createValidationErrorResponse(error.message, error.validationErrors);
  }

  if (error instanceof DatabaseError) {
    return createDatabaseErrorResponse(error.message);
  }

  if (error instanceof NotFoundError) {
    return createNotFoundErrorResponse(error.message);
  }

  if (error instanceof UnauthorizedError) {
    return createUnauthorizedErrorResponse(error.message);
  }

  if (error instanceof RateLimitError) {
    return createRateLimitErrorResponse(error.message);
  }

  // Handle generic Error instances
  if (error instanceof Error) {
    // Check for specific error patterns
    if (error.message.includes("Validation failed")) {
      return createValidationErrorResponse(error.message);
    }

    if (
      error.message.includes("database") ||
      error.message.includes("connection")
    ) {
      return createDatabaseErrorResponse(error.message);
    }

    if (error.message.includes("not found")) {
      return createNotFoundErrorResponse(error.message);
    }

    if (
      error.message.includes("unauthorized") ||
      error.message.includes("forbidden")
    ) {
      return createUnauthorizedErrorResponse(error.message);
    }
  }

  // Default to internal server error
  return createInternalServerErrorResponse();
}

/**
 * Utility function to create validation errors
 */
export function createValidationError(
  field: string,
  message: string
): ValidationError {
  return { field, message };
}

/**
 * Utility function to create multiple validation errors
 */
export function createValidationErrors(
  errors: Array<{ field: string; message: string }>
): ValidationError[] {
  return errors.map(({ field, message }) => ({ field, message }));
}

/**
 * Safe error message extractor
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
}

/**
 * Check if an error is an operational error (safe to expose to client)
 */
export function isOperationalError(error: unknown): boolean {
  return (
    error instanceof ValidationErrorClass ||
    error instanceof NotFoundError ||
    error instanceof UnauthorizedError ||
    error instanceof RateLimitError
  );
}
