## 1. packages/ui — Test Infrastructure

- [x] 1.1 Add `vitest`, `@vue/test-utils`, and `happy-dom` as dev dependencies to `packages/ui/package.json`
- [x] 1.2 Add `"test": "vitest run"` script to `packages/ui/package.json`
- [x] 1.3 Create `packages/ui/vitest.config.ts` with `environment: 'happy-dom'`

## 2. packages/ui — BaseButton Tests

- [x] 2.1 Create `packages/ui/src/components/BaseButton.test.ts` — mount with `label`, assert text rendered
- [x] 2.2 Assert `variant="primary"` applies the primary class
- [x] 2.3 Assert `variant="secondary"` applies the secondary class
- [x] 2.4 Assert `disabled=true` sets the `disabled` attribute on the button element
- [x] 2.5 Run `pnpm --filter @repo/ui test` and confirm all tests pass

## 3. apps/api — Test Infrastructure

- [x] 3.1 Add `supertest` and `@types/supertest` as dev dependencies to `apps/api/package.json`
- [x] 3.2 Create `apps/api/vitest.config.ts` (Node environment, no DOM needed)

## 4. apps/api — Route Tests

- [x] 4.1 Create `apps/api/src/routes/dynamicPage.test.ts` — import the router, wrap with supertest
- [x] 4.2 Test: `GET /` with no `relativeUrl` → status 400, `{ error: "relativeUrl is required" }`
- [x] 4.3 Test: `GET /?relativeUrl=content-page` → status 200, `body.type === "content-page"`
- [x] 4.4 Test: `GET /?relativeUrl=getting-started` → status 200, `body.type === "getting-started-page"`, `body.steps` is an array
- [x] 4.5 Test: `GET /?relativeUrl=does-not-exist` → status 404, `{ error: "Page not found" }`
- [x] 4.6 Create `apps/api/src/routes/health.test.ts` — `GET /` → status 200, `body.status === "ok"`
- [x] 4.7 Run `pnpm --filter api test` and confirm all tests pass

## 5. apps/nuxt — Component Test Infrastructure

- [x] 5.1 Add `@vue/test-utils` and `happy-dom` as dev dependencies to `apps/nuxt/package.json`
- [x] 5.2 Create `apps/nuxt/vitest.config.ts` with `environment: 'happy-dom'`, excluding E2E files from this config

## 6. apps/nuxt — Component Unit Tests

- [x] 6.1 Create `apps/nuxt/app/components/PageRenderer.test.ts` — mount with `page.type="content-page"`, assert `ContentPage` renders (check for rendered title); mount with unknown type, assert fallback text contains "Unknown page type"
- [x] 6.2 Create `apps/nuxt/app/components/GettingStartedPage.test.ts` — mount with fixture payload, assert title, intro, and at least one step title are in the output
- [x] 6.3 Create `apps/nuxt/app/components/HeroBlock.test.ts` — mount with heading/subheading/ctaLabel/ctaUrl, assert heading text and CTA link are rendered
- [x] 6.4 Create `apps/nuxt/app/components/RichTextBlock.test.ts` — mount with `content="<p>Hello</p>"`, assert `<p>` with "Hello" is in the DOM
- [x] 6.5 Run `pnpm --filter nuxt test` and confirm all component tests pass

## 7. apps/nuxt — E2E Tests

- [x] 7.1 Add a `"test:e2e": "vitest run --config vitest.e2e.config.ts"` script to `apps/nuxt/package.json`
- [x] 7.2 Create `apps/nuxt/vitest.e2e.config.ts` using `@nuxt/test-utils/config` with `browser` / Playwright setup
- [x] 7.3 Create `apps/nuxt/e2e/getting-started.test.ts` — navigate to `/getting-started`, assert `h1` contains "Getting Started" and at least one step title is visible
- [x] 7.4 Create `apps/nuxt/e2e/content-page.test.ts` — navigate to `/content-page`, assert "Hero Heading" is visible
- [x] 7.5 Create `apps/nuxt/e2e/unknown-page.test.ts` — navigate to `/this-page-does-not-exist`, assert no unhandled JS error and some content is rendered
- [x] 7.6 Start the API server (`pnpm --filter api dev`), then run `pnpm --filter nuxt test:e2e` and confirm all E2E tests pass

## 8. Verification

- [x] 8.1 Run `pnpm test` from the repo root and confirm Turbo runs all three test suites and all pass
