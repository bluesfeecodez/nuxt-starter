## ADDED Requirements

### Requirement: PageRenderer dispatches getting-started-page type
The system SHALL render the `GettingStartedPage` component when `PageRenderer` receives a page payload with `type: "getting-started-page"`.

#### Scenario: getting-started-page type renders GettingStartedPage
- **WHEN** `PageRenderer` receives a payload with `type: "getting-started-page"`
- **THEN** it SHALL render the `GettingStartedPage` component
- **THEN** it SHALL NOT render the "Unknown page type" fallback

### Requirement: GettingStartedPage renders title, intro, and steps
The `GettingStartedPage` component SHALL render the page `title`, `intro` text, and a numbered list of `steps`, each showing its `title` and `description`.

#### Scenario: Title and intro are visible
- **WHEN** `GettingStartedPage` receives a page with `title` and `intro`
- **THEN** it SHALL render the title as a heading
- **THEN** it SHALL render the intro as a paragraph

#### Scenario: Steps list is rendered
- **WHEN** `GettingStartedPage` receives a page with a non-empty `steps` array
- **THEN** it SHALL render each step's `number`, `title`, and `description`

#### Scenario: Navigating to /getting-started renders the page
- **WHEN** the user navigates to `/getting-started` in the browser
- **THEN** the catch-all route SHALL fetch from the BFF and render `GettingStartedPage` without errors
