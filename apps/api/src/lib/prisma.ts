import { PrismaClient } from '@prisma/client';
import { env, isProduction } from '../config/env';
import { logger } from './logger';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * A single Prisma client per process. `tsx watch` re-evaluates modules on each
 * change, so the instance is cached on `globalThis` outside production to avoid
 * exhausting Postgres connections.
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: env.DATABASE_URL } },
    log: isProduction ? ['error'] : ['error', 'warn'],
  });

if (!isProduction) {
  globalForPrisma.prisma = prisma;
}

export const connectDatabase = async (): Promise<void> => {
  await prisma.$connect();
  logger.info('database connection established');
};

export const disconnectDatabase = async (): Promise<void> => {
  await prisma.$disconnect();
  logger.info('database connection closed');
};

/** Cheap liveness probe used by `GET /api/health`. */
export const checkDatabase = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    logger.error({ err: error }, 'database health check failed');
    return false;
  }
};

export type Prisma = typeof prisma;
