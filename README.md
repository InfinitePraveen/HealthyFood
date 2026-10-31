# HealthyFood

India's First Medically Tailored Meal (MTM) Delivery Platform.

HealthyFood connects patients, clinicians, commercial kitchens, and delivery partners through a clinically governed meal-planning and fulfillment workflow.

> **Safety and compliance notice:** This repository is a software pilot foundation. It is not a medical device determination, clinical validation, HIPAA certification, food-safety certification, payer integration approval, or legal advice. Do not use real protected health information (PHI), prescribe diets, or make patient-care decisions with this software until the required clinical, security, legal, operational, and regulatory reviews are complete.

## Included in this repository

- `apps/api`: NestJS modular API starter with health endpoint, menu, orders, and warning acknowledgement examples.
- `apps/web`: Next.js customer-facing pilot UI.
- `services/clinical-engine`: FastAPI deterministic rule-evaluation service with explicit `UNVERIFIED` behavior.
- `infra`: local Docker Compose environment and PostgreSQL schema.
- `docs`: architecture, threat-model starter, launch checklist, clinical governance, and deployment runbook.
- `.github/workflows`: CI for API, clinical engine, and web application.

This is a launchable **technical pilot foundation**, not the complete 9–12-month platform described in the requirements document. EHR/FHIR, payer claims, BLE cold-chain devices, real payments, production identity, and audited HIPAA operations require partner credentials, BAAs, hardware, and validation.

## Architecture

```text
Customer / Kitchen / Provider / Admin Web
                 |
             Next.js
                 |
        NestJS modular API
          /          \
   PostgreSQL       Redis (optional)
          |
   FastAPI Clinical Engine
   - nutrient evaluation
   - deterministic interaction rules
   - rule version provenance
```

The clinical engine is deliberately deterministic and explainable. Rules in `services/clinical-engine/app/rules.py` are illustrative development fixtures only. They are not a licensed drug-interaction database and must not be used to determine whether a real meal is safe for a patient.

## Requirements

- Node.js 20+
- Python 3.11+
- Docker Desktop / Docker Engine
- npm 10+

## Quick start

1. Copy environment examples:

   ```bash
   cp .env.example .env
   ```

2. Start PostgreSQL:

   ```bash
   docker compose -f infra/docker-compose.yml up -d db
   ```

3. Start the clinical engine:

   ```bash
   cd services/clinical-engine
   python -m venv .venv
   # Windows PowerShell: .venv\Scripts\Activate.ps1
   # macOS/Linux: source .venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8001
   ```

4. Start the API in a second terminal:

   ```bash
   cd apps/api
   npm install
   npm run start:dev
   ```

5. Start the web app in a third terminal:

   ```bash
   cd apps/web
   npm install
   npm run dev
   ```

6. Open `http://localhost:3000`. API health: `http://localhost:3001/health`. Clinical engine docs: `http://localhost:8001/docs`.

## Environment

See `.env.example` and each app's `.env.example`. Never commit secrets. The defaults are for local development with synthetic data only.

## API overview

| Method | Route | Purpose |
|---|---|---|
| GET | `/health` | API health |
| GET | `/v1/menu` | Pilot menu catalogue |
| POST | `/v1/orders` | Create a synthetic-data pilot order |
| POST | `/v1/orders/:id/acknowledge-warnings` | Record warning acknowledgement |
| POST | `/v1/interactions/evaluate` | Proxy to deterministic clinical engine |

OpenAPI is available at `/api/docs`.

## Clinical safety design

- Meal plans are not activated by this pilot; clinical sign-off must be implemented and governed before patient use.
- Missing or unknown medication information must never be interpreted as safe. The engine returns `UNVERIFIED`.
- Every illustrative rule includes a version and rationale.
- A production implementation must persist the exact input snapshot, rule version, output, clinician review, and override reason.
- Patient-facing warning copy and all clinical thresholds require review by licensed clinicians and counsel.

## Data and privacy

- Use only synthetic test records.
- Do not put PHI in URLs, logs, analytics, push notifications, email subjects, or maps.
- The sample app does not implement production authentication, MFA, tenant isolation, encryption key management, audit retention, or BAA workflows.
- Before production: implement the controls in `docs/launch-readiness-checklist.md` and complete a documented security risk analysis.

## Tests

Clinical engine:

```bash
cd services/clinical-engine
pip install -r requirements-dev.txt
pytest
```

API:

```bash
cd apps/api
npm install
npm test
```

Web:

```bash
cd apps/web
npm install
npm run build
```

## Deployment

See `docs/deployment.md`. The included Docker Compose file is for local development only. Production deployment must use isolated AWS accounts/environments, private networking, managed secrets, KMS encryption, immutable audit storage, monitoring, tested backups, and only AWS services covered by the applicable BAA.

## Roadmap aligned to the source blueprint

1. Core architecture, identity, tenant controls, audit, consent, clinical engine.
2. Customer ordering and kitchen recipe/menu workflows.
3. Rider delivery, clinician approval portal, FHIR integration, cold-chain telemetry.
4. Independent security and clinical validation, compliance evidence, pilot rollout.

The source blueprint estimates 9–12 months for a production-grade launch and recommends one health-system pilot with 2–3 kitchens.

## Contributing

See `CONTRIBUTE.md`. All contributions affecting clinical rules, allergens, nutrient calculations, security, or PHI handling require additional review.

## License

Apache-2.0. See `LICENSE`.
