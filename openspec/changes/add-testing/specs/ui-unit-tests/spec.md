## ADDED Requirements

### Requirement: BaseButton is covered by unit tests
The `packages/ui` package SHALL have Vitest unit tests for `BaseButton` using `@vue/test-utils` and a `happy-dom` environment.

#### Scenario: Label prop renders
- **WHEN** `BaseButton` is mounted with `label="Click me"`
- **THEN** the rendered output SHALL contain the text "Click me"

#### Scenario: Primary variant applies correct class
- **WHEN** `BaseButton` is mounted with `variant="primary"`
- **THEN** the button element SHALL have a class indicating the primary variant

#### Scenario: Secondary variant applies correct class
- **WHEN** `BaseButton` is mounted with `variant="secondary"`
- **THEN** the button element SHALL have a class indicating the secondary variant

#### Scenario: Disabled prop sets disabled attribute
- **WHEN** `BaseButton` is mounted with `disabled=true`
- **THEN** the button element SHALL have the `disabled` attribute

### Requirement: packages/ui has test infrastructure
The `packages/ui` package SHALL have `vitest`, `@vue/test-utils`, and `happy-dom` as dev dependencies, a `vitest.config.ts`, and a `"test": "vitest run"` script so `turbo run test` picks it up.

#### Scenario: Test suite runs standalone
- **WHEN** `pnpm --filter @repo/ui test` is run
- **THEN** all tests SHALL pass
