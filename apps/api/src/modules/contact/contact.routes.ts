import { Router } from 'express';
import { contactRequestSchema } from '@portfolio/contracts';
import { asyncHandler } from '../../lib/async-handler';
import { validateBody } from '../../middleware/validate';
import { contactRateLimiter } from '../../middleware/security';
import { submitContact } from './contact.controller';

export const contactRouter = Router();

contactRouter.post(
  '/',
  contactRateLimiter,
  validateBody(contactRequestSchema),
  asyncHandler(submitContact),
);
