## ADDED Requirements

### Requirement: /getting-started screenshot matches baseline
The system SHALL capture a full-page screenshot of `/getting-started` in Chromium at 1280×720 and compare it pixel-for-pixel against a committed baseline image.

#### Scenario: Baseline is generated on first run
- **WHEN** no baseline image exists and `playwright test` is run with `--update-snapshots`
- **THEN** a PNG baseline file SHALL be written to `screenshots/__snapshots__/`

#### Scenario: Screenshot matches baseline
- **WHEN** `playwright test` is run with both servers running and a baseline exists
- **THEN** the captured screenshot SHALL match the baseline within the configured pixel threshold
- **THEN** the test SHALL pass

#### Scenario: Screenshot diverges from baseline
- **WHEN** a visual change causes the screenshot to differ from the baseline
- **THEN** the test SHALL fail with a diff image showing the changed pixels

### Requirement: /content-page screenshot matches baseline
The system SHALL capture a full-page screenshot of `/content-page` in Chromium at 1280×720 and compare it against a committed baseline.

#### Scenario: Screenshot matches baseline
- **WHEN** `playwright test` is run with both servers running and a baseline exists
- **THEN** the captured screenshot of `/content-page` SHALL match the baseline within threshold

#### Scenario: Visual regression is detected
- **WHEN** a component or style change alters the visual output of `/content-page`
- **THEN** the screenshot test SHALL fail and indicate which pixels changed

### Requirement: Screenshot tests are runnable via a dedicated script
The `apps/nuxt` package SHALL expose a `"test:screenshots"` script that invokes `playwright test`.

#### Scenario: Script runs the screenshot suite
- **WHEN** `pnpm --filter nuxt test:screenshots` is executed with both servers running
- **THEN** all screenshot tests SHALL run and pass (or fail with a visual diff if baselines differ)

### Requirement: Baselines are updateable intentionally
Developers SHALL be able to update baseline images by running `playwright test --update-snapshots`.

#### Scenario: Intentional baseline update
- **WHEN** `pnpm --filter nuxt test:screenshots -- --update-snapshots` is run
- **THEN** the existing baseline PNG files SHALL be overwritten with the new screenshots
