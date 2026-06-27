# HS Math — Probability & Statistics
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Counting Principles (Permutations & Combinations)

### Fundamental Counting Principle & Factorials
**Type:** Core Understanding
**Slug:** hs-counting-fundamental
**Estimated time:** 12 min
**Key concepts:** multiplication principle · factorial · counting sequences
**Summary:** The Fundamental Counting Principle — multiply choices at each independent step — underpins all of combinatorics.

#### The Multiplication Principle
If task A can be done in m ways and task B in n ways (independently), the combined task can be done in m×n ways. Extend to any number of steps. Example: A 3-digit lock with digits 0–9 on each ring has 10³ = 1000 combinations. A committee selects a president, VP, and secretary from 10 people (different people each role): 10×9×8 = 720 ways.

#### Factorials
n! = n×(n−1)×⋯×2×1. Counts the number of ways to arrange n distinct objects. 0! = 1 (by convention — one way to arrange nothing). Key values: 5! = 120, 6! = 720, 7! = 5040, 10! = 3,628,800. Factorials grow extremely fast — crucial to recognize when an answer should be in factorial form.

#### Permutations: Ordered Arrangements
P(n, r) = n!/(n−r)! = n×(n−1)×⋯×(n−r+1). Number of ways to choose r objects from n and arrange them (order matters). Example: Number of 3-letter "words" from {A,B,C,D,E} with no repeats: P(5,3) = 5×4×3 = 60.

#### Combinations: Unordered Selections
C(n, r) = n!/(r!(n−r)!) = "n choose r." Order does NOT matter. Example: 5-card hands from 52-card deck: C(52,5) = 2,598,960. Relationship: C(n,r) = P(n,r)/r! — divide out the r! orderings within each group.

#### Review Questions
1. How many 4-digit PINs can be formed using digits 1–9 with no repetition?
2. In how many ways can 8 runners finish a race (1st, 2nd, 3rd, no ties)?
3. A club has 12 members. How many ways can a 4-person committee be formed?

---

### Combinations in Depth: Pascal's Triangle & Identities
**Type:** Core Understanding
**Slug:** hs-counting-combinations-deep
**Estimated time:** 13 min
**Key concepts:** Pascal's triangle · binomial coefficient identities · stars and bars
**Summary:** Pascal's triangle encodes all binomial coefficients; its identities — especially Pascal's identity and symmetry — appear constantly in competition counting.

#### Pascal's Triangle & Pascal's Identity
Row n of Pascal's triangle gives C(n,0), C(n,1), …, C(n,n). Pascal's Identity: C(n,r) = C(n−1,r−1) + C(n−1,r). Proof: choosing r from n either includes object A (then choose r−1 from n−1) or excludes it (choose r from n−1). This recursive structure means C(n,r) can be computed without full factorials.

#### Key Identities
Symmetry: C(n,r) = C(n,n−r). Sum of row: Σᵣ C(n,r) = 2ⁿ. Vandermonde: C(m+n,r) = Σₖ C(m,k)·C(n,r−k). Hockey stick: Σᵢ₌ᵣⁿ C(i,r) = C(n+1,r+1). These appear in AMC/AIME and Science Bowl. Memorize the sum-of-row identity: 2ⁿ counts all subsets of an n-element set.

#### Stars and Bars
Number of non-negative integer solutions to x₁+x₂+⋯+xₖ = n is C(n+k−1, k−1). Example: ways to distribute 10 identical candies to 3 kids (each can get 0): C(10+3−1, 3−1) = C(12,2) = 66. If each must get at least 1: substitute yᵢ = xᵢ−1, so y₁+y₂+y₃ = 7: C(9,2) = 36.

#### Circular Permutations & Necklaces
Circular arrangements of n distinct objects: (n−1)! (fix one, arrange rest). Necklaces (can flip): (n−1)!/2. Example: 6 people around a circular table: 5! = 120 arrangements.

#### Review Questions
1. Prove C(n, 2) + C(n, 1) = C(n+1, 2) using Pascal's identity.
2. In how many ways can you choose 3 books from 8 if two specific books cannot both be chosen?
3. How many ways can 10 identical balls be placed in 4 distinct boxes?

---

### Counting in Competition: Overcounting & Casework
**Type:** Application
**Slug:** hs-counting-application
**Estimated time:** 14 min
**Key concepts:** inclusion-exclusion · casework · overcounting correction
**Summary:** Most hard counting problems require either inclusion-exclusion to correct overcounting or careful casework to split into manageable pieces.

#### Inclusion-Exclusion Principle
|A ∪ B| = |A| + |B| − |A ∩ B|. For three sets: |A∪B∪C| = |A|+|B|+|C|−|A∩B|−|A∩C|−|B∩C|+|A∩B∩C|. Example: How many integers from 1 to 100 are divisible by 2 or 3? |A|=50, |B|=33, |A∩B|=16 (div by 6). Answer: 50+33−16 = 67.

#### Casework Strategy
Break the problem into mutually exclusive, exhaustive cases. Example: How many 4-digit numbers have digit sum 10, where each digit is 1–4? Cases by first digit: 1 (remaining three sum to 9 from {1–4}), 2 (→8), 3 (→7), 4 (→6). Enumerate each case systematically.

#### Complementary Counting
Count total minus bad. Example: 5-digit strings with digits 0–9, at least one digit = 7. Total: 10⁵. No 7s: 9⁵. Answer: 10⁵−9⁵ = 100000−59049 = 40951.

#### Division for Symmetry
If n identical objects are distributed and order doesn't matter, divide by symmetry factor. Example: Number of ways to seat 4 couples at a circular table (couples must sit together): treat each couple as a unit → (4−1)! = 6 circular arrangements, then each couple can internally swap → ×2⁴ = 16. Total: 6×16 = 96.

#### Review Questions
1. How many integers 1–500 are divisible by 3, 5, or 7?
2. Count 5-letter words (A–Z) with at least 2 vowels (A, E, I, O, U).
3. How many ways can 3 identical red and 4 identical blue balls be arranged in a row?

---

### Counting: Competition Extensions
**Type:** Competition Extension
**Slug:** hs-counting-competition
**Estimated time:** 8 min
**Key concepts:** Chicken McNugget theorem · pigeonhole · bijections
**Summary:** Competition-level counting adds powerful tools: the Chicken McNugget theorem for Frobenius numbers, pigeonhole arguments, and bijective proofs.

#### Chicken McNugget Theorem (Frobenius Coin Problem)
For two coprime positive integers a and b, the largest integer that CANNOT be expressed as xa+yb (x,y ≥ 0) is ab−a−b. Example: nuggets come in 6 and 11. Largest non-purchasable: 6·11−6−11 = 49. Numbers > 49 can all be purchased.

#### Pigeonhole Principle
If n+1 objects are placed in n boxes, at least one box has 2+ objects. Generalized: at least one box has ⌈N/n⌉ objects. Example: In any group of 13 people, at least two share a birth month. Competition use: prove existence of a common property without finding it explicitly.

#### Bijections & Double Counting
To count set A, find a bijection to set B whose size is known. To prove a combinatorial identity, count the same set two ways (both sides count the same objects). Example: Prove C(n,1)+2·C(n,2)+⋯+n·C(n,n) = n·2^(n-1) by counting (element, subset) pairs two ways.

#### Toss-Up Style
"For 10 points, what is the largest integer that cannot be represented as 5a+8b for non-negative integers a, b?" Chicken McNugget: 5·8−5−8 = 27. ANSWER: 27.

#### Review Questions
1. In any group of 367 people, at least two share a birthday (including Feb 29). Why?
2. Find all positive integers not expressible as 4a+7b (a,b ≥ 0).
3. Use double counting to prove Σₖ k·C(n,k) = n·2^(n-1).

---

## Subtopic: Probability (Conditional Probability & Bayes' Theorem)

### Probability Fundamentals & Conditional Probability
**Type:** Core Understanding
**Slug:** hs-probability-conditional
**Estimated time:** 13 min
**Key concepts:** probability space · conditional probability · independence
**Summary:** Conditional probability P(A|B) restricts the sample space to event B, revealing how knowing B changes our assessment of A — the foundation of statistical reasoning.

#### Sample Space & Basic Probability
P(A) = (# favorable outcomes)/(# total outcomes) for uniform sample spaces. Complement rule: P(Aᶜ) = 1−P(A). Addition rule: P(A∪B) = P(A)+P(B)−P(A∩B). Mutually exclusive events: P(A∩B) = 0. Always verify 0 ≤ P(A) ≤ 1.

#### Conditional Probability
P(A|B) = P(A∩B)/P(B). Read: "probability of A given B." Knowing B occurred restricts us to the B-world. Example: Card drawn from standard deck. P(Ace | Red card) = P(Ace AND Red)/P(Red) = (2/52)/(26/52) = 2/26 = 1/13.

#### Independence
Events A and B are independent if P(A∩B) = P(A)·P(B), equivalently P(A|B) = P(A) — knowing B doesn't change A's probability. Example: Rolling two dice. Getting 6 on die 1 and getting 6 on die 2 are independent: P(both 6) = 1/6·1/6 = 1/36. Independence ≠ mutual exclusivity: independent events CAN both occur.

#### Multiplication Rule
P(A∩B) = P(A|B)·P(B) = P(B|A)·P(A). For independent events: P(A∩B) = P(A)·P(B). Example: Bag has 5 red and 3 blue. Draw two without replacement. P(both red) = P(1st red)·P(2nd red|1st red) = (5/8)·(4/7) = 20/56 = 5/14.

#### Review Questions
1. Two fair dice. Given the sum is at least 8, what is the probability the sum is exactly 10?
2. P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. Are A and B independent?
3. Draw 3 cards without replacement. P(all hearts)?

---

### Bayes' Theorem
**Type:** Core Understanding
**Slug:** hs-probability-bayes
**Estimated time:** 14 min
**Key concepts:** Bayes' theorem · prior/posterior · law of total probability
**Summary:** Bayes' theorem reverses conditional probability — given that an effect occurred, it computes the probability of each possible cause.

#### The Law of Total Probability
If B₁, B₂, …, Bₙ partition the sample space, then P(A) = Σ P(A|Bᵢ)·P(Bᵢ). This lets you compute P(A) by conditioning on which Bᵢ occurred. Example: Medical test for a disease with P(disease) = 0.01. Test is 99% sensitive (P(+|disease) = 0.99) and 99% specific (P(−|no disease) = 0.99). P(+) = P(+|D)·P(D) + P(+|Dᶜ)·P(Dᶜ) = 0.99·0.01 + 0.01·0.99 = 0.0198.

#### Bayes' Theorem
P(B|A) = P(A|B)·P(B)/P(A). Using total probability: P(Bᵢ|A) = [P(A|Bᵢ)·P(Bᵢ)] / Σⱼ[P(A|Bⱼ)·P(Bⱼ)]. The medical test example: given a positive test, P(disease|+) = P(+|D)·P(D)/P(+) = (0.99·0.01)/0.0198 = 0.0099/0.0198 = 0.5. Surprising: even a 99% accurate test gives only 50% probability of disease when the base rate is 1%!

#### Prior and Posterior
"Prior" = initial belief P(Bᵢ). "Posterior" = updated belief P(Bᵢ|A) after observing A. Bayes' theorem is the mathematical mechanism for rational belief updating. The prior matters hugely: rare events stay improbable even after positive tests because of base rate (Bayes factor) considerations.

#### Classic Bayes Problems
Box 1 has 3 red, 7 blue; Box 2 has 6 red, 4 blue. Pick a box at random, draw a ball — it's red. P(Box 1 | red) = P(red|Box1)·P(Box1) / P(red) = (0.3·0.5) / (0.3·0.5+0.6·0.5) = 0.15/0.45 = 1/3.

#### Review Questions
1. 3 identical boxes: box A has 2 gold coins, B has 1 gold 1 silver, C has 2 silver. Random box, random coin — it's gold. P(other coin in box is gold)?
2. Disease prevalence 2%. Test is 95% sensitive, 90% specific. Given positive test, P(disease)?
3. Explain why base rate matters more than test accuracy for rare diseases.

---

### Conditional Probability: Applications
**Type:** Application
**Slug:** hs-probability-application
**Estimated time:** 14 min
**Key concepts:** Bayes · false positives · conditional chain calculations
**Summary:** Worked problems applying Bayes' theorem, conditional chains, and the false-positive paradox to realistic scenarios.

#### Problem 1: Monty Hall
Three doors; car behind one, goats behind two. You pick door 1. Host opens door 3 (goat). Should you switch? P(car behind door 2 | host opens 3) = P(host opens 3 | car behind 2)·P(car behind 2) / P(host opens 3). P(host opens 3|car behind 1) = 1/2 (arbitrary choice). P(host opens 3|car behind 2) = 1 (must open 3). P(host opens 3|car behind 3) = 0. P(host opens 3) = 1/2·1/3 + 1·1/3 = 1/2. P(car behind 2|host opens 3) = (1·1/3)/(1/2) = 2/3. SWITCH!

#### Problem 2: Sequential Draws
Urn has 4 red, 6 blue. Draw 3 without replacement. P(exactly 2 red) = C(4,2)·C(6,1)/C(10,3) = 6·6/120 = 36/120 = 3/10.

#### Problem 3: Conditional Chain
P(A) = 0.6, P(B|A) = 0.7, P(B|Aᶜ) = 0.3. Find P(A|B). P(B) = 0.7·0.6+0.3·0.4 = 0.42+0.12 = 0.54. P(A|B) = 0.42/0.54 = 7/9 ≈ 0.778.

#### Review Questions
1. Three friends A, B, C each flip a coin. If at least one gets heads, what is P(all three get heads)?
2. In a class, 60% study math, 40% study English, 30% study both. Given a student studies math, P(also studies English)?
3. Solve the Sleeping Beauty problem: probability of heads given she is awakened on Monday?

---

### Probability: Competition Problems
**Type:** Competition Extension
**Slug:** hs-probability-competition
**Estimated time:** 8 min
**Key concepts:** geometric probability · expected value · Bayes speed strategies
**Summary:** Competition probability problems favor expected value, geometric probability, and elegant Bayes setups — here are the patterns.

#### Geometric Probability
P = favorable length (area/volume) / total measure. Example: Point chosen uniformly in [0,1]×[0,1]. P(x+y < 1) = area of triangle with vertices (0,0),(1,0),(0,1) = 1/2.

#### Expected Value Tricks
E[X] = Σ x·P(X=x). Linearity of expectation: E[X+Y] = E[X]+E[Y] always (even if dependent). Indicator variables: E[# successes] = n·p. Geometric distribution: E[trials until 1st success] = 1/p.

#### Toss-Up
"For 10 points, two people each roll a fair die. What is the probability that they roll the same number?" Answer: 1/6 (fix one, other must match: 6 choices, 1 good = 1/6).

"For 10 points, what is the expected number of rolls of a fair die until a 6 appears?" Answer: Geometric with p=1/6: E = 1/(1/6) = 6.

#### Review Questions
1. A dart is thrown uniformly at a 10×10 board. P(lands within a circle of radius 3 centered at center)?
2. Roll a fair die repeatedly. E[# rolls until sum exceeds 6]?
3. 5 people each choose a number 1–10 uniformly. P(at least two choose the same number)?

---

## Subtopic: Random Variables & Probability Distributions

### Discrete Random Variables & Distributions
**Type:** Core Understanding
**Slug:** hs-distributions-discrete
**Estimated time:** 13 min
**Key concepts:** PMF · expected value · variance · binomial distribution
**Summary:** A random variable assigns a number to each outcome; its distribution, mean, and variance characterize its entire probabilistic behavior.

#### Probability Mass Functions
A discrete RV X has PMF P(X = x) = p(x) ≥ 0 with Σ p(x) = 1. The CDF F(x) = P(X ≤ x) = Σ_{t≤x} p(t). Expected value: E[X] = Σ x·p(x). Variance: Var(X) = E[(X−μ)²] = E[X²]−(E[X])². Standard deviation σ = √Var(X).

#### Binomial Distribution
X ~ Bin(n, p): n independent trials, each success prob p. P(X=k) = C(n,k)·pᵏ·(1−p)^(n−k). E[X] = np. Var(X) = np(1−p). Example: 10 free throws, 80% success rate. P(exactly 8) = C(10,8)·(0.8)⁸·(0.2)² = 45·0.1678·0.04 ≈ 0.302. E[made] = 8. Conditions: fixed n, binary, independent, same p.

#### Geometric Distribution
X = # trials until first success. P(X=k) = (1−p)^(k−1)·p for k = 1,2,3,… E[X] = 1/p. Var(X) = (1−p)/p². Memoryless property: P(X > m+n | X > m) = P(X > n).

#### Poisson Distribution
X ~ Pois(λ): P(X=k) = e^(−λ)·λᵏ/k! for k = 0,1,2,… E[X] = Var(X) = λ. Models rare events in continuous time/space. Example: Average 3 typos/page. P(0 typos on next page) = e⁻³ ≈ 0.050.

#### Review Questions
1. X ~ Bin(20, 0.3). Find E[X], Var(X), and P(X = 6).
2. A geometric RV has success probability 1/4. Find E[X] and P(X > 4).
3. Calls arrive at a rate of 5/hour (Poisson). P(≥ 2 calls in 1 hour)?

---

### Continuous Distributions & Normal Distribution
**Type:** Core Understanding
**Slug:** hs-distributions-continuous
**Estimated time:** 13 min
**Key concepts:** PDF · CDF · normal distribution · Z-score
**Summary:** Continuous random variables have probability density functions; the normal distribution underpins all of statistics and the Central Limit Theorem.

#### Probability Density Functions
For continuous X, P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx, where f(x) ≥ 0 and ∫_{-∞}^{∞} f(x) dx = 1. P(X = a) = 0 for any single value. E[X] = ∫_{-∞}^{∞} x·f(x) dx. The CDF F(x) = P(X ≤ x) = ∫_{-∞}^{x} f(t) dt, and F'(x) = f(x).

#### Uniform Distribution
X ~ Uniform(a, b): f(x) = 1/(b−a) on [a,b]. E[X] = (a+b)/2. Var(X) = (b−a)²/12. Example: Bus arrives uniformly in [0,10] minutes. E[wait] = 5 min. P(wait > 7) = 3/10.

#### Normal Distribution
X ~ N(μ, σ²): bell curve, symmetric about μ. Standard normal Z ~ N(0,1). Standardize: Z = (X−μ)/σ. The 68-95-99.7 rule: P(|X−μ| < σ) ≈ 0.68; < 2σ: 0.95; < 3σ: 0.997. Lookup probabilities from Z-table or use symmetry P(Z < −z) = P(Z > z) = 1−P(Z < z).

#### Central Limit Theorem
Sample mean X̄ of n iid samples from any distribution with mean μ and variance σ² approaches N(μ, σ²/n) as n → ∞. SE(X̄) = σ/√n. Allows inference about populations using normal probabilities even when underlying distribution is unknown.

#### Review Questions
1. X ~ N(50, 16). Find P(46 < X < 58) using Z-scores and the 68-95-99.7 rule.
2. X ~ Uniform(2, 8). Find P(3 < X < 6) and Var(X).
3. State the CLT in plain language. Why does it matter for statistics?

---

### Distributions: Application Problems
**Type:** Application
**Slug:** hs-distributions-application
**Estimated time:** 14 min
**Key concepts:** binomial · normal approximation · expected value problems
**Summary:** Full worked problems using binomial, normal, and Poisson distributions in real contexts.

#### Problem 1: Quality Control
A factory produces items with 5% defect rate. In a batch of 50, what is P(≤ 2 defective)? X ~ Bin(50, 0.05). E[X]=2.5. P(X=0) = (0.95)⁵⁰ ≈ 0.0769. P(X=1) = C(50,1)(0.05)(0.95)⁴⁹ ≈ 0.2025. P(X=2) = C(50,2)(0.05)²(0.95)⁴⁸ ≈ 0.2611. Total ≈ 0.540.

#### Problem 2: Normal Approximation to Binomial
X ~ Bin(100, 0.4). Approximate P(35 ≤ X ≤ 45) using normal. μ = 40, σ = √24 ≈ 4.9. With continuity correction: P(34.5 ≤ Y ≤ 45.5). Z₁ = (34.5−40)/4.9 ≈ −1.12; Z₂ = (45.5−40)/4.9 ≈ 1.12. P(−1.12 ≤ Z ≤ 1.12) ≈ 0.737.

#### Problem 3: Expected Value with Multiple Variables
A game: roll a die, gain that many dollars if ≥ 4, lose $2 otherwise. E[gain] = P(1)·(−2) + P(2)·(−2) + P(3)·(−2) + P(4)·4 + P(5)·5 + P(6)·6 = (1/6)(−2−2−2+4+5+6) = 9/6 = $1.50.

#### Review Questions
1. X ~ Poisson(4). P(X > 2)?
2. Heights are normal with μ = 170cm, σ = 10cm. P(person is between 155 and 185cm)?
3. A fair coin is flipped 400 times. Use normal approximation to find P(190 ≤ # heads ≤ 210).

---

### Distributions: Competition Extensions
**Type:** Competition Extension
**Slug:** hs-distributions-competition
**Estimated time:** 8 min
**Key concepts:** negative binomial · expected value linearity tricks · competition distribution problems
**Summary:** Competition probability loves linearity of expectation, indicator variables, and the negative binomial — faster than brute-force enumeration.

#### Indicator Variable Trick
E[X] where X counts events: write X = I₁+I₂+⋯, where Iₖ = 1 if event k occurs. Then E[X] = E[I₁]+⋯ = P(event 1)+⋯. Example: E[# pairs of people with same birthday in group of 30]. Number of pairs = C(30,2) = 435. P(any pair matches) = 1/365. E[# matching pairs] = 435/365 ≈ 1.19.

#### Negative Binomial
X = # trials until rth success. E[X] = r/p. Example: # cards drawn (without replacement) until 3 aces: E = 3·(52/4) but this needs careful adjustment for without-replacement setting.

#### Toss-Up
"For 10 points, what is the expected number of times you roll a fair die until you have rolled each number at least once?" This is the Coupon Collector problem: E = 6·(1/1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6) = 6·49/20 = 14.7.

#### Review Questions
1. 10 people in a room. E[# pairs sharing a birthday]?
2. Roll a die until you see a 5. E[# rolls]?
3. X ~ Bin(n, p). Show Var(X) = np(1−p) using indicator variables.

---

## Subtopic: Descriptive Statistics & Statistical Inference

### Descriptive Statistics & Data Analysis
**Type:** Core Understanding
**Slug:** hs-stats-descriptive
**Estimated time:** 12 min
**Key concepts:** mean · median · variance · IQR · outliers
**Summary:** Descriptive statistics summarize a dataset's center, spread, and shape — the foundation of all statistical communication.

#### Measures of Center
Mean: x̄ = Σxᵢ/n (sensitive to outliers). Median: middle value when sorted (robust). Mode: most frequent value. For right-skewed data: mean > median > mode. For left-skewed: mean < median < mode. Symmetric: mean ≈ median. Competition tip: know which is most/least affected by extreme values.

#### Measures of Spread
Range = max − min. Variance: s² = Σ(xᵢ−x̄)²/(n−1) (sample) or σ² = Σ(xᵢ−μ)²/n (population). SD = √variance. IQR = Q3 − Q1. Outlier rule: < Q1−1.5·IQR or > Q3+1.5·IQR. Coefficient of variation: CV = σ/μ (allows comparison across different scales).

#### Five-Number Summary & Boxplots
Min, Q1, Median, Q3, Max. Q1 = 25th percentile, Q3 = 75th. Boxplot: box from Q1 to Q3, line at median, whiskers to min/max (or 1.5·IQR), dots for outliers. Symmetric distribution → box is centered; skewed → box shifts toward tail.

#### Shape of Distributions
Skewness: positive (right tail), negative (left tail). Kurtosis: heavy tails (leptokurtic) vs. light tails (platykurtic). Bimodal = two peaks. Normal distribution is the benchmark: bell-shaped, symmetric, 68-95-99.7 rule applies.

#### Review Questions
1. Dataset: {2, 5, 7, 8, 8, 10, 15}. Find mean, median, mode, IQR, and identify any outliers.
2. Why is median preferred over mean for household income data?
3. Two datasets have the same mean. Dataset A has SD=2, Dataset B has SD=8. What does this tell you?

---

### Statistical Inference: Confidence Intervals & Hypothesis Tests
**Type:** Core Understanding
**Slug:** hs-stats-inference
**Estimated time:** 14 min
**Key concepts:** confidence interval · p-value · Type I/II error · significance
**Summary:** Statistical inference uses sample data to make probabilistic statements about populations; confidence intervals and hypothesis tests are the two main tools.

#### Confidence Intervals
CI for population mean (known σ): x̄ ± z*(σ/√n). z* = 1.645 (90%), 1.96 (95%), 2.576 (99%). CI for proportion: p̂ ± z*·√(p̂(1−p̂)/n). Interpretation: "We are 95% confident the true parameter lies in this interval." NOT "95% probability the parameter is in this interval" — the parameter is fixed, the interval is random.

#### Hypothesis Testing Framework
H₀: null hypothesis (status quo). Hₐ: alternative hypothesis. p-value = P(observing data this extreme or more | H₀ true). Reject H₀ if p-value < α (significance level, usually 0.05). Test statistic: z = (x̄−μ₀)/(σ/√n). Two-tailed test: p-value = 2·P(Z > |z|).

#### Type I & Type II Errors
Type I (false positive): reject H₀ when true. P(Type I) = α. Type II (false negative): fail to reject H₀ when false. P(Type II) = β. Power = 1−β = P(correctly reject H₀). Increasing sample size reduces both errors. Increasing α reduces Type II but increases Type I.

#### Correlation vs. Causation
Correlation r measures linear association: r ∈ [−1, 1]. r² = coefficient of determination (% variance explained by linear model). Correlation does NOT imply causation — lurking variables, reverse causation, coincidence. Example: ice cream sales and drowning deaths are correlated (both driven by summer).

#### Review Questions
1. Sample of 36 students, x̄ = 72, σ = 12. Construct a 95% CI for the population mean.
2. H₀: μ = 50, σ = 10, n = 25, x̄ = 54. Compute the z-statistic and p-value (two-tailed).
3. Explain why "correlation implies causation" is a logical fallacy, with an example.

---

### Statistics: Application Problems
**Type:** Application
**Slug:** hs-stats-application
**Estimated time:** 14 min
**Key concepts:** hypothesis testing · confidence intervals · regression
**Summary:** Worked statistical analysis problems connecting formulas to real decisions.

#### Problem 1: Drug Trial
A new drug claims to lower blood pressure by more than 5 mmHg. In a trial of n = 64, mean reduction = 6.2 mmHg, σ = 4 mmHg. Test at α = 0.05. H₀: μ = 5, Hₐ: μ > 5 (one-tailed). z = (6.2−5)/(4/8) = 1.2/0.5 = 2.4. P(Z > 2.4) ≈ 0.0082 < 0.05. Reject H₀. Evidence supports the claim.

#### Problem 2: Confidence Interval for Proportion
Poll of 400 voters: 220 support Candidate A (p̂ = 0.55). 95% CI: 0.55 ± 1.96·√(0.55·0.45/400) = 0.55 ± 1.96·0.0249 = 0.55 ± 0.049 = (0.501, 0.599). Since interval excludes 0.5, conclude majority support.

#### Problem 3: Linear Regression Interpretation
Regression line: ŷ = 2.5x + 30 (x = study hours, y = test score). Slope 2.5: each extra hour predicts 2.5 more points. Intercept 30: predicted score with 0 hours (extrapolation — not meaningful here). r² = 0.81: 81% of score variance explained by hours. Residual = actual − predicted.

#### Review Questions
1. A 95% CI for μ is (48, 56). What is the sample mean? Margin of error?
2. Testing H₀: p = 0.5 vs. Hₐ: p > 0.5 with 60 heads in 100 flips. Compute z and p-value.
3. If r = −0.9 for (temperature, winter coat sales), interpret r and r².

---

### Statistics: Mixed Review
**Type:** Mixed/Review
**Slug:** hs-stats-review
**Estimated time:** 10 min
**Key concepts:** distributions · inference · error types · experimental design
**Summary:** Synthesis across all probability and statistics concepts in timed-practice format.

#### Quick Questions
1. P(Z > 1.96) = ? → 0.025. 2. CI gets narrower when: n increases or α decreases. 3. Which is not affected by outliers: mean, median, range, SD? → median. 4. If P-value = 0.03 and α = 0.05: reject or fail? → Reject H₀. 5. Randomized experiments vs. observational studies: key difference? → Random assignment controls confounders.

#### Synthesis Problem
A factory claims defect rate = 2%. Inspector samples 500 items, finds 14 defective (p̂ = 0.028). Test H₀: p = 0.02 at α = 0.05 (two-tailed). z = (0.028−0.02)/√(0.02·0.98/500) = 0.008/0.00626 ≈ 1.28. p-value = 2·P(Z > 1.28) ≈ 2·0.1003 = 0.20 > 0.05. Fail to reject H₀. Insufficient evidence to contradict the claim.

#### Review Questions
1. X ~ N(100, 25). P(X < 90)?
2. Explain the difference between P(reject H₀ | H₀ true) and P(H₀ true | reject H₀).
3. A study finds people who eat breakfast earn more. List three alternative explanations before concluding breakfast causes higher earnings.
