import { StudyCategory, StudyTopic, LabTechnique } from '../types/microbiology';

export const STUDY_CATEGORIES: StudyCategory[] = [
  {
    id: 'bacteriology',
    name: 'Bacteriology',
    marathiName: 'जीवाणूशास्त्र',
    hindiName: 'जीवाणु विज्ञान',
    icon: '🦠',
    description: 'Bacterial cell anatomy, Gram staining, growth curve, endospores & metabolism',
    topicCount: 4,
  },
  {
    id: 'virology',
    name: 'Virology',
    marathiName: 'विषाणूशास्त्र',
    hindiName: 'विषाणु विज्ञान',
    icon: '🧬',
    description: 'Viral capsid symmetry, genomes, replication cycles & bacteriophages',
    topicCount: 3,
  },
  {
    id: 'mycology',
    name: 'Mycology',
    marathiName: 'कवकशास्त्र',
    hindiName: 'कवक विज्ञान',
    icon: '🍄',
    description: 'Yeasts, molds, dimorphic fungi, mycotoxins & fungal culturing',
    topicCount: 3,
  },
  {
    id: 'parasitology',
    name: 'Parasitology',
    marathiName: 'परजीवीशास्त्र',
    hindiName: 'परजीवी विज्ञान',
    icon: '🪱',
    description: 'Protozoa, helminths, life cycles of Plasmodium & Entamoeba',
    topicCount: 3,
  },
  {
    id: 'immunology',
    name: 'Immunology',
    marathiName: 'प्रतिकारशक्तीशास्त्र',
    hindiName: 'प्रतिरक्षा विज्ञान',
    icon: '🛡️',
    description: 'Innate/adaptive immunity, immunoglobulins, ELISA & antigens',
    topicCount: 4,
  },
  {
    id: 'genetics',
    name: 'Microbial Genetics',
    marathiName: 'सूक्ष्मजीव जनुकशास्त्र',
    hindiName: 'माइक्रोबियल जेनेटिक्स',
    icon: '🔬',
    description: 'Transformation, conjugation, transduction, operons & plasmids',
    topicCount: 3,
  },
  {
    id: 'physiology',
    name: 'Microbial Physiology',
    marathiName: 'सूक्ष्मजीव शरीरक्रियाशास्त्र',
    hindiName: 'माइक्रोबियल फिजियोलॉजी',
    icon: '⚡',
    description: 'Fermentation, cellular respiration, oxygen requirements & extremophiles',
    topicCount: 3,
  },
  {
    id: 'medical',
    name: 'Medical Microbiology',
    marathiName: 'वैद्यकीय सूक्ष्मजीवशास्त्र',
    hindiName: 'चिकित्सा सूक्ष्मजीव विज्ञान',
    icon: '🏥',
    description: 'Pathogenicity, hospital-acquired infections & antimicrobial resistance',
    topicCount: 3,
  },
  {
    id: 'food',
    name: 'Food Microbiology',
    marathiName: 'अन्न सूक्ष्मजीवशास्त्र',
    hindiName: 'खाद्य सूक्ष्मजीव विज्ञान',
    icon: '🧀',
    description: 'Pasteurization, fermentation, food spoilage & foodborne pathogens',
    topicCount: 3,
  },
  {
    id: 'industrial',
    name: 'Industrial Microbiology',
    marathiName: 'औद्योगिक सूक्ष्मजीवशास्त्र',
    hindiName: 'औद्योगिक सूक्ष्मजीव विज्ञान',
    icon: '🏭',
    description: 'Bioreactors, fermentation kinetics, penicillin production & downstream processing',
    topicCount: 3,
  },
  {
    id: 'environmental',
    name: 'Environmental Microbiology',
    marathiName: 'पर्यावरण सूक्ष्मजीवशास्त्र',
    hindiName: 'पर्यावरण सूक्ष्मजीव विज्ञान',
    icon: '🌱',
    description: 'Bioremediation, nitrogen cycle, biofertilizers & wastewater microbiology',
    topicCount: 3,
  },
  {
    id: 'biotechnology',
    name: 'Biotechnology',
    marathiName: 'जैवतंत्रज्ञान',
    hindiName: 'जैव प्रौद्योगिकी',
    icon: '🧪',
    description: 'Recombinant DNA, cloning vectors, restriction endonucleases & CRISPR-Cas',
    topicCount: 3,
  },
  {
    id: 'molecular',
    name: 'Molecular Biology',
    marathiName: 'आण्विक जीवशास्त्र',
    hindiName: 'आणविक जीव विज्ञान',
    icon: '🧩',
    description: 'PCR, agarose gel electrophoresis, Central Dogma & sequencing',
    topicCount: 3,
  },
  {
    id: 'bioinformatics',
    name: 'Bioinformatics',
    marathiName: 'जैवमाहितीशास्त्र',
    hindiName: 'जैव सूचना विज्ञान',
    icon: '💻',
    description: '16S rRNA gene identification, BLAST, sequence alignments & phylogenetics',
    topicCount: 2,
  },
];

export const STUDY_TOPICS: StudyTopic[] = [
  {
    id: 'bacterial-cell-wall',
    categoryId: 'bacteriology',
    title: 'Bacterial Cell Wall & Gram Differentiation',
    marathiTitle: 'जिवाणू पेशीभित्तिका आणि ग्रॅम वर्गीकरण',
    hindiTitle: 'जीवाणु कोशिका भित्ति और ग्राम विभेदीकरण',
    overview: 'The bacterial cell wall is a rigid layer composed of peptidoglycan (murein) that prevents osmotic lysis and confers structural shape. It forms the foundational basis for Christian Gram\'s differential staining technique separating Gram-positive from Gram-negative bacteria.',
    detailedNotes: [
      'Peptidoglycan polymer consists of alternating units of N-acetylglucosamine (NAG) and N-acetylmuramic acid (NAM) linked by β-1,4-glycosidic bonds.',
      'Tetrapeptide side chains attached to NAM are cross-linked either directly (in Gram-negative) or via pentaglycine peptide bridges (in Gram-positive Staphylococcus aureus).',
      'Gram-positive cell wall possesses thick peptidoglycan (20-80 nm, 40+ layers) with embedded teichoic and lipoteichoic acids, functioning in cation transport and antigenicity.',
      'Gram-negative cell wall features a thin peptidoglycan layer (2-7 nm) enclosed by an asymmetrical outer membrane containing Lipopolysaccharide (LPS / endotoxin, composed of Lipid A, core polysaccharide, and O-antigen).',
      'The periplasmic space in Gram-negative bacteria contains hydrolytic enzymes, binding proteins, and beta-lactamases, serving crucial metabolic and defensive roles.'
    ],
    definitions: [
      { term: 'Peptidoglycan', definition: 'A mesh-like polymer of amino acids and sugars (NAG and NAM) forming the rigid bacterial cell wall.' },
      { term: 'Teichoic Acid', definition: 'Poly-glycerol or poly-ribitol phosphate polymers found in Gram-positive cell walls acting as surface antigens and regulating autolysins.' },
      { term: 'Lipopolysaccharide (LPS)', definition: 'The major structural component of Gram-negative outer membrane consisting of endotoxic Lipid A and immune-stimulating O-antigen.' },
      { term: 'Periplasm', definition: 'The gel-filled compartment between the inner plasma membrane and outer membrane in Gram-negative bacteria.' }
    ],
    keyPoints: [
      'Thick peptidoglycan traps Crystal Violet-Iodine complex upon decolorization in Gram-positive bacteria.',
      'Acetone/alcohol dissolves outer membrane lipids and creates pores in thin Gram-negative wall, causing CV-I to wash away; counterstain Safranin colors them pink.',
      'Lysozyme specifically hydrolyzes β-1,4-glycosidic bonds between NAG and NAM.',
      'Penicillin inhibits transpeptidase enzyme preventing peptidoglycan cross-linking.'
    ],
    comparisonTable: {
      title: 'Gram-Positive vs. Gram-Negative Cell Wall',
      headers: ['Feature', 'Gram-Positive Bacteria', 'Gram-Negative Bacteria'],
      rows: [
        ['Peptidoglycan thickness', 'Thick (20-80 nm, multi-layered)', 'Thin (2-7 nm, single/dual layered)'],
        ['Teichoic / Lipoteichoic acids', 'Present', 'Absent'],
        ['Outer Membrane', 'Absent', 'Present (bilayer with LPS)'],
        ['Lipopolysaccharide (LPS)', 'None', 'Abundant (Lipid A endotoxin)'],
        ['Periplasmic space', 'Narrow or indistinct', 'Prominent (12-15 nm)'],
        ['Susceptibility to Penicillin/Lysozyme', 'High', 'Low (outer membrane barrier)'],
        ['Gram Stain Color', 'Deep Violet / Purple', 'Pink / Red']
      ]
    },
    twoMarkAnswers: [
      {
        question: 'Name the two alternating amino sugars present in bacterial peptidoglycan.',
        answer: 'N-acetylglucosamine (NAG) and N-acetylmuramic acid (NAM), covalently connected by β-1,4-glycosidic bonds.'
      },
      {
        question: 'What is the function of teichoic acid in Gram-positive bacteria?',
        answer: 'Teichoic acids provide cell wall rigidity, maintain negative surface charge, assist in binding magnesium/calcium ions, and serve as specific serological antigens.'
      }
    ],
    fiveMarkAnswers: [
      {
        question: 'Explain the mechanism of Gram staining in relation to bacterial cell wall structure.',
        answer: '1. Primary stain: Crystal Violet penetrates both cell types, coloring them violet.\n2. Mordant: Gram\'s Iodine forms an insoluble Crystal Violet-Iodine (CV-I) complex inside cells.\n3. Decolorization: 95% Ethyl alcohol or acetone acts on lipids. In Gram-negative bacteria, alcohol dissolves the lipid-rich outer membrane and increases permeability of the thin peptidoglycan layer, washing out the CV-I complex.\n4. In Gram-positive bacteria, alcohol dehydrates the thick multi-layered peptidoglycan, shrinking pores and trapping the large CV-I precipitate.\n5. Counterstain: Safranin enters decolorized Gram-negative cells, staining them pink/red, while Gram-positive remain purple.'
      }
    ],
    tenMarkAnswers: [
      {
        question: 'Describe in detail the molecular architecture of Gram-positive and Gram-negative bacterial cell walls. Add a labeled diagram description and comparative clinical significance.',
        answer: 'I. INTRODUCTION: The cell wall is essential for maintaining cell integrity against turgor pressures up to 20 atm.\n\nII. GRAM-POSITIVE CELL WALL ARCHITECTURE:\n- Peptidoglycan: 40-80 layers, 20-80 nm thick. Peptidoglycan backbone composed of NAM-NAG polymers with D- and L-amino acid tetrapeptides cross-linked by pentaglycine bridges (e.g., in Staphylococcus aureus).\n- Teichoic and Lipoteichoic Acids: Wall teichoic acid (covalently linked to NAM) and lipoteichoic acid (anchored into plasma membrane glycolipids).\n\nIII. GRAM-NEGATIVE CELL WALL ARCHITECTURE:\n- Inner thin peptidoglycan layer (1-2 sheets, 2-7 nm) in the periplasm.\n- Outer Membrane: Asymmetrical bilayer. Inner leaflet is phospholipids; outer leaflet is Lipopolysaccharide (LPS).\n- LPS Structure: Lipid A (glucosamine disaccharide + fatty acids, causes endotoxic shock, pyrogenic reaction), Core oligosaccharide (contains KDO and heptose), O-antigen polysaccharide (variable repeating units conferring serotype specificity).\n- Porins: Trimeric water-filled transmembrane channels allowing diffusion of hydrophilic molecules <600 Da.\n- Braun\'s Lipoprotein: Covalently anchors outer membrane to peptidoglycan.\n\nIV. CLINICAL & THERAPEUTIC SIGNIFICANCE:\n- Gram-positives are highly susceptible to beta-lactams and lysozyme.\n- Gram-negatives are resistant to many antibiotics due to outer membrane barrier and periplasmic beta-lactamases.\n- Endotoxin release during Gram-negative bacteremia triggers cytokine storm (TNF-alpha, IL-1), leading to septic shock and DIC.'
      }
    ],
    vivaQuestions: [
      {
        question: 'Why are older bacterial cultures unsuitable for Gram staining?',
        answer: 'As cultures age, autolytic enzymes degrade the peptidoglycan wall, rendering Gram-positive cells Gram-variable or falsely Gram-negative.',
        tip: 'Always state that 18 to 24-hour log-phase cultures yield the most reliable Gram stain.'
      },
      {
        question: 'Which bacteria naturally lack a cell wall entirely?',
        answer: 'Mycoplasma species (e.g., Mycoplasma pneumoniae). Their membrane contains sterols for osmotic stability, and they are inherently resistant to Penicillin.',
        tip: 'Mention that L-forms are wall-deficient variants derived from walled bacteria.'
      }
    ],
    mcqs: [
      {
        id: 'bact-1',
        question: 'Which chemical link in the peptidoglycan backbone is cleaved by the enzyme lysozyme?',
        options: ['α-1,4-glycosidic bond', 'β-1,4-glycosidic bond', 'Peptide cross-link', 'Phosphodiester bond'],
        correctIndex: 1,
        explanation: 'Lysozyme specifically hydrolyzes the β-1,4-glycosidic bond between N-acetylmuramic acid and N-acetylglucosamine.'
      },
      {
        id: 'bact-2',
        question: 'Endotoxic shock caused by Gram-negative septicemia is primarily mediated by which component of LPS?',
        options: ['O-antigen polysaccharide', 'Core polysaccharide', 'Lipid A', 'Porin protein'],
        correctIndex: 2,
        explanation: 'Lipid A is the toxic, hydrophobic anchor of LPS that activates macrophages and triggers massive release of TNF-α and IL-1.'
      }
    ],
    quickRevisionCards: [
      { front: 'Gram-positive wall hallmark', back: 'Thick peptidoglycan (20-80nm) + Teichoic acid; stains purple.' },
      { front: 'Gram-negative wall hallmark', back: 'Thin peptidoglycan (2-7nm) + Outer membrane with LPS (Lipid A endotoxin); stains pink.' },
      { front: 'Decolorizing agent in Gram stain', back: '95% Ethanol or 1:1 Acetone-Alcohol.' }
    ],
    relatedTopicIds: ['bacterial-growth-curve', 'culture-media-principles']
  },
  {
    id: 'bacterial-growth-curve',
    categoryId: 'bacteriology',
    title: 'Bacterial Growth Kinetics & Growth Curve',
    marathiTitle: 'जीवाणूंची वाढ व वाढीचा आलेख',
    hindiTitle: 'जीवाणु वृद्धि वक्र और गतिकी',
    overview: 'When inoculated into a closed batch liquid culture system, bacteria exhibit a characteristic four-phase population growth curve: Lag phase, Log (Exponential) phase, Stationary phase, and Death (Decline) phase.',
    detailedNotes: [
      'Lag Phase: Period of physiological adaptation. No cell division occurs (population constant), but vigorous synthesis of enzymes, RNA, ATP, and structural macromolecules takes place.',
      'Log / Exponential Phase: Cells divide at maximum, constant rate governed by genetic potential and environment. Generation time (doubling time) is determined here. Cells are biochemically uniform and most sensitive to antimicrobial agents.',
      'Stationary Phase: Growth rate equals death rate (viable count remains constant). Caused by nutrient depletion, toxic metabolite accumulation, oxygen limitation, and space constraints. Endospore formation and secondary metabolite (antibiotics) production initiate.',
      'Decline / Death Phase: Exponential decrease in viable cells due to accumulated toxic wastes and depleted energy reserves. Some viable but non-culturable (VBNC) cells may persist.'
    ],
    definitions: [
      { term: 'Generation Time (g)', definition: 'The time required for a microbial population to double in cell number: g = t / n.' },
      { term: 'Continuous Culture', definition: 'An open system (chemostat/turbidostat) where fresh sterile medium is added and spent culture removed at equal rate, maintaining cells permanently in exponential phase.' },
      { term: 'Diauxic Growth', definition: 'Biphasic growth pattern observed when two sugars (e.g. glucose and lactose) are present, separated by an intermediate lag phase.' }
    ],
    keyPoints: [
      'Growth equation: N_t = N_0 * 2^n, where n is number of generations.',
      'Chemostat controls growth rate via limiting nutrient concentration; turbidostat controls via optical density/turbidity feedback.',
      'Penicillin is most effective during the log phase because cells are actively synthesizing cell walls.'
    ],
    comparisonTable: {
      title: 'Phases of Bacterial Growth in Batch Culture',
      headers: ['Phase', 'Cell Number', 'Metabolic Activity', 'Antibiotic Sensitivity'],
      rows: [
        ['Lag Phase', 'Constant (no division)', 'Intense enzyme and RNA synthesis', 'Low'],
        ['Log / Exponential', 'Exponential increase (2^n)', 'Maximum balanced metabolism', 'Highest (optimal target)'],
        ['Stationary Phase', 'Equilibrium (birth = death)', 'Secondary metabolites (antibiotics, spores)', 'Reduced / tolerant'],
        ['Death Phase', 'Exponential decrease', 'Autolysis and cellular decline', 'Variable / persistent']
      ]
    },
    twoMarkAnswers: [
      {
        question: 'Define generation time in microbiology.',
        answer: 'Generation time (doubling time) is the time interval required for a bacterial cell or population to undergo one binary fission cycle and double in number.'
      },
      {
        question: 'Why does a culture enter the stationary phase?',
        answer: 'A batch culture enters stationary phase due to exhaustion of essential nutrients, oxygen limitation, space restriction, and accumulation of toxic organic end-products.'
      }
    ],
    fiveMarkAnswers: [
      {
        question: 'Explain the four phases of a typical bacterial batch growth curve with clinical and industrial relevance.',
        answer: '1. Lag Phase: Inoculated cells adjust to medium, synthesizing ribosomal RNA and metabolic enzymes. Industrially, minimized by using active log-phase seed culture.\n2. Exponential (Log) Phase: Cells divide at constant rate. Log N plotted against time yields a straight line. Generation time is calculated. Ideal for physiological testing and antibiotic sensitivity assays.\n3. Stationary Phase: Viable count stabilizes. Microorganisms express stress-response sigma factors (RpoS) and produce secondary metabolites such as penicillin, streptomycin, and endospores.\n4. Death Phase: Death rate exceeds division rate as toxic acidic wastes accumulate. Clinically, understanding these kinetics guides antibiotic dosing intervals (e.g., concentration-dependent vs. time-dependent killing).'
      }
    ],
    tenMarkAnswers: [
      {
        question: 'Describe bacterial growth kinetics in batch and continuous cultures. Formulate the mathematical expressions for generation time and specific growth rate.',
        answer: 'I. MATHEMATICAL KINETICS OF EXPONENTIAL GROWTH:\nStarting with initial population N_0, after n generations:\nN_t = N_0 * 2^n\nTaking log10 on both sides:\nlog10(N_t) = log10(N_0) + n * log10(2)\nlog10(N_t) - log10(N_0) = n * 0.3010\nn = [log10(N_t) - log10(N_0)] / 0.3010\nGeneration time g = t / n\nSpecific growth rate (μ) = (ln N_t - ln N_0) / t = 0.693 / g.\n\nII. CONTINUOUS CULTURE (OPEN SYSTEMS):\n- Chemostat: Maintains steady-state cell density by continuous addition of fresh medium with one growth-limiting nutrient (e.g., carbon, nitrogen) and removal of effluent at dilution rate D = Flow rate (F) / Volume (V).\n- At steady state, specific growth rate μ equals dilution rate D.\n- If D exceeds maximum specific growth rate (μ_max), washout occurs.\n- Turbidostat: Photocell detects turbidity (OD) and automatically regulates pump speed to hold cell density constant without nutrient limitation.\n\nIII. INDUSTRIAL APPLICATIONS:\nContinuous fermentation maximizes biomass yield in single-cell protein production and continuous wastewater treatment bioreactors.'
      }
    ],
    vivaQuestions: [
      {
        question: 'What is diauxic growth and what causes the intermediate lag?',
        answer: 'Diauxic growth is sequential utilization of two carbon substrates. The intermediate lag occurs when preferred glucose is depleted, requiring time for derepression of the lac operon to synthesize β-galactosidase and lactose permease.',
        tip: 'Mention catabolite repression and cAMP-CRP regulation.'
      }
    ],
    mcqs: [
      {
        id: 'curve-1',
        question: 'In which phase of the bacterial growth curve are cells most sensitive to penicillin?',
        options: ['Lag phase', 'Log (Exponential) phase', 'Stationary phase', 'Decline phase'],
        correctIndex: 1,
        explanation: 'Penicillin blocks transpeptidase enzyme during active cell wall synthesis, which occurs maximally in the log phase.'
      }
    ],
    quickRevisionCards: [
      { front: 'Formula for generation time (g)', back: 'g = t / n, where n = (log10 Nt - log10 N0) / 0.301' },
      { front: 'Chemostat principle', back: 'Steady-state growth rate controlled by concentration of a single limiting nutrient (μ = D).' }
    ],
    relatedTopicIds: ['bacterial-cell-wall']
  },
  {
    id: 'culture-media-principles',
    categoryId: 'bacteriology',
    title: 'Culture Media & Colony Morphology Interpretation',
    marathiTitle: 'कल्चर माध्यम आणि कॉलनी स्वरूप',
    hindiTitle: 'संवर्धन माध्यम और कॉलोनी आकारिकी',
    overview: 'Culture media provide essential nutrients, osmotic balance, and pH buffering for cultivating microorganisms in vitro. Selective and differential media permit isolation and presumptive identification of bacterial pathogens from clinical and environmental specimens.',
    detailedNotes: [
      'Nutrient Agar / Broth: Basal general-purpose non-selective medium supporting non-fastidious organisms (peptone, beef extract, NaCl, agar).',
      'MacConkey Agar: Selective and differential medium for Gram-negative enteric bacilli. Bile salts and crystal violet inhibit Gram-positive organisms. Neutral red acts as pH indicator; lactose fermenters (E. coli, Klebsiella) produce pink colonies, while non-fermenters (Salmonella, Shigella) form pale translucent colonies.',
      'Blood Agar (5% sheep blood): Enriched and differential medium detecting hemolysins: Beta (clear complete zone e.g., Streptococcus pyogenes, S. aureus), Alpha (greenish partial halo e.g., S. pneumoniae), and Gamma (no change).',
      'Mannitol Salt Agar (7.5% NaCl): Selective for Staphylococci. Fermentation of mannitol by Staphylococcus aureus turns phenol red indicator yellow; S. epidermidis produces red/pink colonies.',
      'Eosin Methylene Blue (EMB) Agar: Eosin Y and methylene blue dyes inhibit Gram-positives. Escherichia coli produces a distinctive green metallic sheen due to rapid, vigorous lactose and sucrose fermentation.'
    ],
    definitions: [
      { term: 'Selective Medium', definition: 'A culture medium containing inhibitory agents (dyes, bile salts, high salt, antibiotics) that suppress unwanted organisms while favoring target species.' },
      { term: 'Differential Medium', definition: 'A medium with specific substrates and pH indicators that visually distinguish between different groups of bacteria based on metabolic characteristics.' },
      { term: 'Enriched Medium', definition: 'Basal medium supplemented with highly nutritious additives like whole blood, serum, or egg yolk for growing fastidious organisms.' }
    ],
    keyPoints: [
      'Agar is derived from red seaweed (Gelidium); melts at 85-95°C and solidifies at 40-45°C, with no nutritional value for most bacteria.',
      'Colony characteristics must be recorded on 18-24 hour cultures before confluent overgrowth occurs.',
      'Colony parameters: Size (pinpoint, small, large), Shape (circular, irregular), Margin (entire, undulate, lobate), Elevation (flat, raised, convex), Surface (smooth, rough, mucoid), Pigmentation, and Opacity.'
    ],
    comparisonTable: {
      title: 'Common Diagnostic Media Comparison',
      headers: ['Medium', 'Type', 'Selective Agent', 'Differential Feature', 'Key Result'],
      rows: [
        ['MacConkey Agar', 'Selective & Differential', 'Bile salts, Crystal violet', 'Lactose & Neutral red', 'Pink = Lactose Fermenter (E. coli); Pale = Non-fermenter'],
        ['Blood Agar', 'Enriched & Differential', 'None', '5% Sheep RBCs', 'Beta = clear lysis; Alpha = green halo; Gamma = no lysis'],
        ['Mannitol Salt Agar', 'Selective & Differential', '7.5% Sodium chloride', 'Mannitol & Phenol red', 'Yellow zone = S. aureus; Red/Pink = S. epidermidis'],
        ['EMB Agar', 'Selective & Differential', 'Eosin Y, Methylene blue', 'Lactose & dye precipitation', 'Green metallic sheen = E. coli; Pink/Mucoid = Enterobacter'],
        ['Sabouraud Dextrose', 'Selective (Fungi)', 'Low pH (5.6), high glucose', 'Fungal morphology', 'Cultivates yeasts and dermatophytes']
      ]
    },
    twoMarkAnswers: [
      {
        question: 'Why is MacConkey agar both selective and differential?',
        answer: 'MacConkey agar is selective because bile salts and crystal violet inhibit Gram-positive bacteria, and differential because neutral red distinguishes pink lactose fermenters from pale non-lactose fermenters.'
      },
      {
        question: 'What gives Escherichia coli a green metallic sheen on EMB agar?',
        answer: 'Vigorous acid production from lactose fermentation drops pH significantly, precipitating eosin and methylene blue dye complex onto the colony surface.'
      }
    ],
    fiveMarkAnswers: [
      {
        question: 'Enumerate the macroscopic parameters evaluated during colony morphology study on an agar plate.',
        answer: '1. Size: Measured in mm (pinpoint <1mm, moderate 1-2mm, large >3mm).\n2. Form / Shape: Circular, irregular, rhizoid (root-like), filamentous.\n3. Margin: Entire (even, smooth), undulate (wavy), lobate, serrate, filamentous.\n4. Elevation: Flat, raised, convex (dome-shaped), pulvinate (cushion), umbonate (button-like central protrusion).\n5. Surface Appearance: Smooth & glistening, dull, rough, granular, wrinkled, mucoid (capsulated organisms like Klebsiella).\n6. Pigmentation / Color: Golden yellow (S. aureus), red (Serratia marcescens), blue-green pyocyanin (Pseudomonas aeruginosa), creamy white.\n7. Opacity: Transparent, translucent, opaque.'
      }
    ],
    tenMarkAnswers: [
      {
        question: 'Classify culture media with examples based on physical state, chemical composition, and functional application in diagnostic microbiology.',
        answer: 'I. CLASSIFICATION BY PHYSICAL CONSISTENCY:\n- Solid media (1.5-2.0% agar): Nutrient agar, Blood agar. Used for isolating discrete colonies.\n- Semisolid media (0.2-0.5% agar): Motility agar (Craigie tube), Stuart transport medium.\n- Liquid media (no agar): Nutrient broth, Peptone water. Used for mass propagation and inoculum preparation.\n\nII. CLASSIFICATION BY CHEMICAL NATURE:\n- Synthetic / Defined media: Exact chemical composition known (e.g., Davis & Mingioli minimal medium).\n- Non-synthetic / Complex media: Contains undefined biological extracts (e.g., yeast extract, peptone, beef extract).\n\nIII. CLASSIFICATION BY FUNCTIONAL APPLICATION:\n1. Basal media: Nutrient agar, simple broth supporting non-fastidious heterotrophs.\n2. Enriched media: Blood agar, Chocolate agar (heated blood releasing factor X and V for Haemophilus influenzae and Neisseria).\n3. Selective media: MacConkey agar, MSA, Thiosulfate-Citrate-Bile salts-Sucrose (TCBS for Vibrio cholerae).\n4. Differential / Indicator media: EMB, MacConkey, Christensen\'s urease medium.\n5. Transport media: Cary-Blair for stool, Amies medium. Maintains viability without multiplication.\n6. Anaerobic media: Robertson\'s Cooked Meat (RCM) broth, Thioglycollate broth containing sodium thioglycollate reducing agent.'
      }
    ],
    vivaQuestions: [
      {
        question: 'What is the gelling temperature and melting temperature of agar?',
        answer: 'Agar melts at approximately 85°C to 95°C and solidifies (gels) at 40°C to 45°C. This hysteresis property allows heat-sensitive supplements like sheep blood to be added safely around 50°C.',
        tip: 'Highlight that agar is an agarose/agaropectin galactan polymer resistant to degradation by pathogenic bacteria.'
      }
    ],
    mcqs: [
      {
        id: 'media-1',
        question: 'Which indicator is used in Mannitol Salt Agar?',
        options: ['Neutral red', 'Bromothymol blue', 'Phenol red', 'Methyl red'],
        correctIndex: 2,
        explanation: 'Mannitol Salt Agar uses Phenol red, which turns yellow when mannitol is fermented into acid by Staphylococcus aureus.'
      }
    ],
    quickRevisionCards: [
      { front: 'Lactose fermenters on MacConkey', back: 'Produce pink/red colonies (e.g., E. coli, Klebsiella pneumoniae).' },
      { front: 'Non-lactose fermenters on MacConkey', back: 'Produce pale, colorless/translucent colonies (e.g., Salmonella, Shigella, Proteus).' }
    ],
    relatedTopicIds: ['bacterial-cell-wall']
  },
  {
    id: 'immunology-elisa',
    categoryId: 'immunology',
    title: 'ELISA (Enzyme-Linked Immunosorbent Assay)',
    marathiTitle: 'एलिसा (ELISA) तंत्रज्ञान',
    hindiTitle: 'एलिसा (ELISA) परीक्षण सिद्धांत',
    overview: 'ELISA is a high-sensitivity immunochemical technique that utilizes enzyme-conjugated antibodies to detect and quantify soluble antigens or antibodies in clinical serum and biological fluids.',
    detailedNotes: [
      'Core Principle: Specific antigen-antibody recognition combined with catalytic enzyme amplification converting a chromogenic substrate into a detectable colored reaction product.',
      'Solid phase: 96-well polystyrene microtiter plates provide high protein-binding capacity.',
      'Enzymes commonly coupled: Horseradish Peroxidase (HRP) acting on TMB (3,3\',5,5\'-tetramethylbenzidine) producing blue color (turns yellow with stop solution H2SO4), or Alkaline Phosphatase (ALP) acting on pNPP.',
      'Washing stages: Detergent buffers (PBST: PBS with Tween-20) are critical to remove unbound reagents and eliminate non-specific background noise.'
    ],
    definitions: [
      { term: 'Direct ELISA', definition: 'Antigen immobilized in well is detected directly by a primary enzyme-conjugated antibody.' },
      { term: 'Indirect ELISA', definition: 'Antigen immobilized in well binds patient primary antibody, which is then detected by an enzyme-labeled secondary anti-human antibody (standard for HIV antibody screening).' },
      { term: 'Sandwich ELISA', definition: 'Capture antibody immobilized in well binds target antigen, which is then bound by a second detection antibody; ideal for high-sensitivity antigen detection (HBsAg, hormones).' },
      { term: 'Competitive ELISA', definition: 'Sample antigen competes with labeled antigen for a limited quantity of antibody; absorbance is inversely proportional to antigen concentration.' }
    ],
    keyPoints: [
      'Spectrophotometric microplate readers measure absorbance (optical density, OD) typically at 450 nm for HRP/TMB.',
      'Blocking agents like Bovine Serum Albumin (BSA) or non-fat skim milk prevent non-specific adsorption to plastic wells.',
      'Cutoff OD value determines qualitative positive/negative threshold; standard curves quantify precise concentration.'
    ],
    comparisonTable: {
      title: 'Comparison of ELISA Formats',
      headers: ['Format', 'Immobilized on Well', 'Primary Target', 'Sensitivity', 'Key Application'],
      rows: [
        ['Direct ELISA', 'Sample Antigen', 'Direct labeled antibody', 'Moderate', 'Rapid viral protein testing'],
        ['Indirect ELISA', 'Purified Antigen', 'Patient serum antibody', 'High (amplified by 2° Ab)', 'HIV & Hepatitis sero-surveillance'],
        ['Sandwich ELISA', 'Capture Antibody', 'Polyvalent Antigen', 'Highest specificity & sensitivity', 'Cytokines, Hormones, HBsAg'],
        ['Competitive ELISA', 'Antigen or Antibody', 'Small haptens & drugs', 'High for small molecules', 'Toxicology, Drug monitoring']
      ]
    },
    twoMarkAnswers: [
      {
        question: 'Name two enzymes commonly utilized as conjugates in ELISA.',
        answer: 'Horseradish Peroxidase (HRP) and Alkaline Phosphatase (ALP).'
      },
      {
        question: 'Why is a blocking step essential in ELISA procedures?',
        answer: 'Blocking with BSA or non-fat milk coats unoccupied binding sites on polystyrene wells, preventing non-specific binding of antibodies and reducing background signal.'
      }
    ],
    fiveMarkAnswers: [
      {
        question: 'Differentiate between Indirect ELISA and Sandwich ELISA with diagrammatic protocol steps.',
        answer: '1. Indirect ELISA:\n- Wells coated with known antigen.\n- Add patient serum (test antibody).\n- Wash.\n- Add enzyme-conjugated anti-human immunoglobulin.\n- Wash, add chromogenic substrate (TMB), measure color.\n- Used to detect antibodies (e.g. anti-HIV).\n\n2. Sandwich ELISA:\n- Wells coated with capture antibody specific to target antigen.\n- Add patient sample containing target antigen.\n- Wash.\n- Add secondary enzyme-conjugated detection antibody (antigen is sandwiched).\n- Wash, add substrate, measure color.\n- Used for antigen detection (e.g., Dengue NS1, HBsAg).'
      }
    ],
    tenMarkAnswers: [
      {
        question: 'Discuss the principle, methodology, types, and diagnostic applications of ELISA. Address sources of false-positive and false-negative results.',
        answer: 'I. PRINCIPLE: Quantitative or qualitative detection based on specific Ag-Ab interaction coupled to enzyme-catalyzed color development read at specified wavelengths.\n\nII. TYPES: Direct, Indirect, Sandwich, and Competitive formats.\n\nIII. REAGENTS:\n- Solid Phase: 96-well Polystyrene plate.\n- Blocking buffer: 1-3% BSA or 5% skim milk in PBS.\n- Wash buffer: PBS + 0.05% Tween-20.\n- Enzyme-Substrate system: HRP with TMB (read at 450 nm) or ALP with pNPP (read at 405 nm).\n- Stop solution: 1-2 M H2SO4.\n\nIV. DIAGNOSTIC APPLICATIONS:\n- Infectious diseases: HIV, Hepatitis B & C, Dengue NS1 antigen.\n- Oncology: Tumor markers (PSA, CA-125, CEA).\n- Endocrinology: TSH, T3, T4, hCG pregnancy testing.\n\nV. ERROR ANALYSIS:\n- False positives: Inadequate washing, cross-reacting heterophilic antibodies, rheumatoid factor (RF), microbial contamination.\n- False negatives: Prozone/hook effect at extremely high antigen concentrations, testing during window period before seroconversion, denaturation of conjugate.'
      }
    ],
    vivaQuestions: [
      {
        question: 'What is the role of sulfuric acid added at the end of an HRP-TMB ELISA?',
        answer: 'Sulfuric acid (H2SO4) acts as a stop solution. It denatures the HRP enzyme halting further color change and shifts the blue reaction intermediate to a stable yellow product with maximum absorbance at 450 nm.',
        tip: 'Always state the absorbance shifts from 650nm (blue) to 450nm (yellow).'
      }
    ],
    mcqs: [
      {
        id: 'elisa-1',
        question: 'In Sandwich ELISA, which molecule is coated first onto the microtiter well?',
        options: ['Target antigen', 'Capture antibody', 'Secondary antibody', 'Enzyme substrate'],
        correctIndex: 1,
        explanation: 'In Sandwich ELISA, specific capture antibody is immobilized first on the solid surface to bind target antigen from the specimen.'
      }
    ],
    quickRevisionCards: [
      { front: 'Indirect ELISA detects', back: 'Antibodies in patient serum (e.g., HIV antibodies).' },
      { front: 'Sandwich ELISA detects', back: 'Antigens in patient sample (e.g., Dengue NS1, HBsAg).' }
    ],
    relatedTopicIds: ['bacterial-cell-wall']
  },
  {
    id: 'molecular-pcr',
    categoryId: 'molecular',
    title: 'Polymerase Chain Reaction (PCR) & Gel Electrophoresis',
    marathiTitle: 'पीसीआर (PCR) आणि जेल इलेक्ट्रोफोरेसीस',
    hindiTitle: 'पीसीआर (PCR) तकनीक और जेल वैद्युतकणसंचलन',
    overview: 'PCR, invented by Kary Mullis in 1983, is an enzymatic in vitro method capable of exponentially amplifying a target DNA sequence million-fold through repetitive thermal cycles of denaturation, annealing, and primer extension.',
    detailedNotes: [
      'Master Mix Components: Target template DNA, forward and reverse oligonucleotide primers (18-25 nt), dNTPs (dATP, dCTP, dGTP, dTTP), thermostable DNA polymerase (Taq from Thermus aquaticus), and buffer containing MgCl2 cofactor.',
      'Denaturation (94-96°C, 30-60 sec): Disrupts hydrogen bonds between complementary bases, yielding single-stranded templates.',
      'Annealing (50-65°C, 30-60 sec): Primers bind complementarily to flanking sequences. Temperature depends on primer melting temperature: Tm = 2(A+T) + 4(G+C).',
      'Extension / Elongation (72°C, 1 min per kb): Taq DNA polymerase synthesizes nascent strand 5\' to 3\' adding dNTPs.',
      'Agarose Gel Electrophoresis: Separates amplified DNA fragments by molecular size through an agarose matrix under an electric field (DNA moves toward the positive anode). Visualized with Ethidium Bromide or GelRed under UV/blue transilluminator.'
    ],
    definitions: [
      { term: 'Taq Polymerase', definition: 'Heat-stable DNA-directed DNA polymerase isolated from thermophilic bacterium Thermus aquaticus with optimal activity at 72°C.' },
      { term: 'RT-PCR (Reverse Transcription PCR)', definition: 'Variation that converts RNA into complementary DNA (cDNA) using reverse transcriptase before standard PCR amplification (used for RNA viruses like SARS-CoV-2).' },
      { term: 'Real-Time / Quantitative PCR (qPCR)', definition: 'PCR technique monitoring fluorescence emitted during amplification (using SYBR Green or TaqMan probes) to determine initial template quantity.' }
    ],
    keyPoints: [
      'Theoretical amplification yield = 2^n, where n is number of cycles (typically 30-35 cycles producing >10^9 copies).',
      'Taq polymerase lacks 3\' to 5\' exonuclease proofreading activity; high-fidelity polymerases like Pfu are used for cloning.',
      'Agarose concentration (typically 1.0-2.0%) dictates resolution: higher concentration resolves smaller DNA fragments.'
    ],
    comparisonTable: {
      title: 'PCR Variants Overview',
      headers: ['PCR Type', 'Starting Material', 'Detection Method', 'Primary Purpose'],
      rows: [
        ['Conventional PCR', 'Purified DNA', 'End-point Agarose Gel Electrophoresis', 'Gene amplification, cloning, presence/absence'],
        ['RT-PCR', 'Purified RNA', 'End-point Gel Electrophoresis', 'RNA virus detection, mRNA expression analysis'],
        ['Quantitative Real-Time PCR (qPCR)', 'DNA or cDNA', 'Real-time fluorescence (SYBR Green / TaqMan)', 'Viral load quantitation, gene expression kinetics'],
        ['Multiplex PCR', 'DNA template', 'Multiple distinct band sizes on gel', 'Simultaneous detection of multiple pathogens in one tube']
      ]
    },
    twoMarkAnswers: [
      {
        question: 'Name the three fundamental thermal steps of a single PCR cycle and their temperature ranges.',
        answer: '1. Denaturation (94-96°C)\n2. Primer Annealing (50-65°C)\n3. Primer Extension (72°C).'
      },
      {
        question: 'Why is magnesium chloride (MgCl2) an essential reagent in PCR master mix?',
        answer: 'Mg2+ ions serve as an obligate catalytic cofactor for Taq DNA polymerase activity and stabilize primer-template DNA duplexes.'
      }
    ],
    fiveMarkAnswers: [
      {
        question: 'Explain the principle and protocol of Agarose Gel Electrophoresis for analyzing PCR products.',
        answer: '1. Principle: DNA possesses a constant negative charge-to-mass ratio due to its phosphate backbone. When loaded in an agarose gel submerged in TAE/TBE buffer and subjected to an electric current, DNA fragments migrate toward the positive anode (+) at rates inversely proportional to their log molecular weight.\n2. Gel preparation: 1-2% agarose dissolved in electrophoresis buffer by boiling, cooled to ~55°C, and cast with a well comb.\n3. Loading: PCR samples mixed with loading dye (bromophenol blue + glycerol) alongside a DNA ladder of known base-pair markers.\n4. Run: Voltage applied (5-8 V/cm).\n5. Visualization: Intercalating fluorophore (Ethidium Bromide or GelRed) fluoresces under UV/blue light transillumination to reveal specific band sizes.'
      }
    ],
    tenMarkAnswers: [
      {
        question: 'Detail the principles, enzymatic components, thermal cycling kinetics, and clinical applications of PCR. Contrast conventional PCR with Real-Time qPCR.',
        answer: 'I. PRINCIPLE: In vitro iterative enzymatic DNA synthesis capable of 10^9-fold target enrichment in 2 hours.\n\nII. ESSENTIAL COMPONENTS:\n1. Template DNA (10-100 ng).\n2. Primers: Forward & Reverse oligonucleotides (18-25 bp, 40-60% GC).\n3. dNTPs: Equimolar mixture (200 μM each).\n4. Thermostable Polymerase: Taq DNA polymerase (0.5-1.5 units).\n5. Reaction Buffer: 10 mM Tris-HCl (pH 8.3), 50 mM KCl, 1.5-2.5 mM MgCl2.\n\nIII. THERMAL PROFILE:\n- Initial denaturation: 95°C for 3-5 min.\n- Cycles (30-35x):\n  * Denature: 95°C for 30s.\n  * Anneal: Tm - 5°C for 30s.\n  * Extend: 72°C (1 min/kb).\n- Final extension: 72°C for 5-10 min.\n\nIV. CONVENTIONAL vs. REAL-TIME qPCR:\n- Conventional: End-point detection, semi-quantitative, requires post-PCR gel handling (contamination risk).\n- qPCR: Closed-tube, monitors fluorescence cycle-by-cycle, calculates threshold cycle (Ct), precise quantitative dynamic range over 7 orders of magnitude.\n\nV. APPLICATIONS:\n- Molecular diagnostics: HIV/HCV viral load, Tuberculosis (GeneXpert MTB/RIF), SARS-CoV-2.\n- Forensic DNA profiling (STR amplification).\n- Microbial taxonomy: 16S rRNA gene sequencing.'
      }
    ],
    vivaQuestions: [
      {
        question: 'What is a "primer dimer" and how does it appear on an agarose gel?',
        answer: 'Primer dimers are non-specific small double-stranded artifacts formed by annealing and extension of complementary primers with each other. They appear as a fuzzy low-molecular-weight band (<50 bp) near the gel front.',
        tip: 'Mention that optimizing annealing temperature or using Hot-Start Taq minimizes primer dimer formation.'
      }
    ],
    mcqs: [
      {
        id: 'pcr-1',
        question: 'From which thermophilic bacterium was the original Taq DNA polymerase isolated?',
        options: ['Bacillus stearothermophilus', 'Thermus aquaticus', 'Pyrococcus furiosus', 'Thermotoga maritima'],
        correctIndex: 1,
        explanation: 'Taq polymerase was originally isolated from the hot-spring bacterium Thermus aquaticus by Thomas Brock.'
      }
    ],
    quickRevisionCards: [
      { front: 'Denaturation temp', back: '94°C - 96°C (splits double strands)' },
      { front: 'Annealing temp', back: '50°C - 65°C (primers bind template)' },
      { front: 'Extension temp', back: '72°C (optimal Taq DNA polymerase elongation)' }
    ],
    relatedTopicIds: ['culture-media-principles']
  }
];

export const LAB_TECHNIQUES: LabTechnique[] = [
  {
    id: 'gram-staining-protocol',
    category: 'Staining',
    title: 'Gram Staining Protocol (Differential Stain)',
    purpose: 'To categorize bacteria into Gram-positive (purple) and Gram-negative (pink) based on cell wall composition and observe bacterial cellular morphology.',
    principle: 'Gram-positive bacteria have thick peptidoglycan layers with teichoic acid that dehydrate in alcohol, retaining the primary Crystal Violet-Iodine (CV-I) complex. Gram-negative bacteria possess thin peptidoglycan surrounded by lipid-rich outer membranes that dissolve in alcohol, releasing the CV-I complex and accepting the pink Safranin counterstain.',
    materialsRequired: [
      'Clean grease-free glass slides',
      'Inoculating wire loop and Bunsen burner',
      'Crystal violet solution (Primary stain)',
      'Gram\'s iodine solution (Mordant)',
      '95% Ethyl alcohol or Acetone-Alcohol (Decolorizer)',
      '0.5% Safranin solution (Counterstain)',
      'Wash bottle with gentle tap water',
      'Bibulous paper / blotting paper',
      'Compound light microscope with 100x oil immersion objective'
    ],
    stepByStepProtocol: [
      '1. Smear Preparation: Place a loopful of sterile water on a slide, emulsify a tiny colony, spread into a thin nickel-sized oval, and allow to air dry.',
      '2. Heat Fixation: Pass the slide quickly 2-3 times through the blue flame (do not overheat).',
      '3. Primary Staining: Flood smear with Crystal Violet for 60 seconds. Rinse gently with water.',
      '4. Mordant: Flood with Gram\'s Iodine for 60 seconds. Rinse gently with water.',
      '5. Decolorization (CRITICAL): Tilt slide and add 95% Ethanol dropwise for 10-15 seconds until runoff is clear. Rinse immediately with water.',
      '6. Counterstaining: Flood with Safranin for 45-60 seconds. Rinse gently with water.',
      '7. Blotting & Microscopy: Gently blot dry with bibulous paper. Examine under oil immersion lens (1000x total magnification).'
    ],
    expectedObservations: [
      'Gram-positive: Deep violet / dark purple cells (e.g., Staphylococcus aureus cocci in clusters, Bacillus bacilli).',
      'Gram-negative: Light pink / magenta cells (e.g., Escherichia coli bacilli, Neisseria diplococci).'
    ],
    interpretation: 'Purple = Gram-positive cell wall. Pink = Gram-negative cell wall. Check for uniform cellular shape (cocci, bacilli, spirilla) and arrangement (pairs, chains, clusters).',
    limitations: [
      'Over-decolorization yields false Gram-negative results.',
      'Under-decolorization leaves Gram-negative cells purple.',
      'Cultures older than 24 hours lose peptidoglycan integrity.',
      'Thick smears stain unevenly.'
    ],
    biosafetyGuidelines: [
      'Wear lab coat, gloves, and eye protection.',
      'Treat all clinical and unknown specimens as potential pathogens (BSL-2).',
      'Dispose of used slides in puncture-proof disinfectant sharps containers.'
    ],
    commonTroubleshooting: [
      { problem: 'Everything looks pink (Gram-positive appears negative)', cause: 'Excessive alcohol decolorization or old culture.', solution: 'Reduce decolorizer time to 10s and test an 18h fresh control culture.' },
      { problem: 'Everything looks purple (Gram-negative appears positive)', cause: 'Smear too thick or insufficient decolorization.', solution: 'Prepare thin, barely turbid smear and decolorize until solvent runs colorless.' }
    ]
  },
  {
    id: 'catalase-test-protocol',
    category: 'Biochemical Tests',
    title: 'Catalase Test (Slide & Tube Method)',
    purpose: 'To detect the presence of the catalase enzyme, which protects aerobes against toxic hydrogen peroxide, differentiating Staphylococci (catalase-positive) from Streptococci (catalase-negative).',
    principle: 'Catalase hydrolyzes hydrogen peroxide (H2O2) into water and free oxygen gas:\n2 H2O2  --(Catalase)-->  2 H2O + O2 (effervescence / vigorous bubbling).',
    materialsRequired: [
      'Fresh 3% Hydrogen peroxide (H2O2) stored in amber bottle in refrigerator',
      'Clean microscope glass slides',
      'Sterile wooden applicator stick or plastic loop (DO NOT USE NICHROME WIRE)',
      'Fresh 18-24 hour bacterial growth from non-blood medium'
    ],
    stepByStepProtocol: [
      '1. Place a clean glass slide on a dark background.',
      '2. Using a wooden applicator stick, pick a small portion of an isolated colony from Nutrient agar.',
      '3. Smear the colony gently onto the slide.',
      '4. Add 1 drop of 3% H2O2 directly onto the colony smear.',
      '5. Observe immediately for rapid, vigorous gas bubbling (effervescence).'
    ],
    expectedObservations: [
      'Positive: Immediate vigorous bubbling / foaming within 5-10 seconds.',
      'Negative: No bubbling, or only a few delayed scattered bubbles.'
    ],
    interpretation: 'Catalase Positive = Staphylococcus, Micrococcus, Bacillus, Listeria, Enterobacteriaceae. Catalase Negative = Streptococcus, Enterococcus, Clostridium species.',
    limitations: [
      'DO NOT use colonies picked from Blood Agar; red blood cells contain pseudocatalase yielding false-positive effervescence.',
      'DO NOT use platinum/nichrome inoculating loops; metals catalyze peroxide breakdown.',
      'Expired or light-exposed H2O2 will yield false-negative results.'
    ],
    biosafetyGuidelines: [
      'Handle 3% H2O2 with care; avoid skin or eye contact.',
      'Perform on a flat, contained bench to prevent aerosol splattering during vigorous bubbling.'
    ],
    commonTroubleshooting: [
      { problem: 'Weak or delayed bubbles observed after 30 seconds', cause: 'Degraded peroxide or small inoculum.', solution: 'Verify H2O2 reagent using known Staphylococcus aureus control; ignore bubbles appearing after 20 seconds.' }
    ]
  },
  {
    id: 'oxidase-test-protocol',
    category: 'Biochemical Tests',
    title: 'Cytochrome Oxidase Test',
    purpose: 'To detect the presence of intracellular cytochrome c oxidase enzyme, distinguishing Pseudomonas aeruginosa (oxidase-positive) from Enterobacteriaceae (oxidase-negative).',
    principle: 'Cytochrome c oxidase transfers electrons from reduced cytochrome c to molecular oxygen. The reagent (1% tetramethyl-p-phenylenediamine dihydrochloride) acts as an artificial electron acceptor and is oxidized to a deep purple/blue compound (indophenol blue).',
    materialsRequired: [
      '1% tetramethyl-p-phenylenediamine dihydrochloride reagent or Kovac\'s oxidase filter paper strips',
      'Sterile wooden applicator sticks or platinum loop',
      'Fresh 18-24 hour culture on non-selective agar'
    ],
    stepByStepProtocol: [
      '1. Moisten a strip of Whatman No. 1 filter paper with freshly prepared 1% oxidase reagent.',
      '2. Using a sterile wooden stick, pick a colony from a fresh Nutrient agar plate.',
      '3. Rub the colony firmly onto the moistened filter paper.',
      '4. Observe the color change within 10 to 30 seconds.'
    ],
    expectedObservations: [
      'Positive: Development of deep purple/blue color within 10 to 30 seconds.',
      'Negative: No color change, or color change occurring after 60 seconds (ignore).'
    ],
    interpretation: 'Oxidase Positive = Pseudomonas, Neisseria, Vibrio, Campylobacter. Oxidase Negative = All Enterobacteriaceae (E. coli, Klebsiella, Salmonella, Shigella).',
    limitations: [
      'Iron/nichrome loops give false-positive reactions due to surface oxidation.',
      'Bacteria grown on carbohydrate-rich media (e.g., MacConkey) lower pH and may inhibit the enzyme.',
      'Reagent oxidizes spontaneously upon air exposure; must be colorless or light gray before use.'
    ],
    biosafetyGuidelines: [
      'Oxidase reagent is toxic; wear gloves when handling filter papers.',
      'Discard impregnated papers in chemical biohazard waste.'
    ],
    commonTroubleshooting: [
      { problem: 'Paper turns purple slowly after 2 minutes', cause: 'Auto-oxidation of reagent by atmospheric oxygen.', solution: 'Only record results within the first 10-30 seconds.' }
    ]
  },
  {
    id: 'autoclave-sterilization',
    category: 'Instruments',
    title: 'Autoclave Operation & Sterilization Cycles',
    purpose: 'To achieve complete destruction of all forms of microbial life, including vegetative cells, viruses, and resistant bacterial endospores (Geobacillus stearothermophilus), using moist heat under pressure.',
    principle: 'Water boiling under 15 psi (1.05 kg/cm2) gauge pressure reaches 121°C. Steam under pressure transfers latent heat, rapidly penetrating porous materials and irreversibly denaturing microbial structural proteins and cellular enzymes.',
    materialsRequired: [
      'Vertical or horizontal autoclave chamber',
      'Distilled or deionized water',
      'Culture media flasks (capped with cotton plugs or loose foil caps)',
      'Autoclave indicator tape (Bowie-Dick / chemical indicator strips)',
      'Biological indicator ampoules containing Geobacillus stearothermophilus spores (10^6 spores)'
    ],
    stepByStepProtocol: [
      '1. Check water level inside chamber; replenish with deionized water up to heating coil level.',
      '2. Load media flasks/tubes upright in autoclave baskets; do not overcrowd (allow steam circulation).',
      '3. Apply autoclave indicator tape to each pack.',
      '4. Seal lid securely using diagonal tightening of wing nuts.',
      '5. Open steam exhaust valve and power on heaters.',
      '6. Allow continuous steam discharge through exhaust valve for 5-7 minutes to purge trapped air (CRITICAL).',
      '7. Close exhaust valve; pressure and temperature rise to 15 psi and 121°C.',
      '8. Maintain 121°C for 15-20 minutes (holding period for standard 1L volumes).',
      '9. Power off. Allow pressure gauge to fall to ZERO naturally before opening exhaust valve.',
      '10. Open lid carefully away from face while wearing heat-resistant safety gloves.'
    ],
    expectedObservations: [
      'Chemical tape: Diagonal white indicator stripes turn black.',
      'Biological indicator: Ampoule incubated at 56°C for 24h shows purple color (no growth = verified sterilization).'
    ],
    interpretation: 'Successful cycle ensures complete sterility of culture media and decontamination of biohazardous discard loads.',
    limitations: [
      'Cannot sterilize heat-labile reagents (vitamins, antibiotics, urea, serum; use 0.22 μm membrane filtration).',
      'Cannot sterilize anhydrous oils, waxes, or sealed non-aqueous powders (use hot air oven at 160°C).'
    ],
    biosafetyGuidelines: [
      'NEVER open door when pressure is above zero (risk of explosive boiling and severe steam burns).',
      'Loosen screw caps on liquid containers before autoclaving to prevent explosion.',
      'Always wear heat-resistant thermal gauntlets and safety face shield.'
    ],
    commonTroubleshooting: [
      { problem: 'Autoclave reaches pressure but not temperature (e.g. 15 psi but only 112°C)', cause: 'Air not completely displaced from chamber during warm-up (air-steam mixture).', solution: 'Ensure air vent remains fully open until vigorous steam jet expels all chamber air before closing valve.' }
    ]
  }
];
