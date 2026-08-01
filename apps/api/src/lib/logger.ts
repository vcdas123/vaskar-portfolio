import pino from 'pino';
import { env, isProduction } from '../config/env';

/**
 * `pino-pretty` is a dev dependency, so it is absent from a production install and
 * from the serverless function bundle. Requesting it there would throw at module
 * load and take the whole API down, so it is only used when it can actually be
 * resolved — otherwise pino falls back to its default JSON output, which is what a
 * log aggregator wants anyway.
 */
const prettyTransport = (): pino.TransportSingleOptions | undefined => {
  if (isProduction) {
    return undefined;
  }
  try {
    require.resolve('pino-pretty');
    return { target: 'pino-pretty', options: { colorize: true, translateTime: 'HH:MM:ss' } };
  } catch {
    return undefined;
  }
};

const transport = prettyTransport();

export const logger = pino({
  level: env.LOG_LEVEL,
  base: { service: 'portfolio-api' },
  redact: {
    // Never let credentials or personal contact copy reach the log stream.
    paths: ['req.headers.authorization', 'req.headers.cookie', 'req.body.message'],
    remove: true,
  },
  ...(transport ? { transport } : {}),
});

export type Logger = typeof logger;
