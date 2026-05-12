## ADDED Requirements

### Requirement: /getting-started renders correctly end-to-end
The E2E suite SHALL verify that navigating to `/getting-started` with both servers running renders the Getting Started page content in the browser.

#### Scenario: Getting Started page title is visible
- **WHEN** the browser navigates to `/getting-started`
- **THEN** the page SHALL contain an `h1` element with text "Getting Started"

#### Scenario: Steps are rendered
- **WHEN** the browser navigates to `/getting-started`
- **THEN** the page SHALL contain at least one step title from the fixture

### Requirement: /content-page renders correctly end-to-end
The E2E suite SHALL verify that `/content-page` renders the hero block.

#### Scenario: Hero heading is visible
- **WHEN** the browser navigates to `/content-page`
- **THEN** the page SHALL contain the hero heading text "Hero Heading"

### Requirement: Unknown routes do not crash the app
The E2E suite SHALL verify that navigating to a route with no matching BFF fixture results in a handled error state, not an unhandled crash.

#### Scenario: Unknown path shows error state
- **WHEN** the browser navigates to `/this-page-does-not-exist`
- **THEN** the page SHALL not throw an unhandled JavaScript error
- **THEN** the page SHALL render some visible content (error message or fallback)

### Requirement: E2E tests run with both servers available
E2E tests SHALL be configured to run against a live Nuxt dev server (started by `@nuxt/test-utils`) with the API server also available at `http://localhost:3002`.

#### Scenario: E2E suite passes when servers are running
- **WHEN** the API server is running and `pnpm --filter nuxt test:e2e` is executed
- **THEN** all E2E scenarios SHALL pass
