---
id: nsb-lesson-0788
title: "Graphing Lab Data: Pendulum Period vs. Length"
level: hs
subject: physics
topic: scientific-inquiry
subtopic: "Graphing, Data Analysis & Uncertainty"
slug: graphing-lab-data-pendulum-period
type: "Application"
estimatedMinutes: 13
keyConcepts: ["linearization", "best-fit line", "extracting constants"]
summary: "A complete worked example of graphing experimental data, linearizing the relationship, and extracting the gravitational acceleration g from a pendulum experiment."
---
#### The Experiment
You measure the period T of a pendulum at different lengths L. Theory says T = 2π√(L/g). Data collected:

| L (m) | T (s) |
|-------|-------|
| 0.25 | 1.00 |
| 0.50 | 1.41 |
| 1.00 | 2.00 |
| 1.50 | 2.45 |

#### Linearizing the Data
T = 2π√(L/g) → T² = (4π²/g)L. Plot T² vs. L. This should give a straight line through the origin with slope m = 4π²/g. From the table: T² values are 1.00, 1.99, 4.00, 6.00 s². Plot T² (y) vs. L (x).

#### Extracting g from the Slope
From the graph, slope ≈ (6.00−0)/(1.50−0) = 4.00 s²/m. Since slope = 4π²/g: g = 4π²/slope = 4 × 9.87/4.00 = 39.48/4.00 = 9.87 m/s². Compare to accepted g = 9.81 m/s². Percent error = 0.6%.

#### Evaluating Fit Quality
Plot residuals: T²_measured − T²_predicted. If the residuals are small and random, the linear model is excellent. If there's a systematic offset, there may be air resistance effects, or the pivot point adds effective length.

#### Review Questions
1. Why do we plot T² vs. L instead of T vs. L for a pendulum?
2. From a T² vs. L graph, what is the physical meaning of the y-intercept?
3. A student's best-fit slope is 3.80 s²/m. What value of g does this give?

---
