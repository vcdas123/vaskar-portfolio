import { Router } from 'express';
import type { HealthResponse } from '@portfolio/contracts';
import { asyncHandler } from '../../lib/async-handler';
import { checkDatabase } from '../../lib/prisma';
import { success } from '../../lib/respond';

export const healthRouter = Router();

healthRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    const databaseUp = await checkDatabase();
    const payload: HealthResponse = {
      status: databaseUp ? 'ok' : 'degraded',
      uptimeSeconds: Number(process.uptime().toFixed(3)),
      database: databaseUp ? 'up' : 'down',
      timestamp: new Date().toISOString(),
    };
    // A degraded service must not report 200 to orchestrators.
    success(res, payload, databaseUp ? 200 : 503);
  }),
);
