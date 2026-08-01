import cors, { type CorsOptions } from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { RequestHandler } from 'express';
import { API_ERROR_CODES } from '@portfolio/contracts';
import { env, isTest } from '../config/env';
import type { ApiFailure } from '@portfolio/contracts';
import { HttpError } from '../lib/http-error';

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    // Same-origin/tooling requests (curl, Playwright fetch) send no Origin.
    if (!origin || env.CORS_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }
    // A disallowed browser origin is a client error, not a server fault — the
    // typed HttpError keeps it a clean 403 instead of an opaque 500.
    callback(
      new HttpError(
        403,
        API_ERROR_CODES.forbiddenOrigin,
        'Origin is not permitted by the CORS policy',
      ),
    );
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86_400,
};

export const corsMiddleware = cors(corsOptions);

export const helmetMiddleware = helmet({
  // The API serves JSON only; a strict default CSP is appropriate.
  contentSecurityPolicy: { useDefaults: true, directives: { 'default-src': ["'none'"] } },
  crossOriginResourcePolicy: { policy: 'cross-origin' },
});

const rateLimitBody: ApiFailure = {
  ok: false,
  error: {
    code: API_ERROR_CODES.rateLimited,
    message: 'Too many submissions from this address. Please try again later.',
  },
};

/** Applied to `POST /api/contact` only; read endpoints stay unthrottled. */
export const contactRateLimiter: RequestHandler = rateLimit({
  windowMs: env.CONTACT_RATE_LIMIT_WINDOW_MS,
  limit: env.CONTACT_RATE_LIMIT_MAX,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skip: () => isTest,
  message: rateLimitBody,
});
