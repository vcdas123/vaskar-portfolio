import type { Prisma } from '../../lib/prisma';
import { prisma } from '../../lib/prisma';

const caseStudyInclude = {
  project: { select: { slug: true } },
  lists: { orderBy: { position: 'asc' } },
  flow: { orderBy: { position: 'asc' } },
} as const;

export class CaseStudiesRepository {
  constructor(private readonly db: Prisma = prisma) {}

  findByProjectSlug(slug: string) {
    return this.db.caseStudy.findFirst({
      where: { project: { slug } },
      include: caseStudyInclude,
    });
  }
}

export const caseStudiesRepository = new CaseStudiesRepository();
