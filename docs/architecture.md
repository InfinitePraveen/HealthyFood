# Architecture Overview

## Bounded contexts

- Identity and access: users, roles, tenant context, MFA, provider federation.
- Patient profile: coded conditions, allergies, medications, labs, provenance and consent.
- Clinical governance: guidelines, immutable meal-plan versions, approvals, interaction evaluations.
- Menu and kitchen: recipes, ingredient quantities, nutrient computation, allergen derivation, menu review.
- Ordering and payments: cart, order snapshots, benefit ledger, processor token references.
- Delivery and food safety: dispatch, proof of delivery, temperature telemetry, HACCP records, lot traceability.
- Integrations: FHIR R4, HL7 v2, X12 clearinghouse, notification providers.
- Compliance and audit: append-only access records, BAA registry, incidents, records requests.

## Trust boundaries

1. Internet-facing clients terminate at a WAF/load balancer.
2. Authenticated API requests carry tenant and actor context.
3. PHI services are isolated from kitchen and rider projections.
4. Clinical evaluation is deterministic, versioned, and separately deployable.
5. Third-party integrations receive only minimum-necessary data.
6. Audit archives are isolated from application write access.

## Production data flow

Patient/EHR inputs -> provenance and normalization -> clinician-reviewed plan -> approved recipe and nutrient data -> deterministic evaluation -> clinician-visible explanation -> order snapshot -> kitchen minimum-necessary instructions -> delivery evidence.

## Key design constraints

- UUID v7 identifiers, tenant_id on PHI records, PostgreSQL RLS.
- Published guidelines and approved recipe versions are immutable.
- Every clinical result records input snapshot, rule version, output, and reviewer/override metadata.
- Missing data yields UNVERIFIED, not a safe result.
- No PHI in URLs, client analytics, logs, maps, or notification payloads.
- Dev/staging/prod are isolated; synthetic data only outside production.
