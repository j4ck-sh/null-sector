
---
title: "Satellite Cybersecurity Foundations — Learning Review"
description: "A reflection on completing Angelina Tsuboi's Satellite Cybersecurity Foundations course, covering space-system architecture, communications, embedded security, satellite OSINT, guided CTF learning, and threat modelling."
provider: "Udemy — Angelina Tsuboi"
category: "learning-path"
status: "completed"
certificationStatus: "not-applicable"
publishedAt: 2026-11-17
topics:
  - "Satellite Cybersecurity"
  - "Space-System Architecture"
  - "Satellite OSINT"
  - "Orbital Mechanics"
  - "Satellite Communications"
  - "Spacecraft Computing"
  - "Embedded Security"
  - "Starlink"
  - "Secure-by-Design"
  - "SPARTA Framework"
skills: []
featured: true
draft: false
references:
  - label: "Satellite Cybersecurity Foundations — Udemy"
    url: "https://www.udemy.com/course/satellite-cybersecurity/"
  - label: "CelesTrak — Documentation"
    url: "https://celestrak.org/"
  - label: "NASA — Basics of Space Flight"
    url: "https://science.nasa.gov/learn/basics-of-space-flight/"
  - label: "NASA — Small Spacecraft Systems Virtual Institute"
    url: "https://www.nasa.gov/smallsat-institute/"
  - label: "SPARTA — Space Attack Research and Tactic Analysis"
    url: "https://sparta.aerospace.org/"
---

# Satellite Cybersecurity Foundations

> **Learning record:** NS-LRN-002  
> **Course:** Satellite Cybersecurity Foundations  
> **Instructor:** Angelina Tsuboi  
> **Platform:** Udemy  
> **Status:** Completed  
> **Course length:** 5 hours 17 minutes  
> **Structure:** 3 sections, 14 lectures  
> **Practical component:** Instructor-guided Hack the Orbit walkthrough  
> **Professional certification:** Not applicable

## Introduction

Satellite cybersecurity introduces security questions that are familiar in principle but different in their operational context.

A spacecraft may operate far from its ground infrastructure, communicate only during particular windows, and depend on hardware that cannot easily be repaired or replaced. Its onboard computing resources, power budget, reliability requirements, and mission lifetime all influence security decisions.

I completed Angelina Tsuboi's **Satellite Cybersecurity Foundations** course to develop a broader understanding of these constraints and how cybersecurity applies to space systems.

The course covers satellite architecture, orbital concepts, public-source research, engineering specifications, onboard computing, communications, defensive security, and the SPARTA framework. It also includes the Hack the Orbit workshop, which I followed through the instructor's walkthrough.

This article records **what I studied, what I took away, and what I want to investigate further**.

It is not a record of independent spacecraft testing or a claim that I reproduced every demonstrated technique without guidance.

## 01 — Understanding Space Systems

One of the most useful ideas from the course was that a satellite should be considered part of a larger operational system.

The spacecraft is only one component.

A mission may also depend on:

- Ground stations and communications infrastructure.
- Mission-control systems.
- Operator workstations and accounts.
- Software-development and update processes.
- Data-processing services.
- External suppliers and supporting networks.

A simplified view is:

```text
         SPACE SEGMENT
       +------------------+
       |    Spacecraft    |
       |------------------|
       | Flight computer  |
       | Payload          |
       | Power systems    |
       | Attitude control |
       | Communications   |
       +------------------+
                |
         Communication link
                |
       +------------------+
       |  Ground station  |
       +------------------+
                |
       +------------------+
       | Mission systems  |
       | Operators        |
       | Data processing  |
       +------------------+
         GROUND SEGMENT
```

The architecture varies between missions, but the security implication is consistent: protecting the spacecraft alone is not enough.

### Key learning

A compromise of a ground-system account, a poorly protected command service, or an insecure communications path could affect mission operations without requiring physical access to the satellite.

This made **system boundaries and trust relationships** a recurring theme throughout the course.

## 02 — Satellite OSINT

The satellite OSINT material introduced how publicly available information can help build an initial understanding of a space system.

Relevant sources may include:

- Satellite catalogues.
- Operator and mission websites.
- Engineering publications.
- Public technical specifications.
- Regulatory documentation.
- Orbital-data providers.
- Research papers.

The course also included a SatNow Scraper demonstration, which introduced automated collection in the context of satellite-related public information.

I did not independently develop or validate that scraper for this learning record.

### Key learning

Public information can support technical context, but its reliability depends on the source.

A published spacecraft specification does not necessarily establish the configuration of an operational satellite. Similarly, an orbital catalogue record does not provide access to onboard telemetry.

This distinction became the basis for a separate NULL SECTOR research article:

**[Satellite OSINT: Analysing Public Orbital Data from the ISS](/research/satellite-osint-methodology/)**

That Research record examines a specific historical dataset, its provenance, and a calculation supported by the reported values.

The investigation and its findings belong there rather than in this course review.

## 03 — Orbital Mechanics and Tracking

The orbital mechanics and tracking material helped explain why spacecraft movement matters to security operations.

For some missions, communication with a spacecraft may depend on orbital geometry and ground-station visibility.

This can affect:

- When operators can send commands.
- When telemetry can be received.
- How quickly an anomaly can be investigated.
- When software updates can be delivered.
- What evidence is available during an incident.

The course introduced concepts such as orbital elements, satellite tracking, and propagation.

### Key learning

A satellite's predicted position and an independently observed position are not the same kind of evidence.

A tracking interface may display a model-based prediction rather than a continuous real-time measurement.

Understanding that distinction is important when interpreting operational events or investigating unexpected behaviour.

For the underlying terminology, I maintain a separate reference note:

**[Satellite Orbital Data: Reading the Basics](/field-notes/satellite-orbital-data-basics/)**

That Field Note covers TLEs, mean motion, epochs, and SGP4. Detailed formulas and worked examples are intentionally kept out of this Learning record.

## 04 — Engineering Specifications and Starlink

The course's engineering material provided context for how spacecraft constraints affect technical and security decisions.

Space systems must account for factors such as:

- Electrical power availability.
- Thermal conditions.
- Processing capacity.
- Communications bandwidth.
- Reliability and fault tolerance.
- Mission duration.
- Physical maintenance limitations.

These constraints can influence the practicality of security controls.

For example, software-update procedures must consider not only integrity and authentication but also operational risk and recovery options.

### Starlink case study

The course also used Starlink as a learning context.

This helped me think about the differences between a single spacecraft and a constellation involving many distributed assets, communications paths, and supporting ground systems.

### Key learning

Security architecture cannot be separated from engineering architecture.

Controls that appear straightforward in a conventional IT environment may require different implementation choices when applied to a spacecraft or constellation.

This was a course-based learning exercise. I did not independently assess Starlink infrastructure or identify vulnerabilities.

## 05 — Spacecraft Computers and Embedded Security

The spacecraft computing material connected satellite systems to familiar embedded-security concepts.

Spacecraft computers may need to operate under conditions involving:

- Radiation exposure.
- Restricted power and processing resources.
- Long operational lifetimes.
- High reliability requirements.
- Limited opportunities for maintenance.
- Constrained update and recovery procedures.

These conditions make software integrity and fault handling especially important.

### Security questions raised

The material prompted several questions relevant to embedded-system security:

| Area | Security question |
| --- | --- |
| Boot process | How is trusted software established? |
| Firmware integrity | Can unauthorised modifications be detected? |
| Updates | How are new software images authenticated? |
| Recovery | What happens if an update fails? |
| Debug interfaces | How is maintenance access controlled? |
| Cryptographic material | How are sensitive keys protected? |
| Fault handling | Can a failure be contained safely? |

These are general security considerations, not findings about a particular spacecraft.

### Key learning

Embedded security principles remain relevant in space systems, but they must be applied alongside mission-specific reliability and operational requirements.

I have not independently extracted or reverse-engineered spacecraft firmware for this article.

That would require a separate, documented research activity using appropriately obtained material.

## 06 — Satellite Communications Security

The communications material was valuable because satellite security depends on both the physical communications channel and the controls applied to the information carried over it.

At a high level, a communications system must transmit information, recover it at the receiver, and determine how that information should be trusted and processed.

The course introduced communications concepts including modulation, demodulation, and security considerations.

### Distinguishing security properties

One important distinction is that several protections solve different problems.

| Property | Main purpose |
| --- | --- |
| Confidentiality | Protect information from unauthorised disclosure |
| Integrity | Detect unauthorised modification |
| Authentication | Establish the claimed origin of information |
| Availability | Keep communications usable when required |

Successfully receiving or decoding a signal does not necessarily mean its contents can be decrypted.

Likewise, encryption does not automatically authenticate a command or prevent radio-frequency interference.

### Key learning

Communications security is layered.

A mission may need to consider interference resistance, authentication, command validation, encryption, and operational resilience together.

I did not independently intercept, decode, or decrypt operational satellite communications as part of this learning record.

## 07 — Hack the Orbit: Guided CTF Learning

The course includes a Hack the Orbit workshop of approximately 1 hour and 19 minutes.

**I followed the instructor's walkthrough rather than independently solving the challenges.**

This distinction is important because understanding a demonstrated method is not the same as independently executing and validating it.

### What the workshop contributed

The workshop provided an educational setting for connecting satellite cybersecurity concepts with challenge-based investigation.

The course material describes areas including OSINT, orbital data, simulated attacks, and detection.

Following the walkthrough helped me understand how the instructor approached the exercises and connected the concepts.

It did not establish independent proficiency in every demonstrated technique.

### Activity classification

| Item | Record |
| --- | --- |
| Environment | Educational CTF |
| Participation | Instructor-guided walkthrough |
| Independent challenge solutions | Not claimed |
| Operational satellite access | Not claimed |
| Original telemetry findings | Not claimed |
| Real-world security incident | Not claimed |

### Key learning

A controlled exercise can illustrate realistic technical ideas without documenting a real-world incident.

For future independent work, I want to record the exercise environment, inputs, actions, results, and limitations separately.

That would make it possible to distinguish a guided learning experience from independently reproduced work.

## 08 — Secure-by-Design and Threat Modelling

The secure-by-design material connected security requirements with decisions made during system development.

For spacecraft, this is particularly relevant because deployed hardware may be difficult or impossible to service.

A simplified command path illustrates the importance of trust boundaries:

```text
Mission operator
      |
      v
Ground command system
      |
      v
Communications service
      |
      v
Spacecraft receiver
      |
      v
Command validation
      |
      v
Flight software
      |
      v
Spacecraft subsystem
```

Each stage raises security questions.

Who can issue commands? How is their origin verified? Can messages be replayed? What happens when unexpected instructions arrive?

### Key learning

No single control addresses every threat.

Encryption does not replace command authorisation. Redundancy does not necessarily protect against malicious commands. Secure software design does not remove the need for monitoring and operational procedures.

Security controls need to be considered together and evaluated against the system's actual architecture.

The diagram is conceptual, not a description of a specific spacecraft implementation.

## 09 — SPARTA Framework

The course introduced **SPARTA — Space Attack Research and Tactic Analysis**.

SPARTA provides a framework for organising adversarial behaviours and defensive considerations relevant to space systems.

The framework is useful because spacecraft and ground infrastructure introduce operational contexts that may not be fully represented by conventional enterprise-network examples.

Relevant areas include:

- Spacecraft command and control.
- Ground-to-space communications.
- Mission operations.
- Onboard computing.
- Supporting ground infrastructure.
- Dependencies between spacecraft subsystems.

### Key learning

A threat framework helps organise questions and identify areas requiring investigation.

It does not establish that a particular technique was used against a real system.

Similarly, identifying a plausible attack path is not the same as demonstrating that a vulnerability exists.

For future NULL SECTOR work, I want to apply SPARTA to a defined reference architecture and clearly distinguish hypothetical threats from verified findings.

## 10 — Connections to Digital Forensics

The course also prompted me to consider how digital-forensic principles might apply to space systems.

A terrestrial investigation may involve endpoint logs, disk images, network captures, and memory artifacts.

A space-system investigation might also depend on:

- Ground-station records.
- Command histories.
- Spacecraft telemetry.
- Mission operations logs.
- Communications metadata.
- Software-update records.
- Engineering documentation.
- Orbital context.

The availability and reliability of these sources would vary by mission.

### Key learning

A meaningful investigation must test competing explanations.

Unexpected spacecraft behaviour could result from equipment faults, software errors, environmental effects, operational changes, inaccurate data, or malicious activity.

A cybersecurity conclusion would require evidence capable of distinguishing those possibilities.

The course reinforced the importance of source attribution, careful interpretation, and avoiding unsupported claims.

Detailed evidence handling and source-specific analysis are addressed in the separate Research archive.

## 11 — Main Learning Takeaways

The most important lessons I am taking forward are:

### Satellite cybersecurity is a systems problem

The spacecraft, communications infrastructure, ground systems, and operational processes form a connected security environment.

### Engineering constraints influence security

Power, reliability, mission lifetime, and maintenance limitations affect the controls that can realistically be deployed.

### Orbital information provides context

Orbital data helps explain movement and communications opportunities, but it is not direct evidence of a cybersecurity event.

### Communications protections have different roles

Signal processing, encryption, authentication, command validation, and interference resilience address distinct problems.

### Threat frameworks require evidence

SPARTA can structure an investigation, but the presence of a technique in a framework does not demonstrate that it occurred.

### Guided training is a distinct milestone

Following Hack the Orbit through the instructor's walkthrough was a learning activity. Independent challenge solutions or research findings would require separate evidence.

These are course-related takeaways, not claims of independently validated spacecraft security findings.

## 12 — Next Learning and Research Goals

The course has provided a foundation for further work.

Areas I want to explore include:

- **Orbital data analysis:** Independently acquire and preserve a public dataset, then document a controlled propagation exercise.
- **Satellite OSINT:** Develop a repeatable workflow for source attribution and evidence preservation.
- **Communications fundamentals:** Study modulation and demodulation using generated or appropriately authorised sample signals.
- **Embedded security:** Explore firmware analysis using legally obtained lab images.
- **Space-system threat modelling:** Apply SPARTA to a fictional or openly documented reference architecture.
- **Digital-forensic methodology:** Develop clear records for collection methods, timestamps, hashes, processing steps, and limitations.

These are proposed activities, not completed investigations.

Any future results will be documented in Research or Field Notes according to the type of work performed.

## 13 — Final Reflection

Completing Satellite Cybersecurity Foundations broadened my understanding of how cybersecurity applies outside conventional IT environments.

The strongest connection across the course was between **engineering context and security analysis**.

Orbital mechanics helps explain operational constraints. Communications engineering helps explain how information moves between systems. Embedded computing introduces reliability and software-integrity concerns. Threat modelling identifies areas that deserve scrutiny.

The course also reinforced the difference between understanding a technical method and independently demonstrating it.

For NULL SECTOR, that distinction shapes how I document progress:

- **Learning** records completed training and the concepts studied.
- **Field Notes** explains individual technical concepts and documents appropriately classified activities.
- **Research** examines specific questions using attributed sources, methods, and evidence.

The course is a completed learning milestone. Independent research and practical work will be documented separately as those activities occur.

## Course Completion

| Item | Record |
| --- | --- |
| Course | Satellite Cybersecurity Foundations |
| Instructor | Angelina Tsuboi |
| Platform | Udemy |
| Course structure | 3 sections, 14 lectures |
| Duration | 5 hours 17 minutes |
| Learning status | Completed |
| Hack the Orbit | Followed instructor walkthrough |
| Professional certification | Not applicable |
| Independent satellite security testing | Not claimed |

Completing this Udemy course is **not** presented as earning a professional cybersecurity certification.

## References and Further Reading

The following sources support the learning topics discussed here. They are not evidence of independent experiments conducted for this article.

- [Satellite Cybersecurity Foundations — Udemy](https://www.udemy.com/course/satellite-cybersecurity/)
- [CelesTrak](https://celestrak.org/)
- [NASA — Basics of Space Flight](https://science.nasa.gov/learn/basics-of-space-flight/)
- [NASA — Small Spacecraft Systems Virtual Institute](https://www.nasa.gov/smallsat-institute/)
- [SPARTA — Space Attack Research and Tactic Analysis](https://sparta.aerospace.org/)

---

*NULL SECTOR / Learning Archive / NS-LRN-002*
