# API Contract (Pilot)

Base URL: `http://localhost:3001`

## GET /health
Returns service status and confirms synthetic-only mode.

## GET /v1/menu?q={query}
Returns sample menu items. Does not perform patient-specific clinical filtering.

## POST /v1/orders
Example request:

```json
{
  "customerReference": "SYNTHETIC-DEMO-CUSTOMER",
  "itemIds": ["meal-001"],
  "totalCents": 1299
}
```

Creates an in-memory demonstration order. It does not persist to PostgreSQL or collect payment.

## GET /v1/orders/{id}
Returns a demonstration order created by this running API process.

## POST /v1/orders/{id}/acknowledge-warnings
Example request:

```json
{"acknowledgementText":"I have read the demonstration notice."}
```

Records a demo acknowledgement in process memory only. This is not a clinical consent or legal signature.

## POST /v1/interactions/evaluate
Proxies to the clinical engine. Example:

```json
{
  "medications": ["warfarin"],
  "foods": ["spinach"],
  "medication_data_complete": true
}
```

The result is illustrative and requires clinician review. `UNVERIFIED` is returned when medication data is not explicitly marked complete.
