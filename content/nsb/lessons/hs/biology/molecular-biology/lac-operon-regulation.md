---
id: nsb-lesson-0058
title: "Prokaryotic Gene Regulation: The lac Operon"
level: hs
subject: biology
topic: molecular-biology
subtopic: "Gene Regulation"
slug: lac-operon-regulation
type: "Core Understanding"
estimatedMinutes: 12
keyConcepts: ["operon", "repressor", "inducer", "allolactose", "CAP-cAMP", "negative control", "positive control"]
summary: "The lac operon exemplifies negative and positive transcriptional control — repressed in the absence of lactose and fully activated only when lactose is present and glucose is absent."
---
#### Operon Structure
The **lac operon** in *E. coli* consists of:
- **Promoter (P)**: binds RNA polymerase
- **Operator (O)**: binding site for the Lac repressor
- **lacZ**: encodes β-galactosidase (cleaves lactose → glucose + galactose)
- **lacY**: encodes lactose permease (imports lactose)
- **lacA**: encodes a transacetylase (minor role)

#### Negative Control: The Lac Repressor
The **Lac repressor** (encoded by *lacI*) binds the operator and physically blocks RNA Pol. When **allolactose** (a lactose isomer produced when lactose enters the cell) is present, it binds the repressor, causing a conformational change that reduces affinity for the operator ~1000-fold. The repressor falls off, and transcription can proceed. Allolactose is the **inducer**; it derepresses the operon.

#### Positive Control: CAP-cAMP
Even when the repressor is released, transcription is low unless activated. **CAP (catabolite activator protein)** bound to **cAMP** binds the CAP site near the lac promoter and directly contacts RNA Pol α subunit, stimulating transcription. cAMP levels rise when glucose is absent (adenylyl cyclase is active); cAMP falls when glucose is present (glucose inhibits adenylyl cyclase). So: high glucose → low cAMP → low CAP activity → low lac transcription even when lactose is present.

#### The Logic of Combined Control
| Glucose | Lactose | cAMP | Repressor | Transcription |
|---|---|---|---|---|
| + | – | Low | Bound | None |
| + | + | Low | Free | Low |
| – | – | High | Bound | None |
| – | + | High | Free | **High** |

The cell only fully expresses lac genes when it needs to (lactose present) AND glucose is unavailable (no better carbon source). This is metabolic logic implemented in molecular biology.

#### Review Questions
1. What is the role of allolactose in lac operon regulation, and where does it come from?
2. A mutation destroys the CAP binding site near the lac promoter. Predict the effect on lac expression when glucose is absent and lactose is present.
3. Why is the lac operon described as having both negative and positive control?

---
