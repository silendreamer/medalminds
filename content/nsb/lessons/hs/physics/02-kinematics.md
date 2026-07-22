# HS Physics — Kinematics
*High School Science Bowl prep · 32 lesson drafts across 4 subtopics*

---

## Subtopic: 1D Motion — Displacement, Velocity & Acceleration

### Describing Motion in One Dimension
**Type:** Core Understanding
**Slug:** describing-motion-1d
**Estimated time:** 13 min
**Key concepts:** displacement · velocity · acceleration
**Summary:** Motion in one dimension is described by three linked quantities — position, velocity, and acceleration — each a derivative of the previous one.

#### Position, Distance, and Displacement
Position is where an object is; displacement is how far it has moved from its starting point, with direction. Distance is the total path length (scalar); displacement is the straight-line change in position (vector). If you run 400 m around a track back to start, distance = 400 m, displacement = 0 m.

#### Velocity vs. Speed
Average velocity = displacement / time = Δx/Δt. Average speed = total distance / time. Instantaneous velocity = dx/dt (the derivative of position). For uniform motion (constant velocity), instantaneous velocity equals average velocity everywhere. Note: a car can have speed 60 km/h but velocity −60 km/h (traveling in the negative direction).

#### Acceleration
Average acceleration = Δv/Δt. Acceleration is the rate of change of velocity. It's a vector — it can be in the same or opposite direction as motion. Deceleration is not a physics term; negative acceleration just means acceleration opposite to the velocity. Gravity near Earth's surface gives a = −9.8 m/s² (downward).

#### The Kinematic Equations (Constant Acceleration)
For constant acceleration: (1) v = v₀ + at, (2) x = x₀ + v₀t + ½at², (3) v² = v₀² + 2a(x−x₀), (4) x = x₀ + ½(v₀+v)t. These four equations describe all uniformly accelerated motion. Identify knowns and unknowns, then choose the equation that links them.

#### Review Questions
1. A car starts from rest and reaches 20 m/s in 5 s. What is its average acceleration?
2. What is the difference between average velocity and instantaneous velocity?
3. An object has velocity +10 m/s and acceleration −3 m/s². Is it speeding up or slowing down?

---

### The Kinematic Equations: Derivation and Use
**Type:** Core Understanding
**Slug:** kinematic-equations-derivation-use
**Estimated time:** 14 min
**Key concepts:** kinematic equations · constant acceleration · free fall
**Summary:** Derive the four kinematic equations from the definitions of velocity and acceleration, then apply them systematically.

#### Deriving from Definitions
Start with constant acceleration: a = Δv/Δt → v = v₀ + at (Equation 1). Velocity definition: v_avg = (v₀+v)/2 for constant a. Displacement: x = v_avg × t = (v₀+v)/2 × t → x = v₀t + ½at² (Equation 2). Eliminating t from (1) and (2): v² = v₀² + 2ax (Equation 3). All four follow from a = const.

#### Systematic Problem-Solving
Step 1: Draw and label a coordinate system. Step 2: List knowns and unknowns. Step 3: Choose the kinematic equation that doesn't include the unknown you don't need. Step 4: Solve algebraically, then substitute. Step 5: Check units and sign.

#### Free-Fall as a Special Case
Free fall = any object under gravity alone. a = −g = −9.8 m/s² (taking up as positive). At the top of a thrown ball's path, v = 0 but a ≠ 0 — the ball is momentarily at rest but still accelerating downward. Time of ascent = time of descent for symmetric throws.

#### Example: Ball Thrown Upward
A ball is thrown up at 20 m/s. Find: (a) max height, (b) time to return. At max height, v = 0. v² = v₀² − 2gh → 0 = 400 − 2(9.8)h → h = 20.4 m. Time up: v = v₀ − gt → 0 = 20 − 9.8t → t = 2.04 s. Total time = 4.08 s.

#### Review Questions
1. A rock is dropped from rest off a cliff. How far does it fall in 3 s? (g = 9.8 m/s²)
2. A ball is thrown up at 15 m/s. What is its velocity after 2.5 s?
3. Derive v² = v₀² + 2ax by eliminating t from v = v₀ + at and x = v₀t + ½at².

---

### Free Fall and Gravitational Acceleration
**Type:** Core Understanding
**Slug:** free-fall-gravitational-acceleration
**Estimated time:** 12 min
**Key concepts:** free fall · g = 9.8 m/s² · air resistance
**Summary:** Free fall is idealized motion under gravity alone; understanding it requires separating the effect of gravity from air resistance.

#### Galileo's Discovery
Galileo showed (and the famous Apollo 15 hammer-feather drop confirmed) that in a vacuum, all objects fall at the same rate regardless of mass. This is because both gravitational force (F = mg) and inertia (F = ma) are proportional to m — m cancels. The result: a = g for every object.

#### Value of g and Its Variation
g = 9.8 m/s² near Earth's surface, often approximated as 10 m/s² in competition problems. g varies slightly with latitude (stronger at poles due to Earth's oblate shape) and altitude (decreases with height as 1/r²). On the Moon, g_moon = 1.62 m/s² (about 1/6 of Earth's).

#### Symmetry of Free Fall
If an object is launched upward and returns to the same height, the ascent and descent are perfectly symmetric: same time, same speeds at equal heights. This comes directly from v² = v₀² − 2gh — symmetric about the peak.

#### Air Resistance and Terminal Velocity
In reality, air resistance creates a drag force opposing motion. As speed increases, drag increases until drag = weight. Then net force = 0 and velocity is constant — this is terminal velocity. For a human skydiver, terminal velocity ≈ 55–60 m/s. Small dense objects (steel ball) have higher terminal velocity than light flat objects (feather).

#### Review Questions
1. Two balls — one 1 kg, one 10 kg — are dropped from the same height. Which hits the ground first in a vacuum?
2. An object in free fall accelerates at g = 9.8 m/s². What is its acceleration at the peak of its trajectory?
3. Why do heavy and light objects fall at the same rate in the absence of air?

---

### Applying Kinematics: Multi-Step 1D Problems
**Type:** Application
**Slug:** applying-kinematics-multistep-1d
**Estimated time:** 14 min
**Key concepts:** kinematic equations · multi-step · free fall
**Summary:** Work through complex one-dimensional kinematics problems involving changing phases of motion, multiple objects, and free fall.

#### Two-Phase Problem: Car Braking
A car travels at 30 m/s and then brakes with a = −6 m/s². How far does it travel before stopping? v² = v₀² + 2ax → 0 = 900 + 2(−6)x → x = 75 m. Now: if the driver reacts for 0.5 s before braking, add reaction distance = 30 × 0.5 = 15 m. Total stopping distance = 75 + 15 = 90 m.

#### Two-Object Chase Problem
Car A starts from rest and accelerates at 4 m/s². Car B passes the same point 3 s later moving at 20 m/s constant. When does A catch B? Set positions equal: ½(4)t² = 20(t−3). 2t² = 20t − 60. 2t² − 20t + 60 = 0. t² − 10t + 30 = 0. t = (10 ± √(100−120))/2 — discriminant is negative, so A never catches B in this scenario. Try different numbers for practice.

#### Elevator Problem
A ball is dropped inside a rising elevator. The elevator moves up at 4 m/s. At the moment of release, the ball and elevator are at the same height. When does the ball hit the elevator floor (1.5 m below the ceiling)? Ball: y_ball = 4t − ½(9.8)t². Floor: y_floor = 4t − 1.5. Set equal: −4.9t² = −1.5 → t = √(1.5/4.9) = 0.553 s.

#### Review Questions
1. A stone is dropped from a bridge and hits water 2.5 s later. How high is the bridge?
2. A car accelerates from 10 m/s to 25 m/s over 30 m. What is the acceleration?
3. Two trains approach each other on parallel tracks at 20 m/s and 30 m/s. They are 500 m apart. In how many seconds do they pass?

---

### 1D Kinematics Review: Equations and Problem Types
**Type:** Mixed/Review
**Slug:** 1d-kinematics-review-equations-problem-types
**Estimated time:** 9 min
**Key concepts:** review · kinematic equations · free fall
**Summary:** Review all four kinematic equations and free-fall concepts with rapid-fire practice problems.

#### The Four Equations (Constant a)
| Equation | Missing |
|---|---|
| v = v₀ + at | x |
| x = v₀t + ½at² | v |
| v² = v₀² + 2ax | t |
| x = ½(v₀+v)t | a |

Key free-fall facts: g = 9.8 m/s² ≈ 10 m/s² (competition approx). At peak: v = 0, a = g (still). Symmetry: time up = time down for symmetric launch.

#### Rapid-Fire Practice
1. A car goes from rest to 20 m/s in 8 s. Acceleration? *(2.5 m/s²)*
2. Dropped from rest: how fast after 4 s? *(39.2 m/s)*
3. Ball thrown up at 25 m/s: max height? *(31.9 m)*
4. Ball thrown up at 20 m/s: total hang time? *(4.08 s)*
5. Car at 30 m/s decelerates at 5 m/s²: stopping distance? *(90 m)*

#### Review Questions
1. A rock falls 45 m. How long was it in the air? How fast is it moving at impact?
2. Which kinematic equation would you use if you know v₀, v, and x but need a?
3. A ball is thrown down at 5 m/s from a cliff 80 m high. How long until it hits?

---

### 1D Motion Synthesis: Mixing Phases and Objects
**Type:** Mixed/Review
**Slug:** 1d-motion-synthesis-phases-objects
**Estimated time:** 10 min
**Key concepts:** synthesis · multi-phase motion · relative motion 1D
**Summary:** Synthesis problems linking acceleration phases, deceleration, and two-object comparisons in one dimension.

#### Problem: Dropped vs. Thrown Simultaneously
Ball A is dropped from 80 m. Ball B is thrown down at 10 m/s from the same point at the same time. Which hits the ground first? Ball A: 80 = ½(9.8)t² → t_A = 4.04 s. Ball B: 80 = 10t + ½(9.8)t² → 4.9t² + 10t − 80 = 0 → t_B = 2.96 s. Ball B wins.

#### Problem: Multi-Phase Motion
A subway train accelerates from rest at 1.2 m/s² for 20 s, travels at constant speed for 60 s, then decelerates at 1.5 m/s² to a stop. Find total distance. Phase 1: v_max = 1.2 × 20 = 24 m/s; d₁ = ½(1.2)(400) = 240 m. Phase 2: d₂ = 24 × 60 = 1440 m. Phase 3: d₃ = v²/2a = 576/3 = 192 m. Total = 1872 m.

#### Problem: Reaction Time and Crash Avoidance
A car at 25 m/s sees a wall 80 m away and takes 0.4 s to react. Then brakes at 8 m/s². Does it stop in time? Reaction distance = 25 × 0.4 = 10 m. Braking distance = 625/16 = 39.1 m. Total = 49.1 m < 80 m. Safe.

#### Review Questions
1. A stone is thrown upward at 30 m/s from the top of a 50 m cliff. Find its speed when it hits the ground below.
2. A runner accelerates at 2 m/s² from rest for 5 s, then runs at constant speed for 10 s. Find total displacement.
3. Two cars are 500 m apart. Car A starts from rest at 2 m/s²; Car B moves toward A at 20 m/s. When do they meet?

---

### Science Bowl: Kinematics High-Yield Facts
**Type:** Competition Extension
**Slug:** science-bowl-kinematics-1d-high-yield
**Estimated time:** 7 min
**Key concepts:** bowl prep · kinematic equations · free fall
**Summary:** Bowl-critical kinematics facts with toss-up practice and common computation shortcuts.

#### High-Yield Fact List
1. g = 9.8 m/s² ≈ 10 m/s² (use 10 for quick bowl estimates).
2. Free-fall distance in n seconds: d = ½gn² = 5n² (using g ≈ 10 m/s²).
3. Free-fall speed after n seconds: v = gn = 10n m/s.
4. At the peak of vertical throw: v = 0, a = g (downward).
5. Symmetric throw: time up = time down.
6. v² = v₀² + 2ax (no time needed for speed–distance problems).
7. Stopping distance = v₀²/2a.
8. Reaction distance = v₀ × t_reaction.
9. Average velocity = (v₀ + v)/2 only for constant acceleration.
10. Dropped and thrown horizontally: same fall time.

#### Practice Toss-Up Stems
1. "For 10 points — an object is thrown upward at 20 m/s. What is its acceleration at the peak of its flight?" *(9.8 m/s² downward, or −9.8 m/s²)*
2. "For 10 points — using g ≈ 10 m/s², how far does an object dropped from rest fall in 3 seconds?" *(45 m)*
3. "For 10 points — a car at 20 m/s brakes with deceleration 5 m/s². What is its stopping distance?" *(40 m)*

#### Review Questions
1. A ball takes 4 s to reach the peak of its trajectory. What was its initial upward speed?
2. Name the four kinematic equations and state which variable each is missing.
3. An object in free fall has speed 30 m/s. How long has it been falling? (g ≈ 10 m/s²)

---

### Science Bowl: Advanced 1D Kinematics Problem Speed-Run
**Type:** Competition Extension
**Slug:** science-bowl-advanced-1d-kinematics-speed-run
**Estimated time:** 6 min
**Key concepts:** bowl speed · mental math kinematics · competition strategy
**Summary:** A timed speed-run through 10 competition-level 1D kinematics problems, building the pattern recognition that wins bowl matches.

#### Strategy for Bowl Kinematics
1. Identify what's known and what's asked in under 3 seconds.
2. Jump straight to the correct kinematic equation.
3. Use g = 10 m/s² unless told otherwise — exact value costs time.
4. At the peak of any vertical throw: v = 0.
5. For symmetric problems: if it goes up in t seconds, it comes down in t seconds.

#### 10-Problem Speed Drill (answers in parentheses)
1. Dropped 20 m — impact speed? *(v = √(2×10×20) = 20 m/s)*
2. Dropped 20 m — fall time? *(t = √(2×20/10) = 2 s)*
3. Thrown up at 30 m/s — max height? *(h = 900/20 = 45 m)*
4. Thrown up at 30 m/s — total flight time? *(6 s)*
5. Car from 0 to 30 m/s in 6 s — acceleration? *(5 m/s²)*
6. Car from 0 to 30 m/s in 6 s — distance? *(90 m)*
7. Car at 40 m/s brakes at 8 m/s² — stopping distance? *(100 m)*
8. Stone falls 5 s — speed at impact? *(50 m/s)*
9. Object at v = 25 m/s, a = −5 m/s². Time to stop? *(5 s)*
10. Object starts at 0, a = 3 m/s². Speed at x = 24 m? *(v = √(144) = 12 m/s)*

#### Review Questions
1. Use the speed-run strategy to solve: ball thrown up at 40 m/s. How high does it go?
2. An object has v₀ = 5 m/s and a = 2 m/s² for 6 s. What distance does it cover?
3. If total hang time of a vertical throw is 6 s, what was the launch speed?

---

## Subtopic: 2D Motion — Projectile Motion & Relative Motion

### Projectile Motion: Horizontal and Vertical Independence
**Type:** Core Understanding
**Slug:** projectile-motion-horizontal-vertical-independence
**Estimated time:** 14 min
**Key concepts:** projectile motion · independence of motion · range equation
**Summary:** A projectile experiences no horizontal acceleration and constant downward gravitational acceleration — the two dimensions are completely independent.

#### The Key Principle
Horizontal and vertical motions in a projectile are independent. Horizontal: x = v₀ₓ t (constant velocity, no acceleration). Vertical: y = v₀ᵧt − ½gt² (free fall). The time of flight is set by the vertical motion; range is determined by horizontal speed times that time.

#### Parabolic Trajectory
The combination of constant horizontal speed and accelerating vertical speed creates a parabola. At any point in flight, v_x = v₀ cos θ (constant), v_y = v₀ sin θ − gt (changing). Speed at any point: v = √(v_x² + v_y²). The trajectory equation (eliminating t): y = x tan θ − gx²/(2v₀² cos² θ).

#### Range Equation
For a projectile launched from and returning to the same height: R = v₀² sin(2θ)/g. Maximum range occurs at θ = 45°. Complementary angles (e.g., 30° and 60°) give the same range. Time of flight = 2v₀ sin θ / g. Maximum height = v₀² sin² θ / 2g.

#### Horizontal Projectile (θ = 0)
An object thrown horizontally has v₀ᵧ = 0. It falls exactly as a dropped object (same vertical motion), while moving horizontally. Classic example: a bullet fired horizontally and a bullet dropped from the same height hit the ground at the same time — both are in free fall vertically.

#### Review Questions
1. A ball is thrown at 30° with v₀ = 20 m/s. Find the range using R = v₀² sin(2θ)/g.
2. Why does a bullet fired horizontally and a bullet dropped simultaneously hit the ground at the same time?
3. At what angle is range maximized? At what angles do two throws have equal range?

---

### Relative Motion: Reference Frames and Velocity Addition
**Type:** Core Understanding
**Slug:** relative-motion-reference-frames-velocity-addition
**Estimated time:** 12 min
**Key concepts:** relative velocity · reference frames · Galilean relativity
**Summary:** Velocity is always measured relative to a reference frame; the velocity of an object relative to the ground combines the object's velocity relative to a medium with the medium's velocity relative to ground.

#### Reference Frames
A reference frame is a viewpoint from which motion is measured. On a moving train, a dropped ball falls straight down relative to the train but follows a parabola relative to a person standing on the platform. Both descriptions are equally valid — motion is relative.

#### Velocity Addition (Galilean)
v_AG = v_AB + v_BG (velocity of A relative to Ground = velocity of A relative to B + velocity of B relative to Ground). This is the Galilean velocity addition formula. Example: a boat moves at 5 m/s east relative to water; the river flows north at 3 m/s. Velocity of boat relative to ground: 5 m/s east + 3 m/s north → magnitude = √(25+9) = 5.83 m/s.

#### Crossing a River
To cross directly across: the boat must aim upstream at angle θ = arcsin(v_river/v_boat). If v_river > v_boat, it's impossible to cross straight across. Minimum time crossing: aim directly across, get pushed downstream; time = width/v_boat. Minimum distance (straight across): aim upstream to cancel drift.

#### Relative Motion in 1D
Two cars approaching each other at 20 m/s and 30 m/s: relative velocity = 50 m/s (closing speed). If chasing, relative velocity = 30 − 20 = 10 m/s. Always add velocities in the same direction or subtract if opposite.

#### Review Questions
1. A plane heads north at 200 m/s relative to air. Wind blows east at 50 m/s. What is the plane's velocity relative to the ground?
2. A boat can go 4 m/s in still water. The river is 5 m/s wide. Can it cross directly? Why or why not?
3. Two trains move toward each other at 30 m/s and 40 m/s. What is their closing speed?

---

### Solving Projectile Motion Problems: Launch Angle Strategies
**Type:** Application
**Slug:** solving-projectile-motion-problems-launch-angles
**Estimated time:** 14 min
**Key concepts:** range · max height · trajectory equation
**Summary:** Apply projectile motion equations systematically to a variety of launch scenarios including cliffs, targets, and angles.

#### Cliff Launch Problem
A ball is launched horizontally at 25 m/s from a 45 m cliff. Find time of flight and horizontal range. Vertical: 45 = ½(9.8)t² → t = √(9.18) = 3.03 s. Horizontal: R = 25 × 3.03 = 75.8 m. Landing speed: v_x = 25, v_y = 9.8 × 3.03 = 29.7. v = √(625 + 882) = 38.8 m/s.

#### Angled Launch: Find All Quantities
Ball launched at 35 m/s at 40°. v₀ₓ = 35 cos 40° = 26.8 m/s. v₀ᵧ = 35 sin 40° = 22.5 m/s. Time of flight = 2(22.5)/9.8 = 4.59 s. Range = 26.8 × 4.59 = 123 m. Max height = (22.5)²/19.6 = 25.8 m.

#### Hitting a Target on the Ground
A ball must hit a target 100 m away. Launch speed = 35 m/s. What angle? R = v₀² sin(2θ)/g → 100 = 1225 sin(2θ)/9.8 → sin(2θ) = 0.8 → 2θ = 53.1° or 126.9° → θ = 26.6° or 63.4°. Both angles work.

#### Review Questions
1. A projectile is launched at 50 m/s at 30°. Find range, max height, and time of flight.
2. A cannon fires at 60° and 30° with the same speed. Compare the ranges and max heights.
3. A ball thrown horizontally at 15 m/s from a height of 20 m. Where does it land?

---

### Projectile Motion Review: Range, Height, Time
**Type:** Mixed/Review
**Slug:** projectile-motion-review-range-height-time
**Estimated time:** 9 min
**Key concepts:** review · range equation · complementary angles
**Summary:** Systematic review of projectile motion with quick-solve practice problems for all key quantities.

#### Key Equations
- Horizontal: x = v₀ cos(θ) × t
- Vertical: y = v₀ sin(θ) × t − ½gt²
- v_y = v₀ sin(θ) − gt
- Range: R = v₀² sin(2θ)/g (same-height launch/land)
- Max height: H = v₀² sin²(θ)/2g
- Time of flight: T = 2v₀ sin(θ)/g

Complementary angles (θ and 90°−θ) give equal range. Maximum range at 45°. At peak: v_y = 0, v_x = v₀ cos(θ) (unchanged).

#### Rapid-Fire Practice (g = 10 m/s²)
1. Launch at 45°, v₀ = 20 m/s. Range? *(400/10 = 40 m)*
2. Launch at 45°, v₀ = 20 m/s. Max height? *(H = 400×0.5/20 = 10 m)*
3. Horizontal throw at 10 m/s from 20 m height. Time? *(t = √4 = 2 s; range = 20 m)*
4. At the peak, what is horizontal velocity? *(Still v₀ cos θ — unchanged)*

#### Review Questions
1. A ball at 30° and 60° has the same range. If thrown at 30° reaches 80 m, what is v₀?
2. Why doesn't the mass of the projectile affect its range?
3. A projectile is at its peak and has speed 15 m/s. What was the angle if v₀ = 20 m/s?

---

### 2D Kinematics Synthesis: Projectile + Relative Motion
**Type:** Mixed/Review
**Slug:** 2d-kinematics-synthesis-projectile-relative-motion
**Estimated time:** 10 min
**Key concepts:** synthesis · projectile · relative velocity
**Summary:** Synthesis problems combining projectile motion with reference frames and relative velocity.

#### Problem 1: Moving Cannon
A cannon mounted on a truck moving at 10 m/s fires a ball at 30 m/s at 45° relative to the truck. What is the ball's range as seen from the ground? In the ground frame, v₀ₓ = 10 + 30 cos 45° = 10 + 21.2 = 31.2 m/s. v₀ᵧ = 30 sin 45° = 21.2 m/s. T = 2(21.2)/9.8 = 4.33 s. Range = 31.2 × 4.33 = 135 m.

#### Problem 2: Ball from Moving Boat
A boat moves east at 6 m/s and throws a ball straight up at 15 m/s relative to the boat. Where does it land (relative to the water)? Relative to water: ball has horizontal velocity 6 m/s and vertical 15 m/s. Time of flight = 2(15)/9.8 = 3.06 s. Horizontal displacement = 6 × 3.06 = 18.4 m east.

#### Problem 3: Swimmer Crossing
A river is 120 m wide, current 2 m/s south. Swimmer can go 3 m/s. For straight-across crossing, aim north of east: sin θ = 2/3 → θ = 41.8° upstream. Actual crossing speed = √(9−4) = √5 = 2.24 m/s. Time = 120/2.24 = 53.6 s.

#### Review Questions
1. A ball thrown horizontally from a moving car at 15 m/s (car speed = 10 m/s east). What path does a road observer see?
2. What is the angle a swimmer should aim to minimize crossing time (not drift)?
3. A plane heads west at 150 m/s; wind blows south at 40 m/s. Find the plane's actual velocity.

---

### Science Bowl: 2D Motion High-Yield Toss-Ups
**Type:** Competition Extension
**Slug:** science-bowl-2d-motion-high-yield
**Estimated time:** 7 min
**Key concepts:** bowl prep · projectile motion · relative velocity
**Summary:** Top bowl-likely projectile and relative motion facts with toss-up practice.

#### High-Yield Facts
1. Horizontal velocity in projectile = constant (no horizontal force).
2. At peak: v_y = 0, v_x = v₀ cos θ, a = g (downward).
3. Maximum range: θ = 45° for flat ground launch.
4. Complementary angles → same range.
5. Range formula: R = v₀² sin(2θ)/g.
6. Horizontal throw from height h: t = √(2h/g).
7. Bullet fired horizontally + bullet dropped = hit ground simultaneously.
8. Relative velocity: v_AG = v_AB + v_BG.
9. River crossing at minimum time: aim straight across.
10. River crossing straight across (minimum drift): aim upstream.

#### Practice Toss-Ups
1. "For 10 points — a projectile is launched at 45° with speed v. At what angle is the range maximized, and what is the formula for the maximum range?" *(45°; R = v²/g)*
2. "For 10 points — in projectile motion, what is the horizontal component of velocity at the peak of the trajectory?" *(v₀ cos θ — unchanged)*
3. "For 10 points — a ball is thrown horizontally from a cliff. A second ball is simultaneously dropped from the same cliff. Which hits the ground first?" *(They land at the same time)*

#### Review Questions
1. A ball is thrown at 60°. At what angle has it fallen to give equal range?
2. A car passes you at 30 m/s going east; you're at 20 m/s east. What is the car's velocity relative to you?
3. A projectile has horizontal speed 10 m/s at the peak. It was launched at 30°. Find v₀.

---

## Subtopic: Motion Graphs

### Interpreting Position-Time and Velocity-Time Graphs
**Type:** Core Understanding
**Slug:** interpreting-position-velocity-time-graphs
**Estimated time:** 13 min
**Key concepts:** slope · area · graph reading
**Summary:** Every feature of a motion graph has a physical meaning — slope encodes velocity or acceleration, area encodes displacement.

#### Position-Time Graphs
Slope = velocity. Horizontal line = rest. Upward slope = positive velocity. Downward slope = negative velocity. Curved line = changing velocity (acceleration). Steeper line = faster. The curvature direction indicates sign of acceleration: concave up = positive a, concave down = negative a.

#### Velocity-Time Graphs
Slope = acceleration. Horizontal line = constant velocity, zero acceleration. Area between curve and t-axis = displacement (positive if above, negative if below). Triangular area = ½ × base × height. Rectangular area = base × height. A trapezoidal region combines both.

#### Connecting All Three Graphs
If position is a quadratic (parabola), velocity is linear, and acceleration is constant. If position is linear, velocity is constant, and acceleration is zero. If velocity is sinusoidal, acceleration is cosinusoidal. Each graph is the derivative of the one above it.

#### Common Traps
A negative velocity on a v-t graph means the object moves in the negative direction — not that it's decelerating. An object can have positive velocity and negative acceleration (decelerating). Area below the t-axis = negative displacement (object moved backward).

#### Review Questions
1. On a v-t graph, a car shows a horizontal line at +15 m/s for 5 s, then a line dropping to 0 over 3 s. Describe the motion and find total displacement.
2. What does the area under a v-t curve represent?
3. A position-time graph curves upward (concave up). What can you say about the acceleration?

---

### Acceleration-Time Graphs and Connecting All Three
**Type:** Core Understanding
**Slug:** acceleration-time-graphs-connecting-all-three
**Estimated time:** 12 min
**Key concepts:** acceleration graph · derivative · integral
**Summary:** Acceleration-time graphs complete the trio; connecting all three requires understanding that each is the derivative of the one above — and integral of the one below.

#### Acceleration-Time Graph
The area under an a-t graph = change in velocity (Δv). For constant acceleration, the a-t graph is a horizontal line. For varying acceleration, the area is calculated as the integral of a(t). If a = 0 for some interval, velocity doesn't change during that interval.

#### Building the Three-Graph Chain
Given a(t) = 2 m/s² constant from t = 0 to 4 s: (1) a-t graph: horizontal line at 2. (2) v-t graph: slope 2 starting at v₀; v = 2t. (3) x-t graph: parabola x = ½(2)t² = t². Each graph is derived from the previous by integration (going down) or differentiation (going up).

#### Reading Jerk-Type Problems
Jerk = rate of change of acceleration = da/dt. If an a-t graph has a slope, jerk is nonzero. In bowl problems, sudden changes in acceleration appear as kinks in the v-t graph or inflection points in the x-t graph. These are often tested as "what happens to velocity/position at t = 3 s?"

#### Reading Multi-Phase Graphs
A v-t graph with three phases — rising (positive a), flat (a = 0), falling (negative a) — describes a subway train: accelerate, cruise, brake. Total displacement = total area under the v-t curve. Negative area (velocity below t-axis) = backward movement.

#### Review Questions
1. A v-t graph goes from 0 to 20 m/s linearly over 4 s, then stays at 20 m/s for 6 s, then falls linearly to 0 over 2 s. Find total displacement and draw the a-t graph.
2. What does the area under an a-t graph represent?
3. An x-t graph is a straight line with positive slope. Draw the corresponding v-t and a-t graphs.

---

### Reading Motion Graphs in Competition Problems
**Type:** Application
**Slug:** reading-motion-graphs-competition-problems
**Estimated time:** 13 min
**Key concepts:** multi-phase graph · area calculation · derivative chain
**Summary:** Apply motion graph reading skills to multi-phase scenarios and derive numerical answers from graphical data.

#### Phase Analysis: Elevator
An elevator v-t graph shows: 0 to 2 s rising to 3 m/s; 2–8 s constant at 3 m/s; 8–12 s falling to 0. Accelerations: phase 1: 1.5 m/s²; phase 2: 0; phase 3: −0.75 m/s². Displacements: phase 1: ½×2×3 = 3 m; phase 2: 6×3 = 18 m; phase 3: ½×4×3 = 6 m. Total = 27 m.

#### Extracting Acceleration from Curved v-t Graph
If the v-t graph is a curve, draw a tangent line at the point of interest — the tangent's slope = instantaneous acceleration. If given a function v(t) = 3t², then a = dv/dt = 6t — at t = 2 s, a = 12 m/s².

#### Predicting Position from v-t Graph
Given v-t data as a table: t = 0, v = 0; t = 1, v = 4; t = 2, v = 8; t = 3, v = 12. Displacement between t = 0 and 3 s: area ≈ trapezoidal sum = ½(0+4)(1) + ½(4+8)(1) + ½(8+12)(1) = 2 + 6 + 10 = 18 m.

#### Review Questions
1. A v-t graph shows velocity = −5 m/s constant for 4 s. Describe the motion and calculate displacement.
2. A v-t graph rises linearly from 0 to 12 m/s over 3 s. What is the acceleration? What is the displacement?
3. An a-t graph shows a = 2 m/s² for 3 s, then a = 0 for 2 s. If v₀ = 0, what is v at t = 5 s?

---

### Motion Graphs Review and Bowl Drill
**Type:** Mixed/Review
**Slug:** motion-graphs-review-bowl-drill
**Estimated time:** 9 min
**Key concepts:** review · slope · area
**Summary:** Quick-fire review of all motion graph concepts and common bowl-style graph questions.

#### Must-Know Relationships
| Graph | Slope means | Area means |
|---|---|---|
| x-t | velocity | — |
| v-t | acceleration | displacement |
| a-t | jerk | Δvelocity |

Key: negative velocity = moving backward (not decelerating). Zero velocity ≠ zero acceleration. Area below x-axis on v-t = negative displacement.

#### Common Bowl Questions
1. Slope of x-t = ? *(velocity)*
2. Area under v-t = ? *(displacement)*
3. Slope of v-t = ? *(acceleration)*
4. Flat line on v-t means = ? *(constant velocity, zero acceleration)*
5. Concave up on x-t means = ? *(positive acceleration)*

#### Review Questions
1. A v-t graph is a horizontal line at −8 m/s for 5 s. What is the acceleration? What is displacement?
2. The slope of an x-t graph at t = 3 s is 12 m/s, and at t = 6 s is −4 m/s. Has the object changed direction?
3. An a-t graph shows a = 4 m/s² for 5 s, starting from rest. Find v and x at t = 5 s.

---

### Science Bowl: Motion Graphs High-Yield Toss-Ups
**Type:** Competition Extension
**Slug:** science-bowl-motion-graphs-high-yield
**Estimated time:** 6 min
**Key concepts:** bowl prep · graph interpretation · slope and area
**Summary:** Bowl-critical graph facts with toss-up practice and fast-solve strategies.

#### Top Bowl Graph Facts
1. Slope of x-t = instantaneous velocity.
2. Slope of v-t = instantaneous acceleration.
3. Area under v-t = displacement.
4. Area under a-t = change in velocity.
5. Constant positive slope on v-t = constant acceleration.
6. Parabola on x-t = constant non-zero acceleration.
7. Horizontal line on x-t = object at rest.
8. V-t below x-axis = moving in negative direction.
9. Kink (sharp change of slope) on v-t = sudden change in acceleration.
10. Tangent to curved v-t = instantaneous acceleration.

#### Practice Toss-Ups
1. "For 10 points — what does the area under a velocity-time graph represent?" *(Displacement)*
2. "For 10 points — a position-time graph is a parabola opening upward. What does this indicate about acceleration?" *(Positive constant acceleration)*
3. "For 10 points — what does the slope of a velocity-time graph equal?" *(Acceleration)*

#### Review Questions
1. A v-t graph has a triangular shape from (0,0) to (4,20) to (6,0). Find total displacement.
2. Describe the motion shown by a v-t graph that is a horizontal line at zero.
3. If the x-t graph has a negative slope that is increasing in magnitude, what can you say about velocity and acceleration?

---

## Subtopic: Uniform Circular Motion

### Uniform Circular Motion: Speed, Velocity, and Centripetal Acceleration
**Type:** Core Understanding
**Slug:** uniform-circular-motion-centripetal-acceleration
**Estimated time:** 13 min
**Key concepts:** centripetal acceleration · period · frequency
**Summary:** In uniform circular motion, speed is constant but velocity is always changing direction — requiring a centripetal (center-directed) acceleration.

#### Why Circular Motion Requires Acceleration
Velocity is a vector. Even if speed is constant, a change in direction is a change in velocity, and Δv/Δt = acceleration. For circular motion, the direction of velocity is always tangent to the circle, changing continuously. This requires an inward (centripetal) acceleration.

#### Centripetal Acceleration Formula
a_c = v²/r = 4π²r/T², directed toward the center. Here v = speed, r = radius, T = period. This is NOT centrifugal acceleration — centrifugal "force" is a fictitious force in a rotating frame. In an inertial frame, only centripetal (real, inward) acceleration exists.

#### Period, Frequency, and Speed
Period T = time for one complete revolution. Frequency f = 1/T (revolutions per second, Hz). Angular speed ω = 2π/T = 2πf. Linear speed v = 2πr/T = rω. For a car in a circle of radius 50 m at 10 m/s: T = 2π(50)/10 = 31.4 s; a_c = 100/50 = 2 m/s².

#### What Provides the Centripetal Force?
Centripetal force isn't a new force — it's the net inward force from existing forces. For a car rounding a curve: friction provides F_c = mv²/r. For a satellite: gravity provides F_c. For a ball on a string: tension provides F_c. If that force disappears, the object flies off tangentially (Newton's 1st law).

#### Review Questions
1. A 500 g ball moves in a circle of radius 0.8 m at 4 m/s. What is the centripetal acceleration? The centripetal force?
2. A satellite orbits at v = 7800 m/s at radius 6.5 × 10⁶ m. Find its centripetal acceleration.
3. What provides the centripetal force for a car rounding a banked curve?

---

### Centripetal Force Applications: Cars, Satellites, and Rides
**Type:** Core Understanding
**Slug:** centripetal-force-applications
**Estimated time:** 12 min
**Key concepts:** centripetal force · friction · banking
**Summary:** Apply F = mv²/r to real-world circular motion scenarios involving friction, banking, gravity, and loops.

#### Car Rounding a Flat Curve
For a car: F_c = friction force = μmg. Setting equal to mv²/r: μmg = mv²/r → v_max = √(μrg). If μ = 0.6, r = 50 m, g = 9.8: v_max = √(0.6×50×9.8) = √294 = 17.1 m/s. Mass cancels — the maximum safe speed is independent of car mass.

#### Banked Curves
For a banked curve with angle θ and no friction: tan θ = v²/(rg). This gives the design speed for which friction isn't needed. At the design speed, the normal force's horizontal component provides all centripetal force; at lower speeds, the car slides down; at higher speeds, it slides up.

#### Vertical Loops
At the top of a vertical loop: F_net = mg + N = mv²/r (both gravity and normal force point inward). Minimum speed at top (N = 0): v_min = √(rg). At the bottom of the loop: N − mg = mv²/r → N = m(g + v²/r) (rider feels heavier).

#### Conical Pendulum
A ball on a string swings in a horizontal circle. String makes angle θ with vertical. T sin θ = mv²/r (centripetal), T cos θ = mg (vertical). Dividing: tan θ = v²/(rg). Period = 2π√(L cos θ/g) where L is string length.

#### Review Questions
1. A car rounds a 40 m radius flat curve. μ = 0.5. What is the maximum speed?
2. At the top of a loop of radius 10 m, what minimum speed keeps the rider in contact?
3. A satellite at radius r orbits with period T. Write the centripetal force equation and solve for v.

---

### Uniform Circular Motion Review and Applications
**Type:** Mixed/Review
**Slug:** uniform-circular-motion-review-applications
**Estimated time:** 9 min
**Key concepts:** centripetal acceleration · period · centripetal force
**Summary:** Rapid review of circular motion with fast-solve practice and competition-style questions.

#### Key Equations Summary
- a_c = v²/r = rω² = 4π²r/T²
- F_c = mv²/r = mrω²
- v = 2πr/T = rω
- ω = 2πf = 2π/T
- For cars on flat curves: v_max = √(μrg)
- At top of loop (min speed): v_min = √(rg)
- Banked curve (no friction): tan θ = v²/(rg)

Centripetal force is provided by: friction (cars), tension (pendulum), gravity (satellites), normal force (loops).

#### Rapid-Fire Practice
1. Ball in 2 m circle at 6 m/s. Centripetal acceleration? *(18 m/s²)*
2. μ = 0.4, r = 60 m. Max car speed? *(v = √(0.4×60×10) = √240 ≈ 15.5 m/s)*
3. Loop radius = 5 m. Min speed at top? *(v = √50 ≈ 7 m/s)*
4. Period = 4 s, radius = 8 m. Centripetal acceleration? *(a = 4π²×8/16 = 2π² ≈ 19.7 m/s²)*

#### Review Questions
1. A 2 kg ball on a 1.5 m string swings in a horizontal circle at 3 m/s. Find tension and angle from vertical.
2. At what speed does a 30° banked curve (r = 80 m) not require friction? (g = 9.8 m/s²)
3. A satellite orbits at r = 4×10⁷ m with T = 24 hr. Find its orbital speed.

---

### Science Bowl: Circular Motion High-Yield Toss-Ups
**Type:** Competition Extension
**Slug:** science-bowl-circular-motion-high-yield
**Estimated time:** 6 min
**Key concepts:** bowl prep · centripetal acceleration · period
**Summary:** Bowl-critical circular motion facts, calculation traps, and toss-up practice.

#### High-Yield Facts
1. a_c = v²/r (centripetal acceleration formula).
2. F_c = mv²/r (centripetal force).
3. Centripetal force always points toward center (inward).
4. "Centrifugal force" is fictitious — doesn't exist in inertial frame.
5. Speed constant in UCM; velocity direction always changing.
6. What provides centripetal force: friction (cars), tension (pendulum), gravity (satellites), normal force (inside loop).
7. Min speed at top of loop: v = √(rg).
8. Car on flat curve: v_max = √(μrg) (mass cancels).
9. Banked curve angle: tan θ = v²/(rg).
10. Period = circumference / speed = 2πr/v.

#### Practice Toss-Ups
1. "For 10 points — give the formula for centripetal acceleration in terms of speed v and radius r." *(a = v²/r)*
2. "For 10 points — for a car rounding a flat curve, what force provides the centripetal force?" *(Friction)*
3. "For 10 points — at the top of a vertical circular loop of radius r, what is the minimum speed needed to maintain contact with the track?" *(√(rg))*

#### Review Questions
1. A car rounds a 50 m curve at 20 m/s. What centripetal acceleration is required?
2. If you double the speed in circular motion, what happens to centripetal force?
3. Name two real-world situations where gravity provides the centripetal force.
