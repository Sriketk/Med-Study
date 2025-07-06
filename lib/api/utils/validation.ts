/**
 * Validation utilities for API endpoints and data processing
 */

/**
 * Check if a value is a valid positive integer
 */
export function isValidPositiveInteger(value: string | null): boolean {
  if (!value) return false;
  const num = parseInt(value, 10);
  return !isNaN(num) && num > 0;
}

/**
 * Check if a value is a valid non-negative integer
 */
export function isValidNonNegativeInteger(value: string | null): boolean {
  if (!value) return false;
  const num = parseInt(value, 10);
  return !isNaN(num) && num >= 0;
}

/**
 * Parse and validate a limit parameter
 */
export function parseLimit(
  limitParam: string | null,
  defaultLimit: number = 50,
  maxLimit: number = 100
): number {
  if (!limitParam) return defaultLimit;

  // Converts the limitParam string to a number using base 10
  // For example: "50" becomes the number 50
  const limit = parseInt(limitParam, 10);
  if (isNaN(limit) || limit < 1 || limit > maxLimit) {
    throw new Error(`Limit must be a number between 1 and ${maxLimit}`);
  }

  return limit;
}

/**
 * Parse and validate an offset parameter
 */
export function parseOffset(
  offsetParam: string | null,
  defaultOffset: number = 0
): number {
  if (!offsetParam) return defaultOffset;

  const offset = parseInt(offsetParam, 10);
  if (isNaN(offset) || offset < 0) {
    throw new Error("Offset must be a non-negative number");
  }

  return offset;
}

/**
 * Validate required fields in an object
 */
export function validateRequiredFields(
  data: Record<string, any>,
  requiredFields: string[]
): string[] {
  return requiredFields.filter(
    (field) =>
      data[field] === undefined || data[field] === null || data[field] === ""
  );
}

/**
 * Check if a string is not empty and properly trimmed
 */
export function isValidString(value: any): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Check if a value is a valid array with minimum length
 */
export function isValidArray(
  value: any,
  minLength: number = 1
): value is any[] {
  return Array.isArray(value) && value.length >= minLength;
}

/**
 * Sanitize a string by trimming whitespace
 */
export function sanitizeString(value: string): string {
  return value.trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate MongoDB ObjectId format
 */
export function isValidObjectId(id: string): boolean {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}
