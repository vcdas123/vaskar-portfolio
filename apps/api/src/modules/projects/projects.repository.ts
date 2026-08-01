import type { Prisma } from '../../lib/prisma';
import { prisma } from '../../lib/prisma';
import { projectInclude } from '../portfolio/portfolio.repository';

export class ProjectsRepository {
  constructor(private readonly db: Prisma = prisma) {}

  findAll() {
    return this.db.project.findMany({ orderBy: { position: 'asc' }, include: projectInclude });
  }

  findBySlug(slug: string) {
    return this.db.project.findUnique({ where: { slug }, include: projectInclude });
  }
}

export const projectsRepository = new ProjectsRepository();
