import type { CaseStudy } from '@portfolio/contracts';
import { HttpError } from '../../lib/http-error';
import type { CaseStudiesRepository } from './case-studies.repository';
import { caseStudiesRepository } from './case-studies.repository';
import { toCaseStudy } from './case-studies.mapper';

export class CaseStudiesService {
  constructor(private readonly repository: CaseStudiesRepository = caseStudiesRepository) {}

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
    const row = await this.repository.findByProjectSlug(slug);
    if (!row) {
      throw HttpError.notFound(`No case study exists for project "${slug}"`);
    }
    return toCaseStudy(row);
  }
}

export const caseStudiesService = new CaseStudiesService();
