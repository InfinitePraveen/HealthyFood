# Clinical Governance and Safety

## Non-negotiable controls

- The software supports licensed RDNs and physicians; it does not autonomously prescribe.
- Every meal plan requires the configured clinician sign-off before activation.
- Clinical rules must be versioned, cited, evidence-graded, reviewed, and signed.
- A clinician must be able to inspect the basis for every warning.
- Unknown medication or incomplete profile data must be visibly unverified.
- Every override requires a reason and immutable audit event.

## Rule lifecycle

1. Author proposes a rule with source, evidence level, effective date, and intended population.
2. RDN/pharmacist/physician reviewers assess clinical meaning and patient-facing language.
3. QA tests the rule against a golden dataset, boundary cases, missing data, and regressions.
4. Clinical governance approves and signs a version.
5. Release is staged, monitored, and reversible.
6. Retired versions remain available to reconstruct historical decisions.

## Current repository status

`services/clinical-engine/app/rules.py` contains demonstration fixtures only. They are intentionally labeled as non-clinical. They must be replaced with licensed and clinically reviewed content before any real patient use.

## Required validation

- Nutrient calculation accuracy and source provenance.
- Ingredient substitutions, cooking yield and cook-loss factors.
- Allergen derivation and cross-contact controls.
- Drug-food rule coverage and false-negative analysis.
- Clinician usability and independent review of warning rationale.
- Hazard analysis and regulatory assessment of clinical decision support.
