import type { Request, Response } from 'express';
import { success } from '../../lib/respond';
import { projectsService } from './projects.service';
import { projectParamsSchema } from './projects.schema';
import { caseStudiesService } from '../case-studies/case-studies.service';

export const listProjects = async (_req: Request, res: Response): Promise<void> => {
  success(res, await projectsService.listProjects());
};

export const getProject = async (req: Request, res: Response): Promise<void> => {
  const { slug } = projectParamsSchema.parse(req.params);
  success(res, await projectsService.getProject(slug));
};

export const getProjectCaseStudy = async (req: Request, res: Response): Promise<void> => {
  const { slug } = projectParamsSchema.parse(req.params);
  success(res, await caseStudiesService.getCaseStudyBySlug(slug));
};
