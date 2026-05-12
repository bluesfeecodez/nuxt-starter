## Context

Two previous changes laid the groundwork: `express-cms-bff` added `GET /getDynamicPage` to the Express app, and `nuxt-dynamic-page` added a catch-all Nuxt route + `PageRenderer` dispatch system. Both were built against a single `content-page` fixture. This change adds a second page type to prove the pattern is genuinely extensible with minimal effort.

Current state of `dynamicPage.ts`: the handler returns the same `contentPageFixture` for **any** `relativeUrl`. This needs to change to support per-slug routing and to surface meaningful 404s.

## Goals / Non-Goals

**Goals:**
- `GET /getDynamicPage?relativeUrl=getting-started` returns a `getting-started-page` fixture
- Unknown slugs return `404 { error: "Page not found" }` instead of silently serving wrong data
- `PageRenderer` dispatches `getting-started-page` to a new `GettingStartedPage` component
- Adding future page types still requires only: one new fixture + one new component + one registry line

**Non-Goals:**
- Database or real CMS integration
- Navigation links to `/getting-started` from other pages
- Styling beyond basic HTML structure

## Decisions

### Fixture routing: map lookup in the handler
Replace the single returned fixture with a `Record<string, object>` map keyed by `relativeUrl`. The handler does `fixtures[relativeUrl]` and returns 404 if absent.

_Why_: One map, zero branching. Adding a new page type is one line. Alternative (`if/else if` per slug) doesn't scale.

### 404 on unknown slug
The current implementation silently serves `content-page` data for any slug, which would confuse real integrations. The fixture map makes a 404 natural — if the slug isn't in the map, it's not found.

_Why now_: Adding a second fixture makes the "fall through to same content" bug visible. Fix it at the same time.

### GettingStartedPage: flat props from `page`
The component receives the whole `page` object as a prop (same pattern as `ContentPage`) and destructures `title`, `intro`, and `steps` from it.

_Why_: Consistent with `ContentPage` — `PageRenderer` always passes `:page="page"`. No special-casing needed in the dispatcher.

## Risks / Trade-offs

- [Fixture map keyed by slug couples BFF routing to slug strings] → Acceptable for dummy data phase; real CMS will replace the whole map with an API call
- [GettingStartedPage has no block system] → Fine for a steps-based page; if blocks are needed later, add a `blockComponents` registry as in `ContentPage`
