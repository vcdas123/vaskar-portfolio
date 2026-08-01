import { buildReferencePage } from './reference-page';

/**
 * Builds `test-results/reference-live.html` — a copy of the supplied reference
 * page driven by the seeded database — and publishes its URL for the specs.
 *
 * Regenerating it on every run means `layout-parity.spec.ts` always measures
 * against the reference file as it is on disk, never a stale capture.
 */
export default async function globalSetup(): Promise<void> {
  process.env.REFERENCE_PAGE_URL = await buildReferencePage();
}
