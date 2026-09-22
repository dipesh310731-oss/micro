import { SupportedLanguage, ChatResponseMode, LabInputData, ColonyMorphologySummary, OrganismCandidate } from '../types/microbiology';
import { generatePresumptiveCandidates } from '../utils/imageProcessing';

export interface ChatResponse {
  text: string;
  sampleQuestions?: string[];
  error?: string;
}

export async function sendChatMessage(
  message: string,
  language: SupportedLanguage = 'en',
  mode: ChatResponseMode = 'detailed',
  history: { role: string; content: string }[] = []
): Promise<ChatResponse> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, language, mode, history }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.text,
      sampleQuestions: data.sampleQuestions || [],
    };
  } catch (err: any) {
    console.warn('API /api/chat error, utilizing local educational knowledge fallback:', err);
    // Local fallback for offline reliability
    return {
      text: `**Microbiology Knowledge Base (Local Mode):**\n\nYour question about "${message}" has been referenced against standard microbiological criteria.\n\nIn diagnostic laboratories, macroscopic colony characteristics (size, shape, margin, elevation, color, opacity) provide primary presumptive orientation. Confirmatory testing requires Gram staining, selective/differential media, and key biochemical assays (e.g. Catalase, Oxidase, Coagulase, IMViC).`,
      sampleQuestions: [
        'What is Gram staining?',
        'Explain the bacterial growth curve.',
        'What is the difference between selective and differential media?'
      ]
    };
  }
}

export async function requestPlateAnalysis(
  imageBase64: string,
  labInputs: LabInputData,
  morphology: ColonyMorphologySummary
): Promise<{ candidates: OrganismCandidate[]; disclaimer: string }> {
  try {
    const res = await fetch('/api/analyze-plate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64, labInputs, morphology }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();
    return {
      candidates: data.candidates || generatePresumptiveCandidates(morphology, labInputs),
      disclaimer: data.overallDisclaimer || 'Possible / Presumptive Identification. Not a confirmed diagnosis.',
    };
  } catch (err) {
    console.warn('Multimodal server analysis fallback to rule engine:', err);
    return {
      candidates: generatePresumptiveCandidates(morphology, labInputs),
      disclaimer: 'Possible / Presumptive Identification. Colony photography alone cannot confirm organism identity. Confirmatory biochemical and molecular tests are strictly required.',
    };
  }
}
