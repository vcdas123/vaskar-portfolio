import type { PortfolioPayload } from '@portfolio/contracts';
import { HttpError } from '../../lib/http-error';
import type { PortfolioRepository } from './portfolio.repository';
import { portfolioRepository } from './portfolio.repository';
import {
  toContactChannel,
  toEducation,
  toExperience,
  toMetric,
  toProfile,
  toProject,
  toSite,
  toSkillGroup,
} from './portfolio.mapper';

export class PortfolioService {
  constructor(private readonly repository: PortfolioRepository = portfolioRepository) {}

  /** The complete page payload, fetched in one round of parallel queries. */
  async getPortfolio(): Promise<PortfolioPayload> {
    const [site, profile, metrics, projects, skills, experience, education, contacts] =
      await Promise.all([
        this.repository.findSiteSetting(),
        this.repository.findProfile(),
        this.repository.findMetrics(),
        this.repository.findProjects(),
        this.repository.findSkillGroups(),
        this.repository.findExperience(),
        this.repository.findEducation(),
        this.repository.findContactChannels(),
      ]);

    if (!site || !profile) {
      // An unseeded database is an operational fault, not a client error.
      throw HttpError.internal('Portfolio content is unavailable');
    }

    return {
      site: toSite(site),
      profile: toProfile(profile),
      metrics: metrics.map(toMetric),
      projects: projects.map(toProject),
      skills: skills.map(toSkillGroup),
      experience: experience.map(toExperience),
      education: education.map(toEducation),
      contacts: contacts.map(toContactChannel),
    };
  }
}

export const portfolioService = new PortfolioService();
