## Why

The frontend needs a stable BFF (Backend for Frontend) layer to fetch CMS-driven page content without coupling directly to the CMS API. A dedicated Express endpoint abstracts the CMS contract and lets the frontend consume structured page data via a simple relative URL lookup.

## What Changes

- Add a `GET /getDynamicPage` endpoint to the Express app that accepts a `relativeUrl` query parameter
- Return structured dummy page data matching a CMS content-page shape
- Wire up the route in the existing Express server

## Capabilities

### New Capabilities
- `dynamic-page`: Endpoint that resolves a CMS page by relative URL and returns structured page content (title, slug, components/blocks, metadata)

### Modified Capabilities

## Impact

- `apps/api` Express server — new route file added
- No external CMS dependency in this iteration (dummy data only)
- Frontend teams can integrate against the stable response shape immediately
