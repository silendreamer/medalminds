---
id: nsb-lesson-0751
title: "Discrete Math Problem Solving"
level: hs
subject: math
topic: discrete-math
subtopic: "Number Theory (Divisibility, Primes & Modular Arithmetic)"
slug: discrete-problem-solving
type: "Mixed/Review"
estimatedMinutes: 12
keyConcepts: ["combining techniques", "multi-step logic", "real-world applications"]
summary: "Discrete math problems often combine number theory, graph theory, and logic."
---
#### Pigeonhole Principle
If n + 1 items are placed into n boxes, at least one box contains two or more items. Example: among 13 people, at least two share the same birth month (by pigeonhole, with 13 people and 12 months). Another: if 5 points are placed in a 2×2 square, at least two are within distance √2 of each other (by pigeonhole, dividing the square into 4 unit squares).

#### Combinatorial Counting
Count the number of ways to arrange or select objects. Example: how many 4-digit numbers use distinct digits from {0–9}? The first digit has 9 choices (1–9), the second 9 (0–9 minus the first), the third 8, the fourth 7. Total: 9 · 9 · 8 · 7 = 4536. Another: how many 2-element subsets of a 5-element set? C(5,2) = 10.

#### Graph Coloring and Planar Graphs
The chromatic number is the minimum colors needed to color vertices so no adjacent vertices share a color. The four-color theorem states that any planar graph is 4-colorable. Example: a map of countries is a planar graph where each country is a vertex and edges connect adjacent countries. The chromatic number is at most 4.

#### Worked Example: Network Routing
A router has 6 incoming links and 4 outgoing links. Each incoming link can receive packets from one source, each outgoing link can send to one destination. If we need to route 24 packets from 6 sources to 4 destinations, and each source sends 4 packets to each destination on average, what is the minimum number of times each link must be used? Total packets = 24. Total source capacity = 6 links. Total destination capacity = 4 links. By the min-cut max-flow theorem, the flow is limited by the bottleneck. On average, each source sends 4 packets and each destination receives 6 packets. Each outgoing link must handle 24/4 = 6 packets on average. Some routing topologies may incur congestion; optimal routing minimizes this.

#### Review Questions
1. How many 3-digit numbers have distinct digits?
2. In a group of 25 people, prove at least three share the same birth month.
3. What is the chromatic number of the complete graph K_4?

---
