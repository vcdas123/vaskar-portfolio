import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import type { CaseStudy, PortfolioPayload, Project } from '@portfolio/contracts';
import { API_BASE_URL } from '../../playwright.config';

const REFERENCE_HTML = resolve(
  import.meta.dirname,
  '../../../../reference/performance-terminal.html',
);
const OUTPUT_HTML = resolve(import.meta.dirname, '../../test-results/reference-live.html');

/**
 * Reference data shapes. The reference page reads two embedded JSON blocks; both
 * are rewritten from the live API so the comparison isolates *rendering*
 * differences instead of re-flagging the copy differences between
 * `portfolio-data.json` (the authoritative seed) and the older snapshot that was
 * inlined into the HTML.
 */
interface ReferencePortfolioData {
  profile: {
    name: string;
    role: string;
    location: string;
    careerStart: string;
    positioning: string;
  };
  metrics: Array<{ label: string; value: string; progress: number }>;
  projects: Array<{
    slug: string;
    title: string;
    file: string;
    type: string;
    cardDescription: string;
    command: string;
    tech: string[];
    links: Array<{ label: string; url: string; primary: boolean }>;
  }>;
  skills: Array<{ group: string; items: string[] }>;
  experience: Array<{
    code: string;
    role: string;
    company: string;
    period: string;
    summary: string;
  }>;
  education: Array<{ degree: string; institution: string; location: string; year: string }>;
  contacts: Array<{ type: string; label: string; url: string }>;
}

type ReferenceCaseStudyData = Record<string, Omit<CaseStudy, 'slug'> & { flow: string[] }>;

/**
 * The reference page's embedded JSON still declares the workspace-era fields even
 * though its markup no longer renders them, so they are filled with harmless
 * placeholders. The API stopped serving them when the workspace was removed.
 */
const toReferenceProject = (project: Project): ReferencePortfolioData['projects'][number] => ({
  slug: project.slug,
  title: project.title,
  file: project.file,
  type: project.type,
  cardDescription: project.cardDescription,
  command: project.command,
  tech: project.tech,
  links: project.links,
});

const fetchJson = async <TData>(url: string): Promise<TData> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`GET ${url} failed with ${response.status}`);
  }
  const body = (await response.json()) as { ok: boolean; data: TData };
  if (!body.ok) {
    throw new Error(`GET ${url} returned an error envelope`);
  }
  return body.data;
};

/**
 * Replaces the body of `<script type="application/json" id="…">` in place,
 * leaving every byte of markup, CSS and behaviour script untouched.
 */
const replaceJsonBlock = (html: string, id: string, payload: unknown): string => {
  const pattern = new RegExp(
    `(<script type="application/json" id="${id}">)([\\s\\S]*?)(</script>)`,
  );
  if (!pattern.test(html)) {
    throw new Error(`Reference HTML has no JSON block with id="${id}"`);
  }
  // `</script>` cannot appear inside a script element; JSON.stringify output is
  // escaped defensively in case seeded copy ever contains it.
  const json = JSON.stringify(payload).replace(/<\//g, '<\\/');
  return html.replace(pattern, `$1${json}$3`);
};

/**
 * Writes a copy of the reference page driven by the seeded database, and returns
 * its `file://` URL. This is the baseline every screenshot test compares against.
 */
export const buildReferencePage = async (): Promise<string> => {
  const portfolio = await fetchJson<PortfolioPayload>(`${API_BASE_URL}/portfolio`);

  const caseStudies: ReferenceCaseStudyData = {};
  for (const project of portfolio.projects) {
    const study = await fetchJson<CaseStudy>(`${API_BASE_URL}/projects/${project.slug}/case-study`);
    caseStudies[project.slug] = {
      problem: study.problem,
      constraints: study.constraints,
      decisions: study.decisions,
      implementation: study.implementation,
      outcome: study.outcome,
      why: study.why,
      flow: study.flow,
    };
  }

  const portfolioData: ReferencePortfolioData = {
    profile: {
      name: portfolio.profile.name,
      role: portfolio.profile.role,
      location: portfolio.profile.location,
      careerStart: portfolio.profile.careerStart,
      positioning: portfolio.profile.positioning,
    },
    metrics: portfolio.metrics.map((metric) => ({
      label: metric.label,
      value: metric.value,
      progress: metric.progress,
    })),
    projects: portfolio.projects.map(toReferenceProject),
    skills: portfolio.skills,
    experience: portfolio.experience,
    education: portfolio.education,
    contacts: portfolio.contacts,
  };

  let html = readFileSync(REFERENCE_HTML, 'utf8');
  html = replaceJsonBlock(html, 'portfolio-data', portfolioData);
  html = replaceJsonBlock(html, 'case-study-data', caseStudies);

  mkdirSync(dirname(OUTPUT_HTML), { recursive: true });
  writeFileSync(OUTPUT_HTML, html, 'utf8');

  return pathToFileURL(OUTPUT_HTML).href;
};
