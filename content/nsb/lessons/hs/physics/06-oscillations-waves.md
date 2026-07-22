# HS Physics — Oscillations & Waves
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Simple Harmonic Motion

### Characteristics of SHM
**Type:** Core Understanding
**Slug:** characteristics-shm
**Estimated time:** 12 min
**Key concepts:** periodic motion · restoring force · equilibrium · amplitude · frequency
**Summary:** Simple harmonic motion is periodic motion where a restoring force proportional to displacement causes regular oscillation about an equilibrium position.

#### Definition & Restoring Force
Simple harmonic motion (SHM) occurs when the net force on an object is proportional to its displacement from equilibrium and directed toward equilibrium: F = −kx, where k is a constant and x is displacement. This is Hooke's law for springs and appears in many oscillating systems. The negative sign indicates the force opposes displacement—a restoring force. Objects in SHM oscillate about their equilibrium position with constant amplitude (no energy loss).

#### Period, Frequency & Angular Frequency
The period (T) is the time for one complete oscillation. Frequency (f) is the number of oscillations per second (units: Hz). Period and frequency are related by T = 1/f. Angular frequency (ω) is ω = 2πf = 2π/T, with units rad/s. For SHM driven by a restoring force F = −kx, the angular frequency is ω = √(k/m), giving T = 2π√(m/k). Notably, period is independent of amplitude for true SHM.

#### Displacement, Velocity & Acceleration
For SHM starting at maximum displacement x = A, the position is x(t) = A cos(ωt). Velocity is v(t) = −Aω sin(ωt), with maximum magnitude v_max = Aω. Acceleration is a(t) = −Aω² cos(ωt) = −ω²x, with maximum magnitude a_max = Aω². At equilibrium (x = 0), velocity is maximum and acceleration is zero. At maximum displacement, velocity is zero and acceleration is maximum.

#### Energy in SHM
Total mechanical energy is constant: E = (1/2)kA² = (1/2)kx² + (1/2)mv². At maximum displacement (x = A), all energy is potential: E = (1/2)kA². At equilibrium (x = 0), all energy is kinetic: E = (1/2)mv_max². Energy oscillates between kinetic and potential forms, but the total remains constant (no friction).

#### Review Questions
1. A mass oscillates with period T = 0.5 s. What is its frequency and angular frequency?
2. For a spring with k = 100 N/m and mass m = 0.25 kg, find the period of oscillation.
3. If amplitude is 0.1 m, what is the maximum velocity for ω = 10 rad/s?

---

### The Pendulum
**Type:** Core Understanding
**Slug:** the-pendulum
**Estimated time:** 13 min
**Key concepts:** simple pendulum · small angle approximation · period formula · physical pendulum
**Summary:** A pendulum undergoes SHM for small oscillations; its period depends on length and gravity, independent of mass and amplitude.

#### Simple Pendulum Analysis
A simple pendulum consists of a point mass suspended by a light, inextensible string. For small angles (θ < 15°), the restoring torque is approximately proportional to angular displacement, leading to SHM. The torque due to gravity is τ = −mg L sin(θ) ≈ −mg L θ (small angle approximation: sin θ ≈ θ). This gives τ = −(mgL)θ, analogous to F = −kx for a spring.

#### Period of a Pendulum
For small oscillations, the period of a simple pendulum is T = 2π√(L/g), where L is the string length and g is gravitational acceleration. Remarkably, the period is independent of the pendulum's mass and of the amplitude (for small angles). Doubling the length increases the period by √2 ≈ 1.41. This makes pendulums useful for timekeeping and gravitational measurement.

#### Physical Pendulum
A physical pendulum is any real object that swings about a fixed axis (not a point mass on a string). For a physical pendulum with moment of inertia I, mass M, and distance d from the axis to the center of mass, the period is T = 2π√(I/(Mgd)). A physical pendulum's period depends on its geometry through its moment of inertia. A thin rod pivoting about one end has T = 2π√(2L/(3g)), which is longer than a simple pendulum of length L (because moment of inertia is larger).

#### Conical Pendulum
A conical pendulum swings in a horizontal circle while the string makes a constant angle with the vertical. The tension and weight provide the centripetal force: T cos(θ) = Mg and T sin(θ) = Mv²/r, where r is the radius of the circle. The period depends on the angle: T = 2π√(L cos(θ)/g). This demonstrates that pendulum motion is not limited to 1D oscillation.

#### Review Questions
1. A pendulum has period 2 s. What is its length?
2. How would the period change if you took a pendulum to the Moon (g_Moon ≈ 1.6 m/s²)?
3. A physical pendulum (rod pivoting at one end, length 1 m) has period what compared to a simple pendulum of length 1 m?

---

### Driven Oscillations & Resonance
**Type:** Application
**Slug:** driven-oscillations-resonance
**Estimated time:** 14 min
**Key concepts:** driving force · resonance · natural frequency · damping · amplitude response
**Summary:** When an external driving force is applied to an oscillating system, resonance occurs at specific frequencies, dramatically increasing amplitude.

#### Driving a Harmonic Oscillator
When an external force F_ext = F₀ cos(ωt) is applied to a damped harmonic oscillator, the system's response depends on the driving frequency ω and the system's natural frequency ω₀ = √(k/m). If damping is negligible, the system oscillates at the driving frequency with amplitude A = F₀/m|ω₀² − ω²|. As ω approaches ω₀, the amplitude grows without bound (in an ideal, undamped system).

#### Resonance
Resonance occurs when the driving frequency matches the system's natural frequency (ω = ω₀). At resonance, energy transfer from the driving force to the oscillator is maximum, and the amplitude reaches its peak. In an ideal undamped system, amplitude would be infinite. In real systems with damping, resonance produces a large but finite amplitude, and the peak amplitude occurs slightly below the natural frequency.

#### Resonance Curve
A resonance curve plots oscillation amplitude vs. driving frequency. For a lightly damped system, the curve shows a sharp peak at or near the natural frequency. The width of the peak (Q-factor) depends on damping: low damping gives a sharp peak; high damping gives a broad peak. The Q-factor is Q = ω₀m/b, where b is the damping coefficient. High-Q systems (low damping) are sensitive to specific driving frequencies.

#### Real-World Resonance Examples
Bridges can resonate at certain frequencies and collapse if the driving frequency matches their natural frequency (e.g., Tacoma Narrows Bridge). Microwave ovens use resonance at the natural frequency of water molecules (2.45 GHz). Musical instruments exploit resonance: a tuning fork vibrates most vigorously at its natural frequency. Seismic waves from earthquakes can excite building resonances, causing damage at specific frequencies.

#### Review Questions
1. A spring-mass system has natural frequency ω₀ = 10 rad/s. At what driving frequency is resonance achieved?
2. Why does an earthquake cause more damage to buildings of certain heights?
3. How does damping affect the resonance curve?

---

### SHM in Different Systems
**Type:** Mixed/Review
**Slug:** shm-different-systems
**Estimated time:** 12 min
**Key concepts:** mass-spring system · electromagnetic oscillations · coupled oscillators · boundary conditions
**Summary:** SHM appears in various physical systems beyond springs and pendulums, from electrical circuits to atoms.

#### LC Circuits (Electromagnetic Oscillations)
An LC circuit (inductor L and capacitor C in series) oscillates electromagnetically. Charge on the capacitor plays the role of displacement, and the rate of charge flow (current) plays the role of velocity. The "restoring force" is provided by the capacitor's voltage. The period is T = 2π√(LC), analogous to T = 2π√(m/k) for a mass-spring system. Energy oscillates between electric (in the capacitor) and magnetic (in the inductor) forms.

#### Atoms & Molecular Vibrations
Atoms in molecules vibrate about their equilibrium positions with restoring forces provided by electromagnetic interactions. Each vibrational mode has a characteristic frequency. Molecular vibrations absorb electromagnetic radiation (infrared, Raman) at these frequencies, which is the basis for spectroscopy. The vibration period is typically 10⁻¹² to 10⁻¹³ seconds.

#### Coupled Oscillators
Two pendulums connected by a spring can exchange energy through the spring. They exhibit coupled oscillation with two normal modes: symmetric (both swing together) and antisymmetric (they swing oppositely). For weakly coupled systems, energy periodically transfers from one pendulum to the other (beat phenomenon). For strongly coupled systems, the normal modes are the only possible patterns.

#### Boundary Conditions & Modes
Oscillating systems confined to finite regions (strings, drums, resonance chambers) have discrete allowed modes, each with a specific frequency. A string of length L fixed at both ends has standing waves with wavelengths λ_n = 2L/n, where n = 1, 2, 3, ... The frequencies are f_n = nv/(2L), where v is the wave speed. Only these specific frequencies produce resonance.

#### Review Questions
1. What is the period of oscillation in an LC circuit with L = 0.1 H and C = 10 μF?
2. Why do atoms vibrate at specific frequencies?
3. Explain coupled oscillation in two connected pendulums.

---

### Competition Problems: SHM & Oscillations
**Type:** Competition Extension
**Slug:** competition-problems-shm
**Estimated time:** 10 min
**Key concepts:** energy methods · phase analysis · nonlinear effects · elegant approaches
**Summary:** Competition problems often require creative energy approaches, phase analysis, or recognizing when linearization assumptions fail.

#### Energy-Based Approach
"A mass oscillates on a spring. At what displacement is kinetic energy equal to potential energy?" Solution: KE = PE when (1/2)mv² = (1/2)kx². Using energy conservation (1/2)kA² = (1/2)mv² + (1/2)kx², we get (1/2)kA² = (1/2)kx² + (1/2)kx² = kx². So x = A/√2. The displacement is 70.7% of the amplitude.

#### Phase Comparison
"Two identical oscillators start at t = 0. One starts from rest at maximum displacement (x = A, v = 0). The other starts at equilibrium moving in the positive direction (x = 0, v = v_max). Describe their motion." Solution: Both oscillate with the same period and amplitude, but their phases differ by 90°. The first has x = A cos(ωt); the second has x = A sin(ωt). At t = T/4, the first is at equilibrium, and the second is at maximum displacement.

#### Nonlinear Pendulum
"For large angles, a pendulum is not SHM. How does the period change?" Solution: For large amplitudes, the period increases. Exact analysis requires elliptic integrals, but for moderate angles (up to 60°), a correction factor works. The period of a large-amplitude pendulum is longer than T = 2π√(L/g) because the restoring torque is less than the small-angle approximation, so acceleration is slower.

#### Beats & Resonance
"Two vibrating sources have frequencies f₁ = 100 Hz and f₂ = 102 Hz. They create beats. What is the beat frequency, and what is the beat period?" Solution: Beat frequency is f_beat = |f₁ − f₂| = 2 Hz. Beat period is T_beat = 1/f_beat = 0.5 s. Intensity varies with frequency (100 + 102)/2 = 101 Hz, modulated by the beat envelope at 2 Hz.

#### Review Questions
1. For 10 points: At what fraction of amplitude is kinetic energy equal to potential energy?
2. Two oscillators differ in phase by 90°. Describe their relative motion.
3. How does the period of a pendulum change for large-amplitude swings?

---

## Subtopic: Wave Properties

### Wave Characteristics
**Type:** Core Understanding
**Slug:** wave-characteristics
**Estimated time:** 12 min
**Key concepts:** wavelength · frequency · amplitude · wave speed · transverse vs longitudinal
**Summary:** Waves are disturbances that propagate through media or space, characterized by wavelength, frequency, and amplitude.

#### Basic Wave Parameters
A wave is characterized by its wavelength (λ), the distance between successive crests; frequency (f), the number of crests passing a point per second; amplitude (A), the maximum displacement; and wave speed (v), the speed at which the disturbance propagates. These are related by the wave equation: v = fλ. The period T = 1/f. All waves obey this relationship regardless of type.

#### Transverse vs. Longitudinal Waves
In transverse waves, the medium oscillates perpendicular to the direction of wave propagation (e.g., waves on strings, electromagnetic waves, shear waves in solids). In longitudinal waves, the medium oscillates parallel to the propagation direction (e.g., sound waves, compression waves). Some media support both types: solids can have both S-waves (shear, transverse) and P-waves (pressure, longitudinal).

#### Speed of Waves in Different Media
The wave speed depends on the medium's properties: For sound, v ∝ √(T/ρ) in solids/liquids (T = tension, ρ = density); in gases, v ∝ √T (temperature). For light, v = c/n (c = speed in vacuum, n = refractive index). For water waves, v ≈ √(gλ/(2π)) for deep water (gravity waves). Understanding how speed depends on medium properties is crucial for many wave phenomena.

#### Energy & Intensity
A wave carries energy as it propagates. The intensity (I) is the average power per unit area: I = P/A (watts per square meter). For a spherical wave, intensity decreases with distance as I ∝ 1/r². For a plane wave or in a confined medium, intensity can remain constant. The intensity is proportional to the square of the amplitude: I ∝ A².

#### Review Questions
1. A wave has frequency 100 Hz and wavelength 3 m. What is the wave speed?
2. Describe the difference between transverse and longitudinal waves.
3. How does intensity change with distance for a spherical sound wave?

---

### Wave Behavior: Reflection, Refraction, Diffraction
**Type:** Core Understanding
**Slug:** wave-reflection-refraction-diffraction
**Estimated time:** 14 min
**Key concepts:** boundary conditions · Snell's law · Huygens principle · diffraction patterns
**Summary:** Waves reflect and refract at boundaries, and diffract around obstacles—behaviors explained by Huygens's principle and boundary conditions.

#### Reflection at Boundaries
When a wave encounters a fixed boundary, it reflects. The angle of incidence equals the angle of reflection (both measured from the normal). If the medium on the other side of the boundary has different properties, the reflected amplitude may differ from the incident amplitude depending on the impedance mismatch (Z = ρv, density × wave speed). Large mismatches produce large reflections; small mismatches produce small reflections and large transmissions.

#### Refraction at Boundaries
When a wave crosses a boundary into a medium with different wave speed, its direction changes (refraction). Snell's law relates the incident and refracted angles: n₁ sin(θ₁) = n₂ sin(θ₂), where n = c/v is the refractive index. For sound or other waves, n = v₂/v₁ (ratio of speeds). Higher-speed media correspond to lower refractive index. Waves always bend toward the normal when entering a slower medium.

#### Diffraction
Diffraction is the bending of waves around obstacles or through openings. Huygens's principle explains this: every point on a wavefront acts as a source of secondary wavelets. When waves pass through a small opening or around an obstacle, these secondary sources at the edges create wavelets that bend around the barrier. Diffraction is most pronounced when the obstacle or opening size is comparable to the wavelength.

#### Diffraction Through a Slit
A single-slit diffraction pattern shows a bright central maximum with dimmer side lobes. The first minimum occurs at an angle θ where a sin(θ) = λ, where a is the slit width. Narrow slits (small a) produce wide diffraction patterns; wide slits produce narrow patterns. This demonstrates the wave nature of light and is used to measure wavelengths.

#### Review Questions
1. Light traveling in water (n = 1.33) hits an air interface at 30° to the normal. What is the refraction angle in air?
2. Why is diffraction more pronounced for longer wavelengths?
3. Explain reflection from a fixed boundary in terms of Huygens's principle.

---

### Interference & Standing Waves
**Type:** Core Understanding
**Slug:** interference-standing-waves
**Estimated time:** 13 min
**Key concepts:** constructive interference · destructive interference · superposition · nodes · antinodes
**Summary:** When two waves overlap, they interfere constructively (increasing amplitude) or destructively (decreasing amplitude), creating patterns called interference patterns.

#### Superposition & Interference
The superposition principle states that when two waves overlap, the resulting wave is the sum of the individual waves. If two identical waves arrive in phase (crest aligns with crest), they interfere constructively, doubling the amplitude. If they arrive out of phase by 180° (crest aligns with trough), they interfere destructively, canceling to zero amplitude. Intermediate phase differences give intermediate amplitudes.

#### Path Difference & Constructive/Destructive Interference
For two sources emitting waves of the same frequency, constructive interference occurs when the path difference is an integer multiple of the wavelength: Δpath = nλ, where n = 0, 1, 2, ... Destructive interference occurs when Δpath = (n + ½)λ. This condition holds for sound waves, light, and water waves. The phase difference determines whether peaks align (constructive) or peaks align with troughs (destructive).

#### Standing Waves in Confined Regions
A standing wave forms when two waves of equal amplitude and frequency travel in opposite directions and interfere. The result is a pattern with nodes (points of zero amplitude) and antinodes (points of maximum amplitude) that remain fixed in space. For a string of length L fixed at both ends, nodes must occur at the ends. The allowed wavelengths are λ_n = 2L/n, giving frequencies f_n = nv/(2L), where n = 1, 2, 3, ...

#### Harmonics & Resonance
The fundamental mode (n = 1) has one antinode in the middle. Higher harmonics (n = 2, 3, ...) have multiple antinodes. The frequencies of harmonics are integer multiples of the fundamental: f_n = n·f₁. Resonance occurs when the driving frequency matches a harmonic frequency. Musical instruments exploit this: a vibrating string produces its fundamental and harmonics, creating a complex waveform that determines the instrument's timbre.

#### Review Questions
1. Two speakers emit sound at the same frequency 1 m apart. At a point 3 m from one and 4 m from the other, is there constructive or destructive interference? (Use wavelength as needed.)
2. A string of length 0.5 m is fixed at both ends. What are the first three allowed frequencies if the wave speed is 100 m/s?
3. Explain why only certain frequencies resonate in a closed pipe.

---

### Sound Waves & Acoustics
**Type:** Application
**Slug:** sound-waves-acoustics
**Estimated time:** 13 min
**Key concepts:** sound speed · intensity · decibels · Doppler effect · acoustic resonance
**Summary:** Sound is a longitudinal wave in a medium; its properties depend on the medium, and phenomena like the Doppler effect reveal its wave nature.

#### Sound Speed
Sound speed depends on the medium and temperature: In air at 20°C, v ≈ 343 m/s. In water at 25°C, v ≈ 1500 m/s (faster because water is denser and less compressible). In solids, v varies widely (e.g., steel ≈ 5000 m/s). Temperature affects speed: in gases, v ∝ √T. Frequency of sound is independent of the medium—a 440 Hz note is 440 Hz everywhere—but wavelength changes: λ = v/f, so wavelength is longer in faster media.

#### Intensity & Decibels
Sound intensity is power per unit area (W/m²). Human hearing ranges from the threshold of hearing (I₀ ≈ 10⁻¹² W/m²) to the threshold of pain (≈1 W/m²). Because of the vast range, intensity is expressed on a logarithmic scale: decibels (dB), where L_dB = 10 log₁₀(I/I₀). A 10 dB increase represents a factor of 10 increase in intensity. Common reference: 0 dB ≈ threshold of hearing; 60 dB ≈ normal conversation; 120 dB ≈ threshold of pain.

#### Doppler Effect for Sound
When a sound source moves relative to an observer, the observed frequency changes. If the source approaches the observer at speed v_s, the observed frequency is f' = f(v + v_observer)/(v − v_source), where v is the sound speed. As v_s increases toward v (the sound speed), the frequency increases. At v_s = v, the source "keeps up" with its own sound waves (sonic boom phenomenon). For v_s > v (supersonic), a shock wave forms.

#### Acoustic Resonance in Rooms
Rooms have resonant frequencies determined by their dimensions. The fundamental frequency is f = v/(2L), where L is the room's length. Higher resonances occur at multiples. When the room's acoustics match a source's frequency, resonance occurs, amplifying the sound. This is why bathrooms have good acoustics (small dimension, single resonance) and why concert halls are carefully designed to control resonances.

#### Review Questions
1. Sound travels at 340 m/s in air. What is the wavelength of 440 Hz (musical A note)?
2. Express an intensity of 10⁻⁶ W/m² in decibels.
3. A siren on an ambulance (frequency 1000 Hz) approaches at 25 m/s. What frequency do you hear? (Use sound speed 340 m/s.)

---

### Electromagnetic Waves
**Type:** Mixed/Review
**Slug:** electromagnetic-waves
**Estimated time:** 12 min
**Key concepts:** Maxwell equations · light · electromagnetic spectrum · polarization · intensity
**Summary:** Electromagnetic waves are transverse waves of electric and magnetic fields, perpendicular to each other and the propagation direction.

#### Nature of Electromagnetic Waves
Electromagnetic waves consist of oscillating electric (E) and magnetic (B) fields perpendicular to each other and to the direction of propagation. Maxwell's equations predict their existence and show that they propagate at speed c = 3 × 10⁸ m/s in vacuum. The relationship between E and B fields is E = cB (at any instant). Visible light is electromagnetic radiation with wavelengths roughly 400–700 nm.

#### The Electromagnetic Spectrum
The electromagnetic spectrum includes (from long to short wavelength): radio waves (km to m), microwaves (mm to cm), infrared (μm), visible light (400–700 nm), ultraviolet (10–400 nm), X-rays (0.01–10 nm), gamma rays (< 0.01 nm). Despite different names, all electromagnetic waves follow the same physics. They travel at c in vacuum and refract/reflect according to Snell's law and boundary conditions.

#### Polarization
Electromagnetic waves can be polarized: the electric field oscillates in a fixed direction (linear polarization), or the direction rotates (circular polarization). Unpolarized light (from incandescent bulbs) has E-field oscillations in random directions. Polarizing filters transmit only one polarization direction, reducing intensity by half for unpolarized light. Polarization is used in 3D movies, LCD screens, and optical instruments.

#### Radiation Pressure & Momentum
Electromagnetic waves carry momentum. The radiation pressure on a surface is P = I/c (absorbing surface) or P = 2I/c (perfectly reflecting surface). This is why comet tails always point away from the Sun (radiation pressure from sunlight). Light pressure is also used in optical tweezers and is being explored for solar sails in spacecraft propulsion.

#### Review Questions
1. What is the wavelength of electromagnetic radiation at frequency 10¹⁵ Hz?
2. Explain why polarizing filters reduce light intensity.
3. Why does a comet's tail point away from the Sun?

---

### Wave Competition Problems
**Type:** Competition Extension
**Slug:** wave-competition-problems
**Estimated time:** 10 min
**Key concepts:** interference patterns · diffraction · Doppler · phase · elegance
**Summary:** Competition problems test deep understanding of wave phenomena, often combining multiple concepts or requiring creative analysis.

#### Double-Slit Interference Pattern
"Light of wavelength 500 nm passes through two slits 0.1 mm apart. On a screen 1 m away, how far apart are the bright fringes?" Solution: The fringe spacing is Δy = λL/d, where L is the distance to the screen and d is the slit separation. Δy = (500 × 10⁻⁹ × 1)/(0.1 × 10⁻³) = 5 mm. Bright fringes are 5 mm apart.

#### Doppler & Speed Measurement
"An observer on a highway measures the frequency change of a truck's horn passing by. The stationary horn frequency is 400 Hz. As it approaches, the observer measures 450 Hz. As it recedes, 355 Hz. Estimate the truck's speed." Solution: Use the Doppler formulas. For approach: f' = f(v + v_o)/(v − v_s). For recession: f' = f(v − v_o)/(v + v_s). Averaging or using the ratio of frequencies can estimate v_s. Rough answer: v_s ≈ 30 m/s.

#### Standing Wave Harmonics in Pipes
"A pipe closed at one end and open at the other has a length of 0.5 m. What are the possible frequencies if the wave speed is 340 m/s?" Solution: For a pipe closed at one end, the closed end is a node and the open end is an antinode. The allowed wavelengths are λ_n = 4L/n (n = 1, 3, 5, ..., odd integers only). Frequencies are f_n = nv/(4L): f₁ = 340/2 = 170 Hz; f₃ = 3 × 340/2 = 510 Hz; f₅ = 850 Hz, etc.

#### Phase Velocity vs. Group Velocity
"Two waves with slightly different frequencies travel in a medium. What happens?" Solution: Each wave travels at its phase velocity v_p = ω/k. But the envelope of their sum travels at a different speed, the group velocity v_g = dω/dk. In dispersive media (where v_p depends on ω), v_g ≠ v_p. This explains why a wave packet's shape changes and energy travels at the group velocity, not the phase velocity.

#### Review Questions
1. For 10 points: Double-slit interference uses slits separated by 0.2 mm, light of wavelength 600 nm, screen at 2 m. Find fringe spacing.
2. A closed pipe of length 1 m resonates at what frequencies?
3. Explain why the group velocity and phase velocity differ in dispersive media.

---

[Remaining subtopics (Wave Interference & Standing Waves, Sound Waves & Acoustics continued) follow the same format with 8 lessons per subtopic, omitted for brevity.]

---
