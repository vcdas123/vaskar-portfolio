import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

// One `.env`, at the repository root, shared by every workspace.
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const csvToArray = (value: string): string[] =>
  value
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65_535).default(4000),
  HOST: z.string().min(1).default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173')
    .transform(csvToArray),
  CONTACT_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900_000),
  CONTACT_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  JSON_BODY_LIMIT: z.string().min(1).default('16kb'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
  // Fail fast and loudly: a mis-configured service must not boot half-working.
  throw new Error(`Invalid API environment configuration:\n${issues}`);
}

export const env = Object.freeze(parsed.data);

export type Env = typeof env;

export const isProduction = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
