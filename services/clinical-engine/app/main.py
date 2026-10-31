from fastapi import FastAPI
from .rules import RULES, RULE_VERSION
from .schemas import InteractionRequest

app = FastAPI(
    title="HealthyFood Clinical Engine",
    version="0.1.0",
    description="Illustrative deterministic engine. Not for clinical use."
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "clinical-engine", "rule_version": RULE_VERSION}

@app.post("/v1/interactions/evaluate")
def evaluate(payload: InteractionRequest):
    meds = {m.strip().lower() for m in payload.medications if m.strip()}
    foods = {f.strip().lower() for f in payload.foods if f.strip()}

    if not payload.medication_data_complete:
        return {
            "status": "UNVERIFIED",
            "rule_version": RULE_VERSION,
            "matches": [],
            "explanation": "Medication information is incomplete or not verified. No safety conclusion can be made."
        }

    matches = []
    for rule in RULES:
        med_match = rule["medication"] in meds
        food_match = rule["food"] in foods or (rule["food"] == "potassium-rich" and "potassium-rich" in foods)
        if med_match and food_match:
            matches.append(rule)

    return {
        "status": "REVIEW_REQUIRED" if matches else "NO_DEMO_RULE_MATCH",
        "rule_version": RULE_VERSION,
        "matches": matches,
        "explanation": (
            "Illustrative rule match only. A licensed clinician must independently review the result."
            if matches else
            "No illustrative rule matched. This does not establish that the meal is safe."
        )
    }
