---
id: nsb-lesson-1387
title: "Counting Application: Combinations and FCP"
level: ms
subject: math
topic: data-probability
subtopic: "Counting Principles (Fundamental Counting Theorem)"
slug: ms-math-combinations-application
type: "Application"
estimatedMinutes: 14
keyConcepts: ["combination", "nCr", "choose notation", "committee selection", "FCP with combinations"]
summary: "Apply combinations and mixed counting principles to real selection problems."
---
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
