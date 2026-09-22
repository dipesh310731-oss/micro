export type SupportedLanguage = 'en' | 'mr' | 'hi' | 'hinglish';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  preferredLanguage: SupportedLanguage;
  institution?: string;
  course?: string;
  role: 'student' | 'researcher' | 'lab_technician' | 'educator';
  joinedDate: string;
  studyStreakDays: number;
  completedTopics: string[];
  completedMcqCount: number;
  correctMcqCount: number;
  vivaAttemptCount: number;
}

export interface ColonyDetection {
  id: number;
  x: number; // percentage (0 - 100) or pixel
  y: number;
  radius: number; // approximate pixels
  sizeMm: number; // approximate mm
  colorHex: string;
  colorName: string;
  opacity: 'Opaque' | 'Translucent' | 'Transparent';
  shape: 'Circular' | 'Irregular' | 'Filamentous' | 'Rhizoid';
  elevation: 'Flat' | 'Raised' | 'Convex' | 'Pulvinate' | 'Umbonate';
  margin: 'Entire (Smooth)' | 'Undulate (Wavy)' | 'Lobate' | 'Serrate' | 'Filamentous';
  surface: 'Smooth & Glistening' | 'Rough' | 'Dull' | 'Mucoid' | 'Wrinkled';
  isUserAdded?: boolean;
}

export interface ColonyMorphologySummary {
  totalCount: number;
  cfuPerMl?: number;
  predominantColor: string;
  predominantShape: string;
  predominantMargin: string;
  predominantElevation: string;
  predominantSurface: string;
  predominantOpacity: string;
  averageDiameterMm: number;
  sizeRange: string;
  distributionPattern: 'Discrete isolated colonies' | 'Confluent lawn' | 'Swarming' | 'Radial growth';
  growthPurity: 'Apparent Uniform Growth' | 'Mixed Growth (Multiple Morphologies)' | 'Indeterminate';
  notes: string;
}

export interface LabInputData {
  sampleName: string;
  sampleType: string; // e.g. Urine, Water, Soil, Food, Skin Swab, Sputum, Blood
  cultureMedium: string; // e.g. Nutrient Agar, MacConkey Agar, Blood Agar, EMB Agar, Mannitol Salt Agar
  incubationTemp: string; // e.g. 37°C
  incubationTimeHours: string; // e.g. 24 hours
  atmosphere: 'Aerobic' | 'Anaerobic' | 'Microaerophilic' | 'Capnophilic';
  gramStain?: 'Gram-positive Cocci' | 'Gram-negative Bacilli' | 'Gram-positive Bacilli' | 'Gram-negative Cocci' | 'Not performed / Pending' | string;
  catalaseTest?: 'Positive' | 'Negative' | 'Not tested';
  oxidaseTest?: 'Positive' | 'Negative' | 'Not tested';
  lactoseFermentation?: 'Lactose Fermenter (Pink)' | 'Non-Lactose Fermenter (Colorless)' | 'Not applicable';
  hemolysis?: 'Alpha (Partial)' | 'Beta (Complete)' | 'Gamma (None)' | 'Not applicable';
  otherObservations?: string;
}

export interface OrganismCandidate {
  name: string; // e.g., "Escherichia coli"
  commonName?: string;
  taxonomicGroup: 'Gram-negative Bacilli' | 'Gram-positive Cocci' | 'Spore-forming Bacilli' | 'Fungi/Yeast' | string;
  confidenceScore: number; // 0 - 100
  confidenceTier: 'Low Presumptive' | 'Moderate Presumptive' | 'High Presumptive';
  supportingCharacteristics: string[];
  contradictingOrRareFeatures?: string[];
  limitations: string[];
  suggestedConfirmatoryTests: string[];
  clinicalOrEcologicalSignificance: string;
  biosafetyLevel: 'BSL-1' | 'BSL-2' | 'BSL-3';
}

export interface PetriAnalysisResult {
  id: string;
  timestamp: string;
  sampleName: string;
  originalImage: string; // data URL or URL
  processedImage?: string;
  petriPlateDetected: boolean;
  plateConfidence: number;
  imageQuality: {
    sharpness: 'Good' | 'Fair' | 'Blurry';
    lighting: 'Optimal' | 'Overexposed' | 'Underexposed' | 'Glare Detected';
    centering: 'Centered' | 'Off-center';
  };
  colonies: ColonyDetection[];
  morphology: ColonyMorphologySummary;
  labInputs: LabInputData;
  presumptiveCandidates: OrganismCandidate[];
  overallDisclaimer: string;
  userNotes?: string;
}

export type ChatResponseMode = 'simple' | 'detailed' | '2marks' | '5marks' | '10marks' | 'viva' | 'mcq';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  mode?: ChatResponseMode;
  language: SupportedLanguage;
  relatedTopics?: string[];
  diagramAscii?: string;
  tableData?: { headers: string[]; rows: string[][] };
  sampleQuestions?: string[];
}

export interface StudyTopic {
  id: string;
  categoryId: string;
  title: string;
  marathiTitle?: string;
  hindiTitle?: string;
  overview: string;
  detailedNotes: string[];
  definitions: { term: string; definition: string }[];
  keyPoints: string[];
  diagramDescription?: string;
  diagramSvg?: string;
  comparisonTable?: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  twoMarkAnswers: { question: string; answer: string }[];
  fiveMarkAnswers: { question: string; answer: string }[];
  tenMarkAnswers: { question: string; answer: string }[];
  vivaQuestions: { question: string; answer: string; tip?: string }[];
  mcqs: {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  quickRevisionCards: { front: string; back: string }[];
  relatedTopicIds: string[];
}

export interface StudyCategory {
  id: string;
  name: string;
  marathiName: string;
  hindiName: string;
  icon: string;
  description: string;
  topicCount: number;
}

export interface LabTechnique {
  id: string;
  category: 'Microscopy' | 'Staining' | 'Culture & Media' | 'Biochemical Tests' | 'Molecular Techniques' | 'Instruments';
  title: string;
  principle: string;
  purpose: string;
  materialsRequired: string[];
  stepByStepProtocol: string[];
  expectedObservations: string[];
  interpretation: string;
  limitations: string[];
  biosafetyGuidelines: string[];
  commonTroubleshooting: { problem: string; cause: string; solution: string }[];
}
