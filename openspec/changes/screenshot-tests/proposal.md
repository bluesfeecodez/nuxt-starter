## Why

The existing E2E tests verify content correctness but cannot catch visual regressions — layout shifts, broken styles, or rendering changes that still pass text-based assertions. Playwright screenshot tests fill that gap by capturing baseline images of each live page and failing when pixels diverge.

## What Changes

- Add `@playwright/test` to `apps/nuxt` devDependencies
- Install Chromium browser binaries via `playwright install chromium`
- Add a `playwright.config.ts` targeting the running Nuxt dev server at `http://localhost:3001`
- Add screenshot test files for `/getting-started` and `/content-page`
- Add a `"test:screenshots"` script to `apps/nuxt/package.json`
- First run generates baseline snapshots; subsequent runs diff against them

## Capabilities

### New Capabilities
- `page-screenshot-tests`: Playwright visual regression tests that capture and diff full-page screenshots of the live Nuxt pages

### Modified Capabilities

## Impact

- `apps/nuxt` — new devDependency (`@playwright/test`), new `playwright.config.ts`, new `screenshots/` test directory, new script
- Playwright Chromium binaries installed on the local machine (not committed)
- Both servers must be running before executing screenshot tests (same prerequisite as `test:e2e`)
- Baseline snapshot files (`*.png`) committed to the repo as the visual reference
