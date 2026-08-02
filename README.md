# Performance Terminal — full-stack portfolio

A terminal-styled engineering portfolio.

- **Frontend** — React 18, TypeScript, Vite, React Router, Redux Toolkit + RTK Query,
  Mantine (theme authority), Tailwind (token-backed utilities), Framer Motion,
  Tabler icons.
- **Backend** — Node, Express, TypeScript, Prisma, PostgreSQL, Zod.
- **Shared** — `@portfolio/contracts`: Zod schemas that validate API requests _and_
  type the client, so the two cannot drift.

---

## Repository layout

```text
portfolio/
├── api/index.ts                 # Vercel serverless entry (Express app)
├── vercel.json                  # single-project deployment config
├── apps/
│   ├── api/                     # Express + Prisma service
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # normalized model of the dataset
│   │   │   ├── migrations/
│   │   │   ├── seed.ts
│   │   │   └── seed-data.ts     # dataset loader + validation + overrides
│   │   ├── src/
│   │   │   ├── app.ts           # builds the app (no port binding)
│   │   │   ├── server.ts        # listen + graceful shutdown
│   │   │   ├── routes.ts
│   │   │   ├── config/env.ts    # Zod-validated environment
│   │   │   ├── lib/             # prisma, logger, HttpError, respond
│   │   │   ├── middleware/      # security, validate, logging, errors
│   │   │   └── modules/         # portfolio | projects | case-studies | contact | health
│   │   └── tests/               # Supertest integration suites
│   └── web/
│       ├── src/
│       │   ├── app/             # App, router, store, providers
│       │   ├── components/      # layout | terminal | motion | ui
│       │   ├── features/        # portfolio | projects | case-studies | contact
│       │   ├── services/        # RTK Query base + endpoints
│       │   ├── styles/          # tokens + reference layers + enhancements
│       │   ├── hooks/  lib/  types/
│       │   └── main.tsx
│       └── tests/
│           ├── unit/            # Vitest + React Testing Library
│           └── visual/          # Playwright: layout parity, interactions
├── packages/
│   ├── contracts/               # shared Zod schemas and types
│   ├── eslint-config/           # flat config, base + react
│   └── tsconfig/                # base | node | react
├── reference/                   # supplied HTML + authoritative dataset
└── .env                         # ONE env file for every workspace
```

Each API module is split into `routes → controller → service → repository`
(+ `schema` / `mapper`). No oversized controller, service, component, stylesheet
or slice.

---

## Setup

Requires **Node ≥ 20** (`.nvmrc` pins 24) and a PostgreSQL database. There is no
container setup.

```bash
nvm use                 # Node 24
npm install             # installs all workspaces, then builds @portfolio/contracts
cp .env.example .env    # then fill in DATABASE_URL — see below
```

### Environment

One `.env` at the repository root serves every workspace: the API reads it through
`dotenv`, all Prisma commands through `dotenv-cli`, and Vite through `envDir`.
See `.env.example` for the annotated list.

Two notes that cost time otherwise:

- **Prisma needs the role spelled out.** Unlike `psql`, it does not fall back to
  your OS user; `postgresql://localhost:5432/db` fails with `P1010`. Use
  `postgresql://$(whoami)@localhost:5432/db`.
- **Use a pooled connection string** for hosted Postgres (the `-pooler` host on
  Neon). Serverless functions open a connection per instance.

### Database — migrate and seed

Both are explicit, one-off commands. Nothing migrates or seeds when the server
starts.

```bash
npm run db:migrate:deploy    # apply migrations (use db:migrate to author new ones)
npm run db:seed              # load reference/portfolio-data.json
```

`db:seed` is idempotent: it rewrites the content tables from the dataset and never
touches `contact_submissions`.

### Run

```bash
npm run dev        # API on :4100 and web on :5173
npm run dev:api
npm run dev:web
```

---

## Scripts

| Command                                                                           | What it does                             |
| --------------------------------------------------------------------------------- | ---------------------------------------- |
| `npm run dev`                                                                     | API + web together                       |
| `npm run build`                                                                   | contracts → api → web production builds  |
| `npm run typecheck`                                                               | strict `tsc --noEmit` in every workspace |
| `npm run lint` / `lint:fix`                                                       | ESLint 9 flat config                     |
| `npm run format` / `format:check`                                                 | Prettier                                 |
| `npm test`                                                                        | Vitest unit + Supertest integration      |
| `npm run test:web` / `test:api`                                                   | one side only                            |
| `npm run test:visual`                                                             | Playwright (needs API + web running)     |
| `npm run db:migrate` / `db:migrate:deploy` / `db:seed` / `db:reset` / `db:studio` | Prisma                                   |
| `npm run tokens` (in `apps/web`)                                                  | regenerate `tokens.css` from `tokens.ts` |
| `npm run verify`                                                                  | lint → typecheck → test → build          |

---

## API

All responses use one envelope — `{ ok: true, data }` or
`{ ok: false, error: { code, message, details? } }` — so the client narrows on `ok`
rather than re-reading status codes.

| Endpoint                             | Notes                                                       |
| ------------------------------------ | ----------------------------------------------------------- |
| `GET /api/health`                    | 200 when the database answers, 503 when degraded            |
| `GET /api/portfolio`                 | the complete page payload                                   |
| `GET /api/projects`                  | ordered list                                                |
| `GET /api/projects/:slug`            | 404 unknown slug, 422 malformed slug                        |
| `GET /api/projects/:slug/case-study` |                                                             |
| `POST /api/contact`                  | validates `name`/`purpose`/`message`, persists, returns 201 |

Also configured: CORS allow-list (403 on a disallowed origin), Helmet,
compression, structured `pino` request logging, centralised error handling that
never leaks messages or stack traces, environment validation at boot, Prisma
connection lifecycle, graceful shutdown, and a rate limit + body-size cap on the
contact endpoint. Every query goes through Prisma's parameterised builder.

Until an email transport is configured, **persisting the submission is the
completed behaviour** — the database row is the delivery guarantee.

---

## Styling architecture

`apps/web/src/styles/tokens.ts` is the single source of truth for every design
value. From it:

- `theme.ts` builds the typed **Mantine** theme (colours, type, spacing, radii,
  breakpoints, focus). Mantine owns the theme.
- `tokens.css` is **generated** (`npm run tokens`) as `--portfolio-*` custom
  properties. A unit test fails if the checked-in file drifts.
- `tailwind.config.ts` maps semantic aliases (`bg-app`, `text-muted`,
  `border-terminal`, …) onto those custom properties — no colour value is ever
  repeated there.

The reference stylesheet is ported into `styles/reference/*.css` as **five layers
in the original source order**. That order is the fidelity contract: the reference
deliberately re-declares `.foot`, `.terminal-body`, `.bar` and `.fill` across its
`<style>` blocks, so splitting by component instead of by layer would reorder those
overrides and change the rendering. Enhancements live in separate files
(`enhancements.css`, `header.css`, `radius.css`, `icons.css`, …) so the ported
layers stay faithful and every deviation is visible in one place.

Two deliberate exclusions: Tailwind's preflight and Mantine's global reset are both
off. Each strips heading weights, paragraph margins and list markers that the
reference inherits from UA defaults. `MantineProvider` is still mounted as the
theme authority.

---

## Testing

| Suite                      | Command               | Covers                                                                                                                              |
| -------------------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Unit (Vitest + RTL)        | `npm run test:web`    | token/CSS sync, experience formatting, all three slices, the case-study document model, and component behaviour                     |
| Integration (Supertest)    | `npm run test:api`    | every endpoint against a real Postgres database, including validation, 404/422, oversized and malformed bodies, and error redaction |
| Layout parity (Playwright) | `npm run test:visual` | ~45 computed-layout probes compared against the reference HTML at 1440×1000, 1024×1366, 768×1024, 390×844 and 320×700               |
| Interactions (Playwright)  | `npm run test:visual` | explorer, tabs, case-study compile/cancel, contact questionnaire, scroll policy, reduced motion, overflow                           |

The parity suite regenerates `test-results/reference-live.html` from
`reference/performance-terminal.html` on every run, driven by the seeded database,
then compares layout probe by probe. Because the baseline is rebuilt from the
reference file each time, it can never become a stale approval of the app's own
output.

`test:api` requires `TEST_DATABASE_URL`. **Keep it on a local database** — the
suite truncates and re-seeds.

---

## Deployment (Vercel)

**One** Vercel project, deployed from the repository root. The site is the static
build and the API is a serverless function on the *same origin*, so the browser
calls `/api/...` and CORS is never involved.

- Root Directory: the repository root (leave it unset)
- `vercel.json` — build, function config, SPA rewrites, caching, security headers
- `api/index.ts` — exports the Express app as the function

Vercel discovers functions in the project's top-level `api/` directory and reads
`vercel.json` relative to the project's Root Directory. Both therefore live at the
repo root; a `vercel.json` inside `apps/*` would only be read if a project were
rooted there.

Environment variables to set in the Vercel dashboard:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | the **pooled** connection string (Neon's `-pooler` host) |
| `VITE_API_BASE_URL` | `/api` |
| `NODE_ENV` | `production` |
| `CONTACT_RATE_LIMIT_WINDOW_MS`, `CONTACT_RATE_LIMIT_MAX`, `JSON_BODY_LIMIT` | optional; sensible defaults apply |

`CORS_ORIGINS` is not needed: same-origin requests never trigger CORS. Set it only
if you later serve the frontend from a different host.

`VITE_*` values are inlined at build time — change one and redeploy; it is never
read at runtime.

The build runs `npm run build:vercel`, which builds the contracts package,
generates the Prisma client, and builds the site. It deliberately does **not** run
migrations or the seed. Apply those yourself, against the production database, when
you intend to:

```bash
npm run db:migrate:deploy
npm run db:seed          # only when the content dataset changed
```

## Conversion notes

The reference HTML is reproduced structurally and responsively: same grid tracks,
gutters, clamped type, breakpoints at 1000px and 600px, footer alignment, the
status label collapsing to `font-size: 0` at ≤600px while the glowing dot stays,
the case-study compile sequence, and a scroll policy that pins every load to the
top and never focuses the contact input.

Behaviour preserved from the reference script: experience derived from
`profile.careerStart` on every render, three files in the explorer, selection
syncing tab/description/architecture/log/metric/outcome, `case-study.md` opening
in place, cancelling a compile safely, and the one-question-at-a-time contact
session with in-place restart.

Deliberate departures, all owner-requested:

| Change                                                                              | Where                                               |
| ----------------------------------------------------------------------------------- | --------------------------------------------------- |
| Sticky header, blurred translucent background, larger brand wordmark linking home   | `styles/header.css`, `components/layout/TopBar.tsx` |
| Framer Motion entrance/hover motion, all settling on the reference's resting state  | `components/motion/*`                               |
| Case study rendered as the `case-study.md` source view instead of a 2-column table  | `features/case-studies/CaseStudyMarkdown.tsx`       |
| Dimmed border token (`#252b28` → `#1a1e1c`)                                         | `styles/tokens.ts`                                  |
| One shared button metric across every control                                       | `styles/enhancements.css`                           |
| Corner radii on every surface and control                                           | `styles/radius.css`                                 |
| Tabler icons throughout                                                             | `components/ui/icons.tsx`, `styles/icons.css`       |
| Terminal-accent text selection and scrollbars                                       | `styles/enhancements.css`                           |
| Card-less loading/error boot console                                                | `components/ui/BootScreen.tsx`                      |
| Page title shortened to “Vaskar — …”; the obsolete “DEMO MODE” contact note removed | `prisma/seed-data.ts`                               |

Because these change appearance on purpose, the visual suite verifies **layout**
parity against the reference rather than pixels, and `enhancements.spec.ts` pins
the deviations down so they cannot silently revert.

One dataset conflict is worth knowing about: `reference/portfolio-data.json` and
the JSON embedded in the reference HTML carry different case-study prose. The JSON
file is treated as authoritative, as specified, and the parity harness injects the
seeded values into its generated copy of the reference page so the comparison
measures rendering rather than copy.
