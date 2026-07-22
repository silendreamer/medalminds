---
id: nsb-lesson-0917
title: "Capacitor Energy in a Defibrillator"
level: hs
subject: physics
topic: electricity
subtopic: "Capacitance"
slug: capacitor-defibrillator
type: "Application"
estimatedMinutes: 13
keyConcepts: ["capacitor energy", "U = ½CV²", "charge and discharge", "biomedical physics"]
summary: "A cardiac defibrillator uses a capacitor charged to high voltage; energy calculations determine the joules delivered to a patient."
---
#### The Defibrillator Capacitor
A defibrillator stores energy in a capacitor and delivers it as a brief pulse to restore normal heart rhythm. A typical device: C = 150 μF, charged to V = 2500 V.

#### Energy Stored
U = ½CV² = ½(150×10⁻⁶)(2500)² = ½(150×10⁻⁶)(6.25×10⁶) = 468.75 J ≈ 470 J.

#### Charge Stored
Q = CV = (150×10⁻⁶)(2500) = 0.375 C.

#### Delivery Analysis
The capacitor discharges through the patient (effective resistance R ≈ 50 Ω) over a time τ = RC = (150×10⁻⁶)(50) = 7.5 ms. Most energy is delivered in the first few time constants. The shock stops the chaotic ventricular fibrillation (all cells fire at once), then the heart's natural pacemaker (SA node) re-establishes rhythm.

#### Design Trade-offs
Higher voltage → more energy, but increases risk of tissue damage. Larger C → same energy at lower voltage (safer), but C is heavy and bulky. Modern devices use biphasic waveforms (positive then negative pulse) that work at lower energy (~150–200 J vs. old 360 J monophasic).

#### Review Questions
1. A newer defibrillator uses C = 200 μF and V = 2000 V. Calculate the energy stored and compare to the example above.
2. How does the discharge time constant τ = RC affect how quickly the energy is delivered?
3. Why might a very short discharge (very low R) be more damaging even at the same total energy?

---
