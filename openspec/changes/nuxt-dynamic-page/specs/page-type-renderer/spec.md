## ADDED Requirements

### Requirement: PageRenderer dispatches to the correct page component
The system SHALL provide a `PageRenderer` component that accepts a page payload and renders the appropriate page-type component based on `page.type` using a component registry map.

#### Scenario: Known page type renders correct component
- **WHEN** `PageRenderer` receives a payload with `type: "content-page"`
- **THEN** it SHALL render the `ContentPage` component, passing the full page payload as props

#### Scenario: Unknown page type renders fallback
- **WHEN** `PageRenderer` receives a payload with an unrecognised `type`
- **THEN** it SHALL render a visible fallback message (e.g., "Unknown page type: <type>") instead of crashing

### Requirement: ContentPage renders its blocks via a block registry
The `ContentPage` component SHALL iterate over `page.blocks` and render each block using a block component registry keyed by `block.type`.

#### Scenario: Hero block renders
- **WHEN** `page.blocks` contains a block with `type: "hero"`
- **THEN** `ContentPage` SHALL render the `HeroBlock` component with the block data

#### Scenario: Rich-text block renders
- **WHEN** `page.blocks` contains a block with `type: "rich-text"`
- **THEN** `ContentPage` SHALL render the `RichTextBlock` component with the block data

#### Scenario: Unknown block type renders fallback
- **WHEN** `page.blocks` contains a block with an unrecognised `type`
- **THEN** `ContentPage` SHALL render a fallback (e.g., empty div or "Unknown block") instead of crashing

### Requirement: Adding a new page type requires only a registry entry and a component
The architecture SHALL be designed so that registering a new page type requires only: (1) creating a new Vue component, (2) adding one entry to the `PageRenderer` component registry. No other files SHALL need modification.

#### Scenario: New page type can be added without modifying the catch-all route
- **WHEN** a developer adds a new component and registers it in `PageRenderer`
- **THEN** the catch-all route SHALL render the new page type without any changes to `[...slug].vue`
