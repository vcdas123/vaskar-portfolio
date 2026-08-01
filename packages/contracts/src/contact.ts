import { z } from 'zod';

/**
 * The contact terminal collects exactly these three answers, one at a time.
 * The same schema validates the Express request body and types the RTK Query
 * mutation argument, so the two can never drift.
 */
export const contactRequestSchema = z.object({
  name: z.string().trim().min(1, 'name is required').max(120, 'name is too long'),
  purpose: z.string().trim().min(1, 'purpose is required').max(200, 'purpose is too long'),
  message: z.string().trim().min(1, 'message is required').max(4000, 'message is too long'),
});

const contactStatusSchema = z.enum(['received', 'reviewed', 'archived']);

export const contactResponseSchema = z.object({
  id: z.string().uuid(),
  status: contactStatusSchema,
  receivedAt: z.string().datetime(),
});

export type ContactRequest = z.infer<typeof contactRequestSchema>;
export type ContactStatus = z.infer<typeof contactStatusSchema>;
export type ContactResponse = z.infer<typeof contactResponseSchema>;

/** The ordered questionnaire steps driving the contact terminal. */
export const CONTACT_STEPS = [
  { key: 'name', prompt: 'name ❯', placeholder: 'Your name' },
  { key: 'purpose', prompt: 'purpose ❯', placeholder: 'Hiring, collaboration, product...' },
  { key: 'message', prompt: 'message ❯', placeholder: 'Write your message' },
] as const satisfies ReadonlyArray<{
  key: keyof ContactRequest;
  prompt: string;
  placeholder: string;
}>;

export type ContactStepKey = (typeof CONTACT_STEPS)[number]['key'];
