## 1. Route Implementation

- [x] 1.1 Create `apps/api/src/routes/dynamicPage.ts` with a `GET /` handler that reads `relativeUrl` from `req.query`
- [x] 1.2 Return `400 { error: "relativeUrl is required" }` when `relativeUrl` is missing
- [x] 1.3 Return the dummy content-page fixture (type, slug, title, meta, blocks array with hero + rich-text) for any provided `relativeUrl`

## 2. Server Wiring

- [x] 2.1 Import `dynamicPageRouter` in `apps/api/src/index.ts`
- [x] 2.2 Mount the router at `/getDynamicPage` (`app.use("/getDynamicPage", dynamicPageRouter)`)

## 3. Verification

- [x] 3.1 Run the dev server (`pnpm --filter api dev`) and confirm `GET /getDynamicPage?relativeUrl=content-page` returns the expected JSON
- [x] 3.2 Confirm `GET /getDynamicPage` (no param) returns `400` with error message
