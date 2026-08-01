/**
 * Emits `src/styles/tokens.css` from `src/styles/tokens.ts`.
 *
 * Run with `npm run tokens`. `tests/unit/tokens.test.ts` fails if the checked-in
 * file drifts from this output, so CSS and TypeScript cannot disagree.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildTokensCss } from '../src/styles/tokens';

const target = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url));
writeFileSync(target, buildTokensCss(), 'utf8');
// eslint-disable-next-line no-console
console.log(`wrote ${target}`);
