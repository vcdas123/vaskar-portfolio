import { Router } from 'express';
import { healthRouter } from './modules/health/health.routes';
import { portfolioRouter } from './modules/portfolio/portfolio.routes';
import { projectsRouter } from './modules/projects/projects.routes';
import { contactRouter } from './modules/contact/contact.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/portfolio', portfolioRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/contact', contactRouter);
