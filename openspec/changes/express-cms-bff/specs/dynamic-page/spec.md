## ADDED Requirements

### Requirement: Resolve page by relative URL
The system SHALL expose a `GET /getDynamicPage` endpoint that accepts a `relativeUrl` query parameter and returns a structured content-page payload.

#### Scenario: Valid relativeUrl returns page data
- **WHEN** a `GET /getDynamicPage?relativeUrl=content-page` request is made
- **THEN** the response status SHALL be `200`
- **THEN** the response body SHALL include `{ type: "content-page", slug: "content-page", title: <string>, blocks: <array>, meta: <object> }`

#### Scenario: Missing relativeUrl returns 400
- **WHEN** a `GET /getDynamicPage` request is made without a `relativeUrl` query parameter
- **THEN** the response status SHALL be `400`
- **THEN** the response body SHALL include `{ error: "relativeUrl is required" }`

### Requirement: Content-page response shape
The dummy content-page payload SHALL match the following structure so the frontend can build against it before real CMS integration.

#### Scenario: Response payload structure
- **WHEN** a valid `GET /getDynamicPage?relativeUrl=content-page` request is made
- **THEN** the response body SHALL match:
  ```json
  {
    "type": "content-page",
    "slug": "content-page",
    "title": "Welcome to the Content Page",
    "meta": {
      "description": "A sample CMS-driven content page",
      "canonicalUrl": "/content-page"
    },
    "blocks": [
      {
        "type": "hero",
        "heading": "Hero Heading",
        "subheading": "Hero subheading text",
        "ctaLabel": "Get Started",
        "ctaUrl": "/get-started"
      },
      {
        "type": "rich-text",
        "content": "<p>This is a rich text block from the CMS.</p>"
      }
    ]
  }
  ```
