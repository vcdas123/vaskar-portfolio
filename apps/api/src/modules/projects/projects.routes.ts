import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler';
import { validateParams } from '../../middleware/validate';
import { getProject, getProjectCaseStudy, listProjects } from './projects.controller';
import { projectParamsSchema } from './projects.schema';

export const projectsRouter = Router();

projectsRouter.get('/', asyncHandler(listProjects));

projectsRouter.get('/:slug', validateParams(projectParamsSchema), asyncHandler(getProject));

projectsRouter.get(
  '/:slug/case-study',
  validateParams(projectParamsSchema),
  asyncHandler(getProjectCaseStudy),
);
