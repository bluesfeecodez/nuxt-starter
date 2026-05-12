## Context

The monorepo contains an Express 5 app at `apps/api`. The frontend (Nuxt) needs a way to retrieve CMS page data by relative URL without coupling to a CMS API directly. This change adds a single BFF endpoint to the existing Express server, returning dummy data that mirrors a real CMS content-page response shape.

## Goals / Non-Goals

**Goals:**
- Add `GET /getDynamicPage?relativeUrl=<path>` to the Express app
- Return a deterministic dummy content-page payload with a realistic shape (title, slug, blocks, metadata)
- Keep the implementation thin — one route file, no database or external HTTP calls

**Non-Goals:**
- Real CMS integration (Contentful, Sanity, etc.)
- Authentication / authorization on the endpoint
- Caching or pagination
- Multiple page types (only `content-page` in scope)

## Decisions

### Route naming: query param over path segment
Use `GET /getDynamicPage?relativeUrl=...` (matching the requested contract) rather than a REST-style `GET /pages/:slug`.

_Why_: The consumer (frontend team) specified this exact shape. Deviating now means breaking their integration before it exists.

### Dummy data: inline fixture object
Return a hardcoded JS object rather than reading a JSON file.

_Why_: Zero I/O, no extra dependencies, easy to read in a code review. When real CMS integration lands the fixture can be replaced in one place.

### File structure
```
apps/api/src/routes/dynamicPage.ts   ← route handler
apps/api/src/index.ts                ← mount route
```

## Risks / Trade-offs

- [Dummy data diverges from real CMS schema] → Document the fixture shape in the spec so it can be validated against the real schema when CMS is integrated
- [Query param `relativeUrl` is non-standard] → Acceptable per product decision; document in API changelog if this evolves
