import type { IncomingMessage, ServerResponse } from 'node:http';
import { createApp } from '../apps/api/src/app';

/**
 * Vercel serverless entry point for the whole API.
 *
 * This lives at the repository root because Vercel discovers functions in the
 * project's top-level `api/` directory, and the deployment is a single project
 * rooted here — the site and the API share one origin, so the browser calls
 * `/api/...` with no CORS involved.
 *
 * `apps/api/src/server.ts` remains the long-running entry for local development
 * and any non-serverless host: it binds a port and installs signal handlers. Here
 * the platform owns the lifecycle, so the Express app is exported directly. It is
 * constructed once per cold start and reused across invocations on that instance.
 *
 * `apps/api/src/lib/prisma.ts` caches the client on `globalThis` outside
 * production; in production each instance holds its own, so `DATABASE_URL` must be
 * a pooled connection string (Neon's `-pooler` host) rather than a direct one.
 */
const app = createApp();

export default function handler(req: IncomingMessage, res: ServerResponse): void {
  app(req, res);
}
