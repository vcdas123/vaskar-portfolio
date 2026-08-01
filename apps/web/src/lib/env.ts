import { z } from 'zod';

/**
 * Client environment is validated once at module load, like the API's.
 *
 * The base URL is either absolute (`http://localhost:4100/api`, or a separately
 * hosted API) or root-relative (`/api`) when the API is served from the same
 * origin as the site — which is how the Vercel deployment is wired.
 */
const apiBaseUrlSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => value.startsWith('/') || /^https?:\/\//i.test(value),
    'Must be an absolute http(s) URL or a root-relative path such as /api',
  );

const clientEnvSchema = z.object({
  VITE_API_BASE_URL: apiBaseUrlSchema.default('http://localhost:4100/api'),
});

const parsed = clientEnvSchema.safeParse({
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid web environment configuration: ${parsed.error.issues
      .map((issue) => `${issue.path.join('.')} ${issue.message}`)
      .join(', ')}`,
  );
}

export const clientEnv = Object.freeze(parsed.data);
