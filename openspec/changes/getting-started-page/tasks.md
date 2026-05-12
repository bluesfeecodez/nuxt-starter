## 1. BFF — Fixture and Routing

- [x] 1.1 Add `gettingStartedFixture` object to `apps/api/src/routes/dynamicPage.ts` with `type: "getting-started-page"`, `slug`, `title`, `intro`, and `steps` array (3 steps: clone repo, install deps, start dev servers)
- [x] 1.2 Replace the single returned fixture with a `fixtures: Record<string, object>` map keyed by `relativeUrl` (`'content-page'` and `'getting-started'`)
- [x] 1.3 Update the handler to look up `fixtures[relativeUrl as string]` and return `404 { error: "Page not found" }` if not found

## 2. Nuxt Component

- [x] 2.1 Create `apps/nuxt/app/components/GettingStartedPage.vue` — accepts `page` prop with `title`, `intro`, `steps[]`; renders title as `<h1>`, intro as `<p>`, and steps as an ordered list showing each step's number, title, and description

## 3. PageRenderer Registry

- [x] 3.1 In `apps/nuxt/app/components/PageRenderer.vue`, import `GettingStartedPage` and add `'getting-started-page': GettingStartedPage` to the `pageComponents` map

## 4. Verification

- [x] 4.1 Start both servers and confirm `curl "http://localhost:3002/getDynamicPage?relativeUrl=getting-started"` returns the fixture with `type: "getting-started-page"`
- [x] 4.2 Confirm `curl "http://localhost:3002/getDynamicPage?relativeUrl=unknown"` returns `404 { "error": "Page not found" }`
- [x] 4.3 Confirm `http://localhost:3000/getting-started` renders the title and steps in the browser
- [x] 4.4 Confirm `http://localhost:3000/content-page` still renders correctly (no regression)
