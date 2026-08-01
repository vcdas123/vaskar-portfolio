import { z } from 'zod';

/**
 * Every API response uses the same envelope so the client can narrow on
 * `ok` without inspecting HTTP status codes twice.
 */
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  /** Field-level validation detail; never contains server internals. */
  details: z.array(z.object({ path: z.string(), message: z.string() })).optional(),
});

export const apiFailureSchema = z.object({
  ok: z.literal(false),
  error: apiErrorSchema,
});

export type ApiError = z.infer<typeof apiErrorSchema>;
export type ApiFailure = z.infer<typeof apiFailureSchema>;
export type ApiSuccess<TData> = { ok: true; data: TData };
export type ApiEnvelope<TData> = ApiSuccess<TData> | ApiFailure;

/** Stable machine-readable error codes returned by the API. */
export const API_ERROR_CODES = {
  validationFailed: 'VALIDATION_FAILED',
  notFound: 'NOT_FOUND',
  forbiddenOrigin: 'FORBIDDEN_ORIGIN',
  rateLimited: 'RATE_LIMITED',
  payloadTooLarge: 'PAYLOAD_TOO_LARGE',
  malformedJson: 'MALFORMED_JSON',
  internal: 'INTERNAL_ERROR',
} as const;

export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
