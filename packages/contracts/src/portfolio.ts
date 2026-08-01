import { z } from 'zod';
import {
  displayString,
  hexColorSchema,
  isoDateSchema,
  linkUrlSchema,
  slugSchema,
} from './primitives';

// ---------------------------------------------------------------------------
// Site settings + theme
// ---------------------------------------------------------------------------

export const themeColorsSchema = z.object({
  background: hexColorSchema,
  surface: hexColorSchema,
  text: hexColorSchema,
  primary: hexColorSchema,
  secondary: hexColorSchema,
  warning: hexColorSchema,
  muted: hexColorSchema,
  border: hexColorSchema,
});

export const themeFontsSchema = z.object({
  body: displayString,
  mono: displayString,
});

export const siteThemeSchema = z.object({
  source: displayString,
  colors: themeColorsSchema,
  fonts: themeFontsSchema,
});

export const siteSchema = z.object({
  title: displayString,
  headerName: displayString,
  logoText: displayString,
  statusText: displayString,
  /**
   * Optional note rendered under the contact terminal. Empty by default — the
   * terminal omits the element entirely rather than reserving blank space.
   */
  contactNote: z.string().trim(),
  /** Rendered as `© {footerYear} …` in the page footer. */
  footerYear: z.number().int().min(1970).max(9999),
  theme: siteThemeSchema,
});

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export const profileSchema = z.object({
  name: displayString,
  role: displayString,
  location: displayString,
  /** Experience is always derived from this date on the client. */
  careerStart: isoDateSchema,
  positioning: displayString,
});

// ---------------------------------------------------------------------------
// Metrics
// ---------------------------------------------------------------------------

export const metricSchema = z.object({
  key: displayString,
  /** Uppercased for the benchmark strip: `API RESPONSE TIME`. */
  label: displayString,
  /** Verbatim label inside the boot terminal: `API response`. */
  terminalLabel: displayString,
  /** Signed headline value: `-45%`. */
  value: displayString,
  /** Unsigned value shown beside the terminal bar: `45%`. */
  terminalValue: displayString,
  /** Bar fill width as a percentage. */
  progress: z.number().int().min(0).max(100),
});

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projectLinkSchema = z.object({
  label: displayString,
  url: linkUrlSchema,
  primary: z.boolean(),
});

export const architectureEntrySchema = z.object({
  key: displayString,
  value: displayString,
});

export const projectSchema = z.object({
  slug: slugSchema,
  title: displayString,
  /** Explorer/tab filename: `cachiva.ts`. */
  file: displayString,
  type: displayString,
  description: displayString,
  cardDescription: displayString,
  command: displayString,
  tech: z.array(displayString),
  architecture: z.array(architectureEntrySchema),
  logs: z.array(displayString),
  metric: displayString,
  outcome: displayString,
  links: z.array(projectLinkSchema),
});

// ---------------------------------------------------------------------------
// Skills / experience / education / contacts
// ---------------------------------------------------------------------------

export const skillGroupSchema = z.object({
  group: displayString,
  items: z.array(displayString),
});

export const experienceSchema = z.object({
  code: displayString,
  role: displayString,
  company: displayString,
  period: displayString,
  summary: displayString,
});

export const educationSchema = z.object({
  degree: displayString,
  institution: displayString,
  location: displayString,
  year: displayString,
});

export const contactChannelSchema = z.object({
  type: displayString,
  label: displayString,
  url: linkUrlSchema,
});

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export const caseStudySchema = z.object({
  slug: slugSchema,
  problem: displayString,
  constraints: z.array(displayString),
  decisions: z.array(displayString),
  implementation: z.array(displayString),
  outcome: displayString,
  why: displayString,
  flow: z.array(displayString),
});

// ---------------------------------------------------------------------------
// Aggregate page payload
// ---------------------------------------------------------------------------

export const portfolioPayloadSchema = z.object({
  site: siteSchema,
  profile: profileSchema,
  metrics: z.array(metricSchema),
  projects: z.array(projectSchema),
  skills: z.array(skillGroupSchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  contacts: z.array(contactChannelSchema),
});

export type ThemeColors = z.infer<typeof themeColorsSchema>;
export type ThemeFonts = z.infer<typeof themeFontsSchema>;
export type SiteTheme = z.infer<typeof siteThemeSchema>;
export type Site = z.infer<typeof siteSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type ProjectLink = z.infer<typeof projectLinkSchema>;
export type ArchitectureEntry = z.infer<typeof architectureEntrySchema>;
export type Project = z.infer<typeof projectSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type ContactChannel = z.infer<typeof contactChannelSchema>;
export type CaseStudy = z.infer<typeof caseStudySchema>;
export type PortfolioPayload = z.infer<typeof portfolioPayloadSchema>;
