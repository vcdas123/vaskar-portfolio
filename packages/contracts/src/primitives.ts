import { z } from 'zod';

/** A non-empty, trimmed display string. */
export const displayString = z.string().trim().min(1);

/** Slug used in project routes: `cachiva`, `discovery`, `myhistory`. */
export const slugSchema = z
  .string()
  .trim()
  .min(1)
  .max(64)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be a lowercase, dash-separated slug');

/** Absolute http(s) URL, or a `mailto:` / `tel:` link. */
export const linkUrlSchema = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine(
    (value) => /^(https?:\/\/|mailto:|tel:)/i.test(value),
    'Must be an http(s), mailto: or tel: URL',
  );

/** Hex colour token, e.g. `#b7ff55`. */
export const hexColorSchema = z
  .string()
  .trim()
  .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Must be a hex colour');

/** ISO calendar date (`YYYY-MM-DD`). */
export const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Must be an ISO date (YYYY-MM-DD)');
