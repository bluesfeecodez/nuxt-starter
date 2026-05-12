## ADDED Requirements

### Requirement: getDynamicPage route is fully covered
The system SHALL have integration tests covering all branches of `GET /getDynamicPage` using supertest against the real Express router.

#### Scenario: Missing relativeUrl returns 400
- **WHEN** `GET /getDynamicPage` is called without a `relativeUrl` query parameter
- **THEN** the test SHALL assert status `400` and body `{ error: "relativeUrl is required" }`

#### Scenario: Known slug returns correct fixture
- **WHEN** `GET /getDynamicPage?relativeUrl=content-page` is called
- **THEN** the test SHALL assert status `200` and `body.type === "content-page"`

#### Scenario: Getting-started slug returns correct fixture
- **WHEN** `GET /getDynamicPage?relativeUrl=getting-started` is called
- **THEN** the test SHALL assert status `200` and `body.type === "getting-started-page"`

#### Scenario: Unknown slug returns 404
- **WHEN** `GET /getDynamicPage?relativeUrl=does-not-exist` is called
- **THEN** the test SHALL assert status `404` and body `{ error: "Page not found" }`

### Requirement: Health route is covered
The system SHALL have a test for `GET /health`.

#### Scenario: Health check returns ok
- **WHEN** `GET /health` is called
- **THEN** the test SHALL assert status `200` and `body.status === "ok"`

### Requirement: API test suite runs via pnpm test
The `apps/api` package SHALL have a `vitest.config.ts` and a passing `pnpm test` (or `vitest run`) invocation with no DOM environment required.

#### Scenario: Tests pass in CI
- **WHEN** `pnpm --filter api test` is run
- **THEN** all tests SHALL pass without requiring a running server or browser
