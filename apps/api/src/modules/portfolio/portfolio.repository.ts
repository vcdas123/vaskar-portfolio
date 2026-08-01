import type { Prisma } from '../../lib/prisma';
import { prisma } from '../../lib/prisma';

export const SINGLETON_ID = 'singleton';

const byPosition = { position: 'asc' } as const;

export const projectInclude = {
  tech: { orderBy: byPosition },
  links: { orderBy: byPosition },
  architecture: { orderBy: byPosition },
  logs: { orderBy: byPosition },
} as const;

/**
 * Data access for the aggregate page payload. All reads go through Prisma's
 * parameterised query builder — no string-interpolated SQL anywhere.
 */
export class PortfolioRepository {
  constructor(private readonly db: Prisma = prisma) {}

  findSiteSetting() {
    return this.db.siteSetting.findUnique({ where: { id: SINGLETON_ID } });
  }

  findProfile() {
    return this.db.profile.findUnique({ where: { id: SINGLETON_ID } });
  }

  findMetrics() {
    return this.db.metric.findMany({ orderBy: byPosition });
  }

  findProjects() {
    return this.db.project.findMany({ orderBy: byPosition, include: projectInclude });
  }

  findSkillGroups() {
    return this.db.skillGroup.findMany({
      orderBy: byPosition,
      include: { items: { orderBy: byPosition } },
    });
  }

  findExperience() {
    return this.db.experience.findMany({ orderBy: byPosition });
  }

  findEducation() {
    return this.db.education.findMany({ orderBy: byPosition });
  }

  findContactChannels() {
    return this.db.contactChannel.findMany({ orderBy: byPosition });
  }
}

export const portfolioRepository = new PortfolioRepository();
