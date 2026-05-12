## Why

The Nuxt app has no CMS-driven routing yet. Adding a dynamic catch-all page that delegates rendering to the BFF enables CMS-managed content to be served at any URL without hardcoded routes, and establishes the extensible pattern for adding new page types and block types as the CMS grows.

## What Changes

- Add a catch-all dynamic route `pages/[...slug].vue` that fetches page data from the BFF (`GET /getDynamicPage?relativeUrl=<slug>`)
- Add a `PageRenderer` component that dispatches to the correct page-type component based on `type`
- Add a `ContentPage` component for the `content-page` type
- Add block-level components: `HeroBlock` and `RichTextBlock`
- Add a fallback for unknown page types and unknown block types so the app never hard-crashes

## Capabilities

### New Capabilities
- `dynamic-page-routing`: Catch-all Nuxt route that resolves a URL to a BFF page payload and renders it
- `page-type-renderer`: Component dispatch layer that maps `page.type` → page component and `block.type` → block component

### Modified Capabilities

## Impact

- `apps/nuxt/app/pages/` — new `[...slug].vue` file
- `apps/nuxt/app/components/` — new `PageRenderer`, `ContentPage`, `HeroBlock`, `RichTextBlock` components
- Relies on `runtimeConfig.public.apiBase` (already configured to point at the Express API)
- No new dependencies required
