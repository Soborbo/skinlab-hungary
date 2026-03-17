// src/components/schema/helpers/clean.ts
// Utilities for cleaning schema objects before JSON output

/**
 * Recursively removes undefined, null, empty strings, and empty arrays from an object
 * Ensures clean JSON-LD output without invalid fields
 */
export function clean<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip undefined and null
    if (value === undefined || value === null) continue;

    // Skip empty strings
    if (value === '') continue;

    // Skip empty arrays
    if (Array.isArray(value) && value.length === 0) continue;

    // Recursively clean nested objects (but not arrays)
    if (typeof value === 'object' && !Array.isArray(value)) {
      const cleaned = clean(value as Record<string, unknown>);
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned;
      }
      continue;
    }

    // Clean arrays of objects
    if (Array.isArray(value)) {
      const cleanedArray = value
        .map((item) => {
          if (typeof item === 'object' && item !== null) {
            return clean(item as Record<string, unknown>);
          }
          return item;
        })
        .filter((item) => {
          if (typeof item === 'object' && item !== null) {
            return Object.keys(item).length > 0;
          }
          return item !== undefined && item !== null && item !== '';
        });

      if (cleanedArray.length > 0) {
        result[key] = cleanedArray;
      }
      continue;
    }

    result[key] = value;
  }

  return result as Partial<T>;
}

/**
 * Stringify schema to JSON, with cleaning
 */
export function toJSON(schema: Record<string, unknown>): string {
  return JSON.stringify(clean(schema));
}
