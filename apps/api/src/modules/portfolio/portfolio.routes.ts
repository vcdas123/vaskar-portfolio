import { Router } from 'express';
import { asyncHandler } from '../../lib/async-handler';
import { getPortfolio } from './portfolio.controller';

export const portfolioRouter = Router();

portfolioRouter.get('/', asyncHandler(getPortfolio));
