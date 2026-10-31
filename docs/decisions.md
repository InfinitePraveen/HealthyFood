# Architecture Decision Records

## ADR-001: Deterministic clinical rules
**Decision:** Use a deterministic, versioned rule engine rather than opaque ML for food-drug interaction evaluation.

**Reason:** Each result must be explainable, reproducible, auditable, and independently reviewable by a clinician.

## ADR-002: Separate clinical service
**Decision:** Keep nutrition computation and interaction evaluation in a separately versioned FastAPI service.

**Reason:** Isolated validation, deployment, and release controls reduce coupling between clinical logic and commerce workflows.

## ADR-003: Synthetic-only pilot
**Decision:** All included fixtures and demo flows use synthetic data.

**Reason:** Production PHI requires operational safeguards, BAAs, and a complete security program that are outside this starter repository.
