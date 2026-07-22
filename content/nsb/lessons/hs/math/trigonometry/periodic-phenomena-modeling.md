---
id: nsb-lesson-0685
title: "Modeling Periodic Phenomena"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: periodic-phenomena-modeling
type: "Application"
estimatedMinutes: 15
keyConcepts: ["amplitude", "period", "phase shift", "sinusoidal models"]
summary: "Many real phenomena (tides, sound, light, population cycles) are modeled by sinusoidal functions."
---
#### Sinusoidal Function Form
A general sinusoidal function is y = A sin(B(x − C)) + D or y = A cos(B(x − C)) + D. The amplitude |A| is the maximum displacement from the center line y = D. The period is 2π/B (for radians) or 360°/B (for degrees). The phase shift C moves the graph horizontally (right if C > 0, left if C < 0). The vertical shift D centers the oscillation. Example: y = 3 sin(2(x − π/4)) + 5 has amplitude 3, period π, phase shift π/4 to the right, and center line at y = 5.

#### Modeling Ocean Tides
The depth of water in a harbor varies sinusoidally over about 12.4 hours (one tidal cycle). If the mean depth is 10 m, the maximum depth is 13 m (at high tide), and high tide occurs at t = 2 hours, model the depth as d(t) = 10 + 3 cos(2π(t−2)/12.4), where t is in hours and amplitude is 3 m. At t = 2, d(2) = 10 + 3 cos(0) = 13 m (high tide). At t = 8.2 (half period later), d(8.2) = 10 + 3 cos(π) = 7 m (low tide). Use this model to predict depths at any time.

#### Modeling Sound and Light Waves
A sound wave is y = A sin(2πft + φ), where A is amplitude (loudness), f is frequency (in Hz), t is time (in seconds), and φ is phase. A 440 Hz tone (concert A) with amplitude 0.05 and no phase shift is y = 0.05 sin(2π·440·t) = 0.05 sin(880πt). The period is 1/440 ≈ 2.27 ms. Light waves follow the same model but with frequencies in the range 10¹⁴ to 10¹⁵ Hz. Interference (adding two waves) produces resonance (when phases align) or cancellation (when phases oppose by π). This principle underlies tuning instruments and detecting signals.

#### Worked Example: Temperature Cycles
Daily temperature in a location varies from a minimum of 5°C at 6 AM to a maximum of 20°C at 6 PM. Model the temperature T(t) where t = 0 at midnight. The mean is (5+20)/2 = 12.5°C, amplitude is (20−5)/2 = 7.5°C. The minimum occurs 6 hours after midnight (6 AM), so the phase shift is 6. Using cosine (which starts at a max), we shift to start at a min: T(t) = 12.5 − 7.5 cos(2π(t−6)/24) = 12.5 − 7.5 cos(π(t−6)/12). Check: T(6) = 12.5 − 7.5 cos(0) = 5°C ✓. T(18) = 12.5 − 7.5 cos(π) = 20°C ✓.

#### Review Questions
1. A pendulum oscillates with period 1 second and amplitude 10 cm. Write its position as a function of time.
2. A rotating wheel completes 5 revolutions per second and has radius 2 m. If the starting angle is 45°, express the height of a point on the rim as a function of time.
3. Model the hours of daylight at a location where winter has 9 hours and summer has 15 hours (6 months apart).

---
