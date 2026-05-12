## Context

The repo has two layers of existing automated tests: unit/integration tests (Vitest) and HTTP-based E2E tests (Vitest + raw fetch). Neither layer can catch visual regressions. Playwright's `toHaveScreenshot()` fills this gap by rendering pages in a real Chromium browser and pixel-diffing against committed baseline images.

The existing `test:e2e` suite uses raw `fetch` against pre-running servers. Screenshot tests follow the same server prerequisite model — both API and Nuxt dev servers must be running — but use Playwright's own test runner (`@playwright/test`) rather than Vitest, since `toHaveScreenshot()` is a Playwright-native API.

## Goals / Non-Goals

**Goals:**
- Screenshot `/getting-started` and `/content-page` in Chromium and store baselines in the repo
- Diff on every subsequent run; fail if pixels diverge beyond threshold
- Update baselines intentionally with `playwright test --update-snapshots`
- Keep screenshot tests in a separate `screenshots/` directory, distinct from the existing `e2e/` Vitest tests

**Non-Goals:**
- Multi-browser screenshots (Chromium only — consistent rendering, no OS-level font variance)
- Mobile viewport screenshots (desktop only for now)
- CI integration (browser binaries not in CI environment yet)
- Storybook component screenshots

## Decisions

### Test runner: `@playwright/test` (not Vitest)
`toHaveScreenshot()` is a Playwright-specific assertion. Shoehorning it into Vitest requires `@vitest/browser` + extra config. Using `@playwright/test` directly is simpler and is Playwright's intended usage.

_Why not Vitest_: We'd need `@vitest/browser`, `playwright` provider config, and the assertion API is slightly different. Net more complexity for no gain.

### Separate `playwright.config.ts` (not merged into vitest config)
Playwright has its own config format (`defineConfig` from `@playwright/test`). It sets `baseURL`, timeout, browser, and snapshot directory. Keeping it separate from the Vitest configs avoids cross-tool confusion.

### Snapshot directory: `screenshots/__snapshots__`
Playwright's default snapshot path is next to the test file. Explicitly setting `snapshotDir` to `screenshots/__snapshots__` keeps all baselines in one predictable location.

### Chromium only, desktop viewport (1280×720)
Font rendering and compositing differences between browsers cause spurious pixel diffs in CI. Fixing to Chromium + a consistent viewport makes baselines stable.

## Risks / Trade-offs

- [Baselines are OS/font-dependent] → Generate baselines on a consistent machine; if CI uses a different OS, snapshots will need to be regenerated there
- [Flaky pixel diffs on dynamic content] → Pages contain no timestamps or random data; diffs should be stable
- [Browser binaries not committed] → First-time setup requires `pnpm exec playwright install chromium`; document in README
