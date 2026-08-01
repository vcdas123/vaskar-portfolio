import type { CaseStudy, PortfolioPayload, Project } from '@portfolio/contracts';

/** A minimal payload shaped exactly like the API's, for component tests. */
export const projectFixture: Project = {
  slug: 'cachiva',
  title: 'Cachiva',
  file: 'cachiva.ts',
  type: 'Knowledge system',
  cardDescription: 'Structured developer knowledge.',
  command: '$ portfolio open cachiva --case-study',
  tech: ['React', 'Node', 'Prisma'],
  links: [
    { label: 'Live demo', url: 'https://cachiva.vercel.app/', primary: true },
    { label: 'API docs', url: 'https://cachiva-backend.vercel.app/', primary: false },
  ],
};

export const secondProjectFixture: Project = {
  ...projectFixture,
  slug: 'myhistory',
  title: 'MyHistory',
  file: 'myhistory.ts',
  type: 'Private records system',
  links: [{ label: 'Live demo', url: 'https://myhistory-phi.vercel.app/', primary: true }],
};

export const caseStudyFixture: CaseStudy = {
  slug: 'cachiva',
  problem: 'Technical knowledge needed to remain expressive.',
  constraints: ['One content model.', 'Same Markdown interpretation.'],
  decisions: ['Shared markdown package.', 'Layered services.'],
  implementation: ['CodeMirror authoring.', 'PostgreSQL models.'],
  outcome: 'Structured content stays synchronized.',
  why: 'It demonstrates cross-repository contract design.',
  flow: ['CodeMirror author', 'Shared Markdown package', 'Focused reader'],
};

export const portfolioFixture: PortfolioPayload = {
  site: {
    title: 'Vaskar — Performance Terminal',
    headerName: 'VASKAR',
    logoText: '~/VD❯',
    statusText: 'SYSTEM ONLINE',
    contactNote: '',
    footerYear: 2026,
    theme: {
      source: 'mantine',
      colors: {
        background: '#050607',
        surface: '#090c0e',
        text: '#e8ebe4',
        primary: '#b7ff55',
        secondary: '#68ddff',
        warning: '#ff835c',
        muted: '#778078',
        border: '#1a1e1c',
      },
      fonts: { body: 'Inter', mono: 'DM Mono' },
    },
  },
  profile: {
    name: 'Vaskar Chandra Das',
    role: 'SDE I',
    location: 'Kolkata, India',
    careerStart: '2023-04-01',
    positioning: 'I turn complex product ideas into clear, resilient digital systems.',
  },
  metrics: [
    {
      key: 'api',
      label: 'API response time',
      terminalLabel: 'API response',
      value: '-45%',
      terminalValue: '45%',
      progress: 90,
    },
  ],
  projects: [projectFixture, secondProjectFixture],
  skills: [{ group: 'Interface', items: ['React.js · Next.js'] }],
  experience: [
    {
      code: 'a3f2025',
      role: 'SDE I',
      company: 'NowPurchase',
      period: '2025—NOW',
      summary: 'Micro-frontends and API services.',
    },
  ],
  education: [
    {
      degree: 'Master of Computer Applications',
      institution: 'Swami Vivekananda University',
      location: 'Barrackpore, West Bengal',
      year: '2024',
    },
  ],
  contacts: [{ type: 'Email', label: 'vcdas123@gmail.com', url: 'mailto:vcdas123@gmail.com' }],
};
