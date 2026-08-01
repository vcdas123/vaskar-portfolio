import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { z, ZodError, ZodTypeAny } from 'zod';
import { HttpError } from '../lib/http-error';

const toDetails = (error: ZodError) =>
  error.issues.map((issue) => ({
    path: issue.path.join('.') || '(root)',
    message: issue.message,
  }));

/**
 * Validates and replaces `req.body` with the parsed value, so controllers only
 * ever see data that satisfies the shared contract.
 */
export const validateBody =
  <TSchema extends ZodTypeAny>(schema: TSchema): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      next(HttpError.validation('Request body failed validation', toDetails(result.error)));
      return;
    }
    req.body = result.data as z.infer<TSchema>;
    next();
  };

/** Validates route parameters without mutating Express internals. */
export const validateParams =
  <TSchema extends ZodTypeAny>(schema: TSchema): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      next(HttpError.validation('Request parameters failed validation', toDetails(result.error)));
      return;
    }
    next();
  };
