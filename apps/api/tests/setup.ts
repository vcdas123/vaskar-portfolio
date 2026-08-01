import { execFileSync } from 'node:child_process';
import path from 'node:path';
import dotenv from 'dotenv';

/**
 * Integration tests run against a real Postgres database — the same engine and the
 * same Prisma queries as production — so schema mistakes cannot pass.
 *
 * `TEST_DATABASE_URL` is promoted to `DATABASE_URL` before any application module
 * loads. `dotenv` never overwrites an existing variable, so `src/config/env.ts`
 * picks this up rather than the development database.
 */
const apiRoot = path.resolve(__dirname, '..');

dotenv.config({ path: path.resolve(apiRoot, '../../.env') });

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl) {
  throw new Error(
    'TEST_DATABASE_URL is required to run the API integration tests.\n' +
      'Create the database once with `createdb performance_terminal_test`, then set\n' +
      'TEST_DATABASE_URL in the root .env (see .env.example).\n' +
      'Keep it pointed at a local database: this suite truncates and re-seeds.',
  );
}

process.env.DATABASE_URL = testDatabaseUrl;
process.env.NODE_ENV = 'test';
// Keep test output readable; the logger is exercised by its own behaviour, not noise.
process.env.LOG_LEVEL = 'silent';

const run = (command: string, args: string[]): void => {
  execFileSync(command, args, {
    cwd: apiRoot,
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: testDatabaseUrl },
  });
};

// Bring the test database to the current schema and load the reference dataset.
// Migration and seeding are explicit here for the same reason they are explicit in
// development: nothing about the running server does this on start.
run('npx', ['prisma', 'migrate', 'deploy']);
run('npx', ['tsx', 'prisma/seed.ts']);
