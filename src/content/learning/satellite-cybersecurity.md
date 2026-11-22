---
title: "Satellite Cybersecurity Foundations — Learning Review"
description: "Notes from studying satellite architecture, orbital data, RF communications, onboard computing and space-system security, including the instructor-guided Hack the Orbit workshop."
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
  - "RF Security"
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

**NS-LRN-002 · Angelina Tsuboi · Udemy · Completed 17 November 2026**

Satellite security is an interesting extension of familiar cybersecurity problems. There are still computers, networks, software updates, privileged users and communications links. What changes is the environment in which those things have to work. A spacecraft may have limited power and processing capacity, only intermittent contact with its operators, and no practical way to replace a failed component once it is deployed.

I took Angelina Tsuboi's **Satellite Cybersecurity Foundations** course to understand that environment better. The course runs for 5 hours and 17 minutes across three sections and fourteen lectures. It introduces the architecture of space systems, orbital mechanics, satellite OSINT, communications, onboard computing and security frameworks, with a Hack the Orbit workshop towards the end.

These are my notes on the parts I found most useful and the questions they raised for further study. The Hack the Orbit portion was **instructor-guided**; I followed the walkthrough rather than solving the challenges independently. I have not tested an operational spacecraft or identified vulnerabilities in a real mission.

## A satellite is more than the spacecraft

It is tempting to picture satellite cybersecurity as protecting a computer in orbit. That is only part of the system. The spacecraft has to receive instructions, report its state, operate its payload and remain connected to an organisation on the ground. Mission-control software, ground stations, operator accounts, data-processing services and development pipelines all become part of the security picture.

That wider view changes where I would start a threat model. An attacker would not necessarily need to reach the spacecraft directly. A compromised operator account could affect the ground-side command process. An insecure update pipeline could introduce unwanted changes before software ever reaches orbit. Poor separation between mission services could allow a problem in one part of the infrastructure to spread into another.

The architecture varies considerably between missions, so these are possible attack paths rather than claims about any particular system. The useful question is **where trust is established, and what happens when it is misplaced**. A satellite might correctly execute a command that originated from a compromised but otherwise authorised ground system.

## Working with public satellite information

The OSINT material showed how much context can be gathered before any hands-on investigation. Public catalogues, operator websites, engineering papers, regulatory filings and technical specifications can help identify a mission and describe its stated purpose, orbital characteristics and supporting technology.

The course also demonstrated a SatNow Scraper in the context of collecting public satellite information. I watched that demonstration; I did not independently build or validate the scraper for this record.

The main limitation is that **public information describes what a source reports**, not necessarily what is happening on a spacecraft at that moment. A published specification may describe a design or an earlier configuration. An orbital catalogue may provide useful predicted positions, but it does not expose flight-computer logs or live telemetry. Keeping those distinctions clear matters if the research is later used to support a security claim.

I explored the data-provenance side of this in a separate piece, [Satellite OSINT: Analysing Public Orbital Data from the ISS](/research/satellite-osint-methodology/). That research record deals with a historical dataset and a calculation based on its published values; it is not evidence of live tracking or spacecraft access.

## Why orbital mechanics matters to security

Orbital mechanics initially seems separate from cybersecurity, but it has direct operational consequences. Depending on the mission and its communications infrastructure, the spacecraft may only be visible to a particular ground station during certain periods. Those periods can affect when commands are sent, when telemetry is received and how quickly an operator can investigate unexpected behaviour.

A useful starting point is the **Two-Line Element set**, or TLE. It records orbital parameters at a particular epoch. A propagation model such as SGP4 can use those parameters to estimate where an object should be at a requested time. That is a prediction based on an orbital model, not a continuous location report transmitted by the spacecraft.

The difference becomes important when interpreting evidence. The age of an element set, atmospheric drag, manoeuvres and other modelling limitations can affect a predicted position. An estimated contact opportunity also does not prove that a radio link was active or that a command was sent. To make those claims, an investigation would need operational records or other supporting observations.

I have kept the terminology and underlying calculations in [Satellite Orbital Data: Reading the Basics](/field-notes/satellite-orbital-data-basics/). This course review is more concerned with what orbital context can and cannot tell an investigator.

## Engineering constraints and spacecraft computers

The engineering sections helped connect the security ideas to the conditions under which spacecraft operate. Electrical power, thermal limits, bandwidth, processing resources, radiation exposure and mission lifetime can all influence the design. Reliability and recovery are especially important when physical maintenance is unavailable.

That creates trade-offs around flight software. Signing an update can help establish its origin and integrity, but it cannot guarantee that the new software is free from defects. Secure boot may help establish a trusted startup process; rollback protection can prevent older vulnerable images from being reintroduced. Both still need to fit into a recovery plan for the case where a legitimate update fails.

The course's Starlink material provided a useful contrast between thinking about one spacecraft and thinking about a constellation. A distributed system introduces many assets, communication paths and operational dependencies. I treated Starlink as an architectural learning example, not as a target I assessed.

I also found it useful to think about what a security analyst would actually observe after a fault. A software defect, radiation-related upset or malicious change could sometimes produce superficially similar symptoms. Unusual behaviour is a reason to investigate, not enough on its own to identify an attacker.

For a future embedded-security exercise, I would want to examine a legally obtained firmware image or a deliberately vulnerable lab target, record the tools and versions used, and distinguish what I observed from what I inferred. No spacecraft firmware was extracted or reverse-engineered as part of this course review.

## The RF link is not the whole security model

Satellite communications brought together two areas that are easy to confuse: getting information across a radio channel and deciding whether that information should be trusted.

Modulation describes how information is represented in a signal; demodulation is part of recovering it at the receiver. Framing and error correction help the receiver interpret the transmitted data reliably. Encryption, authentication and message-integrity protections answer different questions. A signal can be received successfully without its contents being readable, and a readable message is not automatically an authorised command.

Interference or jamming can make a link unavailable. Spoofed transmissions raise questions about origin. Replayed messages raise questions about freshness, even when the original message was valid. Interception may expose information if confidentiality protections are missing or inadequate. None of these is solved simply by saying that the link is encrypted.

Telemetry, tracking and command (**TT&C**) deserves particular attention because commands can change spacecraft behaviour. A receiver needs to know more than whether a message has arrived intact. It may need to verify who sent it, whether that identity is permitted to request the action, whether the message is fresh, and whether the requested operation is safe in the spacecraft's current state.

That last point is easy to overlook: **authentic does not necessarily mean authorised or safe**. A command can be cryptographically valid and still be inappropriate for the situation. I did not intercept, decode or decrypt operational satellite communications for this learning record.

## Following the Hack the Orbit workshop

The course includes a Hack the Orbit workshop lasting approximately one hour and nineteen minutes. I followed the instructor's walkthrough, which connected the earlier material to challenge-based investigation, including public information, orbital data and simulated attack-and-detection concepts.

Watching the instructor work through the challenges helped me understand the sequence of reasoning and the kinds of evidence being used. It is not the same as solving the exercises independently, so I am recording it as guided training rather than presenting it as an original CTF result.

If I revisit those exercises without the walkthrough, I would document the challenge objective, supplied files, tool versions, commands, outputs and the reasoning behind each conclusion. I would also record any hints used. That would make the difference between a guided demonstration and a reproducible independent attempt visible to the reader.

## Thinking about commands as a chain of trust

The secure-by-design material returned to a theme from the beginning of the course: the most important security questions often sit **between** components.

Consider a hypothetical operator issuing a command. The operator interacts with ground software, the command passes through communications infrastructure, and the spacecraft eventually receives and processes it. At each step, something different must be trusted. The operator needs appropriate privileges. Ground software must preserve and record the intended command. The transmitted message needs protection against unauthorised changes or replay. The spacecraft must validate the instruction before allowing it to affect flight software or a subsystem.

This is why no single control is sufficient. Encryption cannot replace authorisation, and redundancy cannot guarantee that an invalid command will be rejected. Even correctly authenticated instructions need operational and safety checks.

The diagram is a conceptual teaching model. It is not a representation of the command architecture of Starlink or any other named mission.

## Using SPARTA without treating a model as evidence

The course introduced **SPARTA (Space Attack Research and Tactic Analysis)** as a way to organise threats and defensive thinking in a space-system context. It is useful because the assets and operational dependencies of a mission do not map perfectly onto a conventional office network. The same mission may depend on operator identities, ground applications, scheduled communications opportunities, an uplink and onboard command handling. A weakness in one part of that chain can affect another part without an attacker ever touching the spacecraft.

I would use SPARTA as a reference when building a threat model, rather than treating a list of techniques as a ready-made finding. The starting point would be a clearly scoped architecture: what assets exist, what they do, who controls them and which assumptions have not been verified. For a **fictional Earth-observation mission**, the assets might include an operator workstation, a command-planning service, a ground station, the communications link, onboard command-processing software and the payload. The security objectives would include preventing unauthorised commands, preserving command integrity, maintaining availability during contact opportunities and retaining enough records to investigate anomalies.

The next step would be to draw the trust boundaries. An authenticated operator submitting a request is not the same thing as a trustworthy command reaching the spacecraft. The request might cross an identity service, an approval workflow, a command queue, ground-station software and the radio link before onboard software decides whether to act. Each transition raises a different question: who can approve the action, what can alter it in transit, how is its origin verified, and what happens if the message is duplicated or arrives too late?

One hypothetical threat scenario would begin with a compromised ground-system account. An attacker might try to submit an unauthorised command through an otherwise legitimate workflow. That is different from an attacker attempting to inject a message over the radio link, and different again from someone disrupting the link so that a valid command cannot arrive. The distinction matters because the assumptions, required access and useful safeguards are not the same. Account compromise points toward identity controls, approvals and audit trails; message spoofing or replay points toward command authentication, integrity and freshness checks; disruption raises availability and recovery questions. I would use relevant SPARTA behaviours to structure those possibilities, while checking the framework's actual entries before assigning any technique identifiers.

A useful threat model should also ask what would make each scenario *observable*. If the concern is an unauthorised ground command, evidence might include login activity, approval records, queue changes and transmission logs. If the concern is a replayed message, investigators would need records that could establish message identity, sequence or freshness, subject to what the system actually records. If the concern is interference, the available evidence might instead involve receiver status, signal-quality measurements, contact schedules and independent observations. These are possible evidence sources, not a claim that any particular satellite mission collects them.

This process would let me separate **threat, vulnerability, control and evidence**. A threat describes a plausible unwanted action. A vulnerability is a specific weakness that could make it possible. A control is intended to prevent, detect or limit the action. Evidence is what would support or contradict a claim that something actually happened. A technique mapped in SPARTA does not establish that a spacecraft is vulnerable, and an interesting attack path is not proof of exploitation.

I have not completed a formal SPARTA mapping or assessed a real mission as part of this course review. A future lab could make the exercise reproducible by publishing a fictional architecture, stated attacker capabilities, explicit assumptions, selected framework references and a table connecting each threat to proposed controls and evidence requirements. That would be a defensible learning artefact without presenting speculation as a discovered vulnerability.

## A digital-forensics perspective

The course also made me consider what an investigation would look like if a spacecraft behaved unexpectedly. In conventional digital forensics, investigators often have some prospect of acquiring a disk image, memory capture or endpoint logs. A spacecraft changes that expectation. Direct access may be impossible, onboard storage may be limited, and retrieving information may depend on scheduled communications opportunities. In some cases the most useful evidence could be held on the ground: operator activity, command histories, ground-station records, software-update logs, network events and mission-control records. Spacecraft telemetry might provide additional context, but only if the relevant information was recorded and successfully returned.

Consider a hypothetical anomaly: after a planned contact, a spacecraft appears to enter an unexpected operating mode. The first question would not be who attacked it. It would be **what is actually known**. Was the mode change confirmed by telemetry, inferred from a missing data product, or reported by an operator? Those observations carry different levels of certainty. I would want to preserve the original records and document where each observation came from before building an explanation around it.

Reconstructing the command path would require a sequence of separate checks. Was a command requested, and by which account or service? Was it approved? Did ground software place it in the queue, and was the queued content the same as the approved content? Did the ground station transmit it during the scheduled contact? Did the spacecraft acknowledge receipt, accept the command for processing, or report that it had executed it? **Submission, transmission, acknowledgement and execution are not interchangeable events.** A successful ground-side transmission log alone would not establish the spacecraft's resulting state.

A timeline would also need careful treatment of clocks and gaps. Operator workstations, ground services and spacecraft systems may use different time sources or record timestamps with different precision. Delayed telemetry could describe an earlier event, while a communications outage could leave an apparent gap in the sequence. I would record the timestamp source, time standard, known offsets and uncertainty for each event rather than forcing everything into a falsely precise chronology. Contact predictions derived from orbital data could help identify when communication was geometrically possible, but they would not prove that a session occurred.

Evidence integrity matters just as much as interpretation. For a real investigation, exported logs and telemetry files should be preserved in their original form where possible, with collection times, source systems, access permissions and cryptographic hashes documented. Analysis should happen on working copies so that transformations, filtering and time conversions can be repeated. If a system only retains a rolling buffer or overwrites old records, preservation priorities may be time-sensitive. The precise collection method would depend on the mission's systems, legal authority and operational safety constraints; it would be inappropriate to assume an investigator could simply extract onboard storage.

I would then compare competing explanations rather than settle on the most dramatic one. An unexpected operating mode could follow an authorised but mistaken command, a software defect, a failed update, a radiation-related upset, a sensor problem, a deliberate safety response or malicious activity. Missing telemetry might result from a contact gap, equipment fault, scheduling issue or interference. Each explanation should produce questions that can be checked against available records. For example, a suspected unauthorised command would need more than a mode change: it would need supporting evidence about the command's origin, processing or execution.

The most difficult part may be acknowledging what the evidence cannot resolve. A gap in command logs does not prove that a command was never sent; a valid credential does not prove that its legitimate owner used it; and a cryptographically authenticated command does not prove it was operationally appropriate. Findings should distinguish confirmed observations, reasonable inferences and unresolved possibilities. Where the records are insufficient, the conclusion should say so.

This is the connection I find most useful to digital forensics: **an unexpected outcome is not an attribution**. A credible investigation would reconstruct the chain of events, preserve provenance, test alternative causes and state its confidence and limitations. I have not performed such an investigation on a spacecraft; this is how I would approach the problem in a hypothetical exercise based on the concepts introduced by the course.

## What I am taking forward

The biggest shift in my thinking was to treat satellite cybersecurity as a system-design and evidence problem rather than an isolated radio or onboard-computer problem. The spacecraft, its ground infrastructure, its communications links and its operational procedures all affect the security outcome. Engineering constraints make some controls harder to deploy, while limited visibility can make incidents harder to reconstruct.

There are several practical directions I want to pursue from here. One is a reproducible orbital-data exercise using a clearly attributed public dataset and documented propagation steps. Another is to study modulation and demodulation using generated or otherwise authorised signals, without implying access to operational transmissions. I would also like to practise firmware analysis on appropriate lab images and apply SPARTA to a fictional reference architecture with clearly labelled assumptions.

Those are future activities, not completed investigations. When I carry them out, the methods and results will belong in NULL SECTOR's Research or Field Notes sections rather than being folded into this course completion record.

Completing **Satellite Cybersecurity Foundations** gave me a useful foundation for asking better questions about space systems. It was a completed Udemy course, including an instructor-guided workshop, **not a professional cybersecurity certification** or an independent spacecraft security assessment.