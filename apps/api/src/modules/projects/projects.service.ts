import type { Project } from '@portfolio/contracts';
import { HttpError } from '../../lib/http-error';
import { toProject } from '../portfolio/portfolio.mapper';
import type { ProjectsRepository } from './projects.repository';
import { projectsRepository } from './projects.repository';

export class ProjectsService {
  constructor(private readonly repository: ProjectsRepository = projectsRepository) {}

  async listProjects(): Promise<Project[]> {
    const rows = await this.repository.findAll();
    return rows.map(toProject);
  }

  async getProject(slug: string): Promise<Project> {
    const row = await this.repository.findBySlug(slug);
    if (!row) {
      throw HttpError.notFound(`No project exists with slug "${slug}"`);
    }
    return toProject(row);
  }
}

export const projectsService = new ProjectsService();
