import { z } from 'zod';

/**
 * Client environment, validated once at module load like the API's.
 *
 * The base URL is either absolute (a separately hosted API) or root-relative
 * (`/api`) when the API is served from the same origin as the site.
 *
 * The default is environment-aware, and deliberately so: a single default of
 * `http://localhost:4100/api` would be baked into a production bundle whenever
 * `VITE_API_BASE_URL` was missing from the deployment, and the browser would then
 * report the cross-origin call to localhost as a CORS failure — a confusing
 * symptom for a simple configuration mistake. In a production build the default is
 * `/api`, which is the shape the deployment actually uses, so the correct thing
 * happens with no configuration at all.
 */
const DEV_DEFAULT_API_BASE_URL = 'http://localhost:4100/api';
const PROD_DEFAULT_API_BASE_URL = '/api';

const apiBaseUrlSchema = z
  .string()
  .trim()
  .min(1)
  .refine(
    (value) => value.startsWith('/') || /^https?:\/\//i.test(value),
    'Must be an absolute http(s) URL or a root-relative path such as /api',
  );

const clientEnvSchema = z.object({
  VITE_API_BASE_URL: apiBaseUrlSchema.default(
    import.meta.env.PROD ? PROD_DEFAULT_API_BASE_URL : DEV_DEFAULT_API_BASE_URL,
  ),
});

const parsed = clientEnvSchema.safeParse({
  // An empty string counts as unset, so a blank dashboard field falls back to the
  // default rather than failing the `min(1)` check.
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || undefined,
});

if (!parsed.success) {
  throw new Error(
    `Invalid web environment configuration: ${parsed.error.issues
      .map((issue) => `${issue.path.join('.')} ${issue.message}`)
      .join(', ')}`,
  );
}

export const clientEnv = Object.freeze(parsed.data);
