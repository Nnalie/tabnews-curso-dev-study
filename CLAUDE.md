# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev environment (spins up Docker, waits for Postgres, runs migrations, starts Next.js)
npm run dev

# Run full integration test suite (starts Docker + Next.js server via concurrently, then Jest)
npm test

# Run tests in watch mode (requires services and Next.js already running)
npm run test:watch

# Run a single test file
npx jest tests/integration/api/v1/status/get.test.js --runInBand

# Lint
npm run lint:prettier:check   # check formatting
npm run lint:prettier:fix     # auto-fix formatting
npm run lint:eslint:check     # ESLint via next lint

# Database migrations
npm run migration:up          # apply pending migrations
npm run migration:down        # roll back last migration
npm run migration:create      # scaffold a new migration file

# Docker services
npm run services:up           # start Postgres container
npm run services:stop         # stop without removing
npm run services:down         # stop and remove
```

## Architecture

This is a **Next.js 13** app (Pages Router) that serves as a clone/study of [TabNews](https://www.tabnews.com.br), built following the curso.dev curriculum.

### Request flow

```
HTTP request
  → pages/api/v1/<resource>/index.js   (Next.js serverless route handler)
  → infra/database.js                  (pg client factory)
  → PostgreSQL (Docker, port 5432)
```

`infra/database.js` exports two helpers: `query(queryObj)` (opens a fresh client, runs the query, closes it) and `getNewClient()` (returns a connected `pg.Client` for callers that need to manage the connection lifecycle themselves, such as the migrations endpoint).

### API routes (`pages/api/v1/`)

| Route                | Methods    | Purpose                                                          |
| -------------------- | ---------- | ---------------------------------------------------------------- |
| `/api/v1/status`     | GET        | Returns DB version, max connections, open connections            |
| `/api/v1/migrations` | GET / POST | GET = dry-run (pending list); POST = actually applies migrations |

The migrations route uses `node-pg-migrate` directly (not the CLI) and keeps its own `pg.Client` open across the migration run, closing it in a `finally` block.

### Integration tests (`tests/integration/`)

Tests hit the real running Next.js dev server on `http://localhost:3000`. `npm test` starts both `next dev` and `jest` via `concurrently`; Jest waits for the server with `tests/orchestrator.js`, which polls `/api/v1/status` with `async-retry` until it responds 200.

Tests that touch migrations call `DROP SCHEMA public CASCADE; CREATE SCHEMA public;` in `beforeAll` to reset state, then rely on the `/api/v1/migrations` POST endpoint (or the GET dry-run) to validate migration behavior.

`jest.config.js` sets `moduleDirectories: ["node_modules", "<rootDir>"]`, which enables bare imports like `import database from "infra/database.js"` and `import waitForAllServices from "tests/orchestrator.js"` throughout tests and route handlers.

### Environment

`.env.development` holds Postgres credentials and is loaded by both `node-pg-migrate` (via `--envPath`) and Jest (via `dotenv` in `jest.config.js`). The Docker Compose file at `infra/compose.yml` reads the same file via `env_file`. In production, `infra/database.js` enables SSL automatically when `NODE_ENV === "production"`.

### CI

Both GitHub Actions workflows run on `pull_request`. Linting runs Prettier check and ESLint as separate jobs. The test workflow runs `npm test`, which includes the Docker/service startup.

### Commit philosophy

Don't commit anything until my revision.
