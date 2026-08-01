import express, { type Express } from 'express';
import compression from 'compression';
import { env } from './config/env';
import { apiRouter } from './routes';
import { corsMiddleware, helmetMiddleware } from './middleware/security';
import { requestLogger } from './middleware/request-logger';
import { errorHandler, notFoundHandler } from './middleware/error-handler';

/**
 * Builds the Express application without binding a port, so integration tests
 * can drive it through Supertest directly.
 */
export const createApp = (): Express => {
  const app = express();

  // Behind a proxy the rate limiter needs the real client IP.
  app.set('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(helmetMiddleware);
  app.use(corsMiddleware);
  app.use(compression());
  app.use(requestLogger);
  app.use(express.json({ limit: env.JSON_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: false, limit: env.JSON_BODY_LIMIT }));

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
