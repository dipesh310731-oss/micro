import { GoogleGenAI } from '@google/genai';
import { SupportedLanguage, ChatResponseMode, LabInputData, OrganismCandidate } from '../types/microbiology';
import { STUDY_TOPICS, LAB_TECHNIQUES } from '../data/microbiologyKnowledge';

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Retrieve relevant context from our curated knowledge base (RAG)
export function retrieveMicrobiologyContext(query: string): string {
  const q = query.toLowerCase();
  const matchedTopics = STUDY_TOPICS.filter(t =>
    q.includes(t.title.toLowerCase()) ||
    t.title.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w)) ||
    t.definitions.some(d => q.includes(d.term.toLowerCase())) ||
    t.keyPoints.some(k => q.includes(k.toLowerCase().slice(0, 15)))
  );

  const matchedTechs = LAB_TECHNIQUES.filter(tech =>
    q.includes(tech.title.toLowerCase()) ||
    q.includes(tech.category.toLowerCase()) ||
    tech.title.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))
  );

  let context = 'CURATED SCIENTIFIC MICROBIOLOGY REFERENCE:\n';
  if (matchedTopics.length > 0) {
    matchedTopics.forEach(t => {
      context += `\nTopic: ${t.title}\nOverview: ${t.overview}\nKey Points:\n- ${t.keyPoints.join('\n- ')}\n`;
      if (t.comparisonTable) {
        context += `Comparison Table (${t.comparisonTable.title}):\nHeaders: ${t.comparisonTable.headers.join(' | ')}\n`;
        t.comparisonTable.rows.forEach(r => { context += `${r.join(' | ')}\n`; });
      }
    });
  }

  if (matchedTechs.length > 0) {
    matchedTechs.forEach(tech => {
      context += `\nTechnique: ${tech.title} (${tech.category})\nPrinciple: ${tech.principle}\nExpected Observations:\n- ${tech.expectedObservations.join('\n- ')}\nLimitations:\n- ${tech.limitations.join('\n- ')}\n`;
    });
  }

  return context;
}

export async function askMicrobiologyAI(
  userQuery: string,
  language: SupportedLanguage = 'en',
  mode: ChatResponseMode = 'detailed',
  chatHistory: { role: string; content: string }[] = []
): Promise<{ text: string; relatedTopics?: string[]; sampleQuestions?: string[] }> {
  const context = retrieveMicrobiologyContext(userQuery);
  const ai = getAiClient();

  // Language instructions
  let langInstruction = 'Respond strictly in English.';
  if (language === 'mr') {
    langInstruction = 'Respond in Marathi (मराठी) with standard scientific terms alongside in English brackets where helpful for microbiology students.';
  } else if (language === 'hi') {
    langInstruction = 'Respond in Hindi (हिंदी) with standard scientific terms alongside in English brackets where helpful for microbiology students.';
  } else if (language === 'hinglish') {
    langInstruction = 'Respond in Hinglish (natural mix of Hindi words in Latin script and standard English scientific terms, popular among Indian college students, e.g. "Bacteria cell wall mein peptidoglycan layer hoti hai...").';
  }

  // Exam mode instructions
  let modeInstruction = 'Provide a clear, scientifically accurate explanation with structure and bullet points.';
  if (mode === 'simple') {
    modeInstruction = 'Explain in simple, everyday intuitive language suitable for a beginner without heavy jargon.';
  } else if (mode === 'detailed') {
    modeInstruction = 'Provide comprehensive academic depth, molecular mechanisms, principles, and structured breakdowns with ASCII diagrams or tables where helpful.';
  } else if (mode === '2marks') {
    modeInstruction = 'Structure as a strict 2-Mark University Exam Answer: 2 to 3 concise, high-yield bullet points with definition and key example. Maximum 50 words.';
  } else if (mode === '5marks') {
    modeInstruction = 'Structure as a 5-Mark University Exam Answer: Definition/Principle, Step-by-step points, Labeled flowchart/table representation, and 1 clinical/practical example. Approx 150-200 words.';
  } else if (mode === '10marks') {
    modeInstruction = 'Structure as a 10-Mark Long Answer Question (LAQ): Detailed Synopsis with Headings: 1. Introduction & Historical Context, 2. Principle & Molecular Mechanism, 3. Detailed Components/Classification, 4. Step-by-step Protocol/Process, 5. Comparison Table, 6. Clinical & Industrial Applications, 7. Limitations & Biosafety.';
  } else if (mode === 'viva') {
    modeInstruction = 'Format as a Viva Voce Exam Session: Give 3-4 rapid-fire viva examiner questions with model answers, plus "Examiner Trap / Golden Tip" for students.';
  } else if (mode === 'mcq') {
    modeInstruction = 'Generate 3 high-yield Multiple Choice Questions (MCQs) related to this query with 4 options (A, B, C, D), indicate the correct answer, and provide a 2-line explanation.';
  }

  const systemInstruction = `
You are the AI Professor and Laboratory Consultant for "MICRO ANALYSIS" - a premier microbiology educational and laboratory platform.
Your mission is to help microbiology students, researchers, and lab technicians master bacteriology, virology, mycology, immunology, molecular biology, and laboratory techniques.

CRITICAL RULES:
1. Always maintain scientific rigor, empirical facts, and accurate microbiological terminology.
2. Safety & Biosafety: Strictly adhere to biosafety principles. Never provide instructions for culturing, weaponizing, or dangerously isolating high-consequence pathogens (e.g. Bacillus anthracis, Ebola). Emphasize BSL safety protocols.
3. ${langInstruction}
4. ${modeInstruction}
5. Ground your answer using the provided Curated Reference where applicable.
`;

  if (!ai) {
    // Grounded fallback response if GEMINI_API_KEY is not configured
    return generateGroundedFallbackResponse(userQuery, language, mode, context);
  }

  try {
    const prompt = `
Context Knowledge Base:
${context}

User Question: ${userQuery}
Target Mode: ${mode}
Target Language: ${language}

Please provide the answer adhering strictly to the required mode and language. At the very end, include 3 related suggested follow-up questions formatted as:
---FOLLOWUP---
- Question 1
- Question 2
- Question 3
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    const fullText = response.text || '';
    let answerText = fullText;
    let sampleQuestions: string[] = [];

    if (fullText.includes('---FOLLOWUP---')) {
      const parts = fullText.split('---FOLLOWUP---');
      answerText = parts[0].trim();
      sampleQuestions = parts[1]
        .split('\n')
        .map(s => s.replace(/^[-*•\d.]\s*/, '').trim())
        .filter(s => s.length > 5);
    }

    return {
      text: answerText,
      sampleQuestions: sampleQuestions.length > 0 ? sampleQuestions : [
        'Explain the principle of Gram staining in detail.',
        'What are the key differences between Gram-positive and Gram-negative bacteria?',
        'How is an autoclave validated using biological indicators?'
      ]
    };
  } catch (err) {
    console.error('Gemini API call failed, using grounded fallback:', err);
    return generateGroundedFallbackResponse(userQuery, language, mode, context);
  }
}

// Multimodal Petri Plate Analysis with Gemini 3.8 Flash
export async function analyzePetriPlateWithAI(
  imageBase64: string,
  labInputs: LabInputData,
  morphology: any
): Promise<OrganismCandidate[] | null> {
  const ai = getAiClient();
  if (!ai) return null;

  try {
    const prompt = `
Analyze this Petri plate culture photograph as an expert clinical and diagnostic microbiologist.
The user provided the following laboratory observations:
- Sample Type: ${labInputs.sampleType || 'Unknown'}
- Culture Medium: ${labInputs.cultureMedium || 'Standard Agar'}
- Incubation: ${labInputs.incubationTemp} for ${labInputs.incubationTimeHours} (${labInputs.atmosphere})
- Gram Stain: ${labInputs.gramStain || 'Not performed'}
- Catalase Test: ${labInputs.catalaseTest || 'Not tested'}
- Oxidase Test: ${labInputs.oxidaseTest || 'Not tested'}
- Lactose Fermentation: ${labInputs.lactoseFermentation || 'N/A'}
- Other observations: ${labInputs.otherObservations || 'None'}

Computer Vision Detected Morphology:
- Total colony count: ${morphology.totalCount}
- Predominant color: ${morphology.predominantColor}
- Shape: ${morphology.predominantShape}
- Margin: ${morphology.predominantMargin}
- Surface: ${morphology.predominantSurface}

CRITICAL MANDATES:
1. NEVER claim an organism has been definitively identified from photograph alone.
2. Label identification strictly as "Possible / Presumptive Identification".
3. Propose 1 to 3 plausible candidate microorganisms.
4. For each candidate, provide:
   - name (Latin binomial e.g. Escherichia coli)
   - taxonomicGroup
   - confidenceScore (0-100)
   - confidenceTier ("Low Presumptive" | "Moderate Presumptive" | "High Presumptive")
   - supportingCharacteristics (array of observable traits)
   - limitations (crucial diagnostic caveats)
   - suggestedConfirmatoryTests (array of gold-standard biochemical or molecular assays)
   - clinicalOrEcologicalSignificance (short summary)
   - biosafetyLevel ("BSL-1" | "BSL-2" | "BSL-3")

Respond ONLY with valid JSON matching an array of candidate objects.
`;

    // Clean base64 string
    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    if (text) {
      const candidates = JSON.parse(text);
      if (Array.isArray(candidates) && candidates.length > 0) {
        return candidates as OrganismCandidate[];
      }
    }
  } catch (e) {
    console.error('Multimodal Petri analysis failed, relying on local CV:', e);
  }
  return null;
}

function generateGroundedFallbackResponse(
  query: string,
  language: SupportedLanguage,
  mode: ChatResponseMode,
  context: string
): { text: string; sampleQuestions: string[] } {
  const q = query.toLowerCase();

  let answer = '';
  if (q.includes('gram') && (q.includes('stain') || q.includes('differentiation'))) {
    if (mode === '2marks') {
      answer = `**Gram Staining (2 Marks Answer):**\n\n• **Definition:** A differential staining technique developed by Christian Gram in 1884 that classifies bacteria into Gram-positive (purple) and Gram-negative (pink) based on cell wall peptidoglycan thickness and lipid content.\n• **Key Example:** *Staphylococcus aureus* (Gram-positive cocci in clusters) vs. *Escherichia coli* (Gram-negative bacilli).`;
    } else if (mode === 'viva') {
      answer = `**Viva Voce: Gram Staining Examiner Q&A**\n\n**Q1: What is the exact function of Gram's Iodine?**\n**Answer:** It acts as a mordant, forming a large, insoluble Crystal Violet-Iodine (CV-I) complex inside bacterial cells.\n\n**Q2: What happens if you over-decolorize with 95% alcohol?**\n**Answer:** Even Gram-positive bacteria lose the CV-I complex, causing them to stain falsely pink/Gram-negative.\n\n**Examiner Trap Tip:** Always specify that cultures older than 24 hours lose peptidoglycan integrity and give unreliable Gram-variable results!`;
    } else {
      answer = `**Gram Staining Principle & Mechanism:**\n\nGram staining is the most fundamental diagnostic stain in microbiology.\n\n### 1. Principle\nBacteria are differentiated according to their cell wall chemical composition:\n- **Gram-Positive:** Possess thick, multi-layered peptidoglycan (20-80 nm) containing teichoic acids. Alcohol dehydrates the wall, shrinking pores and trapping the primary Crystal Violet-Iodine (CV-I) precipitate (appears **Deep Violet/Purple**).\n- **Gram-Negative:** Possess thin peptidoglycan (2-7 nm) encased by an outer lipid-rich membrane (LPS). Alcohol dissolves outer membrane lipids and breaches the wall, washing out CV-I. Counterstain Safranin colors them **Pink/Magenta**.\n\n### 2. Four Sequential Reagents\n1. **Primary Stain:** Crystal Violet (60s)\n2. **Mordant:** Gram's Iodine (60s) -> forms insoluble CV-I complex\n3. **Decolorizer:** 95% Ethanol or Acetone-Alcohol (10-15s) -> critical differentiation step\n4. **Counterstain:** 0.5% Safranin (45-60s)\n\n### 3. Quick Comparison Table\n| Feature | Gram-Positive | Gram-Negative |\n| :--- | :--- | :--- |\n| Peptidoglycan | 40+ layers (Thick) | 1-2 layers (Thin) |\n| Outer Membrane | Absent | Present (contains LPS Lipid A) |\n| Teichoic Acid | Present | Absent |\n| Gram Color | Purple / Violet | Pink / Red |\n| Examples | *S. aureus*, *B. subtilis* | *E. coli*, *P. aeruginosa* |`;
    }
  } else if (q.includes('growth curve')) {
    answer = `**Bacterial Growth Curve Kinetics:**\n\nWhen inoculated into a batch liquid medium, bacteria follow four classical population phases:\n\n1. **Lag Phase:** Period of metabolic adjustment. No binary fission (cell number constant), but vigorous enzyme, RNA, and ATP synthesis.\n2. **Log (Exponential) Phase:** Cells divide at maximum, constant rate governed by genetic potential ($N_t = N_0 \\cdot 2^n$). Generation time is determined here. Cells are biochemically uniform and most susceptible to cell-wall acting antibiotics like Penicillin.\n3. **Stationary Phase:** Equilibrium where division rate equals death rate. Caused by nutrient exhaustion, space limitation, and toxic metabolite accumulation. Spore formation and antibiotic synthesis occur.\n4. **Death / Decline Phase:** Viable count decreases exponentially as toxic end-products accumulate.\n\n**Generation Time Formula:** $g = \\frac{t}{n} = \\frac{t \\cdot 0.301}{\\log_{10} N_t - \\log_{10} N_0}$`;
  } else {
    answer = `**Microbiology Knowledge Reference:**\n\n${context}\n\n*Summary for "${query}":*\nMicrobiology investigates microscopic organisms including bacteria, viruses, fungi, and parasites. In laboratory diagnostic workflows, morphological evaluation of Petri dish colonies is systematically combined with Gram staining, selective growth media, and biochemical profiling to arrive at reliable presumptive identification.`;
  }

  return {
    text: answer,
    sampleQuestions: [
      'What is the difference between Gram-positive and Gram-negative cell walls?',
      'Explain the phases of the bacterial growth curve.',
      'How does an autoclave achieve complete sterilization?'
    ]
  };
}
