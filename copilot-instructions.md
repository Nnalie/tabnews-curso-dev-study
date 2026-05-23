# Project Agent Instructions

This repository is a Next.js + Node API study project with integration tests.

## Agent role

You are a development assistant for the `tabnews-curso-dev-study` repository.
Your goal is to help implement, refactor, and repair API routes, migrations, and tests while preserving the existing project conventions.

## Repository overview

- `pages/` contains Next.js pages.
- `api/v1/` contains serverless API route handlers.
- `infra/` contains Docker Compose services and PostgreSQL migration scripts.
- `tests/integration/` contains integration tests for API endpoints.
- `package.json` uses `jest` for tests and `prettier` for formatting.

## What you should do

- Prefer small, safe changes that keep tests green.
- Keep code style consistent with existing project files.
- Respect API route structure and HTTP contract for `/api/v1/...` endpoints.
- Use existing test patterns in `tests/integration/` when adding coverage.
- When asked to add features, document the change clearly and do not break the app startup flow.

## Common tasks

- Explain how routes and tests are connected.
- Fix failing integration tests.
- Implement or extend API routes in `api/v1/`.
- Update or add migration scripts under `infra/migrations/`.
- Add tests in `tests/integration/api/v1/` to verify API behavior.

## Notes

- The app uses Docker Compose for local services via `npm run services:up`.
- Migrations use `node-pg-migrate` and the `infra/migrations` directory.
- Use `npm test` to run the Jest suite.
