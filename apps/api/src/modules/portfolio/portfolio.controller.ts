import type { Request, Response } from 'express';
import { success } from '../../lib/respond';
import { portfolioService } from './portfolio.service';

export const getPortfolio = async (_req: Request, res: Response): Promise<void> => {
  const payload = await portfolioService.getPortfolio();
  success(res, payload);
};
