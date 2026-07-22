# MS Math — Data & Probability
*Middle School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: Mean, Median, Mode & Range

### Understanding Measures of Central Tendency
**Type:** Core Understanding
**Slug:** ms-math-mean-median-mode-intro
**Estimated time:** 12 min
**Key concepts:** mean · median · mode · range · data set · average · central tendency
**Summary:** Learn to calculate and interpret mean, median, mode, and range for a data set.

#### Mean: The Arithmetic Average
The **mean** is calculated by adding all values and dividing by the number of values. Formula: Mean = (sum of all values) ÷ (number of values). Example: data set {4, 7, 9, 6, 4}. Sum = 4+7+9+6+4 = 30. Count = 5. Mean = 30 ÷ 5 = **6**. The mean is the most commonly used average, but it's sensitive to **outliers** — extreme values that pull the mean up or down significantly. Always verify your sum before dividing.

#### Median: The Middle Value
The **median** is the middle value when data is arranged in order. For an **odd** number of values: the median is the middle value. For an **even** number of values: the median is the **average of the two middle values**. Example: {4, 4, 6, 7, 9} — median = **6** (middle of 5 values). Example: {3, 5, 7, 9} — median = (5+7)/2 = **6**. The median is resistant to outliers. Always sort the data FIRST before finding the median.

#### Mode: The Most Frequent Value
The **mode** is the value that appears **most often** in a data set. A data set can have: **one mode** (unimodal), **two modes** (bimodal), **more than two modes** (multimodal), or **no mode** (all values appear equally). Example: {4, 4, 6, 7, 9} — mode = **4** (appears twice, all others once). Mode is most useful for categorical data (e.g., "most popular color") or finding common values. Unlike mean and median, mode can be non-numeric.

#### Range: Measuring Spread
The **range** is the simplest measure of how spread out data is: Range = Maximum value − Minimum value. Example: {4, 4, 6, 7, 9} → range = 9 − 4 = **5**. Range tells you the spread of the data, but it's also sensitive to outliers — one extreme value dramatically changes the range. Range is not a measure of "center" — it's a measure of **variability** (spread).

#### When to Use Each Measure
**Mean:** best when data is symmetric and has no extreme outliers. **Median:** best when data is skewed or has outliers (e.g., house prices, income). **Mode:** best for categorical data or finding the most common response. **Range:** use alongside mean/median to describe how spread out the data is. In Science Bowl, always read what the question asks for — mean, median, AND mode can each produce different answers for the same data set.

#### Review Questions
1. Find the mean, median, mode, and range of: {3, 7, 3, 9, 5, 3, 11}.
2. A data set has 5 values. Four of them are 8, 12, 6, and 10. The mean is 9. What is the fifth value?
3. Why might the median be more useful than the mean to describe the "typical" salary at a company where one executive earns $2,000,000 and four employees each earn $40,000?

---

### Effects of Outliers and Changing Data
**Type:** Core Understanding
**Slug:** ms-math-outliers-data-changes
**Estimated time:** 11 min
**Key concepts:** outlier · skewed data · resistant measure · adding data · effect on mean
**Summary:** Analyze how outliers and changes to the data set affect mean, median, mode, and range.

#### What Is an Outlier?
An **outlier** is a data value that is unusually far from the rest of the data. Example: {2, 3, 4, 4, 5, 50} — the value 50 is an outlier. With the outlier: mean = 68/6 ≈ **11.3**, median = (4+4)/2 = **4**. Without the outlier: mean = 18/5 = **3.6**, median = **4**. The mean changed dramatically; the median barely changed. The median is **resistant** to outliers; the mean is **not**. The range also changes dramatically when outliers are present.

#### Skewed Distributions
When data has an outlier on the high end, the mean is **pulled right** (higher than the median). This is called **right-skewed** or **positively skewed**. When the outlier is on the low end, the mean is pulled left → **left-skewed** (negatively skewed). In a perfectly symmetric distribution, mean = median = mode. A key Science Bowl pattern: "which measure is most affected by an outlier?" → the **mean** (and range). "Least affected?" → the **median**.

#### Adding a Value to the Data Set
If a value equal to the mean is added, the mean stays the same. If a value above the mean is added, the mean increases. If a value below the mean is added, the mean decreases. Example: data {4, 6, 8, 10}, mean = 7. Add value 13: new mean = (4+6+8+10+13)/5 = 41/5 = **8.2** (mean increases). Add value 7 (= current mean): new mean = (28+7)/5 = 35/5 = **7** (mean unchanged).

#### Adding a Constant to All Values
If you add a constant k to every value in the data set: the mean, median, and mode all **increase by k**; the range **stays the same** (since differences between values don't change). If you **multiply** every value by k: the mean, median, mode, and range all **multiply by k**. These rules are useful for problems where data is shifted or scaled.

#### Predicting Effects on Measures
When the largest value in a data set increases: the mean increases, the range increases, the median and mode may stay the same (if the largest value wasn't the middle or most common). When a new value is added between the current minimum and maximum: the range stays the same, but the mean and median may change slightly.

#### Review Questions
1. Data set {5, 7, 8, 9, 51}. What are the mean and median? Which better represents the "typical" value?
2. A class's test scores average 80. If every student gets 5 bonus points added to their score, what is the new average?
3. Data {3, 5, 7, 9}. If you multiply every value by 4, what are the new mean and range?

---

### Mean and Median Application: Weighted Averages
**Type:** Application
**Slug:** ms-math-weighted-averages-application
**Estimated time:** 13 min
**Key concepts:** weighted average · grade calculation · missing value · back-calculation · data interpretation
**Summary:** Apply mean and median to realistic problems including weighted averages and back-calculation.

#### Weighted Average
A **weighted average** gives different values different amounts of influence. Formula: Weighted Mean = Σ(value × weight) / Σ(weights). Example: a student has scores of 85 (worth 30%), 90 (worth 30%), and 78 (worth 40%). Weighted mean = (85×0.3 + 90×0.3 + 78×0.4) / 1 = (25.5 + 27 + 31.2) = **83.7**. A simple average would give (85+90+78)/3 = 84.3 — slightly different. Weighted averages reflect the importance of each component.

#### Finding a Missing Value Using Mean
If the mean and all but one value are known, find the missing value by: (1) multiply the mean by the number of values to get the required sum, (2) subtract the known values. Example: 6 test scores average 82. Five scores are 78, 85, 90, 72, and 88. What is the sixth? Required sum = 6×82 = 492. Known sum = 78+85+90+72+88 = 413. Missing = 492−413 = **79**.

#### Worked: Grade Calculation
Maria needs an average of at least 85 on four tests to earn an A. Her first three scores are 82, 88, and 79. What minimum score does she need on the fourth test? Required sum = 4×85 = 340. Current sum = 82+88+79 = 249. Minimum fourth score = 340−249 = **91**. This type of back-calculation is extremely common in both school and competition math.

#### Worked: Median from a Frequency Table
Data: Value 1 (frequency 2), Value 3 (frequency 5), Value 5 (frequency 3). Total: 10 values. Order: 1,1,3,3,3,3,3,5,5,5. Median = average of 5th and 6th values = (3+3)/2 = **3**. When data is given in a frequency table, list all values with their repetitions, then find the middle.

#### Interpreting Statistics in Context
A company reports "average salary = $85,000." But the median salary is $42,000. Why the difference? A few executives earn very high salaries, pulling the mean up. The median is more representative of what a typical employee earns. When reading statistics in news, advertising, or science, always ask: is this the mean or median? Are there outliers? What does "average" really mean here?

#### Review Questions
1. A student's exam scores are 70, 80, 90, and 100. The final exam counts double. The final score is 85. What is the weighted average?
2. Eight runners finish a race in times (seconds): 54, 58, 61, 63, 67, 70, 72, 90. Find mean, median, and range. Which measure best represents a typical runner's time?
3. The average of six numbers is 15. If one number is removed, the average of the remaining five is 14. What was the removed number?

---

### Statistics Mixed Review
**Type:** Mixed/Review
**Slug:** ms-math-statistics-mixed-review
**Estimated time:** 9 min
**Key concepts:** mean · median · mode · range · outlier · review synthesis
**Summary:** Synthesize statistical measures through a rapid review problem set.

#### Quick Recall
Given {2, 5, 5, 7, 11}: Mean = 30/5 = **6**. Median = **5** (middle of 5). Mode = **5** (appears twice). Range = 11−2 = **9**. If 100 is added: new mean = 130/6 ≈ **21.7**. New median = (5+7)/2 = **6**. Range = 100−2 = **98**. Notice: the outlier (100) devastates the mean and range but barely shifts the median.

#### Mixed Problems
1. Data: {x, 4, 6, 8, 12}. Mean = 7. Find x. *Sum = 5×7 = 35. x = 35−4−6−8−12 = **5***.
2. Nine students score: 60, 65, 70, 75, 80, 85, 90, 95, 100. (a) What is the median? (b) If the lowest score is dropped, what is the new median? *(a) 5th value = **80**. (b) 8 remaining; median = (80+85)/2 = **82.5***.
3. A data set has mean 12 and 8 values. All values are doubled. What is the new mean? *(12×2 = **24**)*.
4. Mode of {3, 3, 5, 7, 7, 9} = ___. *Two modes: **3 and 7** (bimodal)*.

#### Error Identification
A student finds the median of {4, 9, 3, 7, 5} as the 3rd value = 7. What's the error? The student forgot to **sort the data first**. Sorted: {3, 4, 5, 7, 9}. Correct median = **5**.

#### Review Questions
1. In a data set, the mean is 20, the median is 18, and the mode is 15. Is the data left-skewed or right-skewed? Explain.
2. Find the mean, median, and mode of: {10, 10, 10, 20, 30}.
3. A player's bowling scores are 120, 140, 150, 155, and an unknown score x. If the mean is 145, find x.

---

## Subtopic: Probability Basics

### Introduction to Probability
**Type:** Core Understanding
**Slug:** ms-math-probability-intro
**Estimated time:** 12 min
**Key concepts:** probability · sample space · event · favorable outcomes · theoretical probability
**Summary:** Define probability, identify sample spaces, and calculate theoretical probabilities.

#### What Is Probability?
**Probability** measures the likelihood of an event occurring, expressed as a number between 0 and 1 (or 0% and 100%). P = 0 means **impossible**; P = 1 means **certain**. Formula: **P(event) = (number of favorable outcomes) / (total number of outcomes)**. Example: rolling a 3 on a standard die: P(3) = 1/6 ≈ 0.167. The **sample space** is the set of all possible outcomes. For a coin: {H, T}. For a die: {1, 2, 3, 4, 5, 6}.

#### Listing Sample Spaces
For multiple events, list all combinations systematically. Flipping 2 coins: {HH, HT, TH, TT} → 4 outcomes. Rolling 2 dice: 6×6 = 36 outcomes. Drawing 1 card from a standard 52-card deck: 52 outcomes (13 values × 4 suits). Organizing outcomes in a table or tree diagram prevents missing cases. The total number of outcomes in the sample space is the denominator in the probability fraction.

#### Expressing Probability
Probability can be expressed as a **fraction** (1/6), **decimal** (0.167), or **percent** (16.7%). They all mean the same thing. Converting: fraction → decimal (divide), decimal → percent (multiply by 100). In competition math, fractions are usually preferred. Always simplify the fraction. A probability greater than 1 is impossible — if you get P > 1, recheck your work.

#### Complementary Events
The **complement** of event A (written A' or "not A") contains all outcomes where A does NOT happen. P(not A) = 1 − P(A). Example: P(rolling a 3) = 1/6. P(NOT rolling a 3) = 1 − 1/6 = **5/6**. The complement rule is often the fastest approach: if P(at least one...) is hard to calculate directly, try 1 − P(none).

#### Theoretical vs. Experimental Probability
**Theoretical probability** is calculated mathematically using sample spaces (ideal world). **Experimental probability** is calculated from actual results of trials: P = (number of times event occurred) / (total number of trials). As the number of trials increases, experimental probability approaches theoretical probability (the **Law of Large Numbers**). Science Bowl often asks about theoretical probability.

#### Review Questions
1. A bag contains 4 red, 3 blue, and 5 green marbles. What is the probability of drawing a red marble?
2. What is the probability of rolling an even number on a standard 6-sided die?
3. What is the probability of NOT drawing an ace from a standard 52-card deck?

---

### Compound Events: Independent and Dependent
**Type:** Core Understanding
**Slug:** ms-math-compound-probability
**Estimated time:** 13 min
**Key concepts:** independent events · dependent events · multiplication rule · conditional probability · "and" vs "or"
**Summary:** Calculate probabilities of compound events using multiplication and addition rules.

#### Independent Events: Multiplication Rule
Two events are **independent** if the outcome of one doesn't affect the other. Rule: **P(A and B) = P(A) × P(B)** (for independent events). Example: flipping H and rolling a 3. P(H) = 1/2. P(3) = 1/6. P(H and 3) = 1/2 × 1/6 = **1/12**. Replacement in drawing: if you draw a marble, record it, and put it back → the events are independent (same denominator each time).

#### Dependent Events: Conditional Probability
Events are **dependent** if the outcome of one affects the other. Rule: **P(A and B) = P(A) × P(B|A)**, where P(B|A) is the probability of B given A already occurred. Example: drawing 2 aces from 52 cards without replacement. P(first ace) = 4/52. P(second ace | first ace drawn) = 3/51 (one ace and one card gone). P(two aces) = 4/52 × 3/51 = 12/2652 = **1/221**.

#### The "Or" Rule: Addition
P(A or B) = P(A) + P(B) − P(A and B). This subtracts the overlap (if both happen simultaneously). For **mutually exclusive** events (can't both happen): P(A or B) = P(A) + P(B). Example: rolling a 2 or a 5 on a die → mutually exclusive. P = 1/6 + 1/6 = **2/6 = 1/3**. Example: drawing a king or a heart: P(K) = 4/52, P(H) = 13/52, P(K and H) = 1/52 (king of hearts). P(K or H) = 4/52 + 13/52 − 1/52 = **16/52 = 4/13**.

#### At Least One: Using the Complement
"At least one" problems are most efficiently solved with the complement. P(at least one success) = 1 − P(no successes). Example: P(at least one head in 3 coin flips) = 1 − P(all tails) = 1 − (1/2)³ = 1 − 1/8 = **7/8**. This avoids listing all cases where at least one H appears (HHH, HHT, HTH, THH, HTT, THT, TTH — that's 7 cases manually, same answer).

#### Organized Sample Space
For complex compound events, a table or tree diagram prevents errors. Rolling 2 dice: make a 6×6 table. Each cell (a,b) represents the outcome. Total = 36 cells. P(sum = 7): count cells where a+b=7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 cells → P = **6/36 = 1/6**. Organizing your sample space is worth the 20 seconds it takes — it prevents calculation errors.

#### Review Questions
1. A coin is flipped 3 times. What is the probability of getting exactly 2 heads?
2. A bag has 5 red and 3 blue marbles. Two marbles are drawn without replacement. What is the probability that both are red?
3. What is the probability of rolling a sum of 8 on two standard dice?

---

### Probability Application: Real Contexts
**Type:** Application
**Slug:** ms-math-probability-application
**Estimated time:** 13 min
**Key concepts:** expected value · geometric probability · simulation · probability in context
**Summary:** Apply probability concepts to games, geometry, and simulation scenarios.

#### Expected Value
**Expected value** is the average outcome you'd expect over many trials. Formula: E = Σ(value × probability). Example: a game pays $10 for rolling a 6, $2 for rolling a 3, and $0 otherwise. E = 10×(1/6) + 2×(1/6) + 0×(4/6) = 10/6 + 2/6 = 12/6 = **$2**. If the game costs $3 to play, your expected profit per game = 2−3 = −$1 (not a good deal). Expected value guides decisions under uncertainty.

#### Geometric Probability
**Geometric probability** uses area or length ratios instead of counting. P = (favorable area) / (total area). Example: a dart lands randomly on a 10×10 board. A circular bullseye has radius 2. P(hit bullseye) = πr²/(l×w) = π×4/100 = 4π/100 ≈ **0.126 or 12.6%**. This approach is used whenever "randomly" means uniformly distributed over a region.

#### Worked: Card Game Probability
From a standard 52-card deck: (a) P(face card) = 12/52 = **3/13** (J, Q, K in 4 suits = 12 cards). (b) P(red face card) = 6/52 = **3/26** (red J, Q, K × 2 red suits). (c) P(face card OR red card) = 12/52 + 26/52 − 6/52 = 32/52 = **8/13** (using OR formula, subtracting red face cards counted twice).

#### Worked: Genetic Probability (Punnett Square Link)
Each parent carries alleles Aa. Each parent passes one allele independently. P(AA) = 1/2 × 1/2 = 1/4. P(Aa) = P(passing A then a) + P(a then A) = 1/4 + 1/4 = 1/2. P(aa) = 1/4. Total = 1/4 + 1/2 + 1/4 = 1. This is the mathematical foundation of Mendelian genetics — Science Bowl tests probability in biology contexts too.

#### Worked: Simulating Probability
A student flips a coin 100 times and gets 58 heads. Experimental P(H) = 58/100 = 0.58. Theoretical P(H) = 0.5. The difference is normal due to random variation. With 1000 flips, the experimental result would likely be closer to 0.5. Experimental probability from simulations is an estimate — larger samples give better estimates.

#### Review Questions
1. A spinner has sections: red (1/2 of the circle), blue (1/3), green (1/6). What is the probability of landing on blue OR green?
2. A rectangular garden is 20 m × 10 m. A circular fountain of radius 2 m is placed inside. What is the probability that a randomly dropped seed lands in the fountain? (Use π ≈ 3.14)
3. A game: roll a die, earn that many dollars. What is the expected earnings per roll?

---

### Probability Mixed Review
**Type:** Mixed/Review
**Slug:** ms-math-probability-mixed-review
**Estimated time:** 9 min
**Key concepts:** theoretical probability · independent events · complement · "and" and "or" rules
**Summary:** Synthesize probability rules through varied review problems.

#### Probability Rule Checklist
Before solving: (1) What is the sample space? (2) Are events independent or dependent? (3) Is it "and" (multiply) or "or" (add, subtract overlap)? (4) Would the complement be easier? (5) Are events mutually exclusive (no overlap)? Running through this checklist takes 5 seconds and prevents most errors.

#### Mixed Problem Set
1. P(rolling an odd AND greater than 4) = P(5) = **1/6** (only 5 satisfies both). *Don't add — you need AND, so intersect the events.*
2. Two dice: P(at least one 4) = 1 − P(no 4s) = 1 − (5/6)² = 1 − 25/36 = **11/36**.
3. A bag: 3R, 4B, 5G. Draw one, don't replace, draw again. P(R then G) = (3/12) × (5/11) = 15/132 = **5/44**.
4. Standard deck: P(drawing an ace or a spade) = 4/52 + 13/52 − 1/52 = **16/52 = 4/13**.

#### Common Traps
(1) Forgetting to subtract the overlap in P(A or B). (2) Using the independent formula when events are dependent (without replacement). (3) Treating "at least one" as P(exactly one) + P(exactly two)... — just use the complement. (4) Not simplifying the fraction.

#### Review Questions
1. A 6-sided die is rolled twice. What is the probability of rolling a sum less than 4?
2. A student randomly guesses on a 5-question true/false test. What is the probability of getting all 5 correct?
3. From a group of 4 boys and 6 girls, one person is selected at random. What is the probability the person is NOT a girl?

---

## Subtopic: Counting Principles (Fundamental Counting Theorem)

### The Fundamental Counting Principle
**Type:** Core Understanding
**Slug:** ms-math-fundamental-counting-principle
**Estimated time:** 12 min
**Key concepts:** Fundamental Counting Principle · tree diagram · multiplication rule · ordered choices
**Summary:** Apply the Fundamental Counting Principle to count outcomes of multi-step processes.

#### The Principle
The **Fundamental Counting Principle** (FCP): if a process has multiple independent steps, the total number of outcomes equals the **product** of the choices at each step. If Step 1 has m choices and Step 2 has n choices, there are m × n total outcomes. Example: a restaurant offers 3 soups, 5 entrees, and 4 desserts. Total meal combinations = 3 × 5 × 4 = **60**. This extends to any number of steps: just multiply all the choice counts.

#### Tree Diagrams
A **tree diagram** visually shows all possible outcomes by branching at each choice. Start with the first choice, branch for each option, then branch again for the next choice, and so on. For flipping 2 coins: first flip (H/T) gives 2 branches. Each branches into H/T → 4 total outcomes (HH, HT, TH, TT). Tree diagrams confirm the FCP and help when the number of outcomes is small enough to list. For large counts, use the FCP directly.

#### Applying FCP with Restrictions
Sometimes choices are restricted. Example: a 3-digit number using digits 1–9 (no repetition). First digit: 9 choices. Second digit: 8 choices (one used). Third digit: 7 choices. Total = 9 × 8 × 7 = **504**. If repetition IS allowed: 9 × 9 × 9 = 729. Always read whether repetition is allowed or not — it fundamentally changes the calculation.

#### FCP for Passwords and Codes
A PIN code uses 4 digits (0–9), repetition allowed. Total PINs = 10 × 10 × 10 × 10 = 10⁴ = **10,000**. A license plate has 3 letters followed by 3 digits (repetition allowed). Total = 26³ × 10³ = 17,576 × 1,000 = **17,576,000**. FCP is the foundation for all counting problems — get this principle solid before moving to permutations and combinations.

#### When FCP Applies vs. When It Doesn't
FCP applies when: choices at each step are independent, and order matters (or you're simply counting sequences). FCP does NOT apply directly when: you're choosing without regard to order (use combinations), or the choices at later steps depend on which was chosen earlier (adjust the count at each step). For most MS-level counting problems, FCP or a simple adjustment to it is sufficient.

#### Review Questions
1. A school offers 4 language classes, 3 science classes, and 2 math classes. If a student chooses one of each, how many combinations are possible?
2. How many 4-letter "words" (arrangements of letters) can be formed using the letters A, B, C, D, E with no repetition?
3. A die is rolled 3 times. How many possible outcomes are there?

---

### Permutations: Order Matters
**Type:** Core Understanding
**Slug:** ms-math-permutations
**Estimated time:** 12 min
**Key concepts:** permutation · factorial · nPr · arrangements · order matters
**Summary:** Count ordered arrangements using permutations and factorial notation.

#### Factorial Notation
The **factorial** of n (written n!) = n × (n−1) × (n−2) × ... × 2 × 1. It counts all ways to arrange n distinct items in a line. Values: 1! = 1, 2! = 2, 3! = 6, 4! = 24, 5! = 120, 6! = 720. By definition, 0! = 1. Factorial grows extremely fast. Example: arranging 5 books on a shelf: 5! = **120** ways. Each position is filled one at a time: 5 choices for first, 4 for second, 3 for third, 2 for fourth, 1 for last.

#### Permutations: Choosing and Arranging
A **permutation** selects r items from n distinct items and arranges them in order. Formula: **nPr = n! / (n−r)!**. Example: how many ways can 3 people be chosen from 8 and arranged in a line (1st, 2nd, 3rd place)? ₈P₃ = 8!/(8−3)! = 8!/5! = 8×7×6 = **336**. You can also think of it as: 8 choices for 1st, 7 for 2nd, 6 for 3rd = 8×7×6 = 336. Both approaches give the same answer.

#### When Order Matters vs. Doesn't
The key question: does swapping the items create a different outcome? If YES → permutation. If NO → combination (next subtopic). Examples where order MATTERS: race results (1st, 2nd, 3rd), phone numbers, passwords, arranging books on a shelf. Examples where order DOESN'T matter: selecting a committee, choosing toppings for a pizza, drawing cards (if only the set matters).

#### Special Cases
(1) **Arrangements with repetition**: if some items are identical, divide by the factorial of the number of repetitions. For ABBC (B appears twice): arrangements = 4!/2! = 12. (2) **Circular permutations**: arranging n people in a circle = (n−1)! (fix one person, arrange the rest). 4 people at a round table = 3! = **6** ways.

#### Practice: Recognizing Permutation Problems
"In how many ways can 5 runners finish a race?" = 5! = 120. "In how many ways can a president, VP, and secretary be chosen from 10 people?" = 10×9×8 = 720. "How many 3-digit numbers can be formed from {1,2,3,4,5} with no repetition?" = 5×4×3 = 60. All of these are permutation problems — order matters in each case.

#### Review Questions
1. In how many ways can the letters in the word MATH be arranged?
2. A race has 6 runners. In how many ways can 1st, 2nd, and 3rd place be awarded?
3. In how many ways can 7 people sit in a row?

---

### Counting Application: Combinations and FCP
**Type:** Application
**Slug:** ms-math-combinations-application
**Estimated time:** 14 min
**Key concepts:** combination · nCr · choose notation · committee selection · FCP with combinations
**Summary:** Apply combinations and mixed counting principles to real selection problems.

#### Combinations: Order Doesn't Matter
A **combination** selects r items from n without regard to order. Formula: **nCr = n! / (r! × (n−r)!)**. Also written C(n,r) or (n choose r). Example: choose 3 students from 8 for a committee. Order doesn't matter (a committee of Alice, Bob, Carlos is the same regardless of selection order). C(8,3) = 8!/(3!×5!) = (8×7×6)/(3×2×1) = 336/6 = **56**. The division by r! removes the counted orderings that are really the same selection.

#### Permutation vs. Combination Decision Tree
Ask: "Does the order of selection matter?" → YES: permutation (nPr). → NO: combination (nCr). Further hint: if the problem uses words like "arrange," "order," "rank," "line up," "first/second/third" → permutation. If it uses "choose," "select," "group," "committee," "subset" → combination. This decision determines whether you divide by r! at the end.

#### Worked: Committee Selection
From 5 men and 4 women, a committee of 3 men and 2 women is selected. How many committees are possible? Step 1: Choose 3 men from 5: C(5,3) = 10. Step 2: Choose 2 women from 4: C(4,2) = 6. Step 3: FCP — multiply: 10 × 6 = **60 committees**. When a selection problem has multiple independent groups, compute combinations for each group, then multiply (FCP for the groups).

#### Worked: Lottery-Style Problem
A lottery picks 5 numbers from 1 to 49 (order doesn't matter). How many possible tickets? C(49,5) = 49!/(5!×44!) = (49×48×47×46×45)/(5×4×3×2×1) = 254,251,200/120 = **2,118,760**. The probability of winning = 1/2,118,760 ≈ 0.000047% — astronomically small.

#### Mixed: FCP with Both Permutations and Combinations
A club of 10 members selects 1 president (order matters for the role), 2 committee members (order doesn't matter), and 3 people to stand in a display in order. Total arrangements = (choose president: 10 ways) × C(9,2) × P(7,3) = 10 × 36 × 210 = **75,600**. Complex problems often combine FCP, permutations, and combinations — identify which applies at each step.

#### Review Questions
1. In how many ways can you choose 4 books from a shelf of 10, if order doesn't matter?
2. A pizza shop offers 8 toppings. How many ways can you choose 3 toppings?
3. A class has 12 students. In how many ways can a team of 4 be chosen? If the team also needs a designated captain (chosen from the 4), how many total arrangements are there?

---

### Counting Mixed Review
**Type:** Mixed/Review
**Slug:** ms-math-counting-mixed-review
**Estimated time:** 9 min
**Key concepts:** FCP · permutations · combinations · distinguishing order · factorial
**Summary:** Synthesize counting methods through varied problems requiring the correct technique.

#### Decision Framework
(1) Is it a sequence of independent choices? → FCP. (2) Does order matter among selected items? → Permutation (nPr). (3) Does order NOT matter? → Combination (nCr). (4) Are there repetitions among the items? → Divide by repetition factorials. Keep this checklist in mind — choosing the wrong formula is the most common error.

#### Mixed Problem Set
1. A restaurant menu: 4 starters, 6 mains, 3 desserts. Choosing one of each: FCP = 4×6×3 = **72 meals**.
2. How many 4-digit codes (0-9, no repetition) start with an even digit? *Even first digit: 5 choices (0,2,4,6,8). Remaining 3 digits from 9 remaining: 9×8×7 = 504. Total = 5×504 = **2,520**.*
3. Choose 2 representatives from 5 boys and 3 girls (at least 1 girl): C(8,2)−C(5,2) = 28−10 = **18** ways. *Or: C(3,1)×C(5,1) + C(3,2)×C(5,0) = 15+3 = 18 ✓.*
4. Arrange the letters in AABB: 4!/(2!×2!) = 24/4 = **6 arrangements**.

#### Trap Identification
"How many ways can 4 people be seated in a circle?" — circular permutation = (4−1)! = **6** (NOT 4! = 24). "How many ways can first and second place be determined among 7 runners?" — permutation: 7P2 = 7×6 = **42** (NOT 7! and NOT C(7,2) = 21).

#### Review Questions
1. How many ways can you arrange the letters in MISSISSIPPI? (M=1, I=4, S=4, P=2)
2. A committee of 3 is chosen from 7 people. What is the probability the two specific people (Ana and Ben) are both on the committee?
3. A 3-digit number is formed from {1, 2, 3, 4, 5} with repetition allowed. How many are even?

---

## Subtopic: Reading & Interpreting Graphs

### Types of Graphs and When to Use Them
**Type:** Core Understanding
**Slug:** ms-math-graph-types
**Estimated time:** 11 min
**Key concepts:** bar graph · line graph · circle graph · histogram · scatter plot · data visualization
**Summary:** Identify the appropriate graph type for different kinds of data and read basic graphs accurately.

#### Bar Graphs and Histograms
A **bar graph** uses rectangular bars to compare discrete categories. The bar height (or length) represents the value. Use for: comparing amounts across distinct categories (e.g., sales by month, test scores by subject). A **histogram** looks similar but plots continuous data grouped into intervals (e.g., ages 10–20, 20–30). The bars in a histogram touch each other (no gaps); bar graphs have gaps. Both can be vertical or horizontal.

#### Line Graphs
A **line graph** displays data over time by connecting data points with line segments. Use for: trends, changes over time, continuous data. Key features: slope of segments shows rate of change (steeper = faster change). Horizontal segment = no change. Positive slope = increase; negative slope = decrease. Line graphs are ideal for asking "how did X change over time?" or "when was the rate of change greatest?"

#### Circle (Pie) Graphs
A **circle graph (pie chart)** shows parts of a whole. Each "slice" is proportional to its share of the total (based on percentage or fraction). The full circle = 100%. To find the angle for a slice: angle = (percent/100) × 360°. Use when showing how a whole is divided into parts (e.g., budget allocation, survey responses by category). Limitation: hard to compare similar-sized slices precisely.

#### Scatter Plots
A **scatter plot** shows the relationship between two numerical variables as points on a coordinate plane. Each point is (x-value, y-value) for one observation. Patterns: **positive correlation** (both increase together), **negative correlation** (one increases, other decreases), **no correlation** (scattered randomly). A **line of best fit** (trend line) summarizes the pattern. Use scatter plots to investigate relationships between variables (e.g., height vs. weight, study time vs. score).

#### Choosing the Right Graph
Data type determines the best graph: (1) Comparing categories → bar graph. (2) Trends over time → line graph. (3) Parts of a whole → pie chart. (4) Distribution of values in ranges → histogram. (5) Relationship between two variables → scatter plot. In Science Bowl, questions often describe a research context and ask which graph type is most appropriate — match the graph type to the data type and research question.

#### Review Questions
1. A scientist measures daily temperature over one month and wants to show how it changes over time. Which graph type is most appropriate?
2. A pie chart shows a class budget: supplies 40%, field trips 30%, books 20%, other 10%. If the total budget is $500, how much goes to field trips?
3. What is the key difference between a bar graph and a histogram?

---

### Reading and Interpreting Data Displays
**Type:** Core Understanding
**Slug:** ms-math-reading-graphs
**Estimated time:** 12 min
**Key concepts:** reading graphs · scale · trend · data interpretation · misleading graphs
**Summary:** Extract information from graphs, identify trends, and recognize potentially misleading displays.

#### Reading Bar Graphs Accurately
Always check the **scale** on the y-axis before reading bar heights. If the scale starts at a value other than 0, differences between bars can appear larger or smaller than they really are. Read: the bar that reaches a value halfway between two gridlines is at the midpoint. Example: gridlines at 20 and 30 → halfway bar = 25. For grouped bar graphs (multiple bars per category), identify which bar belongs to which dataset by the legend.

#### Interpreting Line Graph Trends
From a line graph, identify: (1) **Overall trend**: generally increasing, decreasing, or constant? (2) **Rate of change**: which segment has the steepest slope? That's where change happened fastest. (3) **Maximum/minimum**: where is the highest/lowest point? (4) **Flat segments**: no change during that interval. Example: a population line graph that's steep from 2000–2010 and flat from 2010–2020 shows fast growth followed by stagnation.

#### Circle Graph Calculations
From a pie chart: to find the actual value for a category, multiply the total by the percentage (as a decimal). To find the angle: angle = percentage × 3.6 (since 100% = 360°). If two sectors are 35% and 45%, the remaining sector = 100%−35%−45% = **20%**. Watch for: the question may give you one sector's angle and ask for the percentage — divide the angle by 360°.

#### Scatter Plot Interpretation
Strength of correlation: if points cluster tightly around the trend line → **strong** correlation. Widely scattered → **weak** correlation. Direction: upward trend → **positive**; downward → **negative**. The line of best fit predicts values not in the data set (interpolation within the range; extrapolation beyond — less reliable). Never confuse correlation with causation — two variables that correlate don't necessarily cause each other.

#### Misleading Graphs
Graphs can be designed (intentionally or not) to mislead: (1) **Y-axis not starting at 0**: makes small differences look large. (2) **Inconsistent scale**: different spacing between intervals. (3) **3D effects**: distort visual proportions. (4) **Cherry-picked time ranges**: hiding unfavorable trends. When analyzing a graph, always check the axes, scale, and what data is (or isn't) included.

#### Review Questions
1. A line graph shows sales in January: $50K, February: $55K, March: $45K, April: $70K. Between which two months did sales increase the most?
2. A pie chart shows: sports 45°, arts 90°, academics 180°, other 45°. What percentage of students chose academics?
3. A scatter plot shows study time (x) and test score (y) with a strong positive correlation. If a student who studies 3 hours typically scores 75%, and one who studies 5 hours scores 85%, predict the score for a student who studies 4 hours.

---

### Graph Interpretation Application
**Type:** Application
**Slug:** ms-math-graph-interpretation-application
**Estimated time:** 13 min
**Key concepts:** data analysis · graph reading · statistical reasoning · mean from graph · trends
**Summary:** Extract quantitative information from real-world graphs and connect graphs to statistical measures.

#### Reading Mean and Median from Graphs
From a **histogram**: estimate the mean by identifying the "balance point" of the distribution visually; calculate it precisely by finding each bar's midpoint, multiplying by its frequency, summing, and dividing by total frequency. The median is the value where 50% of the data lies below — find the bar that contains the 50th percentile. A histogram skewed right → mean > median. Skewed left → mean < median.

#### Worked: Calculating Statistics from a Frequency Table/Histogram
Histogram: [0–10): 4 students; [10–20): 8 students; [20–30): 6 students; [30–40): 2 students. Total = 20 students. Estimated mean: use midpoints 5, 15, 25, 35: Mean ≈ (4×5 + 8×15 + 6×25 + 2×35)/20 = (20+120+150+70)/20 = 360/20 = **18**. Median: the 10th and 11th values are both in the [10–20) interval (after the first 4 values). Estimated median ≈ **15–16**.

#### Worked: Drawing Conclusions from Scatter Plots
A scatter plot shows hours of TV (x) and math score (y). Line of best fit: y = −3x + 90. Predict score for a student who watches 5 hours of TV: y = −3(5) + 90 = −15 + 90 = **75**. What does the slope (−3) mean? For each additional hour of TV, the predicted score decreases by **3 points**. What does the y-intercept (90) mean? A student who watches 0 hours is predicted to score **90**.

#### Worked: Circle Graph to Bar Graph Conversion
A survey of 200 students' favorite subjects: Math 30%, Science 25%, English 20%, History 15%, Other 10%. Convert to actual numbers: Math=60, Science=50, English=40, History=30, Other=20. Now draw a bar graph with these values. Notice: the pie chart shows proportions easily; the bar graph makes comparing exact counts easier. Both displays are "correct" — they emphasize different aspects of the same data.

#### Identifying Trends and Making Predictions
From a line graph showing temperature over 10 years with a clear upward trend, you can: (1) estimate the rate of change (slope of the trend), (2) predict future values (extrapolation — with caution), (3) identify the years with the highest/lowest values, (4) compare rate of change in different periods. Always express predictions with appropriate uncertainty: "if the trend continues..." or "based on the data..."

#### Review Questions
1. A frequency table: Score 70 (frequency 3), Score 80 (frequency 7), Score 90 (frequency 5), Score 100 (frequency 5). Find mean and median.
2. From a scatter plot, the line of best fit is y = 2x + 10. What does a slope of 2 tell you about the relationship between x and y?
3. A pie chart shows 40% of students prefer soccer. If 150 students were surveyed, how many prefer soccer?

---

### Graphs Mixed Review
**Type:** Mixed/Review
**Slug:** ms-math-graphs-mixed-review
**Estimated time:** 9 min
**Key concepts:** graph types · reading scales · calculating from graphs · trends · correlation
**Summary:** Synthesize graph reading and data interpretation skills through mixed review problems.

#### Graph Type Matching
Match each scenario to the best graph: (a) Monthly rainfall over a year — **line graph** (trend over time). (b) Comparing enrollment at 5 schools — **bar graph** (comparing categories). (c) Relationship between shoe size and height — **scatter plot** (two variables). (d) Budget breakdown of a company — **pie chart** (parts of a whole). (e) Distribution of test scores in ranges — **histogram** (continuous data in intervals).

#### Mixed Problems
1. A bar graph shows scores: Team A=85, B=92, C=78, D=95, E=88. What is the range? *95−78 = **17***.
2. A line graph shows stock prices: Mon=$50, Tue=$60, Wed=$55, Thu=$70, Fri=$65. What was the greatest single-day increase? *Mon→Tue: +$10 and Thu is the peak, but Tue−Mon = **+$10** is the biggest jump*.
3. Scatter plot data: (1,3),(2,5),(3,7),(4,9). Line of best fit? *Pattern: y = 2x+1. Check: when x=3, y=7 ✓. Predict y when x=6: y = 2(6)+1 = **13***.
4. Histogram with bars: [0–5)=2, [5–10)=6, [10–15)=8, [15–20)=4. What percentage of data falls in [10–20)? *(8+4)/20 = 12/20 = **60%***.

#### Review Questions
1. Which has a greater effect on the mean — adding a value of 100 to a data set with mean 10, or changing one value from 10 to 100? Explain.
2. A pie chart shows 72° for "sports." What percentage does that represent?
3. A scatter plot shows a strong negative correlation. Give a real-world example of two variables that might show this relationship.
