import pinoHttp from 'pino-http';
import { logger } from '../lib/logger';

/** Structured access logging; health checks stay at debug to keep logs readable. */
export const requestLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, error) => {
    if (error || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    if (req.url === '/api/health') return 'debug';
    return 'info';
  },
  customSuccessMessage: (req, res) => `${req.method} ${req.url} ${res.statusCode}`,
  serializers: {
    req: (req) => ({ method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
});
