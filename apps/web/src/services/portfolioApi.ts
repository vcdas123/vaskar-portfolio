import {
  caseStudySchema,
  contactResponseSchema,
  portfolioPayloadSchema,
  type ApiEnvelope,
  type CaseStudy,
  type ContactRequest,
  type ContactResponse,
  type PortfolioPayload,
} from '@portfolio/contracts';
import { baseApi, unwrapEnvelope } from './api';

/**
 * Every response is parsed with the same Zod schema the API validates against,
 * so a contract change fails loudly at the boundary instead of rendering
 * `undefined` deep inside a component.
 */
export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolio: builder.query<PortfolioPayload, void>({
      query: () => '/portfolio',
      transformResponse: (response: ApiEnvelope<PortfolioPayload>) =>
        portfolioPayloadSchema.parse(unwrapEnvelope(response)),
      providesTags: ['Portfolio'],
    }),

    getCaseStudy: builder.query<CaseStudy, string>({
      query: (slug) => `/projects/${slug}/case-study`,
      transformResponse: (response: ApiEnvelope<CaseStudy>) =>
        caseStudySchema.parse(unwrapEnvelope(response)),
      providesTags: (_result, _error, slug) => [{ type: 'CaseStudy' as const, id: slug }],
    }),

    submitContact: builder.mutation<ContactResponse, ContactRequest>({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
      transformResponse: (response: ApiEnvelope<ContactResponse>) =>
        contactResponseSchema.parse(unwrapEnvelope(response)),
    }),
  }),
});

export const { useGetPortfolioQuery, useGetCaseStudyQuery, useSubmitContactMutation } =
  portfolioApi;
