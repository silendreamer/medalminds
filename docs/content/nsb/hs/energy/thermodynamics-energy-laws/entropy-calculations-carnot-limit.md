---
id: nsb-lesson-0491
title: "Entropy Calculations and the Carnot Limit"
level: hs
subject: energy
topic: thermodynamics-energy-laws
subtopic: "Entropy & Second Law of Thermodynamics"
slug: entropy-calculations-carnot-limit
type: "Core Understanding"
estimatedMinutes: 14
keyConcepts: ["ΔS = Q/T", "Carnot efficiency", "reversible vs. irreversible processes"]
summary: "Calculate entropy changes and apply the Carnot formula to find the theoretical maximum efficiency of any heat engine."
---
#### Calculating Entropy Change
For a reversible heat transfer, ΔS = Q/T (Q in joules, T in Kelvin). When 1,000 J of heat flows from a 500 K reservoir to a 250 K reservoir: ΔS_hot = −1,000/500 = −2 J/K; ΔS_cold = +1,000/250 = +4 J/K; ΔS_universe = −2 + 4 = +2 J/K > 0 ✓ (spontaneous, entropy increases). Note: the same amount of heat creates MORE entropy in the cold reservoir than it destroys in the hot reservoir, which is why heat spontaneously flows from hot to cold — it increases total entropy.

#### The Carnot Engine
A Carnot engine is a theoretical ideal that operates reversibly (zero entropy generation) between two temperature reservoirs. It consists of four steps: (1) isothermal expansion at T_H (absorbs Q_H), (2) adiabatic expansion (temperature drops to T_C), (3) isothermal compression at T_C (rejects Q_C), (4) adiabatic compression (temperature rises to T_H). Because it's fully reversible, ΔS_universe = 0. The efficiency is: η = W_net/Q_H = 1 − Q_C/Q_H = 1 − T_C/T_H. No real engine can exceed Carnot efficiency — this is provable from the Second Law.

#### Temperature Must Be in Kelvin
Critical: the Carnot formula requires absolute temperature (Kelvin = Celsius + 273.15). A steam turbine with steam at 300°C (573 K) exhausting at 50°C (323 K): η_Carnot = 1 − 323/573 = 0.436 = 43.6%. If a student mistakenly uses Celsius, they get 1 − 50/300 = 83.3% — wildly wrong. This unit error is one of the most common in Science Bowl Energy computation questions.

#### Coefficient of Performance for Refrigerators
Refrigerators and heat pumps are heat engines run in reverse. Their performance is measured by the Coefficient of Performance (COP): COP_refrigerator = Q_C/W = T_C/(T_H − T_C). A refrigerator maintaining 5°C (278 K) in a 25°C (298 K) room: COP_max = 278/(298 − 278) = 278/20 = 13.9. This means it can move up to 13.9 joules of heat from cold to warm for every 1 joule of work input. Real refrigerators achieve COP of 2–4.

#### Irreversibility and Entropy Generation
Every real process generates entropy due to friction, heat transfer across finite temperature differences, mixing, and chemical reactions. Entropy generation always reduces work output below the Carnot ideal. Engineers minimize irreversibility through: better insulation (reduces heat transfer across large ΔT), lubrication (reduces friction), heat exchangers with small ΔT (counterflow designs), and staged compression/expansion. DOE's Industrial Assessment Centers help factories reduce irreversibility and energy waste.

#### Review Questions
1. A heat engine operates between 900 K and 300 K. What is the maximum possible efficiency?
2. Calculate the Carnot COP for a heat pump that maintains a building at 20°C when it's −10°C outside.
3. Why must temperatures be in Kelvin (not Celsius) when using the Carnot efficiency formula?

---
