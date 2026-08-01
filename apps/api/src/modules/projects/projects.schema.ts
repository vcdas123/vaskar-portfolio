import { z } from 'zod';
import { slugSchema } from '@portfolio/contracts';

export const projectParamsSchema = z.object({
  slug: slugSchema,
});

export type ProjectParams = z.infer<typeof projectParamsSchema>;
