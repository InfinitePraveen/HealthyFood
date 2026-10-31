# Contributing to HealthyFood

Thank you for considering a contribution.

## Development principles

1. Never use real patient data in development, tests, screenshots, issues, or pull requests.
2. Do not add clinical rules, thresholds, or patient-facing safety claims without documented clinical review.
3. Preserve explainability: clinical outputs must include rule identifiers, versions, rationale, and source metadata.
4. Fail safely: unknown or incomplete inputs must not silently pass as safe.
5. Keep PHI out of logs, URLs, analytics, telemetry labels, and external service metadata.
6. Add tests for every behavior change.

## Pull request checklist

- [ ] Tests pass locally.
- [ ] No secrets or real PHI are included.
- [ ] API changes update OpenAPI documentation.
- [ ] Database changes include reversible migrations where practical.
- [ ] Security impact is described.
- [ ] Clinical impact is explicitly stated; clinical changes include reviewer and evidence references.
- [ ] Accessibility has been considered for UI changes.

## Local setup

Follow the Quick start in `README.md`. Use synthetic data only.
