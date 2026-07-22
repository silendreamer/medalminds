# HS Biology — Molecular Biology & Gene Expression
*High School Science Bowl prep · 48 lesson drafts across 6 subtopics*

---

## Subtopic: DNA Structure, Replication & Repair

### DNA Double Helix: Structure and Stability
**Type:** Core Understanding
**Slug:** dna-double-helix-structure
**Estimated time:** 12 min
**Key concepts:** nucleotide · base pairing · antiparallel · hydrogen bonds · B-form DNA
**Summary:** DNA's double helical structure, with complementary antiparallel strands held by hydrogen bonds and base stacking, encodes information while providing stability.

#### Nucleotide Building Blocks
DNA is a polymer of **deoxyribonucleotides**, each consisting of a deoxyribose sugar, a phosphate group, and a nitrogenous base. The four bases are adenine (A) and guanine (G) — purines (two-ring structures) — and cytosine (C) and thymine (T) — pyrimidines (one-ring structures). Nucleotides are linked by **3'→5' phosphodiester bonds** between the 3'-OH of one sugar and the 5'-phosphate of the next, forming the sugar-phosphate backbone.

#### Watson-Crick Base Pairing
The two strands of DNA pair via **hydrogen bonds** between complementary bases: A pairs with T (two hydrogen bonds) and G pairs with C (three hydrogen bonds). The GC pair forms three hydrogen bonds and is thus more thermally stable — organisms adapted to high temperatures (thermophiles) have elevated GC content in their DNA. This specificity of base pairing is the molecular basis of information storage and transfer.

#### Antiparallel Orientation
The two strands run **antiparallel**: one 5'→3', the other 3'→5'. This means if you read one strand from 5' to 3', the complementary strand reads 3' to 5' in the same direction. This antiparallel arrangement has profound consequences for DNA replication — the two strands must be copied differently (leading vs. lagging).

#### B-form Helix Geometry
The standard B-form DNA helix (Watson-Crick) makes one complete turn every **10.4 base pairs**, with a rise of 0.34 nm per base pair. The helix has a **major groove** (wider, accessible to most DNA-binding proteins) and a **minor groove** (narrower). Transcription factors typically recognize specific base sequences in the major groove. Under cellular conditions, DNA also adopts A-form (in RNA-DNA hybrids) and Z-form (left-handed, in regions of alternating purines and pyrimidines) structures.

#### Review Questions
1. How many hydrogen bonds form between A-T and G-C base pairs? What does this mean for thermal stability?
2. Explain why the two DNA strands are described as "antiparallel."
3. A DNA sample has 30% G content. What percentage of each other base is present?

---

### DNA Replication: Mechanism and Enzymes
**Type:** Core Understanding
**Slug:** dna-replication-mechanism
**Estimated time:** 14 min
**Key concepts:** semiconservative · helicase · primase · DNA polymerase III · leading strand · lagging strand · Okazaki fragments
**Summary:** DNA replication is semiconservative, bidirectional, and requires a coordinated team of enzymes to copy each strand with high fidelity.

#### Semiconservative Replication
Meselson and Stahl (1958) demonstrated that DNA replication is **semiconservative**: each daughter double helix retains one parental strand and contains one newly synthesized strand. This was proven using ¹⁵N/¹⁴N isotope labeling and CsCl density gradient centrifugation — a classic experiment in molecular biology.

#### Initiation at Origins of Replication
Replication begins at specific sequences called **origins of replication (ori)**. Bacteria (like *E. coli*) have a single origin (oriC); eukaryotes have thousands of origins on each chromosome, allowing parallel replication. The **ORC (Origin Recognition Complex)** loads helicases, which are then activated to unwind DNA.

#### The Replication Fork Machinery
At each **replication fork**, a coordinated set of enzymes operates:
- **Helicase** (DnaB in prokaryotes): unwinds the double helix
- **SSBs (single-strand binding proteins)**: stabilize the single-stranded template
- **Topoisomerase I/II**: relieves positive supercoiling ahead of the fork
- **Primase**: synthesizes a short RNA primer (~10 nt) providing a 3'-OH for DNA polymerase
- **DNA Polymerase III** (prokaryotes) / **Pol ε and Pol δ** (eukaryotes): extends primers 5'→3' with high fidelity
- **DNA Polymerase I** (prokaryotes): removes RNA primers and fills gaps
- **DNA Ligase**: seals nicks between Okazaki fragments

#### Leading vs. Lagging Strand
DNA polymerase can only synthesize **5'→3'**. Since the two template strands are antiparallel, one is copied **continuously** (the **leading strand**, synthesized 5'→3' toward the fork) and the other in short segments called **Okazaki fragments** (~200 nt in eukaryotes, ~1000–2000 nt in bacteria) (the **lagging strand**). Each Okazaki fragment begins with an RNA primer, is extended by DNA Pol, and is later joined to the previous fragment after primer removal.

#### DNA Polymerase Fidelity and Proofreading
DNA Pol III has an error rate of ~1 per 10⁵ nucleotides before proofreading. Its **3'→5' exonuclease** (proofreading) activity removes mismatched bases immediately after insertion, improving accuracy to ~1 per 10⁷. Mismatch repair (MMR) after replication further reduces errors to ~1 per 10⁹ — remarkably accurate for a process copying 6 billion base pairs in every human cell division.

#### Review Questions
1. Describe the Meselson-Stahl experiment and how it proved semiconservative replication.
2. Why must the lagging strand be synthesized discontinuously?
3. In what direction does DNA polymerase synthesize new DNA, and why can't it synthesize in the opposite direction?

---

### DNA Repair Mechanisms
**Type:** Core Understanding
**Slug:** dna-repair-mechanisms
**Estimated time:** 12 min
**Key concepts:** base excision repair · nucleotide excision repair · mismatch repair · double-strand break repair · BRCA1/2
**Summary:** Cells maintain genomic integrity through multiple repair pathways targeting different types of DNA damage; failure leads to cancer.

#### Types of DNA Damage
DNA is damaged ~10,000–100,000 times per cell per day. Common damage types:
- **Oxidative damage**: 8-oxoguanine (misreads as adenine) from reactive oxygen species
- **UV damage**: thymine dimers from ultraviolet light (covalent bonds between adjacent thymines)
- **Alkylation**: methyl groups added to bases by carcinogens
- **Deamination**: cytosine spontaneously loses an amino group → becomes uracil
- **Double-strand breaks (DSBs)**: caused by ionizing radiation, reactive oxygen species, or replication errors — most dangerous

#### Base Excision Repair (BER)
BER handles small base modifications. A **DNA glycosylase** recognizes the damaged base and cleaves the glycosidic bond, creating an **AP site** (apurinic/apyrimidinic site). APE1 (AP endonuclease) cuts the backbone, and DNA polymerase β fills in using the complementary strand as a template. DNA ligase seals the nick.

#### Nucleotide Excision Repair (NER)
NER removes bulky DNA lesions (UV-induced thymine dimers, chemical adducts). A recognition complex detects the distortion, incises the DNA ~25–30 nucleotides on either side of the damage, and releases the oligonucleotide. DNA polymerase fills the gap; ligase seals. NER defects cause **Xeroderma pigmentosum (XP)** — extreme UV sensitivity and dramatically elevated skin cancer risk.

#### Mismatch Repair (MMR)
MMR corrects mismatches that escape DNA Pol's proofreading. MutS (or MSH2/6 in humans) recognizes the mismatch; MutL (MLH1) is recruited; the newly synthesized (incorrect) strand is excised and re-synthesized. MMR requires distinguishing the new strand from the template — in bacteria by methylation; in humans the mechanism is less clear but may use the strand-break from the replication fork. MMR mutations cause **Lynch syndrome** (hereditary nonpolyposis colorectal cancer, HNPCC).

#### Double-Strand Break Repair
DSBs are repaired by two major pathways:
1. **Homologous Recombination (HR)**: Uses the sister chromatid as a template — high fidelity but only available in S/G2 phase. BRCA1 and BRCA2 are critical for HR. Their mutation dramatically increases breast and ovarian cancer risk.
2. **Non-Homologous End Joining (NHEJ)**: Ligates broken ends directly — available throughout the cell cycle but error-prone (can create small insertions/deletions). Used in ~80% of DSB repair in mammals.

#### Review Questions
1. What type of DNA damage does NER repair, and what disease results from NER deficiency?
2. How does MMR distinguish the template from the newly synthesized strand in prokaryotes?
3. Why is loss of BRCA1 particularly dangerous in S and G2 phases?

---

### Telomeres and Telomerase
**Type:** Application
**Slug:** telomeres-telomerase
**Estimated time:** 10 min
**Key concepts:** telomere · end-replication problem · telomerase · TERT · shelterin · replicative senescence
**Summary:** Telomeres protect chromosome ends from degradation, and their progressive shortening with each division limits normal cell lifespan — while telomerase reactivation enables cancer cells to divide indefinitely.

#### The End-Replication Problem
DNA Pol can only extend an existing primer and synthesizes only 5'→3'. At the lagging strand template's 5' end, the last RNA primer cannot be replaced after removal — there is no upstream 3'-OH to extend. This causes progressive **telomere shortening** with each cell division: human cells lose ~50–200 bp of telomeric sequence per division.

#### Telomere Structure and Protection
Telomeres are repetitive sequences (TTAGGG in humans, repeated ~1000–2000 times) capping chromosome ends. They form **T-loops** where the 3' single-stranded overhang folds back and invades the double-stranded telomere, protected by the **shelterin** complex (TRF1, TRF2, POT1, and others). Shelterin prevents telomeres from being recognized as double-strand breaks — without it, chromosome end-to-end fusions occur.

#### Telomerase: The Reverse Transcriptase
**Telomerase** is a ribonucleoprotein reverse transcriptase that uses its own internal RNA template (TERC) to extend the 3' telomeric overhang. The catalytic subunit is **TERT** (telomerase reverse transcriptase). After extension, primase and DNA Pol fill in the complementary strand. Telomerase is active in stem cells, germ cells, and most cancer cells, allowing them to maintain telomere length and replicate indefinitely.

#### Telomere Shortening, Senescence, and Cancer
In normal somatic cells, telomere shortening limits cells to ~50–70 divisions (**Hayflick limit**). Critically short telomeres activate p53 and Rb, inducing **replicative senescence** — permanent cell cycle arrest. Cells that bypass senescence (p53/Rb loss) eventually undergo **crisis** — massive genomic instability from chromosome fusions and breakages. If telomerase is reactivated during crisis, a cancer cell emerges with stable (if short) telomeres and unlimited replicative potential. Telomerase is active in ~90% of human cancers.

#### Review Questions
1. Why does the lagging strand template lose sequence at its 5' end with each replication cycle?
2. How does the T-loop structure protect chromosome ends from triggering DNA damage responses?
3. Why does telomerase reactivation contribute to cancer while normal senescence is tumor-suppressive?

---

## Subtopic: Transcription (DNA → mRNA)

### Transcription: Initiation, Elongation, Termination
**Type:** Core Understanding
**Slug:** transcription-initiation-elongation-termination
**Estimated time:** 13 min
**Key concepts:** RNA polymerase II · promoter · TATA box · transcription factors · pre-mRNA · 5' cap · poly-A tail
**Summary:** RNA polymerase II transcribes protein-coding genes in three stages, producing a pre-mRNA that is extensively processed before export from the nucleus.

#### Promoters and Transcription Initiation
Transcription of protein-coding genes in eukaryotes requires **RNA Polymerase II (RNAP II)** and a set of **general transcription factors (GTFs)**. The promoter region contains key elements:
- **TATA box** (~–30): recognized by TBP (TATA-binding protein), part of TFIID
- **Initiator element (Inr)**: marks the transcription start site
- **BRE, DPE**: other core promoter elements

GTFs (TFIID, TFIIB, TFIIF, TFIIE, TFIIH) assemble at the promoter in a defined order, forming the **pre-initiation complex (PIC)**. TFIIH uses its helicase activity to unwind DNA and its kinase activity to phosphorylate the **CTD** (C-terminal domain) of RNAP II, releasing it to begin elongation.

#### Elongation and Co-transcriptional Processing
During elongation, RNAP II moves 3'→5' along the template strand, synthesizing RNA 5'→3'. While elongation proceeds, co-transcriptional processing occurs:
1. **5' capping**: A 7-methylguanosine cap is added to the 5' end shortly after transcription begins; protects mRNA from exonuclease degradation and is recognized by ribosomes
2. **Splicing**: Introns are removed as the RNAP II transcribes them (coupled to transcription via the CTD)
3. **3' processing**: Cleavage and polyadenylation at the poly-A signal (AAUAAA); poly-A polymerase adds ~200 adenosines

#### Termination
In eukaryotes, transcription termination is coupled to cleavage at the poly-A site. After cleavage, RNAP II continues transcribing; the new 5' end of the downstream RNA is degraded by XRN2 (torpedo model), which eventually catches the polymerase and dislodges it.

#### Bacterial Transcription: Key Differences
In bacteria, a single RNA polymerase (core enzyme + sigma factor) handles all transcription. The sigma (σ) factor recognizes the promoter (–10 and –35 elements); different sigma factors allow global transcription switching in response to stress. Bacterial mRNA is **not capped or polyadenylated** and is often translated while still being transcribed — no nucleus means no spatial separation of transcription and translation.

#### Review Questions
1. What is the TATA box, and which protein recognizes it during transcription initiation?
2. Describe the three co-transcriptional processing events that occur to pre-mRNA.
3. How does bacterial transcription differ from eukaryotic transcription at the level of mRNA processing?

---

### RNA Splicing and Alternative Splicing
**Type:** Application
**Slug:** rna-splicing-alternative-splicing
**Estimated time:** 12 min
**Key concepts:** intron · exon · spliceosome · snRNP · lariat · alternative splicing · proteome diversity
**Summary:** The spliceosome removes introns from pre-mRNA via a two-step transesterification, and alternative splicing allows one gene to produce multiple protein isoforms.

#### The Spliceosome: A Molecular Machine
Pre-mRNA splicing is catalyzed by the **spliceosome**, a 3–5 MDa ribonucleoprotein complex containing five **snRNPs** (small nuclear ribonucleoproteins): U1, U2, U4, U5, U6, each containing snRNA and associated proteins. Introns are defined by conserved splice site sequences: the 5' splice site (GU), the 3' splice site (AG), and the branch point (YNYURAY, with the critical branch-point A ~20–50 nt upstream of the 3' splice site).

#### Two-Step Splicing Mechanism
1. **Step 1**: The 2'-OH of the branch-point adenosine attacks the 5' splice site (transesterification), releasing the exon and forming a lariat (loop) structure where the intron folds back on itself
2. **Step 2**: The free 3'-OH of exon 1 attacks the 3' splice site, joining the two exons and releasing the lariat intron, which is debranched and degraded

The snRNAs participate directly in catalysis — U2 and U6 snRNAs form the active site — making the spliceosome a ribozyme-like machine.

#### Alternative Splicing Multiplies Proteome Diversity
Alternative splicing allows a single gene to produce multiple protein isoforms by including or skipping different exons. ~95% of human multi-exon genes are alternatively spliced. The **DSCAM** gene in *Drosophila* can produce >38,000 isoforms by alternative splicing — used for neuronal self-avoidance. The human **tropomyosin** gene produces different isoforms in muscle vs. non-muscle cells. Alternative splicing is regulated by **SR proteins** (enhance splicing) and **hnRNPs** (inhibit splicing) that bind exonic/intronic splicing enhancers or silencers.

#### Splicing Mutations in Disease
Mutations that disrupt splice sites or alter splicing regulators cause disease. In **spinal muscular atrophy (SMA)**, survival motor neuron 1 gene (SMN1) mutations cause loss of SMN protein because an exon is skipped in the SMN2 paralog. **Nusinersen** (an antisense oligonucleotide drug) corrects SMN2 splicing to include exon 7, restoring SMN protein — a triumph of splicing biology applied to therapy.

#### Review Questions
1. What are the three conserved intron sequences required for spliceosome recognition?
2. Explain why the spliceosome is considered catalytic despite being primarily a protein complex.
3. How does alternative splicing contribute to proteome diversity beyond what genome size suggests?

---

## Subtopic: Translation (mRNA → Protein) & the Genetic Code

### The Genetic Code and Codon Usage
**Type:** Core Understanding
**Slug:** genetic-code-codon-usage
**Estimated time:** 12 min
**Key concepts:** codon · anticodon · wobble position · degeneracy · start codon · stop codon · reading frame
**Summary:** The genetic code is a triplet, non-overlapping, degenerate code in which 61 sense codons specify 20 amino acids and 3 stop codons terminate translation.

#### Properties of the Genetic Code
The genetic code translates mRNA into protein via triplet **codons** (three-nucleotide sequences). Key properties:
- **Triplet**: each codon consists of three nucleotides
- **Non-overlapping**: each nucleotide belongs to only one codon
- **Comma-free**: no spacers between codons
- **Degenerate (redundant)**: 64 codons for only 20 amino acids + 3 stops; most amino acids have multiple codons (synonymous codons)
- **Universal**: the same code operates in virtually all life (minor exceptions in mitochondria and some protists)

#### Start and Stop Codons
- **AUG** is the universal start codon, encoding **methionine**; it sets the reading frame
- **UAA, UAG, UGA** are stop codons (recognized by release factors, not tRNAs)
- No amino acid is encoded by stop codons in the standard code

#### Wobble Base Pairing
Codon degeneracy is partly explained by **wobble** at the third codon position: the anticodon's first nucleotide can pair less stringently with the codon's third nucleotide. For example, inosine (modified adenosine) at the anticodon first position can pair with U, C, or A at the codon third position. This allows one tRNA to recognize multiple synonymous codons, reducing the number of tRNA species needed.

#### Reading Frame and Frameshift Mutations
The reading frame is set by the start codon AUG. **Frameshift mutations** (insertions or deletions not in multiples of 3) shift the reading frame, producing a completely different (and usually nonfunctional) protein downstream. Triplet repeat expansions (e.g., Huntington's disease CAG repeats) are not frameshifts but cause polyglutamine tracts that misfold proteins.

#### Review Questions
1. What does "degenerate" mean in the context of the genetic code? Give an example.
2. How does wobble base pairing reduce the required number of tRNA molecules?
3. A single base insertion occurs at codon 50 of a 200-codon gene. How does this affect codons 51–200?

---

### Ribosomes and the Mechanism of Translation
**Type:** Core Understanding
**Slug:** ribosomes-translation-mechanism
**Estimated time:** 13 min
**Key concepts:** ribosome · A site · P site · E site · tRNA · aminoacyl-tRNA synthetase · peptidyl transferase · EF-Tu
**Summary:** Ribosomes translate the mRNA codon by codon, with the A, P, and E sites coordinating tRNA entry, peptide bond formation, and tRNA exit.

#### Ribosome Structure
Ribosomes consist of a large and small subunit. In prokaryotes: 70S (50S + 30S); in eukaryotes: 80S (60S + 40S). The small subunit (30S/40S) contains the **decoding center** where codon-anticodon matching occurs. The large subunit (50S/60S) contains the **peptidyl transferase center (PTC)** — a ribozyme (23S rRNA catalyzes peptide bond formation, not protein). The ribosome has three tRNA binding sites: **A (aminoacyl)**, **P (peptidyl)**, and **E (exit)**.

#### Initiation (Eukaryotic)
Initiation begins with the 43S pre-initiation complex (40S + initiator tRNA + eIFs). The complex scans the 5' UTR from the 5' cap until it encounters AUG (the Kozak sequence context determines efficiency of recognition). The 60S subunit joins after eIF5B-mediated GTP hydrolysis. The initiator Met-tRNA is positioned at the P site with AUG in the A site.

#### Elongation Cycle
1. **Decoding**: Aminoacyl-tRNA delivered to the A site by **EF-Tu** (bound to GTP); correct codon-anticodon matching triggers GTP hydrolysis and EF-Tu release
2. **Peptide bond formation**: PTC catalyzes transfer of the growing peptide from P-site tRNA to the A-site amino acid (aminolysis reaction)
3. **Translocation**: **EF-G** (GTP-dependent) shifts the ribosome 3 nucleotides (one codon) in the 5'→3' direction; A-site tRNA moves to P site, P-site tRNA to E site, E-site tRNA released
Repeat: ~15–20 amino acids added per second in bacteria; ~2–5 per second in eukaryotes.

#### Termination and Recycling
When a stop codon enters the A site, **release factors** (RF1/RF2 in prokaryotes, eRF1 in eukaryotes) bind instead of tRNA. They trigger peptidyl transferase to add water (hydrolysis) to the peptide, releasing the protein. Ribosome recycling factors disassemble the ribosome.

#### Review Questions
1. Which ribosomal site catalyzes peptide bond formation, and what is the catalyst?
2. Trace an amino acid from charging by aminoacyl-tRNA synthetase to incorporation into a growing peptide.
3. Why is the eukaryotic ribosome larger than the prokaryotic ribosome, and how does this matter for antibiotic targeting?

---

## Subtopic: Gene Regulation

### Prokaryotic Gene Regulation: The lac Operon
**Type:** Core Understanding
**Slug:** lac-operon-regulation
**Estimated time:** 12 min
**Key concepts:** operon · repressor · inducer · allolactose · CAP-cAMP · negative control · positive control
**Summary:** The lac operon exemplifies negative and positive transcriptional control — repressed in the absence of lactose and fully activated only when lactose is present and glucose is absent.

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

### Eukaryotic Transcriptional Regulation
**Type:** Core Understanding
**Slug:** eukaryotic-transcriptional-regulation
**Estimated time:** 13 min
**Key concepts:** transcription factor · enhancer · silencer · mediator · chromatin remodeling · activator · coactivator
**Summary:** Eukaryotic gene regulation is combinatorial and involves distant enhancers, chromatin modification, and multi-protein complexes that communicate with the basal transcription machinery.

#### Transcription Factors: Activators and Repressors
Sequence-specific **transcription factors (TFs)** bind enhancer or silencer sequences (often hundreds to thousands of base pairs from the promoter) and regulate RNAP II. Activators have two domains: a **DNA-binding domain** (DBD) that recognizes the sequence and an **activation domain** (AD) that contacts coactivators or the mediator. Classic DBD structures: zinc fingers, helix-turn-helix, leucine zipper, helix-loop-helix.

#### Enhancers, Silencers, and DNA Looping
**Enhancers** can activate transcription regardless of orientation or distance (thousands of bp away or even on a different chromosome in some cases). **Silencers** repress transcription. DNA loops bring enhancers into physical contact with promoters, mediated by architectural proteins like cohesin and CTCF. The **mediator complex** (~30 proteins) serves as a bridge between enhancer-bound TFs and the RNAP II pre-initiation complex.

#### Chromatin Remodeling
Eukaryotic DNA is wrapped around nucleosomes (histone octamers). Chromatin structure must be remodeled to allow TF and RNAP II access. Two major mechanisms:
1. **Histone modification**: Acetylation of lysines (by HATs) neutralizes positive charge, loosening DNA-histone contacts → **active chromatin** (euchromatin). Deacetylation (HDACs) → **repressive chromatin** (heterochromatin). Methylation of H3K4me3 marks active promoters; H3K27me3 marks silenced genes.
2. **ATP-dependent chromatin remodeling**: SWI/SNF complex uses ATP hydrolysis to slide or evict nucleosomes, exposing DNA.

#### Combinatorial Control
No single TF determines a cell's identity — rather, a specific **combination** of TFs acts together. MyoD (muscle identity TF) activates muscle-specific genes only in cells expressing the right co-factors. This combinatorial logic explains how ~2,000 TFs can specify 200+ cell types from the same genome.

#### Review Questions
1. How does an enhancer 10 kb upstream activate a promoter, given that the molecules must physically interact?
2. Distinguish histone acetylation from histone methylation in terms of effect on transcription.
3. A mutation deletes the activation domain of a transcription factor but not the DNA-binding domain. Predict the effect on target gene expression.

---

### Epigenetic Regulation and Chromatin
**Type:** Application
**Slug:** epigenetic-regulation-chromatin
**Estimated time:** 12 min
**Key concepts:** epigenetics · DNA methylation · histone code · CpG islands · X-inactivation · genomic imprinting
**Summary:** Epigenetic modifications to DNA and histones regulate gene expression without changing the DNA sequence, and can be inherited through cell divisions.

#### DNA Methylation
In mammals, **DNA methyltransferases (DNMTs)** add methyl groups to cytosines in CpG dinucleotides. Heavily methylated regions → gene silencing (methylated promoters recruit methyl-CpG binding proteins that recruit HDACs). **CpG islands** — GC-rich regions at promoters of ~60% of human genes — are normally unmethylated, keeping housekeeping genes active. Cancer cells often show **hypermethylation of CpG islands** at tumor suppressor promoters, silencing them epigenetically. **DNMT inhibitors** (azacytidine) are used clinically to reactivate silenced tumor suppressors.

#### X-Chromosome Inactivation
Female mammals (XX) silence one X chromosome in each cell during early development — **X-inactivation (lyonization)**. The choice of which X to inactivate is random and then stably inherited by daughter cells. The **XIST** gene (on the inactive X) produces a long non-coding RNA that coats the X chromosome in cis and recruits repressive complexes (PRC2), triggering H3K27me3 and DNA methylation. The inactive X becomes the **Barr body** — visible as a dense chromatin mass.

#### Genomic Imprinting
Some genes are expressed only from the maternal or paternal allele, depending on which parent contributed it — this is **genomic imprinting**. Expression is controlled by differential methylation established in the germline. Loss of imprinting causes disease: **Prader-Willi syndrome** results from loss of paternal 15q11-q13 (normally the only expressed copy); **Angelman syndrome** from loss of maternal 15q11-q13. Both syndromes involve the same chromosomal region but produce completely different phenotypes because different imprinted genes are lost.

#### Transgenerational Epigenetic Inheritance
Unlike DNA mutations, epigenetic marks are largely erased and re-established during germline development. However, some marks may escape erasure and be transmitted to offspring. The Dutch Hunger Winter studies suggest that grandchildren of famine survivors have altered metabolic epigenetic marks — though the mechanism in humans remains debated.

#### Review Questions
1. Why are CpG islands normally unmethylated at housekeeping gene promoters?
2. How does X-inactivation explain the calico coat pattern in cats?
3. Explain why Prader-Willi and Angelman syndromes can both result from deletions of the same chromosomal region.

---

## Subtopic: Biotechnology & Genetic Engineering

### PCR: Polymerase Chain Reaction
**Type:** Core Understanding
**Slug:** pcr-polymerase-chain-reaction
**Estimated time:** 12 min
**Key concepts:** PCR · primer · Taq polymerase · denaturation · annealing · extension · exponential amplification
**Summary:** PCR amplifies specific DNA sequences exponentially using thermostable DNA polymerase and short primers, enabling detection and analysis of minute DNA quantities.

#### PCR Principle and Components
**PCR (Polymerase Chain Reaction)**, invented by Kary Mullis (Nobel Prize, 1993), amplifies a target DNA sequence exponentially. Components:
- **Template DNA**: the target sequence
- **Primers**: two short (~20 nt) oligonucleotides flanking the target, one complementary to each strand
- **Taq polymerase**: thermostable DNA Pol from *Thermus aquaticus* (survives 95°C denaturation step); extends primers 5'→3'
- **dNTPs**: deoxynucleotide triphosphates (the building blocks)
- **Buffer with Mg²⁺**: Mg²⁺ is essential cofactor for Taq

#### Three Thermal Cycling Steps
Each PCR cycle has three steps:
1. **Denaturation** (~95°C): Heat separates the double-stranded template
2. **Annealing** (~50–65°C, depends on primer Tm): Primers bind their complementary sequences on single-stranded template
3. **Extension** (~72°C, optimal for Taq): Taq extends each primer, synthesizing a new strand from 5'→3'

After n cycles: 2ⁿ copies of the target region. 30 cycles → >10⁹-fold amplification.

#### Applications of PCR
- **Diagnostic PCR**: detecting viral DNA (COVID-19 RT-PCR detects SARS-CoV-2 RNA by first reverse-transcribing to cDNA)
- **Forensic DNA fingerprinting**: STR analysis using PCR
- **Cloning**: amplifying genes for insertion into vectors
- **Mutagenesis**: site-directed mutagenesis using primers with mismatches
- **Quantitative PCR (qPCR)**: measures mRNA expression levels by amplifying cDNA with a fluorescent reporter (SYBR Green or TaqMan probe)

#### Review Questions
1. Why is Taq polymerase essential for PCR rather than a standard DNA polymerase?
2. Starting with 1 template molecule, how many copies are produced after 30 PCR cycles?
3. A lab wants to detect HIV in a patient's blood. They have no viral DNA — only RNA. How would they modify PCR to detect the virus?

---

### CRISPR-Cas9: Genome Editing
**Type:** Application
**Slug:** crispr-cas9-genome-editing
**Estimated time:** 13 min
**Key concepts:** CRISPR · Cas9 · guide RNA · PAM · DSB · HDR · NHEJ · therapeutic applications
**Summary:** CRISPR-Cas9 uses guide RNA to direct the Cas9 nuclease to specific genomic sequences, enabling precise genome editing for research and therapy.

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

### Gel Electrophoresis and DNA Analysis
**Type:** Application
**Slug:** gel-electrophoresis-dna-analysis
**Estimated time:** 10 min
**Key concepts:** gel electrophoresis · agarose · ethidium bromide · DNA ladder · Southern blot · restriction enzyme
**Summary:** Gel electrophoresis separates DNA fragments by size under an electric field, forming the basis of DNA fingerprinting, Southern blotting, and restriction analysis.

#### Principle of Gel Electrophoresis
DNA is negatively charged (phosphate backbone) and migrates toward the positive electrode in an electric field. In an **agarose gel**, smaller fragments migrate faster through the pores; larger fragments are impeded. Fragments are separated by size and visualized with **ethidium bromide** (intercalates between bases, fluoresces under UV) or safer alternatives (SYBR Green). A **DNA ladder** (molecular weight marker with known-size fragments) is run alongside to estimate fragment sizes.

#### Restriction Fragment Length Polymorphism (RFLP)
**Restriction enzymes** cut DNA at specific sequences. Different individuals have different restriction site patterns (RFLPs), producing different fragment sizes on a gel — the basis of early DNA fingerprinting. **Southern blotting** extends this: after gel electrophoresis, DNA is transferred to a membrane and probed with a labeled oligonucleotide to detect specific sequences among many fragments.

#### STR Analysis: Modern DNA Fingerprinting
Short tandem repeat (STR) analysis PCR-amplifies regions with variable numbers of tandem repeats, producing fragments of different sizes in different individuals. Capillary electrophoresis (automated gel) separates the fragments. The probability that two unrelated individuals share the same STR profile at 13+ loci is ~1 in 10¹⁵ — the basis of forensic DNA profiling used in criminal cases and paternity testing.

#### Review Questions
1. Why does a small DNA fragment migrate farther than a large one in gel electrophoresis?
2. What is Southern blotting, and how does it extend beyond gel electrophoresis?
3. Why does STR analysis require PCR as a first step before electrophoresis?

---

## Subtopic: Viruses & Viral Replication

### Virus Structure and Classification
**Type:** Core Understanding
**Slug:** virus-structure-classification
**Estimated time:** 11 min
**Key concepts:** capsid · envelope · tropism · bacteriophage · DNA virus · RNA virus · retrovirus
**Summary:** Viruses are non-living acellular entities defined by their nucleic acid type, capsid architecture, and presence or absence of a lipid envelope, which determines host range and replication strategy.

#### What Is a Virus?
Viruses are **obligate intracellular parasites** — they cannot replicate without a host cell. A virion (complete viral particle) consists of: (1) a nucleic acid genome (DNA or RNA, single- or double-stranded, linear or circular), (2) a **capsid** (protein coat), and optionally (3) a **lipid envelope** derived from the host cell membrane, with viral spike proteins embedded. Viruses are not cells: they have no ribosomes, no metabolic machinery, and cannot generate ATP — they hijack the host's.

#### Classification Framework
Viruses are classified by:
- **Genome type**: DNA (dsDNA, ssDNA) or RNA (dsRNA, +ssRNA, -ssRNA, ssRNA-RT)
- **Capsid symmetry**: helical (TMV, rabies), icosahedral (adenovirus, polio), complex (poxvirus, T4 phage)
- **Envelope**: enveloped (HIV, influenza, herpes) or non-enveloped (polio, adenovirus, rotavirus)

Baltimore Classification groups viruses by how they produce mRNA: Class I (dsDNA), II (ssDNA), III (dsRNA), IV (+ssRNA), V (-ssRNA), VI (ssRNA-RT, retroviruses), VII (dsDNA-RT, hepadnaviruses).

#### Viral Tropism
A virus's host range is determined by **receptor compatibility** — the viral surface protein must bind a specific receptor on the host cell. HIV's gp120 binds CD4 on helper T cells (and CCR5 or CXCR4 co-receptors). Influenza hemagglutinin binds sialic acid (α-2,3 linkage in birds; α-2,6 in humans). Receptor specificity explains both tissue tropism (which cell types get infected) and species tropism.

#### Review Questions
1. What three components define a complete virion?
2. Why are enveloped viruses generally more sensitive to disinfectants than non-enveloped viruses?
3. How does receptor specificity explain why some influenza strains infect only birds?

---

### Lytic vs. Lysogenic Cycles in Bacteriophage
**Type:** Core Understanding
**Slug:** lytic-lysogenic-cycles
**Estimated time:** 12 min
**Key concepts:** lytic cycle · lysogenic cycle · prophage · lambda phage · CI repressor · SOS response · induction
**Summary:** Bacteriophages can follow a lytic cycle (immediate host destruction) or integrate as a prophage in the lysogenic cycle, remaining dormant until induced.

#### The Lytic Cycle: Viral Takeover
In the **lytic cycle** (λ phage, T4 phage), the phage immediately redirects host machinery to replicate. Steps: (1) Adsorption — phage binds host receptor; (2) Injection — viral DNA enters; (3) Biosynthesis — host RNAP transcribes early genes (DNA replication) then late genes (capsid, tail proteins); (4) Assembly — new virions formed; (5) Lysis — phage holin creates holes in membrane, lysozyme degrades peptidoglycan, releasing ~100–1000 new phages. Host cell dies.

#### The Lysogenic Cycle: Silent Integration
In the **lysogenic cycle**, phage DNA integrates into the host chromosome as a **prophage** (λ phage at the *att* site). The **CI repressor** (λ repressor) is produced and represses all lytic genes — the phage is silent and replicated along with the host genome. Bacteria carrying a prophage are **lysogenic** and may acquire new properties from prophage genes (e.g., toxin genes in *V. cholerae*, *S. pyogenes*, and *C. diphtheriae* — pathogenicity islands).

#### Induction: Switching to Lytic
DNA damage triggers the bacterial **SOS response**: RecA protein is activated, gains protease activity, and cleaves the CI repressor. Without CI, lytic genes are derepressed and the phage enters the lytic cycle. This is why DNA-damaging antibiotics (like fluoroquinolones) can sometimes worsen infections with lysogenic bacteria by inducing toxin-producing phages.

#### Review Questions
1. Compare the lytic and lysogenic cycles in terms of host survival and viral reproduction timing.
2. Why does UV irradiation cause induction of lysogenic phages?
3. How can a prophage make a normally harmless bacterium pathogenic?

---

### HIV and Retroviral Replication
**Type:** Application
**Slug:** hiv-retroviral-replication
**Estimated time:** 12 min
**Key concepts:** retrovirus · reverse transcriptase · integrase · provirus · HAART · CD4 · tropism
**Summary:** HIV is a retrovirus that reverse-transcribes its RNA genome into DNA and integrates it as a provirus, establishing a permanent reservoir that current antiretroviral drugs cannot eradicate.

#### HIV Structure and Entry
HIV (Human Immunodeficiency Virus) is an enveloped +ssRNA retrovirus. Its surface glycoproteins: **gp120** (binds CD4 + CCR5/CXCR4 co-receptor on T helper cells and macrophages) and **gp41** (mediates membrane fusion). Entry is a two-step process: gp120 binding to CD4 causes conformational change exposing the co-receptor binding site; co-receptor binding triggers gp41 to fold (six-helix bundle), fusing viral and cellular membranes. CCR5 antagonist maraviroc blocks this step.

#### Reverse Transcription and Integration
HIV's genome is two copies of +ssRNA. After entry, **reverse transcriptase (RT)** (an RNA-dependent DNA polymerase) synthesizes a DNA-RNA hybrid, degrades the RNA (RNase H activity), and synthesizes double-stranded DNA. RT lacks proofreading → error rate ~1 per 10⁴ bases → high mutation rate → rapid emergence of drug resistance. The dsDNA is imported into the nucleus and integrated into the host chromosome by **integrase** as a **provirus** — permanent, flanked by long terminal repeats (LTRs).

#### From Provirus to New Virions
Proviral DNA is transcribed by host RNAP II when the cell is activated (NF-κB activates LTR promoter). Viral RNA is exported, translated by host ribosomes, and processed by **viral protease** (cleaves Gag-Pol polyprotein into mature proteins). New virions bud from the cell surface. Antiretroviral drugs target: RT (NRTIs, NNRTIs), integrase (INSTIs), protease (PIs), and entry (fusion inhibitors, CCR5 antagonists).

#### HAART and the Latent Reservoir
**HAART (Highly Active Antiretroviral Therapy)** combining 3+ drugs from different classes suppresses HIV to undetectable levels in blood. However, resting memory CD4+ T cells harbor integrated proviruses that are transcriptionally silent — invisible to the immune system and HAART. This **latent reservoir** is the barrier to cure. Strategies include "shock and kill" (reactivate latent virus to expose it to immune killing) and gene editing (CRISPR to excise proviral DNA).

#### Review Questions
1. Why does HIV's high reverse transcriptase error rate matter for treatment?
2. What makes a CD4+ T cell a target for HIV — give the specific molecular interactions.
3. Explain why HAART can reduce viral load to undetectable levels but cannot cure HIV.

---

### Viral Replication Bowl Prep
**Type:** Competition Extension
**Slug:** viral-replication-bowl-prep
**Estimated time:** 6 min
**Key concepts:** lytic · lysogenic · retrovirus · reverse transcriptase · integration · CRISPR
**Summary:** High-yield virology facts for Science Bowl competition.

#### Must-Know Virology Facts
- **Retroviruses** have RNA genomes and use **reverse transcriptase** to make DNA
- **HIV** uses gp120 + CD4 + CCR5/CXCR4 for entry
- **Lysogenic cycle** produces a **prophage** (DNA integrated into host chromosome)
- **Lytic cycle**: host cell lysed, ~100–1000 virions released
- **Bacteriophage lambda** can follow both cycles; CI repressor maintains lysogeny
- **Taq polymerase** is from *Thermus aquaticus* — essential for PCR
- **CRISPR-Cas9**: sgRNA targets Cas9 to specific DNA; Cas9 requires PAM (NGG)
- **Gel electrophoresis**: smaller DNA migrates faster; visualized with ethidium bromide

#### Sample Toss-Ups
*"For 10 points — name the enzyme encoded by retroviruses that synthesizes DNA from an RNA template."*
**Answer: reverse transcriptase**

*"For 10 points — in the bacteriophage lambda lysogenic cycle, name the viral protein that represses lytic genes."*
**Answer: CI repressor (lambda repressor)**

*"For 10 points — name the protein component of CRISPR-Cas9 that provides sequence specificity for genome targeting."*
**Answer: guide RNA (sgRNA / single guide RNA)**

#### Review Questions
1. Distinguish a retrovirus from a DNA virus in terms of genome type and replication strategy.
2. What triggers induction of a lambda prophage from lysogeny to lytic cycle?
3. Why is the integration of HIV proviral DNA into CD4+ T cells clinically significant?
