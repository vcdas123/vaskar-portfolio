import type { ErrorRequestHandler, RequestHandler } from 'express';
import { API_ERROR_CODES } from '@portfolio/contracts';
import { HttpError, isHttpError } from '../lib/http-error';
import { failure } from '../lib/respond';
import { logger } from '../lib/logger';

export const notFoundHandler: RequestHandler = (req, res) => {
  failure(res, 404, {
    code: API_ERROR_CODES.notFound,
    message: `No route matches ${req.method} ${req.originalUrl}`,
  });
};

interface BodyParserError extends Error {
  status?: number;
  statusCode?: number;
  type?: string;
}

const asBodyParserError = (error: unknown): HttpError | null => {
  if (!(error instanceof Error)) return null;
  const candidate = error as BodyParserError;
  const status = candidate.status ?? candidate.statusCode;

  if (candidate.type === 'entity.too.large' || status === 413) {
    return new HttpError(413, API_ERROR_CODES.payloadTooLarge, 'Request body is too large');
  }
  if (candidate.type === 'entity.parse.failed' || (status === 400 && 'body' in candidate)) {
    return new HttpError(400, API_ERROR_CODES.malformedJson, 'Request body is not valid JSON');
  }
  return null;
};

/**
 * Centralised error serialisation. Client-safe `HttpError`s are echoed verbatim;
 * anything else is logged in full and reported as an opaque 500 — no messages,
 * no stack traces, no Prisma internals leave the process.
 */
export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  const normalized = isHttpError(error) ? error : asBodyParserError(error);

  if (normalized) {
    if (normalized.status >= 500) {
      logger.error({ err: error, path: req.originalUrl }, 'request failed');
    } else {
      logger.warn(
        { code: normalized.code, status: normalized.status, path: req.originalUrl },
        'request rejected',
      );
    }
    failure(res, normalized.status, {
      code: normalized.code,
      message: normalized.message,
      ...(normalized.details ? { details: normalized.details } : {}),
    });
    return;
  }

  logger.error({ err: error, path: req.originalUrl }, 'unhandled error');
  failure(res, 500, {
    code: API_ERROR_CODES.internal,
    message: 'Something went wrong',
  });
};
