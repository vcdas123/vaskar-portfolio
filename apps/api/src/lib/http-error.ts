import { API_ERROR_CODES, type ApiErrorCode } from '@portfolio/contracts';

export interface HttpErrorDetail {
  path: string;
  message: string;
}

/**
 * The only error type the API serialises to clients. Anything else is treated
 * as an internal fault and reported as a generic 500 with no internals.
 */
export class HttpError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly details?: HttpErrorDetail[];

  constructor(status: number, code: ApiErrorCode, message: string, details?: HttpErrorDetail[]) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.code = code;
    if (details && details.length > 0) {
      this.details = details;
    }
    Error.captureStackTrace?.(this, HttpError);
  }

  static notFound(message = 'Resource not found'): HttpError {
    return new HttpError(404, API_ERROR_CODES.notFound, message);
  }

  static validation(message: string, details?: HttpErrorDetail[]): HttpError {
    return new HttpError(422, API_ERROR_CODES.validationFailed, message, details);
  }

  static internal(message = 'Something went wrong'): HttpError {
    return new HttpError(500, API_ERROR_CODES.internal, message);
  }
}

export const isHttpError = (error: unknown): error is HttpError => error instanceof HttpError;
