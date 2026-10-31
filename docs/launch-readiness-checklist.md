# Launch Readiness Checklist

A release is not production-ready until all applicable items have objective evidence and accountable owners.

## Product and clinical
- [ ] RDN/MD governance model and sign-off policies approved.
- [ ] Licensed drug-food knowledge base selected and licensed.
- [ ] Clinical rule library reviewed, signed, versioned, and validated against golden cases.
- [ ] Nutrient data sources, recipe yields, cook-loss factors, and allergen controls validated.
- [ ] FDA CDS/SaMD regulatory assessment documented by qualified counsel.
- [ ] Patient-facing copy, accessibility, translations, and adverse-event workflows reviewed.

## Security and HIPAA
- [ ] HIPAA role determination and BAAs executed.
- [ ] Security Risk Analysis and risk register completed.
- [ ] MFA, RBAC/ABAC, tenant isolation, RLS, and break-glass controls tested.
- [ ] Encryption, KMS key separation, secrets management, and rotation tested.
- [ ] PHI redaction tests pass for logs, traces, analytics, notifications, URLs, and third parties.
- [ ] Append-only audit storage and integrity verification operational.
- [ ] Workforce training, incident response, breach workflow, and access reviews evidenced.
- [ ] Independent penetration test has zero open critical/high findings.

## Food safety and operations
- [ ] Every kitchen license, insurance, HACCP plan, and training record verified.
- [ ] Digital receiving, cook, chill, holding, sanitation, and corrective-action logs tested.
- [ ] Calibrated BLE logger certificates and device lifecycle established.
- [ ] Cold-chain excursion hold/replacement workflow tested.
- [ ] Lot traceability and recall drill completed.
- [ ] Delivery partner training, privacy restrictions, and incident procedures verified.

## Integrations and payments
- [ ] EHR SMART on FHIR / FHIR R4 sandbox tests pass.
- [ ] Clearinghouse eligibility, claims, and remittance round trips validated.
- [ ] Payment processor PCI scope confirmed; no card data stored by HealthyFood.
- [ ] BAAs and data-processing terms verified for every applicable vendor.

## Reliability and launch
- [ ] Load, soak, chaos, and dependency-outage tests pass.
- [ ] RPO <= 5 minutes and RTO <= 1 hour demonstrated by restore/failover tests.
- [ ] On-call, SLO dashboards, rollback, and cost guardrails operational.
- [ ] Pilot contract and operational staffing in place.
- [ ] Pilot dry-run cold-chain compliance >= 98%.
- [ ] Daily safety review and KPI reporting staffed for first 30 days.
