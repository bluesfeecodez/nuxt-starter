## 1. Block Components

- [x] 1.1 Create `apps/nuxt/app/components/HeroBlock.vue` — accepts `heading`, `subheading`, `ctaLabel`, `ctaUrl` props and renders them
- [x] 1.2 Create `apps/nuxt/app/components/RichTextBlock.vue` — accepts `content` (HTML string) prop and renders it with `v-html`

## 2. Page Components

- [x] 2.1 Create `apps/nuxt/app/components/ContentPage.vue` — accepts the full page payload as `page` prop, defines a `blockComponents` registry (`hero` → `HeroBlock`, `rich-text` → `RichTextBlock`), loops `page.blocks` and renders each via `<component :is="...">` with a fallback for unknown block types

## 3. Page Renderer

- [x] 3.1 Create `apps/nuxt/app/components/PageRenderer.vue` — accepts `page` prop, defines a `pageComponents` registry (`content-page` → `ContentPage`), renders via `<component :is="...">` and shows an "Unknown page type" fallback for unregistered types

## 4. Catch-All Route

- [x] 4.1 Create `apps/nuxt/app/pages/[...slug].vue` — joins the slug array into a `relativeUrl` string, calls `useFetch` against `${apiBase}/getDynamicPage?relativeUrl=${relativeUrl}`, renders loading / error states and passes the result to `<PageRenderer>`

## 5. Verification

- [x] 5.1 Start both dev servers (`pnpm --filter api dev` + `pnpm --filter nuxt dev`) and navigate to `http://localhost:3000/content-page` — confirm the hero and rich-text blocks render correctly
- [x] 5.2 Navigate to an unknown path (e.g. `/unknown-type`) and confirm no crash, a visible fallback is shown
