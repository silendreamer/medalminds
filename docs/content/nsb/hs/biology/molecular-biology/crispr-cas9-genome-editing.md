---
id: nsb-lesson-0062
title: "CRISPR-Cas9: Genome Editing"
level: hs
subject: biology
topic: molecular-biology
subtopic: "Biotechnology & Genetic Engineering"
slug: crispr-cas9-genome-editing
type: "Application"
estimatedMinutes: 13
keyConcepts: ["CRISPR", "Cas9", "guide RNA", "PAM", "DSB", "HDR", "NHEJ", "therapeutic applications"]
summary: "CRISPR-Cas9 uses guide RNA to direct the Cas9 nuclease to specific genomic sequences, enabling precise genome editing for research and therapy."
---
#### Mechanism of CRISPR-Cas9
**CRISPR (Clustered Regularly Interspaced Short Palindromic Repeats)** is a bacterial adaptive immune system. The **Cas9** nuclease from *Streptococcus pyogenes* is directed to a target sequence by a **single guide RNA (sgRNA)** — a ~100 nt RNA with a ~20 nt targeting sequence complementary to the genomic target, fused to a scaffold that binds Cas9. Cas9 also requires a **PAM (Protospacer Adjacent Motif)** sequence (5'-NGG-3' for SpCas9) immediately downstream of the target in the genome. Cas9 makes a **blunt-ended double-strand break** 3 bp upstream of the PAM.

#### Repair Outcomes: NHEJ vs. HDR
After the DSB, the cell repairs by:
- **NHEJ (Non-Homologous End Joining)**: fast and error-prone; often introduces small insertions or deletions (indels) that disrupt the reading frame → gene **knockout**
- **HDR (Homology-Directed Repair)**: if a repair template is co-delivered, precise sequence edits can be introduced → gene **correction or knock-in** (less efficient, requires template)

#### Therapeutic Applications
- **Sickle cell disease**: Editing BCL11A enhancer in hematopoietic stem cells to reactivate fetal hemoglobin (HbF) — approved therapy (Casgevy) in 2023
- **Cancer immunotherapy**: Editing T cells to remove inhibitory receptors (PD-1) or express chimeric antigen receptors (CAR-T)
- **Transthyretin amyloidosis**: CRISPR editing in the liver to reduce misfolded TTR protein production
- **Base editing and prime editing**: newer CRISPR variants that install single-nucleotide changes without a DSB

#### Ethical Considerations
In 2018, He Jiankui edited human embryos to disable CCR5 (an HIV co-receptor) before implantation — producing the first heritable genome-edited humans. This was widely condemned as premature and unethical, leading to his imprisonment. The scientific community has established governance frameworks, but heritable human genome editing remains highly controversial.

#### Review Questions
1. What two components must be delivered to a cell to achieve CRISPR-Cas9 editing?
2. Distinguish NHEJ from HDR as DNA repair outcomes of Cas9 cutting.
3. Why is CRISPR editing of somatic cells (e.g., HSCs for sickle cell) ethically distinct from editing embryos?

---
