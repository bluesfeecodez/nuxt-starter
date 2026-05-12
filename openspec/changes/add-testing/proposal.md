## Why

Three changes have been shipped (BFF, dynamic pages, getting-started page) with no automated tests. Adding a Vitest-based test suite at every layer — shared UI, Express API, Nuxt components, and E2E — ensures regressions are caught before they reach the browser and makes the fixture-dispatch architecture verifiable.

## What Changes

- Add `vitest`, `@vue/test-utils`, and `happy-dom` to `packages/ui` with a `test` script and unit tests for `BaseButton`
- Add `supertest` to `apps/api` and write integration tests covering all four branches of `GET /getDynamicPage` plus the health route
- Add `@vue/test-utils` and `happy-dom` to `apps/nuxt` and write unit tests for `PageRenderer`, `GettingStartedPage`, `HeroBlock`, and `RichTextBlock`
- Add Playwright-based E2E tests in `apps/nuxt` using `@nuxt/test-utils` (already installed) covering the three live routes and the unknown-route fallback

## Capabilities

### New Capabilities
- `api-tests`: Integration tests for all Express route branches using supertest
- `ui-unit-tests`: Vitest unit tests for `packages/ui` components
- `nuxt-component-tests`: Vitest + `@vue/test-utils` unit tests for Nuxt app components
- `e2e-tests`: Playwright E2E tests for the full BFF → Nuxt rendering pipeline

### Modified Capabilities

## Impact

- `packages/ui` — new deps (`vitest`, `@vue/test-utils`, `happy-dom`), new `test` script, new `vitest.config.ts`, new test files
- `apps/api` — new deps (`supertest`, `@types/supertest`), new `vitest.config.ts`, new test files
- `apps/nuxt` — new deps (`@vue/test-utils`, `happy-dom`), new `vitest.config.ts`, new test files (unit + E2E)
- Root `turbo.json` may need a `test` pipeline entry if not already present
- Storybook unchanged — visual only, no interaction tests added
