## Context

The Nuxt app (`apps/nuxt`) has a single `pages/index.vue` and no CMS-driven routing. The Express BFF already exposes `GET /getDynamicPage?relativeUrl=<path>` returning a typed page payload. `runtimeConfig.public.apiBase` points at the API server. The goal is to consume that endpoint from Nuxt and render the result without hard-coding page layouts.

## Goals / Non-Goals

**Goals:**
- Catch-all dynamic route that maps any URL slug to a BFF fetch
- Component dispatch layer: `page.type` → page component, `block.type` → block component
- Graceful fallbacks for unknown types so the app never crashes
- Pattern is extensible: adding a new page type or block type requires only a new component and one registry entry

**Non-Goals:**
- Server-side caching or ISR
- Error pages / 404 handling beyond a simple fallback message
- Navigation, header, or layout chrome
- Real CMS integration

## Decisions

### Catch-all route: `pages/[...slug].vue`
Maps `/anything/nested` → `relativeUrl=anything/nested`. Nuxt joins the slug array with `/` before calling the BFF.

_Why_: Single file handles all CMS-managed URLs. Alternative (a separate route per page type) would require knowing all page types upfront — defeats the purpose.

### Page-type dispatch: `PageRenderer.vue` with a type map
A `components/PageRenderer.vue` receives the full page payload and uses a `Record<string, Component>` map to resolve the right component dynamically via `<component :is="...">`.

_Why_: Keeps `[...slug].vue` thin. Adding a new page type is one line in the map. Alternative (a big `v-if/v-else-if` chain) is harder to extend and harder to test in isolation.

### Block dispatch: inline inside `ContentPage.vue`
Each page-type component owns its own block rendering. `ContentPage` loops `page.blocks` and dispatches via a `blockComponents` map.

_Why_: Block registries are page-type specific — a blog post and a content page likely need different block types. Sharing a global block registry prematurely couples them.

### Data fetching: `useFetch` in `[...slug].vue`
Uses Nuxt's built-in `useFetch` composable with the `apiBase` from `useRuntimeConfig().public`.

_Why_: SSR-compatible out of the box, no extra setup. `$fetch` would also work but `useFetch` gives reactive `pending`/`error` states for free.

## Risks / Trade-offs

- [Unknown page type renders nothing] → `PageRenderer` shows a visible "Unknown page type" fallback in dev, silent no-op in prod
- [Slug join may diverge from BFF expectation] → BFF currently accepts any string; document the join strategy so both sides stay in sync
- [No 404 response from BFF] → dummy data always returns 200; when real CMS lands, add `error` handling in `useFetch` callback
