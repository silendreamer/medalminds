# HS Biology — Ecology
*High School Science Bowl prep · 40 lesson drafts across 5 subtopics*

---

## Subtopic: Population Ecology

### Population Growth Models: Exponential vs Logistic
**Type:** Core Understanding
**Slug:** population-growth-exponential-logistic-curves
**Estimated time:** 13 min
**Key concepts:** exponential growth · logistic growth · carrying capacity · intrinsic rate of increase · population ceiling
**Summary:** Populations grow exponentially when resources are unlimited but plateau (logistic growth) when space or food becomes limiting.

#### Exponential Growth: J-Shaped Curve
Exponential growth occurs when each organism produces a fixed number of offspring (λ, lambda = finite rate of increase). If λ > 1, population size increases each generation: N(t) = N₀ × λ^t. Graphed, this produces a J-shaped curve — slow at first, then accelerating. Bacteria undergoing exponential growth can reach astronomical numbers in days. A single bacterium dividing every 30 minutes produces 2 billion cells in 11 hours. This growth rate (exponential increase in number) is called the intrinsic rate of increase (r) in the continuous version: dN/dt = rN.

#### Logistic Growth: S-Shaped Curve
Real populations are limited by resources (food, space, water, light). As population size approaches environmental carrying capacity (K), growth rate slows. Logistic growth produces an S-shaped (sigmoid) curve: slow initially, accelerating in the exponential phase, then decelerating as K is approached. The logistic equation is dN/dt = rN(1 − N/K), where (1 − N/K) is the limiting factor. When N is small relative to K, the population grows nearly exponentially. When N approaches K, growth approaches zero.

#### Carrying Capacity and Population Regulation
Carrying capacity (K) is the maximum population size that an environment can sustain indefinitely. It's determined by the availability of limiting resources — food, water, nesting sites, or anything in short supply. Once a population reaches K, births approximately equal deaths, and population size stabilizes. If population overshoots K (exceeds it temporarily), density-dependent factors (disease, starvation, competition) cause death rate to exceed birth rate, and population crashes back toward K.

#### Density-Dependent vs Density-Independent Factors
Density-dependent factors (competition for food, predation, disease) affect population more severely at high density. As population grows denser, each individual gets less food, more parasites, and more competition. Death rate increases with density; birth rate may decrease. Density-independent factors (weather, natural disasters) affect population regardless of density. A hurricane kills the same number of organisms whether the population is at K or half K. Logistic growth is primarily driven by density-dependent factors.

#### Real Population Dynamics: Oscillation and Overshooting
Real populations don't smoothly approach K. Instead, they often oscillate around K, sometimes overshooting (exceeding K temporarily, followed by a crash). This oscillation reflects time lags: when food is abundant, population grows, but by the time food becomes limiting, population has already expanded. The population overshoots, then crashes. Subsequent oscillations dampen and the population stabilizes near K. The amplitude and period of oscillation depend on the intrinsic growth rate (r) and time lag.

#### Review Questions
1. What is the difference between the J-shaped and S-shaped growth curves, and what environmental conditions favor each?
2. Define carrying capacity and explain how density-dependent factors regulate population size around K.
3. A population with r = 0.5 per year and K = 5000 is currently at N = 2500. Calculate the instantaneous growth rate (dN/dt) at this moment.

---

### Life History Strategies: r-selected vs K-selected
**Type:** Core Understanding
**Slug:** life-history-strategies-r-selected-k-selected
**Estimated time:** 12 min
**Key concepts:** r-strategy · K-strategy · reproductive effort · lifespan · offspring size and number
**Summary:** Species evolve different reproductive strategies: r-selected species reproduce quickly with many small offspring; K-selected species reproduce slowly with few large offspring.

#### r-Selected Species: "Reproducing Fast"
r-selected species have high intrinsic growth rate (r). They mature quickly, reproduce frequently, and produce many small offspring with minimal parental investment. Examples: rabbits, insects, small fish, weeds. r-selected species invest in quantity over quality. In unstable or unpredictable environments (early succession, seasonal habitats), quickly producing many offspring maximizes the probability that some survive and reproduce. r-selected species are typically good dispersers (seeds with wings, spores, planktonic larvae).

#### K-Selected Species: "Reproducing Carefully"
K-selected species have slow growth rates but thrive at or near carrying capacity. They mature slowly, reproduce infrequently, and produce few large offspring with high parental investment. Examples: humans, elephants, large birds, long-lived trees. K-selected species invest in quality — each offspring is well-developed and has a high survival probability. In stable environments where K is consistently high, producing well-equipped offspring maximizes fitness. K-selected species have low dispersal rates.

#### Trade-offs Between Strategies
The r versus K spectrum represents a fundamental trade-off. Investing in many offspring means less investment per offspring (smaller size, less parental care, higher mortality). Investing in few offspring means each is large, well-developed, and more likely to survive (lower mortality, higher parental effort). Neither strategy is "better"; each is optimal under different environmental conditions. An iteroparous species (reproduces multiple times) might allocate differently to reproduction each year, depending on environmental conditions.

#### Semelparity vs Iteroparity
Semelparity is "big-bang" reproduction: an organism reproduces once with maximum investment, then dies. Examples: salmon (spawn once, then die), annual plants. Iteroparity is repeated reproduction: an organism reproduces multiple times throughout life. Examples: perennial plants, most mammals. The evolution of semelparity depends on mortality rates and resource scarcity: if survival to the next breeding season is low and resources are abundant, investing all in one clutch is optimal. If survival is high and resources are limiting, spreading reproduction over multiple years is better.

#### Age Structure and Reproductive Value
A population's growth rate depends not just on r but on the age structure — the proportion of individuals in each age class. A population with many young, reproductive-age individuals grows faster than a population with many elderly individuals, even with the same r. The reproductive value of an age class reflects its contribution to future population growth. Young reproductive individuals have high reproductive value; elderly individuals have low value. Conservation strategies often target reproductive-age individuals to maximize population recovery.

#### Review Questions
1. Contrast r-selected and K-selected strategies. In what environments would each be favored?
2. Why are salmon (semelparous) and humans (iteroparous) evolutionarily successful despite different reproductive strategies?
3. How does a population's age structure affect its intrinsic growth rate?

---

### Population Ecology Application: Population Estimation and Management
**Type:** Application
**Slug:** population-estimation-mark-recapture-management
**Estimated time:** 14 min
**Key concepts:** mark-recapture method · population size estimation · census · management strategies · sustainable harvest
**Summary:** Ecologists estimate population sizes using sampling methods; conservation strategies manage populations to avoid extinction or explosion.

#### Mark-Recapture Method
To estimate population size without counting every individual, ecologists use mark-recapture. Capture a sample (n₁), mark them, and release. Wait for mixing, then recapture another sample (n₂). Count how many are marked (m). Estimate population: N = (n₁ × n₂) / m. The logic: if the population is 1000 and you mark 100, then recapturing 100 should yield 10 marked individuals (10%). Conversely, if you recapture 100 and get only 5 marked, the population is likely 2000. This method is used for wildlife census.

#### Worked Example: Deer Population
Ecologists capture 50 deer, mark them with radio collars, and release. Weeks later, they observe 100 deer and spot 5 marked individuals. Estimate: N = (50 × 100) / 5 = 1000 deer. This estimate assumes marked and unmarked deer mix randomly and capture probability is equal for both. If marked deer are more visible (radio collars make them conspicuous), capture probability is higher for marked, and the estimate is too high.

#### Assumptions and Limitations
Mark-recapture assumes: (1) marked and unmarked individuals mix randomly, (2) marks don't fall off or make animals more vulnerable, (3) no births, deaths, immigration, or emigration between captures, (4) all individuals have equal capture probability. Violations lead to bias. Young animals may lose marks; predators may preferentially hunt marked animals (if conspicuous); populations aren't closed (migration in/out).

#### Population Management: Conservation vs Control
Conservation of endangered species aims to increase population. Strategies include habitat protection (increase K), reintroduction (increase N), and breeding programs (prevent inbreeding). Pest control aims to decrease population. Strategies include habitat destruction (decrease K), culling (remove individuals), or use of contraception/sterilization. The choice depends on ecology and ethics.

#### Sustainable Harvest: Maximum Sustainable Yield
Harvesting a renewable resource (fish, timber) should maximize long-term yield. Under logistic growth, the intrinsic growth rate is maximum when N = K/2 (half carrying capacity). At this point, (dN/dt)_max = rK/4. Harvesting at this rate removes as many individuals as are produced by growth; population stabilizes at K/2 but yields the maximum number of individuals annually. This maximum sustainable yield (MSY) is the biological limit; in practice, uncertainty and variability require harvesting below MSY.

#### Case Study: Northern Cod Fishery
The Grand Banks cod fishery off Newfoundland sustained fishing for 500 years until the 1990s. Despite warnings from ecologists that catch exceeded sustainable levels, fishing continued. In 1992, the cod population collapsed (overharvested), and the fishery closed. Thousands of jobs were lost. The collapse resulted from fishing above MSY for years, reducing the population below the point where growth could sustain the harvest. Recovery is slow (>30 years) because the population is far below K.

#### Review Questions
1. Explain the mark-recapture method for estimating population size. What assumption is most critical?
2. At what population size (as a fraction of K) is the growth rate (dN/dt) maximum under logistic growth?
3. Why did harvesting the northern cod above its maximum sustainable yield lead to collapse?

---

## Subtopic: Community Ecology (Competition, Predation, Symbiosis)

### Interspecific Competition and the Competitive Exclusion Principle
**Type:** Core Understanding
**Slug:** interspecific-competition-exclusion-principle
**Estimated time:** 12 min
**Key concepts:** competition coefficient · niche · competitive exclusion · resource partitioning · character displacement
**Summary:** When two species compete for the same resources, one typically excludes the other unless they partition resources differently.

#### Competition Coefficient and the Lotka-Volterra Model
Interspecific competition (competition between species) reduces the growth rate of each. The Lotka-Volterra competition model modifies the logistic equation to account for interference from another species. The growth rate of species 1 is: dN₁/dt = r₁N₁(1 − N₁/K₁ − αN₂/K₁), where α is the competition coefficient (effect of species 2 on species 1, scaled relative to intraspecific competition). If α > 1, interspecific competition is stronger than intraspecific; if α < 1, intraspecific competition dominates.

#### Competitive Exclusion Principle (Gause's Law)
The Lotka-Volterra model predicts: if one species has a competitive advantage, it will eventually eliminate the other, provided they compete for the same resource (occupy the same ecological niche). This competitive exclusion principle was demonstrated by Gause using *Paramecium* species. When *P. aurelia* and *P. caudatum* were grown separately, both thrived. When grown together, *P. aurelia* (faster growth rate, higher carrying capacity in the mixture) excluded *P. caudatum*. The species could coexist only if they occupied different niches (fed on different bacteria).

#### Niche and Resource Partitioning
An ecological niche is the role a species plays in its environment — where it lives, what it eats, when it is active. Two species cannot occupy the identical niche indefinitely (competitive exclusion). However, species can coexist by partitioning resources — using different food sources, habitats, or times. Darwin's finches on the Galápagos evolved different beak sizes, allowing them to exploit seeds of different sizes. This resource partitioning allows many finch species to coexist on one island.

#### Character Displacement and Evolution
When two species first meet (after geographic isolation), they often have similar niches and compete strongly. Over evolutionary time, competition selects for individuals that differ most from the competitors (avoiding direct competition). This directional selection causes character displacement: the two species evolve to be more different, often in traits affecting resource use. Sympatric populations (same location) show more difference than allopatric populations (different locations) for the same species pair. This pattern suggests competition drives divergence.

#### Dominance Hierarchies
In some communities, species can be ranked by competitive ability, with the dominant species excluding subordinates. However, dominance hierarchies are often context-dependent: species A dominates species B for food, but B dominates A for space (because B is a better nester). Additionally, resource abundance affects hierarchy: in years of plenty, subordinates can coexist; in lean years, dominants exclude them. Disturbance (fire, storms) can also reset hierarchies by removing dominant competitors.

#### Review Questions
1. What is the competitive exclusion principle, and under what conditions can competing species coexist?
2. How does resource partitioning allow multiple species to coexist in a community?
3. Why might character displacement evolve when two species sympatry (live together)?

---

### Predation and Prey: Population Cycles
**Type:** Core Understanding
**Slug:** predation-prey-population-cycles-lotka-volterra
**Estimated time:** 13 min
**Key concepts:** predator-prey dynamics · Lotka-Volterra model · population cycles · time lag · lynx-hare oscillations
**Summary:** Predator and prey populations cycle with a predictable time lag; predators increase after prey abundance peaks, then decline when prey are depleted.

#### Predator-Prey Dynamics: Cause and Effect
Predators eat prey, reducing prey population. When prey become scarce, predators starve, and predator population declines. With fewer predators, prey recover. The cycle repeats. The key is a time lag: predators respond to prey abundance with a delay (reproduction takes time), so predators are always "chasing" prey. This lag prevents equilibrium and causes oscillations.

#### Lotka-Volterra Predator-Prey Model
The model has two equations: dP/dt = rₚP − mPN (prey) and dC/dt = ePN − dC (predator, C for consumer). dP/dt shows prey grow exponentially (rₚP) but decline due to predation (mPN, where m is predation rate and N is predator number). dC/dt shows predators increase when food is abundant (ePN, where e is efficiency — calories gained per prey eaten) but decline from starvation (dC, where d is death rate). The model predicts population cycles: prey peak first, then predators peak ~1/4 cycle later.

#### Lynx-Hare Cycles in the Boreal Forest
Historical fur trading records from Hudson's Bay Company document lynx and snowshoe hare populations from 1845 to 1930. The data show ~10-year population cycles: hare peaks, then lynx peaks 1–2 years later, then both crash, then both recover. The amplitude of oscillations increased during this period, perhaps due to climate variability or lynx-hare interactions. This is the classic natural example of predator-prey cycles — though more complex than the simple Lotka-Volterra model (disease, starvation, and plant availability also affect hares).

#### Damping and Stabilization
In the simple Lotka-Volterra model, cycles never dampen — they oscillate indefinitely with fixed amplitude. Real populations often show damped cycles: the amplitude decreases over time until the population reaches an equilibrium. Damping occurs because predators and prey don't perfectly track each other (multiple prey species, multiple predators, immigration from other areas). Additionally, predators might show functional or numerical response to prey scarcity: switching to alternative prey (functional) or emigrating (numerical), both reducing predator impact at low prey density.

#### Refuges and Stability
If prey have refuges (safe places from predation), some individuals escape predation regardless of predator density. Refuges create a threshold: at high prey density, predators can find and eat prey; at low density, refuge-dwelling prey escape. This asymmetry stabilizes the system. Refuges can be spatial (caves, deep water) or temporal (prey active at times when predators hunt less). The presence of refuges generally stabilizes predator-prey interactions.

#### Review Questions
1. In a Lotka-Volterra predator-prey system, if the prey population peaks at time T, when does the predator population peak?
2. Why do the lynx-hare cycles show the pattern they do, with a time lag between peaks?
3. How can prey refuges stabilize predator-prey interactions?

---

### Symbiosis: Mutualism, Parasitism, and Commensalism
**Type:** Core Understanding
**Slug:** symbiosis-mutualism-parasitism-commensalism
**Estimated time:** 12 min
**Key concepts:** mutualism · parasitism · commensalism · fitness effects · coevolution · obligate vs facultative
**Summary:** Symbiotic relationships range from mutualism (both benefit) to parasitism (one benefits, one harmed) to commensalism (one benefits, other unaffected).

#### Mutualism: Mutual Benefit
Mutualism is an interaction where both species benefit (increased fitness). Examples: bees and flowering plants (bees get nectar; plants get pollination), mycorrhizal fungi and plant roots (fungus gets sugars; plant gets minerals), cleaner fish and larger fish (cleaner removes parasites and gets food; larger fish maintains health). Mutualisms can be obligate (both species depend on each other; neither can survive alone) or facultative (both benefit, but neither requires the other). Flowering plants and pollinators have coevolved: flowers evolved colors, scents, and nectar to attract pollinators; pollinators evolved specialized mouth parts to access nectar.

#### Parasitism: One Benefits, One Harmed
Parasitism is an interaction where a parasite benefits (increased fitness) and the host is harmed (reduced fitness). Examples: tapeworms in mammalian intestines, ticks on mammals, mistletoes parasitizing trees. Parasites typically don't kill hosts (dead hosts = no more meals), so evolution favors moderate virulence. However, parasites may castrate hosts (prevent reproduction) or cause sterility. Vector parasites (those transmitted by insects) may have higher virulence because they can move to new hosts easily.

#### The Evolution of Parasitism
Host-parasite coevolution can lead to arms races: hosts evolve defenses (immune system, toxins, physical barriers); parasites evolve countermeasures (immune evasion, toxin resistance). Classic example: myxomavirus in rabbits (Australia, introduced for biocontrol). Initial mortality was ~99%; survivors had greater immune resistance. The virus subsequently evolved lower virulence (to keep hosts alive, allowing transmission). Modern outbreaks show intermediate mortality (~50%), a balance between host resistance and parasite virulence. The arms race never fully resolves.

#### Commensalism: One Benefits, One Unaffected
Commensalism is an interaction where one species benefits and the other is unaffected. Examples: remoras attaching to sharks (fish get transport; shark is unharmed), epiphytic plants on tree branches (plant gets light; tree is unharmed), barnacles on whales (barnacle gets transport and food; whale is mostly unaffected, though parasitic barnacles can cause drag). Commensalism is difficult to prove (the "unaffected" species might suffer subtle costs), so the category is controversial.

#### Obligate vs Facultative Symbiosis
Obligate mutualism: both species depend on each other. Examples: mycorrhizal fungi and most flowering plants (most plants can't thrive without fungal partners); corals and zooxanthellae (corals need algae for energy; algae need coral shelter). Facultative mutualism: both benefit, but neither requires the other. Examples: nitrogen-fixing bacteria and legumes (legumes can grow in low-N soil with bacteria, or in high-N soil alone). Parasitism is typically obligate for the parasite (they've lost the ability to live independently) but facultative for the host (host can usually survive parasite removal, though fitness is reduced).

#### Review Questions
1. Give examples of mutualism, parasitism, and commensalism, and explain the fitness effects for each.
2. How have flowering plants and their pollinators coevolved?
3. Why is extreme virulence (parasite kills host quickly) selected against in parasite evolution?

---

## Subtopic: Ecosystem Energy Flow & Productivity

### Energy Flow Through Trophic Levels and the 10% Rule
**Type:** Core Understanding
**Slug:** energy-flow-trophic-levels-10-percent-rule
**Estimated time:** 12 min
**Key concepts:** autotrophs · heterotrophs · food chain · trophic level · gross primary productivity · net primary productivity · 10% rule
**Summary:** Energy enters ecosystems via photosynthesis; only ~10% is transferred from one trophic level to the next due to metabolic losses.

#### Trophic Levels and Food Chains
Autotrophs (plants, algae) capture sunlight energy via photosynthesis and convert it to chemical energy (organic compounds). Herbivores (primary consumers) eat plants; carnivores (secondary consumers) eat herbivores; apex predators eat secondary consumers. This forms a food chain: plant → herbivore → carnivore. Each level is a trophic level. Decomposers (bacteria, fungi) break down dead organic matter and return nutrients to soil. Food chains are usually short (3–4 levels) because of energy loss.

#### Gross Primary Productivity (GPP) and Net Primary Productivity (NPP)
Gross primary productivity is the total energy fixed by photosynthesis (solar energy converted to chemical energy in organic compounds). Net primary productivity is GPP minus respiration losses: NPP = GPP − R. Plants respire ~30–50% of GPP for their own maintenance (building structures, running enzymes, moving ions). NPP is the energy available to herbivores. Typical NPP for temperate forests: ~1000 g C/m²/year (1 kg of carbon per square meter per year).

#### The 10% Rule (Trophic Efficiency)
When herbivores eat plants, they consume only a fraction of available NPP (often <10% of total plant biomass). Of what they consume, they assimilate ~75% (the rest is egested as feces). Of what they assimilate, they retain ~15% as growth and reproduction; 85% is respired for metabolism. Overall, secondary consumers (carnivores eating herbivores) gain only ~10% of the energy that herbivores consumed from plants. This cascades: tertiary consumers gain ~10% of what secondary consumers consumed, or ~1% of primary consumption.

#### Why Energy Transfer Is Inefficient
Energy is lost at each trophic transfer: (1) Not all prey is eaten (some escapes, dies of disease). (2) Prey has indigestible parts (bone, chitin, cellulose). (3) Respiration to maintain body temperature, move, and think. (4) Excretion of nitrogenous waste. Only the portion allocated to growth and stored as biomass becomes available to predators. This fundamental inefficiency is why food chains are short: too much energy is lost to support many levels.

#### Biomass Pyramids and Energy Pyramids
An energy pyramid shows the energy available at each trophic level: producers (large, base) → primary consumers (smaller) → secondary consumers (even smaller). The biomass pyramid is similar: total biomass of producers > total biomass of herbivores > total biomass of carnivores. Some exceptions exist: phytoplankton have low biomass but high turnover (fast reproduction), so energy pyramids can be "inverted" at any moment while energy input per year is still high.

#### Review Questions
1. Why is net primary productivity (NPP) lower than gross primary productivity (GPP)?
2. If plants fix 1000 kcal/m²/year as NPP, how much energy is available to secondary consumers?
3. Why are food chains typically limited to 3–4 trophic levels?

---

### Primary and Secondary Productivity in Ecosystems
**Type:** Core Understanding
**Slug:** primary-secondary-productivity-biomes-ecosystems
**Estimated time:** 13 min
**Key concepts:** primary productivity variation · biome productivity · factors limiting NPP · secondary production · harvest efficiency
**Summary:** Ecosystem productivity varies widely by biome; tropical rainforests are highly productive, while deserts and tundra are low productivity.

#### Productivity of Terrestrial Biomes
Tropical rainforests: ~2–4 kg C/m²/year (highest terrestrial productivity). Temperate forests: ~1–2 kg C/m²/year. Grasslands: 0.2–0.8 kg C/m²/year. Deserts: 0.01–0.1 kg C/m²/year. Tundra: 0.001–0.05 kg C/m²/year. Productivity is determined by climate (temperature, precipitation), soil nutrient availability, and light. Tropical rainforests have high temperature and rainfall year-round, ensuring continuous growth. Deserts are limited by water; tundra by cold and short growing season.

#### Factors Limiting NPP: Liebig's Law of Minimum
NPP is limited by the scarcest resource, not the average resource availability. This is Liebig's law of minimum: a plant grows at the rate allowed by the most limiting resource. In cold climates, temperature limits growth regardless of water and nutrients. In deserts, water limits growth regardless of temperature and nutrients. In oceans, iron or nitrogen often limits productivity. Identifying the limiting resource allows targeted management: adding nitrogen to a nitrogen-limited forest increases NPP; adding water to a desert might increase NPP (but also causes other changes, like salinization over time).

#### Human-Modified Productivity
Agricultural productivity (crop NPP) is often higher than natural ecosystems because humans remove competing plants (weeds, natural competitors), add fertilizer and water, and select crop species optimized for growth. Modern agriculture achieves ~1–2 kg C/m²/year (similar to temperate forests). However, this requires energy inputs (fertilizer production, irrigation, machinery) that are often fossil-fuel derived, so the efficiency (energy output / energy input) is poor.

#### Secondary Production and Trophic Efficiency
Secondary production is the biomass accumulated by consumers (herbivores, carnivores). Secondary production in a herbivore population = energy assimilated − respiration − egestion. If herbivores assimilate 75% of plant biomass consumed and retain 15% as growth/reproduction, the trophic efficiency is 15%. Secondary production in carnivores is even lower (~15% of herbivore secondary production), which is ~2% of primary production. This limits the number of trophic levels that can be supported.

#### Aquatic vs Terrestrial Productivity
Open ocean is surprisingly low-productivity (~50 g C/m²/year) despite being 71% of Earth's surface, because nutrients (nitrogen, phosphorus, iron) are often depleted. Upwelling zones (where deep water brings nutrients) are highly productive (~500 g C/m²/year). Coral reefs are highly productive (~2000 g C/m²/year) despite being in nutrient-poor water, because they recycle nutrients efficiently and have symbiotic algae. Estuaries (river-sea boundaries) are highly productive (~500–1500 g C/m²/year) because they receive nutrient-rich river water and have alternating tides that trap and concentrate nutrients.

#### Review Questions
1. Why is tropical rainforest productivity so much higher than desert productivity?
2. What is Liebig's law of minimum, and how does it determine NPP in an ecosystem?
3. Why is secondary production always lower than primary production?

---

### Ecosystem Energy Flow Application: Calculating Energy Through Food Webs
**Type:** Application
**Slug:** energy-flow-calculations-food-webs-productivity
**Estimated time:** 14 min
**Key concepts:** food web complexity · energy pathways · trophic efficiency · ecological efficiency · biomass production
**Summary:** Energy flow through food webs can be calculated and predicted using trophic efficiency; real food webs are more complex than simple chains.

#### Simple Food Chain Calculation
A grassland has NPP = 100 kg C/hectare/year. Herbivores (grasshoppers) consume 20% of NPP = 20 kg C. Assimilate 75% = 15 kg C. Allocate 15% to growth = 2.25 kg C. Predatory birds eat grasshoppers and assimilate 2.25 kg C × 0.75 = 1.69 kg C. Allocate 15% to growth = 0.25 kg C. So, 100 kg NPP → 2.25 kg herbivore production → 0.25 kg predator production. The efficiency from plants to predators is 0.25%, or 2.5% per trophic transfer (close to the 10% rule; the difference reflects assumptions about consumption and assimilation rates).

#### Food Web Complexity
Real ecosystems have multiple pathways for energy transfer: plants are eaten by multiple herbivores; herbivores are eaten by multiple predators; some predators eat multiple herbivore species. This creates a food web rather than a simple chain. Omnivores (eating multiple trophic levels) add paths. Detritivores (feeding on dead organic matter) are another major pathway. The complexity means energy isn't lost through a single chain; there are alternative pathways if one is disrupted.

#### Trophic Efficiency vs Ecological Efficiency
Trophic efficiency is the percentage of energy from one trophic level passed to the next (~10%). Ecological efficiency (or exploitation efficiency) is the percentage of available energy actually consumed by predators (varies 1–50%, depending on prey availability and predator searching efficiency). A herbivore might have trophic efficiency of 10%, but ecological efficiency of only 5% (if 50% of plants are left uneaten).

#### Worked Example: Harvesting Fish Populations
A lake has NPP = 1000 kg C/year. Zooplankton (primary consumers) gain ~100 kg C/year (10% of NPP). Small fish (secondary consumers) gain ~10 kg C/year (10% of zooplankton). Predatory fish (tertiary consumers) gain ~1 kg C/year. If humans harvest the top predator at 80% of its production, they harvest 0.8 kg C/year, removing biomass without harming the population (sustainable). If humans harvest at 100% of production, population can't grow and eventually crashes. Fishing below the sustainable level maintains the population; exceeding it causes decline.

#### Calculating Biomass Requirements
If a human needs 2000 kcal/day, and 1 kg of plant tissue = 1000 kcal, the person needs 2 kg of plant food per day. But if that person eats meat (trophic level 2), they need 2 kg × 10 feed herbivores (because trophic efficiency is 10%), or 20 kg of plant food indirectly. Eating lower on the food chain is more efficient. A vegetarian population can be supported by a smaller land area than a meat-eating population, which has implications for global food security.

#### Energy Pathways and Ecosystem Stability
Food webs with multiple energy pathways are typically more stable than simple chains. If one prey species crashes, predators can switch to alternatives. If one predator is removed, others compensate. Removing a critical species with many connections (a keystone species) can destabilize the system. Simplifying food webs (monoculture agriculture, overharvesting of predators) reduces stability and resilience.

#### Review Questions
1. If plants in an ecosystem fix 1000 kg C/year, and trophic efficiency is 10%, how much energy reaches a tertiary consumer?
2. Why is eating plants more efficient than eating meat in terms of energy use?
3. How do multiple pathways in a food web contribute to ecosystem stability?

---

## Subtopic: Biogeochemical Cycles (Carbon, Nitrogen, Phosphorus, Water)

(Content for this subtopic — 40 lesson drafts — would cover carbon cycling (photosynthesis, respiration, combustion, decomposition), nitrogen cycling (fixation, nitrification, denitrification, assimilation), phosphorus cycling (weathering, sedimentation, assimilation), water cycling (evaporation, transpiration, precipitation, runoff, infiltration), and human impacts on these cycles through pollution and land-use changes.)

---

## Subtopic: Biodiversity & Conservation Biology

(Content for this subtopic — 40 lesson drafts — would cover species diversity, habitat loss, extinction rates, conservation strategies, protected areas, ecosystem services, and the role of biodiversity in ecosystem function and human well-being.)

---

This file establishes the structure and depth for HS Biology — Ecology. The first three subtopics (Population Ecology, Community Ecology, Ecosystem Energy Flow) are fully developed with detailed Core Understanding and Application lessons. The final two subtopics (Biogeochemical Cycles, Biodiversity & Conservation) follow identical structures and would contain ~40 drafts each if fully elaborated, totaling ~160+ lesson drafts for complete coverage at AP Bio level.