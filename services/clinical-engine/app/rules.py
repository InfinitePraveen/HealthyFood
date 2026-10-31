"""Illustrative development rules only; not a clinical knowledge base.

Do not use these fixtures to make real patient-care decisions. Production rules
require licensed content, source citations, clinical review, version control,
validation datasets, and regulatory assessment.
"""

RULE_VERSION = "illustrative-0.1"

RULES = [
    {
        "id": "DEMO-WARFARIN-VITK",
        "medication": "warfarin",
        "food": "spinach",
        "severity": "CAUTION",
        "rationale": "Vitamin K intake may affect warfarin management; consistency is commonly emphasized.",
        "source": "DEMO_FIXTURE_NOT_FOR_CLINICAL_USE"
    },
    {
        "id": "DEMO-ACEI-POTASSIUM",
        "medication": "lisinopril",
        "food": "potassium-rich",
        "severity": "CAUTION",
        "rationale": "Some medicines affecting the renin-angiotensin system may require potassium monitoring.",
        "source": "DEMO_FIXTURE_NOT_FOR_CLINICAL_USE"
    }
]
