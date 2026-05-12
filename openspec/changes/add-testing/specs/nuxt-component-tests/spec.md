## ADDED Requirements

### Requirement: PageRenderer dispatch logic is tested
`PageRenderer` SHALL be covered by unit tests verifying that the component registry correctly dispatches to child components by `page.type`.

#### Scenario: Known type renders the registered component
- **WHEN** `PageRenderer` is mounted with `page.type = "content-page"`
- **THEN** the `ContentPage` component SHALL be rendered

#### Scenario: Unknown type renders the fallback
- **WHEN** `PageRenderer` is mounted with `page.type = "unknown-xyz"`
- **THEN** a fallback element SHALL be rendered containing "Unknown page type"

### Requirement: GettingStartedPage renders its content
`GettingStartedPage` SHALL be covered by a unit test verifying title, intro, and steps render correctly.

#### Scenario: Title and intro are rendered
- **WHEN** `GettingStartedPage` is mounted with a page payload containing `title` and `intro`
- **THEN** the rendered output SHALL contain the title text and intro text

#### Scenario: Steps list is rendered
- **WHEN** `GettingStartedPage` is mounted with a `steps` array
- **THEN** the rendered output SHALL contain each step's title and description

### Requirement: Block components render their props
`HeroBlock` and `RichTextBlock` SHALL each have a unit test verifying their props are rendered.

#### Scenario: HeroBlock renders heading and CTA
- **WHEN** `HeroBlock` is mounted with `heading`, `subheading`, `ctaLabel`, and `ctaUrl`
- **THEN** the rendered output SHALL contain the heading text and a link with the CTA label

#### Scenario: RichTextBlock renders HTML content
- **WHEN** `RichTextBlock` is mounted with `content="<p>Hello</p>"`
- **THEN** the rendered output SHALL contain a `<p>` element with text "Hello"

### Requirement: Nuxt component tests run via vitest
`apps/nuxt` SHALL have `@vue/test-utils` and `happy-dom` added as dev dependencies and a `vitest.config.ts` configured for the `happy-dom` environment.

#### Scenario: Component tests pass standalone
- **WHEN** `pnpm --filter nuxt test` is run
- **THEN** all component unit tests SHALL pass without a running server
