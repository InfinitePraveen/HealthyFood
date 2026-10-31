from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_missing_medication_verification_fails_safe():
    response = client.post("/v1/interactions/evaluate", json={
        "medications": ["warfarin"], "foods": ["spinach"], "medication_data_complete": False
    })
    assert response.status_code == 200
    assert response.json()["status"] == "UNVERIFIED"

def test_illustrative_rule_match_requires_review():
    response = client.post("/v1/interactions/evaluate", json={
        "medications": ["warfarin"], "foods": ["spinach"], "medication_data_complete": True
    })
    assert response.status_code == 200
    assert response.json()["status"] == "REVIEW_REQUIRED"
    assert response.json()["matches"][0]["id"] == "DEMO-WARFARIN-VITK"

def test_no_match_is_not_a_safety_clearance():
    response = client.post("/v1/interactions/evaluate", json={
        "medications": ["unknown"], "foods": ["rice"], "medication_data_complete": True
    })
    assert response.json()["status"] == "NO_DEMO_RULE_MATCH"
    assert "does not establish" in response.json()["explanation"]
