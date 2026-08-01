import cors, { type CorsOptions, type CorsRequest } from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import type { RequestHandler } from 'express';
import { API_ERROR_CODES } from '@portfolio/contracts';
import { env, isTest } from '../config/env';
import type { ApiFailure } from '@portfolio/contracts';
import { HttpError } from '../lib/http-error';

const SHARED_CORS_OPTIONS: CorsOptions = {
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86_400,
};

/**
 * The host this request was actually addressed to.
 *
 * Behind Vercel's proxy the public hostname arrives in `x-forwarded-host`, while
 * `host` is the internal one; preferring the forwarded value is what makes the
 * same-origin comparison below correct in a deployment.
 */
const requestHost = (req: CorsRequest): string | undefined => {
  const forwarded = req.headers['x-forwarded-host'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return value ?? req.headers.host;
};

/**
 * Is the browser calling the very origin that served it?
 *
 * This has to be answered dynamically rather than from a configured list.
 * Browsers send an `Origin` header on POST even when the request is same-origin,
 * so a deployment that serves the API and the site together would otherwise have
 * its own form submissions rejected. An allowlist cannot solve it either: every
 * Vercel preview deployment gets a fresh hostname, so the correct origin is not
 * knowable at configuration time — only at request time.
 */
const isSameOrigin = (origin: string, req: CorsRequest): boolean => {
  const host = requestHost(req);
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

export const corsMiddleware = cors((req, callback) => {
  const origin = req.headers.origin;

  // Tooling (curl, server-to-server, Playwright's API requests) sends no Origin.
  if (!origin || isSameOrigin(origin, req) || env.CORS_ORIGINS.includes(origin)) {
    callback(null, { ...SHARED_CORS_OPTIONS, origin: true, credentials: false });
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
});

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
