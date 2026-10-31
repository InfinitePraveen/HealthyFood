# Security and Privacy Baseline

This document is a control plan, not evidence that HealthyFood is HIPAA compliant.

## Required before PHI

- Determine HIPAA covered-entity/business-associate roles per contract with counsel.
- Execute BAAs with every applicable covered entity and PHI-touching subprocessor.
- Complete and maintain a documented Security Risk Analysis and remediation register.
- Implement workforce training, policies, incident response, contingency plans, and access reviews.
- Enforce MFA, least privilege, tenant isolation, relationship-based provider access, and audited break-glass.
- Encrypt transport and storage; use customer-managed KMS keys and field-level envelope encryption for high-risk identifiers.
- Use append-only, tamper-evident audit storage with the applicable retention schedule.
- Redact PHI from logs, traces, metrics, analytics, notifications, email subjects, URLs, and map services.
- Test backup restoration, disaster recovery, vulnerability response, penetration testing, and secure SDLC.
- Do not use production PHI in development, staging, or CI.

## Repository limitations

The pilot does not yet implement production authentication, authorization, RLS enforcement, field-level encryption, key management, immutable audit logging, or a BAA registry. It must not receive real PHI.
