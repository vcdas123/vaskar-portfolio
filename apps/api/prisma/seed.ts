import { CaseStudyListKind, PrismaClient } from '@prisma/client';
import {
  CONTACT_NOTE,
  FOOTER_YEAR,
  SITE_TITLE,
  themeColor,
  loadSeed,
  terminalLabelFor,
  toTerminalValue,
  type RawSeed,
} from './seed-data';

const prisma = new PrismaClient();
const SINGLETON_ID = 'singleton';

/**
 * Idempotent seed: content tables are cleared and rewritten from the dataset,
 * while `contact_submissions` (real user data) is never touched.
 */
const clearContent = async (): Promise<void> => {
  // Cascades handle children, but deleting explicitly keeps intent obvious.
  await prisma.$transaction([
    prisma.caseStudyFlowNode.deleteMany(),
    prisma.caseStudyListItem.deleteMany(),
    prisma.caseStudy.deleteMany(),
    prisma.buildLog.deleteMany(),
    prisma.architectureEntry.deleteMany(),
    prisma.projectLink.deleteMany(),
    prisma.projectTech.deleteMany(),
    prisma.project.deleteMany(),
    prisma.skillItem.deleteMany(),
    prisma.skillGroup.deleteMany(),
    prisma.metric.deleteMany(),
    prisma.experience.deleteMany(),
    prisma.education.deleteMany(),
    prisma.contactChannel.deleteMany(),
  ]);
};

const seedSite = async (seed: RawSeed): Promise<void> => {
  const { site } = seed;
  const data = {
    title: SITE_TITLE,
    headerName: site.headerName,
    logoText: site.logoText,
    statusText: site.statusText,
    contactNote: CONTACT_NOTE,
    footerYear: FOOTER_YEAR,
    themeSource: site.theme.source,
    colorBackground: themeColor('background', site.theme.colors.background),
    colorSurface: themeColor('surface', site.theme.colors.surface),
    colorText: themeColor('text', site.theme.colors.text),
    colorPrimary: themeColor('primary', site.theme.colors.primary),
    colorSecondary: themeColor('secondary', site.theme.colors.secondary),
    colorWarning: themeColor('warning', site.theme.colors.warning),
    colorMuted: themeColor('muted', site.theme.colors.muted),
    colorBorder: themeColor('border', site.theme.colors.border),
    fontBody: site.theme.fonts.body,
    fontMono: site.theme.fonts.mono,
  };

  await prisma.siteSetting.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
};

const seedProfile = async (seed: RawSeed): Promise<void> => {
  const { profile } = seed;
  const data = {
    name: profile.name,
    role: profile.role,
    location: profile.location,
    careerStart: new Date(`${profile.careerStart}T00:00:00.000Z`),
    positioning: profile.positioning,
  };

  await prisma.profile.upsert({
    where: { id: SINGLETON_ID },
    create: { id: SINGLETON_ID, ...data },
    update: data,
  });
};

const seedMetrics = async (seed: RawSeed): Promise<void> => {
  await prisma.metric.createMany({
    data: seed.metrics.map((metric, position) => ({
      key: metric.key,
      label: metric.label,
      terminalLabel: terminalLabelFor(metric.key, metric.label),
      value: metric.value,
      terminalValue: toTerminalValue(metric.value),
      progress: metric.progress,
      position,
    })),
  });
};

const seedProjects = async (seed: RawSeed): Promise<void> => {
  for (const [position, project] of seed.projects.entries()) {
    const study = seed.caseStudies[project.slug];

    await prisma.project.create({
      data: {
        slug: project.slug,
        title: project.title,
        file: project.file,
        type: project.type,
        description: project.description,
        cardDescription: project.cardDescription,
        command: project.command,
        metric: project.metric,
        outcome: project.outcome,
        position,
        tech: {
          create: project.tech.map((label, index) => ({ label, position: index })),
        },
        links: {
          create: project.links.map((link, index) => ({
            label: link.label,
            url: link.url,
            primary: link.primary,
            position: index,
          })),
        },
        architecture: {
          // Object key order in the dataset is the rendered line order.
          create: Object.entries(project.architecture).map(([key, value], index) => ({
            key,
            value,
            position: index,
          })),
        },
        logs: {
          create: project.logs.map((message, index) => ({ message, position: index })),
        },
        ...(study
          ? {
              caseStudy: {
                create: {
                  problem: study.problem,
                  outcome: study.outcome,
                  why: study.why,
                  lists: {
                    create: [
                      ...study.constraints.map((text, index) => ({
                        kind: CaseStudyListKind.CONSTRAINT,
                        text,
                        position: index,
                      })),
                      ...study.decisions.map((text, index) => ({
                        kind: CaseStudyListKind.DECISION,
                        text,
                        position: index,
                      })),
                      ...study.implementation.map((text, index) => ({
                        kind: CaseStudyListKind.IMPLEMENTATION,
                        text,
                        position: index,
                      })),
                    ],
                  },
                  flow: {
                    create: study.flow.map((label, index) => ({ label, position: index })),
                  },
                },
              },
            }
          : {}),
      },
    });
  }
};

const seedSkills = async (seed: RawSeed): Promise<void> => {
  for (const [position, group] of seed.skills.entries()) {
    await prisma.skillGroup.create({
      data: {
        name: group.group,
        position,
        items: { create: group.items.map((label, index) => ({ label, position: index })) },
      },
    });
  }
};

const seedRemaining = async (seed: RawSeed): Promise<void> => {
  await prisma.experience.createMany({
    data: seed.experience.map((entry, position) => ({ ...entry, position })),
  });
  await prisma.education.createMany({
    data: seed.education.map((entry, position) => ({ ...entry, position })),
  });
  await prisma.contactChannel.createMany({
    data: seed.contacts.map((entry, position) => ({ ...entry, position })),
  });
};

const main = async (): Promise<void> => {
  const seed = loadSeed();

  const missingStudies = seed.projects
    .map((project) => project.slug)
    .filter((slug) => !seed.caseStudies[slug]);
  if (missingStudies.length > 0) {
    throw new Error(`Dataset is missing case studies for: ${missingStudies.join(', ')}`);
  }

  await clearContent();
  await seedSite(seed);
  await seedProfile(seed);
  await seedMetrics(seed);
  await seedProjects(seed);
  await seedSkills(seed);
  await seedRemaining(seed);

  const counts = {
    metrics: await prisma.metric.count(),
    projects: await prisma.project.count(),
    caseStudies: await prisma.caseStudy.count(),
    skillGroups: await prisma.skillGroup.count(),
    skillItems: await prisma.skillItem.count(),
    experience: await prisma.experience.count(),
    education: await prisma.education.count(),
    contactChannels: await prisma.contactChannel.count(),
  };

  console.log('Seed complete:', counts);
};

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
