## ADDED Requirements

### Requirement: Catch-all route fetches page data by URL
The system SHALL provide a catch-all Nuxt page at `pages/[...slug].vue` that constructs a `relativeUrl` from the route slug and fetches page data from the BFF endpoint `GET /getDynamicPage?relativeUrl=<slug>`.

#### Scenario: Single-segment slug resolves correctly
- **WHEN** the user navigates to `/content-page`
- **THEN** the page SHALL call `GET /getDynamicPage?relativeUrl=content-page`
- **THEN** the page SHALL render without errors

#### Scenario: Nested slug joins segments with slash
- **WHEN** the user navigates to `/section/sub-page`
- **THEN** the page SHALL call `GET /getDynamicPage?relativeUrl=section/sub-page`

### Requirement: Loading and error states are handled
The page SHALL display a loading indicator while the BFF request is in-flight and a visible error message if the request fails.

#### Scenario: Request in-flight
- **WHEN** the BFF request has not yet resolved
- **THEN** the page SHALL render a loading state (e.g., "Loading...")

#### Scenario: Request fails
- **WHEN** the BFF returns a non-2xx response or a network error occurs
- **THEN** the page SHALL render a visible error message instead of crashing
