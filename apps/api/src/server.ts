import type { Server } from 'node:http';
import { createApp } from './app';
import { env } from './config/env';
import { logger } from './lib/logger';
import { connectDatabase, disconnectDatabase } from './lib/prisma';

const SHUTDOWN_TIMEOUT_MS = 10_000;

const start = async (): Promise<void> => {
  await connectDatabase();

  const app = createApp();
  const server: Server = app.listen(env.PORT, env.HOST, () => {
    logger.info({ port: env.PORT, host: env.HOST, env: env.NODE_ENV }, 'portfolio api listening');
  });

  let shuttingDown = false;

  const shutdown = async (signal: string): Promise<void> => {
    if (shuttingDown) return;
    shuttingDown = true;
    logger.info({ signal }, 'graceful shutdown started');

    // Stop accepting connections, then release the database pool. If sockets
    // linger past the deadline, exit non-zero rather than hang forever.
    const forceExit = setTimeout(() => {
      logger.error('graceful shutdown timed out — forcing exit');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    forceExit.unref();

    await new Promise<void>((resolve) => {
      server.close(() => resolve());
    });

    await disconnectDatabase();
    clearTimeout(forceExit);
    logger.info('graceful shutdown complete');
    process.exit(0);
  };

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.on(signal, () => {
      void shutdown(signal);
    });
  }

  process.on('unhandledRejection', (reason) => {
    logger.error({ err: reason }, 'unhandled promise rejection');
  });

  process.on('uncaughtException', (error) => {
    logger.fatal({ err: error }, 'uncaught exception — shutting down');
    void shutdown('uncaughtException');
  });
};

start().catch((error: unknown) => {
  logger.fatal({ err: error }, 'failed to start portfolio api');
  process.exit(1);
});
