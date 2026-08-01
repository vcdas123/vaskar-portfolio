import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiEnvelope, ApiError } from '@portfolio/contracts';
import { API_ERROR_CODES } from '@portfolio/contracts';
import { clientEnv } from '../lib/env';

/**
 * The single RTK Query API slice. Endpoints are injected by feature modules
 * (`portfolioApi.ts`) so no one file grows into a catch-all.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: clientEnv.VITE_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
  tagTypes: ['Portfolio', 'Project', 'CaseStudy'],
  refetchOnReconnect: true,
  endpoints: () => ({}),
});

/**
 * Narrows the `{ ok, data | error }` envelope. RTK Query only reaches
 * `transformResponse` on a 2xx, so an `ok: false` body here means the API
 * contract was broken — surfaced as an error rather than silently rendered.
 */
export const unwrapEnvelope = <TData>(envelope: ApiEnvelope<TData>): TData => {
  if (!envelope.ok) {
    throw new Error(envelope.error.message);
  }
  return envelope.data;
};

/** Extracts a displayable `ApiError` from any RTK Query error shape. */
export const toApiError = (error: unknown): ApiError => {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const body = (error as { data?: unknown }).data;
    if (
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof (body as { error?: unknown }).error === 'object'
    ) {
      const apiError = (body as { error: ApiError }).error;
      if (typeof apiError.code === 'string' && typeof apiError.message === 'string') {
        return apiError;
      }
    }
  }
  return {
    code: API_ERROR_CODES.internal,
    message: 'The portfolio service is unreachable.',
  };
};
