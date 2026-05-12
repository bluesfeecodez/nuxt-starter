## Context

Three packages need test coverage: `packages/ui` (zero test infrastructure), `apps/api` (vitest installed, no tests), `apps/nuxt` (vitest + @nuxt/test-utils installed, no tests). `turbo.json` already has a `test` task with `dependsOn: ["^build"]` and `outputs: ["coverage/**"]` — no Turbo changes needed. Storybook is intentionally excluded.

## Goals / Non-Goals

**Goals:**
- Every package with application logic has a passing `vitest run` test script
- `pnpm test` at root runs all suites via Turbo
- E2E tests start both servers and use Playwright via @nuxt/test-utils
- Storybook stays visual-only — no interaction tests, no `play` functions added

**Non-Goals:**
- Coverage thresholds or coverage reporting config
- CI pipeline changes
- Testing Pinia stores (none exist yet)
- Snapshot testing

## Decisions

### DOM environment: `happy-dom` over `jsdom`
Used in `packages/ui` and `apps/nuxt` component tests. `happy-dom` is faster and ships well with Vitest's recommended defaults.

_Why not jsdom_: Heavier, slower startup, and Vitest's own docs now prefer `happy-dom` for Vue component testing.

### API tests: supertest against the real router
Import the Express router directly in tests, wrap with `supertest`, no HTTP server lifecycle needed.

_Why not mocking_: The fixture map and 404 logic are in the handler itself — testing at HTTP level catches real behaviour with minimal overhead.

### Component test location: colocated `*.test.ts` files
Test files live next to the source (`HeroBlock.vue` → `HeroBlock.test.ts` in the same directory).

_Why not `__tests__/` folder_: Colocated files are easier to find and move with the component. Vitest's default glob `**/*.test.ts` picks them up either way.

### E2E: `@nuxt/test-utils` setup + Playwright
`@nuxt/test-utils` provides `setup({ server: true })` which starts the Nuxt dev server. The API server must also be running — E2E tests are run with both servers up (handled in a `globalSetup` script or documented as a prerequisite for local dev; CI starts both).

_Why not Cypress_: Playwright is already a peer dep of `@nuxt/test-utils`. No additional install needed.

### Separate vitest configs per environment
Each package gets its own `vitest.config.ts`. Component tests set `environment: 'happy-dom'`; API tests use the default Node environment; E2E tests use a separate config pointing at the Playwright browser runner.

_Why not a single root config_: Packages have different environments (Node vs DOM). Separate configs keep each package independently runnable.

## Risks / Trade-offs

- [E2E requires both servers running] → Document in README; for CI, use a `pretest` script or a `globalSetup` that starts the API
- [Nuxt 4 + @nuxt/test-utils API may differ from Nuxt 3 docs] → Verify `mountSuspended` and `setup` API against installed `@nuxt/test-utils@^4.0.3`
- [happy-dom missing edge-case DOM APIs] → Acceptable for these components; fall back to jsdom if specific tests fail
