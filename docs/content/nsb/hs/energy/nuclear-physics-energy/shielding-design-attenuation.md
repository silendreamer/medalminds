---
id: nsb-lesson-0538
title: "Shielding Design and Attenuation"
level: hs
subject: energy
topic: nuclear-physics-energy
subtopic: "Radiation Types, Shielding & Safety"
slug: shielding-design-attenuation
type: "Application"
estimatedMinutes: 13
keyConcepts: ["half-value layer", "attenuation coefficient", "ALARA", "shielding calculation"]
summary: "Radiation shielding is designed using exponential attenuation — the half-value layer concept lets engineers calculate required shield thickness."
---
#### Exponential Attenuation
Gamma rays and X-rays attenuate exponentially through matter: I = I₀e^(−μx). The linear attenuation coefficient μ depends on photon energy and material. The half-value layer (HVL) is the thickness halving intensity: HVL = ln2/μ ≈ 0.693/μ. After n HVLs, intensity = I₀ × (1/2)ⁿ. For 1 MeV gammas: HVL in lead ≈ 1 cm; in concrete ≈ 6 cm; in water ≈ 10 cm.

#### Worked Shielding Problem
A Co-60 source (1.25 MeV gammas, HVL in lead = 1.1 cm) must be reduced to 1/64 of its original intensity. How thick must the lead shield be? n HVLs needed: (1/2)ⁿ = 1/64 = (1/2)⁶, so n = 6. Thickness = 6 × 1.1 cm = 6.6 cm of lead.

#### Layered Shielding
Different radiation types require different shielding materials. A mixed gamma-neutron field (as in a reactor) requires: (1) water or polyethylene to moderate and absorb neutrons; (2) boron to absorb thermal neutrons (⁶Li or ¹⁰B capture); (3) lead or steel to attenuate gamma rays. Layering order matters — gammas from neutron capture in shields must also be attenuated.

#### ALARA in Practice
At DOE facilities, ALARA is not just a principle but a regulatory requirement. Workers wear dosimeters. Shielding is designed to keep collective dose below 100 mSv/year (occupational limit). Time-distance-shielding are balanced economically: reducing worker time in high-dose areas, increasing distance from sources, adding shielding to reduce background. Remote handling tools and robots are used for high-activity operations.

#### Review Questions
1. A radiation source has intensity 1,000 mSv/hr. After 5 HVLs of shielding, what is the intensity?
2. Why is water effective for neutron shielding but poor for gamma shielding alone?
3. A radiation worker spends 2 hours at 10 mSv/hr. Calculate the dose received, and suggest two ways to reduce it.

---
