import type {
  ContactChannel as ContactChannelRow,
  Education as EducationRow,
  Experience as ExperienceRow,
  Metric as MetricRow,
  Profile as ProfileRow,
  Project as ProjectRow,
  ProjectLink as ProjectLinkRow,
  ProjectTech,
  SiteSetting,
  SkillGroup as SkillGroupRow,
  SkillItem,
} from '@prisma/client';
import type {
  ContactChannel,
  Education,
  Experience,
  Metric,
  Profile,
  Project,
  Site,
  SkillGroup,
} from '@portfolio/contracts';

export type ProjectWithRelations = ProjectRow & {
  tech: ProjectTech[];
  links: ProjectLinkRow[];
};

export type SkillGroupWithItems = SkillGroupRow & { items: SkillItem[] };

/** `2023-04-01T00:00:00.000Z` (a `@db.Date`) → `2023-04-01`. */
const toIsoDate = (value: Date): string => value.toISOString().slice(0, 10);

export const toSite = (row: SiteSetting): Site => ({
  title: row.title,
  headerName: row.headerName,
  logoText: row.logoText,
  statusText: row.statusText,
  contactNote: row.contactNote,
  footerYear: row.footerYear,
  theme: {
    source: row.themeSource,
    colors: {
      background: row.colorBackground,
      surface: row.colorSurface,
      text: row.colorText,
      primary: row.colorPrimary,
      secondary: row.colorSecondary,
      warning: row.colorWarning,
      muted: row.colorMuted,
      border: row.colorBorder,
    },
    fonts: { body: row.fontBody, mono: row.fontMono },
  },
});

export const toProfile = (row: ProfileRow): Profile => ({
  name: row.name,
  role: row.role,
  location: row.location,
  careerStart: toIsoDate(row.careerStart),
  positioning: row.positioning,
});

export const toMetric = (row: MetricRow): Metric => ({
  key: row.key,
  label: row.label,
  terminalLabel: row.terminalLabel,
  value: row.value,
  terminalValue: row.terminalValue,
  progress: row.progress,
});

export const toProject = (row: ProjectWithRelations): Project => ({
  slug: row.slug,
  title: row.title,
  file: row.file,
  type: row.type,
  cardDescription: row.cardDescription,
  command: row.command,
  tech: row.tech.map((entry) => entry.label),
  links: row.links.map((link) => ({ label: link.label, url: link.url, primary: link.primary })),
});

export const toSkillGroup = (row: SkillGroupWithItems): SkillGroup => ({
  group: row.name,
  items: row.items.map((item) => item.label),
});

export const toExperience = (row: ExperienceRow): Experience => ({
  code: row.code,
  role: row.role,
  company: row.company,
  period: row.period,
  summary: row.summary,
});

export const toEducation = (row: EducationRow): Education => ({
  degree: row.degree,
  institution: row.institution,
  location: row.location,
  year: row.year,
});

export const toContactChannel = (row: ContactChannelRow): ContactChannel => ({
  type: row.type,
  label: row.label,
  url: row.url,
});
