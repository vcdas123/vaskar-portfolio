import type { NextFunction, Request, RequestHandler, Response } from 'express';

/**
 * Express 4 does not forward rejected promises to error middleware; this wrapper
 * makes every async controller safe by construction.
 */
export const asyncHandler =
  (
    handler: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
  ): RequestHandler =>
  (req, res, next) => {
    handler(req, res, next).catch(next);
  };
