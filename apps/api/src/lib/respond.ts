import type { Response } from 'express';
import type { ApiError, ApiFailure, ApiSuccess } from '@portfolio/contracts';

export const success = <TData>(res: Response, data: TData, status = 200): Response => {
  const body: ApiSuccess<TData> = { ok: true, data };
  return res.status(status).json(body);
};

export const failure = (res: Response, status: number, error: ApiError): Response => {
  const body: ApiFailure = { ok: false, error };
  return res.status(status).json(body);
};
