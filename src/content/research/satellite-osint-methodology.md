
---
title: "Satellite OSINT: Analysing Public Orbital Data from the ISS"
description: "An evidence-focused study of a historical ISS orbital-data record, examining source provenance, a derived orbital-period calculation, analytical confidence, and the limits of satellite OSINT."
category: "satellite-security"
status: "in-progress"
evidenceType: "public-source"
publishedAt: 2026-11-17
topics:
  - "Satellite OSINT"
  - "International Space Station"
  - "CelesTrak"
  - "Orbital Data"
  - "Evidence Provenance"
  - "Source Validation"
tools: []
featured: true
draft: true

methodology:
  objective: >-
    Evaluate a historical public ISS orbital-data record, derive an
    approximate orbital period from its reported mean motion, and
    document the provenance and evidential limits of the analysis.
  scope: >-
    Desk-based analysis of public documentation and a third-party
    reproduction of historical ISS General Perturbations data.
    No original orbital-data capture, direct spacecraft observation,
    SGP4 propagation, telemetry acquisition, radio interception,
    or security testing.
  environment: >-
    Public CelesTrak technical documentation and a historical ISS
    GP JSON response reproduced by a third-party technical reference.
    No independent data-collection or orbital-propagation environment
    is claimed.
  approach: >-
    Establish the spacecraft's catalogue identity, distinguish official
    documentation from third-party reproduced data, record the reported
    element epoch and retrieval date, calculate an approximate period
    from mean motion, and assess the conclusions supported by the
    available evidence.
  assumptions:
    - "The third-party reference accurately reproduces the historical CelesTrak response it reports."
    - "The reported mean-motion value has been transcribed correctly."
    - "The historical element set is not representative of the current ISS orbital state."
    - "The period calculation is a first-order arithmetic interpretation, not an independent orbital observation."
  limitations:
    - "The original historical API response was not independently captured, authenticated, or preserved."
    - "The historical values are attributed to a third-party reproduction."
    - "No SGP4 propagation, ground-track calculation, or pass prediction was performed."
    - "No independent spacecraft observation or radio reception was recorded."
    - "No spacecraft telemetry, ground-station logs, command history, or security-event records were obtained."
    - "The study cannot establish the current orbital state or cybersecurity posture of the ISS."

evidence:
  - id: "ISS-PUB-001"
    description: >-
      Official CelesTrak documentation describing General Perturbations
      data formats, catalogue-number queries, and supported representations.
    type: "public-source"
    source: "https://celestrak.org/NORAD/documentation/gp-data-formats.php"
    limitations:
      - "This documentation establishes interface conventions, not an ISS observation at a particular epoch."

  - id: "ISS-PUB-002"
    description: >-
      Third-party technical reference reproducing an ISS GP JSON API
      response reportedly retrieved from CelesTrak on 21 August 2026,
      with an element epoch of 20 August 2026.
    type: "public-source"
    source: "https://bytetools.bytevancer.com/public-apis/science/celestrak-api"
    limitations:
      - "The reproduced values are not an independently archived original CelesTrak response."
      - "The reported retrieval date and orbital epoch are historical."
      - "The record does not establish the present orbital state of the ISS."

  - id: "ISS-PUB-003"
    description: >-
      CelesTrak technical guidance on SGP4 propagation and verification
      using compatible orbital data.
    type: "public-source"
    source: "https://celestrak.org/software/tutorials/sgp4-verification.php"
    limitations:
      - "The guidance is a methodological reference; no SGP4 execution is claimed in this study."

findings:
  - title: "Historical mean motion implies an approximate orbital period of 92.93 minutes"
    summary: >-
      The reproduced historical ISS record reports mean motion of
      15.49535659 revolutions per day. Dividing 1,440 minutes by
      that value gives approximately 92.93 minutes per revolution.
      This is a derived arithmetic result, not an independently
      measured orbital period.
    evidenceIds:
      - "ISS-PUB-002"
    confidence: "moderate"
    limitations:
      - "The numerical input originates from a third-party reproduction."
      - "The calculation is not an SGP4 propagation or direct observation."
      - "The result cannot establish current ISS orbital conditions or ground-station pass times."

  - title: "Public orbital elements do not establish spacecraft cybersecurity status"
    summary: >-
      GP orbital data describes parameters used in orbital modelling.
      It does not contain authenticated command histories, onboard
      security events, access records, or incident-response evidence.
      Orbital data can provide context but cannot independently
      establish a cybersecurity incident or the absence of one.
    evidenceIds:
      - "ISS-PUB-001"
      - "ISS-PUB-003"
    confidence: "high"
    limitations:
      - "This finding concerns the information available in orbital-data formats, not the actual security posture of the ISS."
      - "Security conclusions require additional operational and cybersecurity evidence."

references:
  - label: "CelesTrak — GP Data Formats"
    url: "https://celestrak.org/NORAD/documentation/gp-data-formats.php"
  - label: "CelesTrak — SGP4 Verification Tutorial"
    url: "https://celestrak.org/software/tutorials/sgp4-verification.php"
  - label: "ByteTools — Published CelesTrak API Response Example"
    url: "https://bytetools.bytevancer.com/public-apis/science/celestrak-api"
  - label: "CelesTrak — ISS GP JSON Endpoint"
    url: "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=JSON"

relatedLearning:
  - "satellite-cybersecurity"
relatedResearch: []
relatedNotes:
  - "satellite-orbital-data-basics"
---

> **Research ID:** NS-RES-001  
> **Subject:** International Space Station (ISS)  
> **NORAD catalogue number:** 25544  
> **Evidence basis:** Public documentation and a historical third-party reproduction  
> **Research status:** In progress  
> **Environment:** Desk-based source analysis  
> **Original telemetry or spacecraft access:** None

## 01 — Abstract

This study evaluates what can be established from a historical International Space Station (ISS) General Perturbations (GP) orbital-data record.

The numerical record is attributed to CelesTrak but was encountered through a third-party technical reference. This distinction determines how the evidence is classified and how confidently its values can be interpreted.

The investigation addresses four questions:

1. Can the intended spacecraft be identified unambiguously?
2. What is the provenance of the historical orbital values?
3. What calculation is supported by the reported mean motion?
4. What conclusions about satellite operations or cybersecurity would exceed the available evidence?

The central numerical result is an approximate orbital period of **92.93 minutes**, derived from the reported historical mean motion.

The result is reproducible arithmetic, not an independently measured orbit.

**Research boundary:** No original orbital-data acquisition, SGP4 propagation, satellite tracking, radio interception, telemetry collection, or security testing is claimed.

For background on orbital terminology, see [Satellite Orbital Data: Reading the Basics](/field-notes/satellite-orbital-data-basics/).

## 02 — Research Subject and Identification

The subject of this investigation is the International Space Station.

A consistent object identifier is important because orbital-data sources may use different display names.

| Attribute | Value |
| --- | --- |
| Common name | International Space Station |
| Catalogue name | ISS (ZARYA) |
| NORAD catalogue number | 25544 |
| International designator | 1998-067A |
| General orbital regime | Low Earth orbit |
| Data provider named in the source | CelesTrak |
| Representation examined | GP JSON |

The primary catalogue identifier is:

```text
NORAD_CAT_ID = 25544
```

This identifier reduces ambiguity when selecting an orbital record.

It does not authenticate the historical response or establish that its values were independently observed during this investigation.

**Assessment:** The reported catalogue number identifies the intended object. Source authenticity and numerical provenance must be evaluated separately.

## 03 — Source Selection and Provenance

The analysis relies on two distinct categories of source material.

### Official provider documentation

CelesTrak documents its GP data interface and supported output formats.

A catalogue-number query for the ISS can be expressed as:

```text
https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=JSON
```

The query parameters are:

| Parameter | Value | Purpose |
| --- | --- | --- |
| `CATNR` | `25544` | Select the ISS catalogue record |
| `FORMAT` | `JSON` | Request structured JSON output |

This URL describes how a response can be requested.

**It is not evidence that a live response was downloaded or archived for this study.**

The documentation is recorded as evidence item `ISS-PUB-001`.

### Third-party historical reproduction

The numerical values examined here come from a ByteTools technical reference that reproduces an ISS GP JSON response attributed to CelesTrak.

The reference reports:

| Provenance field | Reported information |
| --- | --- |
| Original provider | CelesTrak |
| Reproducing source | ByteTools technical reference |
| Reported retrieval date | 21 August 2026 |
| Element epoch | 20 August 2026 |
| Data representation | GP JSON |
| Original response independently archived for this study | No |

This material is recorded as `ISS-PUB-002`.

The original historical response file was not independently obtained, authenticated, or preserved.

Consequently, this article attributes the historical values to the third-party reproduction rather than presenting them as directly collected CelesTrak evidence.

### Source confidence

The official documentation establishes the intended API behaviour.

The third-party reference supplies the historical numerical input.

These sources support different claims and should not be treated as equivalent forms of evidence.

The absence of an independently preserved original response limits confidence in the provenance of the numerical record.

## 04 — Historical ISS Dataset

The selected record is historical.

Its values should not be interpreted as a description of the ISS's current orbital state.

**Reported retrieval date:** 21 August 2026

**Element epoch:** `2026-08-20T18:13:18.964992`

**Object:** ISS (ZARYA)

**Catalogue number:** `25544`

**Evidence reference:** `ISS-PUB-002`

### Reported orbital parameters

| Field | Historical reported value |
| --- | ---: |
| Mean motion | 15.49535659 rev/day |
| Eccentricity | 0.00076903 |
| Inclination | 51.633° |
| Right ascension of ascending node | 340.5034° |
| Argument of pericenter | 67.3286° |
| Mean anomaly | 292.8515° |
| BSTAR | 0.00017760953 |

A subset of the reproduced JSON fields is shown below:

```json
{
  "OBJECT_NAME": "ISS (ZARYA)",
  "NORAD_CAT_ID": 25544,
  "EPOCH": "2026-08-20T18:13:18.964992",
  "MEAN_MOTION": 15.49535659,
  "ECCENTRICITY": 0.00076903,
  "INCLINATION": 51.633
}
```

This is a **transcribed subset of the third-party reproduction**, not a complete original API-response artifact.

### Dataset interpretation

The reported inclination and eccentricity are consistent with the general characteristics expected of an ISS orbital record.

However, that contextual consistency is not independent authentication of the response.

The numerical analysis below uses only the reported mean-motion value.

Other fields are retained to document the record's structure and provide context, not to imply that a full orbital model was evaluated.

Definitions of individual orbital parameters are covered separately in [Satellite Orbital Data: Reading the Basics](/field-notes/satellite-orbital-data-basics/).

### Epoch versus retrieval date

The element epoch identifies the reference time associated with the orbital parameters.

The retrieval date is the date on which the third-party source reports obtaining the response.

Both are historical, and neither establishes when the values were independently verified by this study.

**Analytical consequence:** The record is suitable for a documented historical calculation, but not for asserting current ISS position, visibility, or orbital conditions.

## 05 — Worked Analysis: Approximate Orbital Period

The numerical question examined is:

**What approximate orbital period corresponds to the mean motion reported in the historical record?**

### Input

The third-party reproduction reports:

```text
MEAN_MOTION = 15.49535659
```

The unit is revolutions per day.

### Method

An approximate period in minutes can be derived by dividing the number of minutes in a day by mean motion:

\[
T = \frac{1440}{n}
\]

Where:

- \(T\) is approximate orbital period in minutes.
- \(n\) is mean motion in revolutions per day.

Substituting the reported value:

\[
T = \frac{1440}{15.49535659}
\]

The result is:

\[
T \approx 92.93\ \mathrm{minutes}
\]

**Derived result: approximately 92.93 minutes per revolution.**

### Reproducibility

The arithmetic can be independently checked with the following Python example:

```python
mean_motion = 15.49535659
minutes_per_day = 1440

period_minutes = minutes_per_day / mean_motion

print(f"Orbital period: {period_minutes:.2f} minutes")
```

Expected output:

```text
Orbital period: 92.93 minutes
```

This code is provided to make the calculation reproducible.

It is not a claim that the script was executed as part of the original research activity.

### What the calculation supports

The calculation establishes the approximate period implied by the reported historical mean motion.

It does not establish:

- A directly observed revolution time.
- The current orbital period of the ISS.
- The spacecraft's position at a selected time.
- A ground track or observer-relative visibility window.
- A verified ground-station contact opportunity.
- A completed SGP4 propagation.

These are different analytical tasks.

The general distinction between mean-motion arithmetic and orbital propagation is explained in the accompanying Field Note.

### Confidence assessment

The arithmetic is straightforward and reproducible from the stated input.

The input itself is attributed to a third-party reproduction of a historical response.

For that reason, the structured finding is assigned **moderate confidence**.

This confidence rating reflects the provenance limitation of the input, not a suggestion that the division is mathematically uncertain.

**Evidence linkage:** `ISS-PUB-002`

## 06 — Evidence Assessment

The study contains several kinds of information, each supporting a different level of conclusion.

| Material | Evidence classification | Available in this study |
| --- | --- | --- |
| CelesTrak API documentation | Official public-source reference | Yes |
| Historical reproduced ISS GP values | Third-party public-source data | Yes |
| Approximate orbital-period calculation | Derived arithmetic | Yes |
| Independently archived original API response | Original source artifact | No |
| SGP4 propagation output | Model-derived prediction | No |
| Direct spacecraft observation | Independent observation | No |
| Spacecraft or ground-station security logs | Operational security evidence | No |

### Finding 1 — Approximate historical orbital period

The reported mean motion corresponds to approximately **92.93 minutes per revolution**.

The derivation is transparent and repeatable.

However, the calculation inherits the provenance limitations of the reported numerical input.

**Confidence:** Moderate.

**Supporting evidence:** `ISS-PUB-002`.

### Finding 2 — Orbital data is not security-event evidence

The GP format provides parameters for orbital modelling.

It does not contain authenticated records of spacecraft access, commands, security alerts, or incident response.

Therefore, the examined data cannot independently establish a cybersecurity incident, vulnerability, or absence of compromise.

**Confidence:** High for the limited conclusion about what this data format contains.

**Supporting evidence:** `ISS-PUB-001`, `ISS-PUB-003`.

This finding is not an assessment of the actual security posture of the ISS.

### Unresolved evidence gaps

The main gaps are:

1. No independently archived original response for the historical record.
2. No first-hand confirmation of the reported retrieval event.
3. No executed propagation or prediction output.
4. No independent spacecraft observation.
5. No operational security evidence.

These gaps constrain the claims that can be made from the study.

## 07 — Cybersecurity Relevance

Orbital information may be useful during an authorised investigation because it can provide context about spacecraft movement and potential communication opportunities.

However, an orbital dataset is not a substitute for operational evidence.

### Hypothetical missed-contact investigation

Consider a hypothetical operator investigating a missed telemetry session.

The analyst might examine:

| Evidence source | Question |
| --- | --- |
| Orbital prediction | Was the spacecraft expected to be geometrically visible? |
| Ground-station schedule | Was a contact session planned? |
| Ground equipment logs | Was the station functioning? |
| Communications records | Was a signal received or decoded? |
| Mission operations records | Were there relevant operational changes? |
| Spacecraft telemetry | Was onboard state information available? |

An orbital prediction could help determine whether contact was expected.

It could not, by itself, establish why the session failed.

Possible explanations might include incorrect orbital inputs, equipment failure, scheduling changes, spacecraft anomalies, environmental interference, or deliberate interference.

A security incident would be a hypothesis requiring evidence, not a conclusion automatically supported by orbital data.

### Relevance to the present dataset

The historical record examined in this article does not include any of those operational logs or security records.

No actual missed-contact event was investigated.

The example illustrates a possible use of orbital context, not a finding about the ISS.

## 08 — Methodological Lessons

The principal methodological outcome is a workflow for making narrow, defensible claims from public technical material.

### Identify

Establish the intended object using a consistent catalogue identifier.

For this study, the identifier is `25544`.

### Attribute

Separate the original data provider from the source through which a historical value was encountered.

Here, CelesTrak is the reported provider, while ByteTools is the reproducing source.

### Preserve context

Record the reported element epoch, retrieval date, format, and any known limitations.

Do not treat a historical element set as current.

### Calculate

Perform only the analysis supported by the available inputs.

The mean-motion value supports an approximate-period calculation.

It does not support a claim that a propagation or direct observation occurred.

### Qualify

State the confidence and provenance limits of each result.

A mathematically correct calculation can still depend on an input whose original provenance was not independently verified.

### Document

Provide the values, formula, source attribution, and limitations needed for another reader to understand the result.

This process is useful beyond satellite research because it separates source statements, derived analysis, and unsupported inference.

## 09 — Proposed Follow-Up Investigation

A stronger follow-up study would use an independently acquired and preserved orbital-data response.

The proposed workflow is:

1. Retrieve a fresh ISS GP JSON response directly from CelesTrak.
2. Save the unmodified response.
3. Record the exact UTC retrieval timestamp.
4. Calculate a SHA-256 hash of the preserved file.
5. Verify the catalogue identifier and element epoch.
6. Extract relevant fields using a documented method.
7. Reproduce the approximate-period calculation.
8. Execute a suitable SGP4 implementation.
9. Record the implementation, version, prediction time, coordinate frame, and outputs.
10. Evaluate the assumptions and uncertainty of the results.

This would create stronger first-hand provenance and extend the analysis beyond arithmetic interpretation.

**These are proposed activities, not completed work.**

Any results should be added only after the corresponding actions have actually been performed and documented.

## 10 — Conclusion

This study examined a historical ISS orbital-data record attributed to CelesTrak and reproduced by a third-party technical reference.

The reported mean motion of **15.49535659 revolutions per day** corresponds to an approximate period of **92.93 minutes**.

That result is a derived interpretation of historical public-source data.

It is not a live tracking measurement, an independently observed orbit, an SGP4 prediction, or evidence of a cybersecurity incident.

The research contribution is the documented relationship between:

- Spacecraft identification.
- Source attribution.
- Historical orbital-data context.
- Reproducible arithmetic.
- Analytical confidence.
- Explicit limits on security-related conclusions.

The accompanying [Satellite Orbital Data Field Note](/field-notes/satellite-orbital-data-basics/) explains the underlying terminology, while the [Satellite Cybersecurity Foundations Learning record](/learning/satellite-cybersecurity/) documents the educational context.

Together, these records distinguish **what was studied**, **what the technical concepts mean**, and **what the available evidence actually supports**.

---

*NULL SECTOR / Research Archive / NS-RES-001*
