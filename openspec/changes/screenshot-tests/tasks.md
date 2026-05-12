## 1. Infrastructure

- [x] 1.1 Add `@playwright/test` as a dev dependency to `apps/nuxt/package.json`
- [x] 1.2 Add `"test:screenshots": "playwright test"` script to `apps/nuxt/package.json`
- [x] 1.3 Install Chromium browser binaries: `pnpm --filter nuxt exec playwright install chromium`
- [x] 1.4 Create `apps/nuxt/playwright.config.ts` — set `baseURL: 'http://localhost:3001'`, `testDir: './screenshots'`, `snapshotDir: './screenshots/__snapshots__'`, Chromium-only project at 1280×720 viewport

## 2. Screenshot Tests

- [x] 2.1 Create `apps/nuxt/screenshots/pages.spec.ts` — two tests using `page.goto()` + `expect(page).toHaveScreenshot()`: one for `/getting-started`, one for `/content-page`

## 3. Baseline Generation and Verification

- [x] 3.1 Start both servers (`pnpm --filter api dev` + `pnpm --filter nuxt dev`)
- [x] 3.2 Generate baselines: `pnpm --filter nuxt test:screenshots -- --update-snapshots` — confirm PNG files appear in `screenshots/__snapshots__/`
- [x] 3.3 Run without `--update-snapshots`: `pnpm --filter nuxt test:screenshots` — confirm both tests pass against the generated baselines
