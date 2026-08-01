import pino from 'pino';
import { env, isProduction } from '../config/env';

export const logger = pino({
  level: env.LOG_LEVEL,
  base: { service: 'portfolio-api' },
  redact: {
    // Never let credentials or personal contact copy reach the log stream.
    paths: ['req.headers.authorization', 'req.headers.cookie', 'req.body.message'],
    remove: true,
  },
  ...(isProduction
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'HH:MM:ss' },
        },
      }),
});

export type Logger = typeof logger;
