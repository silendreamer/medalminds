---
id: nsb-lesson-0348
title: "Interpreting a Seismogram: From Trace to Earthquake Parameters"
level: hs
subject: earth-space-science
topic: geosphere
subtopic: "Seismic Waves & Earthquake Interpretation"
slug: interpreting-seismograms
type: "Application"
estimatedMinutes: 11
keyConcepts: ["S-P interval", "magnitude from amplitude", "three-station triangulation"]
summary: "Work through the steps of reading a real seismogram to determine earthquake distance, and use triangulation from three stations to locate the epicenter."
---
#### Reading Wave Arrivals
A seismogram shows ground displacement vs. time. The first arrival is P-waves (sharp, high-frequency onset), followed by S-waves (larger amplitude, lower frequency), then surface waves (largest amplitude, lowest frequency, longest duration). Mark t_P (P-wave arrival time) and t_S (S-wave arrival time) from the seismogram.

#### Calculating Distance: The S-P Method
P-waves travel at ~6 km/s in continental crust; S-waves at ~3.5 km/s. If the S-P time difference = Δt seconds, distance D = Δt / (1/v_S − 1/v_P) = Δt / (1/3.5 − 1/6) ≈ Δt × 8 km/s. Example: Δt = 50 s → D ≈ 400 km. (This is approximate; real calculations use velocity models varying with depth.)

#### Triangulation
Using three seismograph stations, draw a circle of radius D around each station. Where all three circles intersect = epicenter. If circles don't intersect cleanly (due to measurement error), the intersection zone gives uncertainty in epicenter location. Four or more stations reduce uncertainty. Modern computers solve for optimal epicenter location simultaneously from all available stations globally.

#### Estimating Magnitude from Seismogram
Richter magnitude is calculated from: ML = log₁₀(A) − log₁₀(A₀(Δ)), where A = maximum wave amplitude (mm on seismogram), A₀(Δ) = correction for distance Δ. A nomogram (chart) with two scales (S-P time and maximum amplitude) lets you find magnitude graphically. A 10× increase in amplitude = increase of 1 magnitude unit.

#### Review Questions
1. On a seismogram, the S-P time interval is 30 seconds. Estimate the distance to the earthquake epicenter (use approximate formula D ≈ 8 × Δt).
2. Why do you need at least three seismograph stations to locate an epicenter, not just one?
3. If an earthquake has amplitude of 1,000 mm on a seismogram at 100 km, and another earthquake at the same distance has amplitude of 100 mm, how do their Richter magnitudes compare?

---
