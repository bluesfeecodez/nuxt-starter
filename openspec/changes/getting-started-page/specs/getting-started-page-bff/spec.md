## ADDED Requirements

### Requirement: BFF serves getting-started-page fixture
The system SHALL return a `getting-started-page` typed payload when `GET /getDynamicPage?relativeUrl=getting-started` is called.

#### Scenario: getting-started slug returns correct fixture
- **WHEN** `GET /getDynamicPage?relativeUrl=getting-started` is requested
- **THEN** the response status SHALL be `200`
- **THEN** the response body SHALL include `{ type: "getting-started-page", slug: "getting-started", title: <string>, intro: <string>, steps: <array> }`

#### Scenario: getting-started fixture steps are well-formed
- **WHEN** `GET /getDynamicPage?relativeUrl=getting-started` is requested
- **THEN** each item in `steps` SHALL include `number` (integer), `title` (string), and `description` (string)

### Requirement: BFF returns 404 for unknown slugs
The system SHALL return `404 { error: "Page not found" }` for any `relativeUrl` that has no registered fixture.

#### Scenario: Unknown slug returns 404
- **WHEN** `GET /getDynamicPage?relativeUrl=does-not-exist` is requested
- **THEN** the response status SHALL be `404`
- **THEN** the response body SHALL be `{ "error": "Page not found" }`

#### Scenario: Existing slugs still work after routing change
- **WHEN** `GET /getDynamicPage?relativeUrl=content-page` is requested
- **THEN** the response status SHALL still be `200`
- **THEN** the response body SHALL still include `{ type: "content-page" }`
