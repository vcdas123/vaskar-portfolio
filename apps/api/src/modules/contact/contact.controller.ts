import type { Request, Response } from 'express';
import { contactRequestSchema } from '@portfolio/contracts';
import { success } from '../../lib/respond';
import { contactService } from './contact.service';

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  // `validateBody` has already replaced req.body with the parsed value; parsing
  // again here is what gives the controller a typed, non-`any` input.
  const payload = contactRequestSchema.parse(req.body);
  const result = await contactService.submit(payload);
  success(res, result, 201);
};
