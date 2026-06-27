---
id: nsb-lesson-0687
title: "Trigonometry in Physics (Waves and Harmonic Motion)"
level: hs
subject: math
topic: trigonometry
subtopic: "Trigonometric Functions & Unit Circle"
slug: trig-physics-waves
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["simple harmonic motion", "damped oscillations", "wave superposition"]
summary: "Trigonometry models oscillatory motion: springs, pendulums, electromagnetic waves, and sound."
---
#### Simple Harmonic Motion
A mass on a spring obeys x(t) = A cos(ωt + φ), where A is amplitude, ω = √(k/m) is angular frequency (radians per second), and φ is phase. The period is T = 2π/ω. Example: a mass of 0.5 kg on a spring with k = 20 N/m starts at x = 2 m with zero velocity. Then ω = √(20/0.5) = 2√10 rad/s ≈ 6.32 rad/s, T ≈ 1 s. At equilibrium x = 0, all energy is kinetic: KE_max = ½kA² = ½(20)(4) = 40 J. The trigonometric form gives exact position, velocity (v = dx/dt = −Aω sin(ωt+φ)), and acceleration (a = −ω²x) at any instant.

#### Damped Oscillations
Real oscillators lose energy due to friction. The amplitude decays as x(t) = A e^(−γt) cos(ωt+φ), where γ is the damping coefficient. The system oscillates more slowly (smaller ω) as damping increases. Three regimes: underdamped (oscillates while decaying), critically damped (returns to equilibrium in minimum time without overshooting), and overdamped (creeps back without oscillating). Engineers tune γ to achieve critical damping in shock absorbers and door closers.

#### Superposition and Beats
When two waves of slightly different frequencies overlap, their sum exhibits beats: a slow modulation of a faster oscillation. Example: y = sin(100πt) + sin(102πt). Using sum-to-product formulas, this becomes y = 2 cos(πt) sin(101πt), a rapidly oscillating wave (at 101π rad/s ≈ 101 Hz) with amplitude modulated by 2 cos(πt). The beat frequency is |f₁ − f₂| = 1 Hz. Musicians use this to tune instruments: when two notes produce slow beats, they're close to the same frequency.

#### Pendulum Approximation
A simple pendulum's period is T = 2π√(L/g) for small angles. For larger angles, the exact form involves an elliptic integral, but the small-angle approximation suffices for most cases. The angle satisfies θ(t) = θ₀ cos(√(g/L) t), where θ₀ is the initial angle in radians. As long as θ₀ < 0.2 rad (≈11°), the approximation is accurate to within 1%.

#### Review Questions
1. A spring-mass system has m = 2 kg, k = 8 N/m, and starts from rest at x = 1 m. Find the period and amplitude.
2. Two sound waves of frequencies 256 Hz and 260 Hz interfere. What is the beat frequency?
3. For a pendulum with period 2 seconds, find the pendulum length on Earth (g = 9.8 m/s²).

---
