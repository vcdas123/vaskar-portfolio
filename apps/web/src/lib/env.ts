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

/**
 * Safety net for a base URL that points at localhost while the page itself is
 * served from somewhere else.
 *
 * That combination is always a misconfiguration — a deployed site cannot reach a
 * developer's machine — and its symptom is a confusing CORS error rather than an
 * obvious "wrong URL". Rather than fail the page, fall back to the same-origin
 * `/api` (which is how the deployment is wired) and say so loudly in the console.
 */
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', '0.0.0.0']);

const resolveApiBaseUrl = (configured: string): string => {
  if (typeof window === 'undefined' || configured.startsWith('/')) {
    return configured;
  }

  let target: URL;
  try {
    target = new URL(configured);
  } catch {
    return configured;
  }

  const pageIsLocal = LOCAL_HOSTS.has(window.location.hostname);
  const targetIsLocal = LOCAL_HOSTS.has(target.hostname);

  if (targetIsLocal && !pageIsLocal) {
    console.warn(
      `[portfolio] VITE_API_BASE_URL is "${configured}", which points at localhost, ` +
        `but this page is served from ${window.location.origin}. ` +
        `Falling back to the same-origin "${PROD_DEFAULT_API_BASE_URL}". ` +
        `Set VITE_API_BASE_URL to "${PROD_DEFAULT_API_BASE_URL}" in your deployment ` +
        `and redeploy — it is inlined at build time, so a change needs a rebuild.`,
    );
    return PROD_DEFAULT_API_BASE_URL;
  }

  return configured;
};

export const clientEnv = Object.freeze({
  ...parsed.data,
  VITE_API_BASE_URL: resolveApiBaseUrl(parsed.data.VITE_API_BASE_URL),
});
