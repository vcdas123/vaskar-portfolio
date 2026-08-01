import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import {
  displayString,
  hexColorSchema,
  isoDateSchema,
  linkUrlSchema,
  slugSchema,
} from '@portfolio/contracts';

/**
 * `reference/portfolio-data.json` is the authoritative seed dataset. It is
 * validated on load so a malformed edit fails the seed instead of silently
 * writing partial content.
 */
const rawSeedSchema = z.object({
  site: z.object({
    title: displayString,
    headerName: displayString,
    logoText: displayString,
    statusText: displayString,
    theme: z.object({
      source: displayString,
      colors: z.object({
        background: hexColorSchema,
        surface: hexColorSchema,
        text: hexColorSchema,
        primary: hexColorSchema,
        secondary: hexColorSchema,
        warning: hexColorSchema,
        muted: hexColorSchema,
        border: hexColorSchema,
      }),
      fonts: z.object({ body: displayString, mono: displayString }),
    }),
  }),
  profile: z.object({
    name: displayString,
    role: displayString,
    location: displayString,
    careerStart: isoDateSchema,
    positioning: displayString,
  }),
  metrics: z
    .array(
      z.object({
        key: displayString,
        label: displayString,
        value: displayString,
        progress: z.number().int().min(0).max(100),
      }),
    )
    .min(1),
  projects: z
    .array(
      z.object({
        slug: slugSchema,
        title: displayString,
        file: displayString,
        type: displayString,
        cardDescription: displayString,
        command: displayString,
        tech: z.array(displayString).min(1),
        links: z
          .array(z.object({ label: displayString, url: linkUrlSchema, primary: z.boolean() }))
          .min(1),
      }),
    )
    .min(1),
  skills: z.array(z.object({ group: displayString, items: z.array(displayString).min(1) })).min(1),
  experience: z
    .array(
      z.object({
        code: displayString,
        role: displayString,
        company: displayString,
        period: displayString,
        summary: displayString,
      }),
    )
    .min(1),
  education: z
    .array(
      z.object({
        degree: displayString,
        institution: displayString,
        location: displayString,
        year: displayString,
      }),
    )
    .min(1),
  contacts: z
    .array(z.object({ type: displayString, label: displayString, url: linkUrlSchema }))
    .min(1),
  caseStudies: z.record(
    z.object({
      problem: displayString,
      constraints: z.array(displayString).min(1),
      decisions: z.array(displayString).min(1),
      implementation: z.array(displayString).min(1),
      outcome: displayString,
      why: displayString,
      flow: z.array(displayString).min(1),
    }),
  ),
});

export type RawSeed = z.infer<typeof rawSeedSchema>;

export const SEED_FILE = path.resolve(__dirname, '../../../reference/portfolio-data.json');

export const loadSeed = (file: string = SEED_FILE): RawSeed => {
  const contents = fs.readFileSync(file, 'utf8');
  return rawSeedSchema.parse(JSON.parse(contents) as unknown);
};

// ---------------------------------------------------------------------------
// Reference-exact chrome that lives in the HTML markup rather than the dataset
// ---------------------------------------------------------------------------

/**
 * The boot terminal prints shortened bar labels ("query latency") and unsigned
 * values ("40%") while the benchmark strip prints the dataset label and signed
 * value. Both are stored so the UI never has to guess.
 */
export const TERMINAL_LABEL_OVERRIDES: Readonly<Record<string, string>> = {
  api: 'API response',
  query: 'query latency',
  load: 'load time',
  render: 'render time',
};

/** `-45%` → `45%` for the boot terminal's right-hand column. */
export const toTerminalValue = (value: string): string => value.replace(/^[+-]/, '');

export const terminalLabelFor = (key: string, label: string): string =>
  TERMINAL_LABEL_OVERRIDES[key] ?? label;

/**
 * Owner-requested override of `site.title` from the dataset ("Vaskar Das —
 * Performance Terminal"). The browser tab shows the short first name.
 * Keep `apps/web/index.html`'s static <title> in sync with this value.
 */
export const SITE_TITLE = 'Vaskar — Performance Terminal';

/**
 * Note rendered beneath the contact terminal.
 *
 * The reference carried a "DEMO MODE … replace the adapter with POST /api/contact"
 * disclaimer, which is obsolete now that submissions really are persisted through
 * that endpoint. Left empty so no note renders; set a string here and re-seed to
 * reinstate one.
 */
export const CONTACT_NOTE = '';

/** `© 2026 VASKAR DAS` in the reference footer. */
export const FOOTER_YEAR = 2026;

/**
 * Owner-requested overrides of `site.theme.colors`.
 *
 * The browser gets its colours from `apps/web/src/styles/tokens.ts`, which must be
 * known at build time for the Mantine theme and the Tailwind aliases. These values
 * keep the API's advertised theme in agreement with it, so the payload never
 * describes a colour the app does not actually paint.
 * `apps/api/tests/portfolio.test.ts` asserts they stay in sync.
 */
export const THEME_COLOR_OVERRIDES: Readonly<Record<string, string>> = {
  // Dimmed: every panel and section divider in the design is outlined.
  border: '#1a1e1c',
};

export const themeColor = (name: string, value: string): string =>
  THEME_COLOR_OVERRIDES[name] ?? value;
