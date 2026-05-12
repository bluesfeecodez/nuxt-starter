## Why

The CMS BFF currently supports only one page type (`content-page`). Adding a `getting-started-page` type proves the extensibility of the dispatch pipeline end-to-end and gives the app a second navigable CMS-driven page at `/getting-started`. As a side benefit, the BFF gets proper per-slug fixture routing with 404 for unknown slugs.

## What Changes

- Add a `getting-started-page` fixture to the BFF (`apps/api/src/routes/dynamicPage.ts`) with title, intro text, and a steps array
- Refactor the BFF handler to route by `relativeUrl` via a fixture map; unknown slugs return `404`
- Add a `GettingStartedPage.vue` component to the Nuxt app that renders title, intro, and a numbered steps list
- Register `'getting-started-page' → GettingStartedPage` in `PageRenderer.vue`

## Capabilities

### New Capabilities
- `getting-started-page-bff`: BFF serves a `getting-started-page` fixture for `relativeUrl=getting-started` and returns 404 for unrecognised slugs
- `getting-started-page-renderer`: Nuxt renders the `getting-started-page` type through the existing `PageRenderer` dispatch system

### Modified Capabilities

## Impact

- `apps/api/src/routes/dynamicPage.ts` — fixture map + 404 fallback added
- `apps/nuxt/app/components/PageRenderer.vue` — one import + one registry entry added
- `apps/nuxt/app/components/GettingStartedPage.vue` — new file
- No new dependencies
