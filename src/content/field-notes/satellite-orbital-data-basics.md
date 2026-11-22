
---
title: "Satellite Orbital Data: Reading the Basics"
description: "A source-based technical reference on TLE structure, mean motion, orbital epochs, and SGP4, using a hypothetical calculation to explain key concepts."
category: "reference-notes"
status: "in-progress"
activityType: "technical-explanation"
evidenceType: "public-source"
publishedAt: 2026-11-22
updatedAt: 2026-11-22
topics:
  - "Orbital elements"
  - "Two-line element sets"
  - "Mean motion"
  - "Orbital epochs"
  - "SGP4"
  - "Satellite fundamentals"
tools: []
featured: false
draft: false

context: >-
  A source-based technical reference supporting satellite cybersecurity
  study. It explains foundational orbital-data concepts without
  reproducing the historical dataset or findings documented in the
  separate Satellite OSINT research article.

environment: >-
  Public technical documentation and explanatory calculations.
  No satellite receiver, ground station, orbital propagation
  software, or security-testing environment is represented.

activitySummary: >-
  Explaining TLE structure, mean motion, orbital epochs, and the
  distinction between approximate-period calculations and orbital
  propagation. The numerical example is hypothetical and is not
  an independently collected or published satellite observation.

limitations:
  - "This is a conceptual reference based on public technical sources, not a record of hands-on satellite tracking."
  - "The numerical example is hypothetical and does not describe a specific spacecraft."
  - "The approximate-period formula does not calculate a spacecraft's position, visibility, or ground track."
  - "No SGP4 execution, independent data validation, signal reception, or satellite security assessment is documented."

references:
  - label: "CelesTrak — General Perturbations (GP) Data Formats"
    url: "https://celestrak.org/NORAD/documentation/gp-data-formats.php"
  - label: "CelesTrak — Frequently Asked Questions: Two-Line Element Sets"
    url: "https://celestrak.org/columns/v04n03/"
  - label: "CelesTrak — SGP4 Reference Materials"
    url: "https://celestrak.org/publications/AIAA/2006-6753/"

relatedLearning:
  - "satellite-cybersecurity"
relatedResearch:
  - "satellite-osint-methodology"
relatedNotes: []
---

> **Field Note:** Satellite Orbital Data  
> **Classification:** Technical reference  
> **Evidence basis:** Public technical documentation  
> **Activity:** Conceptual explanation and hypothetical calculation  
> **Independent satellite tracking:** Not performed

## 01 — Purpose and Scope

Orbital data describes aspects of an object's motion around Earth. Understanding its terminology is useful when reading satellite-related documentation, technical reports, and open-source datasets.

This Field Note is a **source-based technical reference**, not an investigation or hands-on activity report.

It focuses on four questions:

1. What information does a two-line element set contain?
2. What does mean motion tell us?
3. Why does an orbital epoch matter?
4. How does a simple calculation differ from orbital propagation?

For the broader educational context, see [Satellite Cybersecurity Foundations](/learning/satellite-cybersecurity/).

For a source-specific investigation, see [Satellite OSINT: Analysing Public Orbital Data from the ISS](/research/satellite-osint-methodology/).

The Research article contains the historical ISS dataset, provenance assessment, and evidence-based findings. This note explains the concepts needed to understand that work.

## 02 — Understanding Orbital Elements

An **orbital element set** contains parameters describing an orbit according to a particular mathematical representation.

One widely encountered format is the **two-line element set**, usually abbreviated **TLE**.

A TLE contains two fixed-format data lines. It is also commonly displayed with a preceding line identifying the object.

Several important fields are:

| Field | Basic meaning |
| --- | --- |
| Satellite catalog number | Identifier associated with the tracked object |
| Epoch | Reference time associated with the element set |
| Inclination | Tilt of the orbital plane relative to Earth's equatorial plane |
| Right ascension of the ascending node | Orientation of the orbital plane |
| Eccentricity | Describes how much the orbit differs from a circle |
| Argument of perigee | Describes the orientation of the orbit within its plane |
| Mean anomaly | Orbital phase parameter at the epoch |
| Mean motion | Average orbital revolutions per day |

These descriptions are deliberately introductory.

TLE values are not independent, permanent facts about a spacecraft. They form a model-compatible set of parameters intended to be interpreted together.

In particular, TLE orbital parameters are designed for use with the appropriate SGP4-family propagation model. They should not automatically be treated as directly measured, instantaneous Keplerian elements.

**Key distinction:** A TLE is not a continuous stream of measured spacecraft positions.

## 03 — Mean Motion and Approximate Period

**Mean motion** expresses the average number of orbital revolutions per unit time.

In the traditional TLE format, it is given in **revolutions per day**.

A basic approximation of orbital period is:

\[
T = \frac{1440}{n}
\]

Where:

- \(T\) is the approximate period in minutes.
- \(n\) is mean motion in revolutions per day.
- \(1440\) is the number of minutes in a day.

### Hypothetical example

Suppose an illustrative object has a mean motion of:

```text
16 revolutions/day
```

Then:

\[
T = \frac{1440}{16}
\]

\[
T = 90\ \mathrm{minutes}
\]

This means that **16 revolutions per day correspond to an average of 90 minutes per revolution**.

The number is intentionally simple. It is not attributed to the ISS or any other real spacecraft.

This calculation demonstrates a unit conversion and an approximate relationship. It does not produce an orbital trajectory.

### What the calculation cannot tell us

Knowing an approximate period does not establish:

- Where the object is at a particular moment.
- Whether it is above a specific location.
- Whether it is visible to an observer.
- Whether a radio signal can be received.
- Whether a ground station has access to it.

Those questions require additional information and appropriate models.

## 04 — Why the Epoch Matters

An **epoch** is the reference time associated with an orbital element set.

This matters because orbital parameters are time-dependent. An element set represents an estimated orbital state associated with a particular time, not an indefinitely accurate description of future motion.

Two timestamps should not be confused:

| Timestamp | What it means |
| --- | --- |
| Element epoch | Reference time encoded in or associated with the orbital data |
| Retrieval time | Time at which someone downloaded or accessed the data |

For example, downloading an old element set today does not make its orbital epoch today's date.

The usefulness of an element set for a particular prediction depends on its age, the characteristics of the object, the model being used, and the time interval being considered.

**Practical reading rule:** Check the epoch before treating an element set as suitable for a time-sensitive question.

## 05 — TLEs and SGP4

**SGP4**, short for *Simplified General Perturbations 4*, is an orbital propagation model commonly used with compatible element sets.

Propagation estimates an object's state at a requested time using a model and suitable input parameters.

This is more involved than calculating:

\[
1440 \div \text{mean motion}
\]

The distinction is:

| Operation | Result |
| --- | --- |
| Divide 1440 by mean motion | Approximate orbital period |
| Propagate compatible elements using SGP4 | Estimated orbital state at a selected time |
| Combine propagated state with observer geometry | Information that may support location-specific visibility calculations |

An SGP4 implementation produces a model-based position and velocity estimate in its specified reference frame. Additional coordinate transformations and observer information are needed for location-specific questions.

A propagation result is still a **model estimate**. It is not automatically an independently verified observation.

This note does not document executing SGP4 or validating a propagation result.

## 06 — Reading Orbital Data Critically

When encountering an orbital-data value, a useful first step is to identify what kind of statement is being made.

### Published parameter

A value obtained from a public provider should be attributed to that provider.

It is source data, not a personal measurement.

### Derived calculation

A value calculated from published parameters should identify the formula and inputs used.

The calculation may be reproducible without establishing that the original orbital data was independently verified.

### Model prediction

A prediction requires a stated model, inputs, and relevant assumptions.

Its reliability should be assessed for the intended use and prediction interval.

### Direct observation

A direct observation requires separate evidence of what was actually measured, how it was measured, and under what conditions.

These categories should not be presented as interchangeable.

The detailed evidence handling for the historical ISS example belongs in the [Satellite OSINT research article](/research/satellite-osint-methodology/), rather than being repeated here.

## 07 — Relationship to Satellite Cybersecurity

Orbital information provides **operational context**.

It may help someone understand the movement of a spacecraft or why timing and location matter in satellite operations.

It does not, by itself, demonstrate a cybersecurity weakness.

An orbital element set cannot establish that a spacecraft is vulnerable, that a communications link was intercepted, or that a system was accessed.

Those are separate security claims requiring their own evidence.

For NULL SECTOR, the boundary is straightforward:

**Understanding orbital data is technical knowledge. Demonstrating a satellite security finding is a different activity.**

## 08 — Reference Summary

| Concept | Remember |
| --- | --- |
| TLE | Model-compatible orbital parameters in a standardised format |
| Mean motion | Average revolutions per day |
| Approximate period | \(1440 / n\), in minutes |
| Epoch | Reference time of the element set |
| SGP4 | A model used to propagate compatible orbital elements |
| Propagation | A model-based estimate, not automatically an observation |
| Orbital data | Operational context, not proof of a security vulnerability |

This note intentionally uses a hypothetical numerical example. The historical orbital dataset, source attribution, and source-specific interpretation remain in the separate Research article.

## 09 — Further Study

Useful follow-up topics include:

- Reading the fixed-width fields of an actual TLE.
- Comparing TLE and other orbital-data representations.
- Understanding coordinate systems used in propagation.
- Distinguishing propagation output from observer-relative calculations.
- Evaluating how element age affects prediction uncertainty.

Any future hands-on propagation exercise should be documented separately, with the actual environment, inputs, actions, and results recorded.

**Record classification:** Public-source technical explanation. No independent satellite tracking, propagation execution, or security testing is claimed.

---

*NULL SECTOR / Field Notes Archive*
