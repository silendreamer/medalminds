---
id: nsb-lesson-1556
title: "Rate Laws and Reaction Order"
level: hs
subject: chemistry
topic: reaction-kinetics
subtopic: "Rate Laws and Reaction Order"
slug: rate-laws-reaction-order
type: "Application"
estimatedMinutes: 13
keyConcepts: ["rate law", "reaction order", "rate constant"]
summary: "Determine rate laws and reaction order from experimental data and interpret the rate constant."
---
#### The Rate Law Expression

The **rate law** relates reaction rate to the concentrations of reactants raised to experimentally determined exponents: rate = k[A]^m[B]^n. Here, **k** is the **rate constant**, [A] and [B] are molar concentrations of reactants, and m and n are the **partial orders** with respect to each reactant. The exponents m and n must be determined from experiment — they cannot be read from stoichiometric coefficients in the balanced equation (unless the reaction is an elementary step).

#### Reaction Order

The **overall reaction order** is the sum of all partial orders: m + n (for a two-reactant system). Common orders and their meaning:

- **Zero order** (m = 0): Rate is independent of [A]; rate = k. [A] decreases linearly with time.
- **First order** (m = 1): Rate = k[A]. Concentration decreases exponentially; half-life t₁/₂ = ln2/k is constant.
- **Second order** (m = 2): Rate = k[A]². Half-life increases as [A] decreases; 1/[A] vs. time is linear.

#### Determining Rate Law from Experimental Data

Use the **method of initial rates**: compare experiments where one reactant's concentration is held constant while another is doubled (or otherwise changed). If doubling [A] doubles the rate, the order in A is 1; if it quadruples the rate, the order is 2. Formally: m = log(rate₂/rate₁) / log([A]₂/[A]₁).

#### The Rate Constant k

The **rate constant k** has units that depend on overall reaction order: M^(1−n)·s^(−1) for an nth-order reaction (e.g., s⁻¹ for first order, M⁻¹s⁻¹ for second order). k is independent of concentration but is strongly temperature-dependent — it increases exponentially with temperature as described by the Arrhenius equation. A larger k means a faster reaction at any given concentration.

#### Integrated Rate Laws

Integrated rate laws link concentration directly to time:

- Zero order: [A]t = [A]₀ − kt
- First order: ln[A]t = ln[A]₀ − kt
- Second order: 1/[A]t = 1/[A]₀ + kt

Plotting the appropriate function of [A] vs. time yields a straight line whose slope (±k) identifies the reaction order.

#### Review Questions

1. For the reaction A + B → products with rate = k[A]²[B], what is the overall reaction order and the units of k?
2. In three experiments, doubling [A] while keeping [B] constant quadruples the rate; doubling [B] while keeping [A] constant leaves the rate unchanged. Write the rate law.
3. A first-order reaction has k = 0.0231 s⁻¹. What is its half-life, and how long until [A] falls to 25% of its initial value?

---
