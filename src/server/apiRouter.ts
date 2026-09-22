import express, { Request, Response } from 'express';
import { askMicrobiologyAI, analyzePetriPlateWithAI } from './geminiService';
import { generatePresumptiveCandidates, deriveMorphologySummary } from '../utils/imageProcessing';

export const apiRouter = express.Router();

apiRouter.use(express.json({ limit: '25mb' }));

// Health check
apiRouter.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'MICRO ANALYSIS',
    tagline: 'Analyze. Learn. Discover.',
    timestamp: new Date().toISOString(),
  });
});

// AI Chat Endpoint
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en', mode = 'detailed', history = [] } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const aiResponse = await askMicrobiologyAI(message, language, mode, history);
    res.json(aiResponse);
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({
      error: 'Failed to process microbiology question',
      details: error?.message || 'Internal server error',
    });
  }
});

// Petri Plate AI Organism Candidate Analysis
apiRouter.post('/analyze-plate', async (req: Request, res: Response) => {
  try {
    const { imageBase64, labInputs, morphology } = req.body;
    if (!labInputs || !morphology) {
      res.status(400).json({ error: 'labInputs and morphology are required' });
      return;
    }

    // Try Gemini multimodal first if imageBase64 is present
    let candidates = null;
    if (imageBase64 && process.env.GEMINI_API_KEY) {
      candidates = await analyzePetriPlateWithAI(imageBase64, labInputs, morphology);
    }

    // If multimodal unavailable or didn't return candidates, use expert rule-based CV engine
    if (!candidates || candidates.length === 0) {
      candidates = generatePresumptiveCandidates(morphology, labInputs);
    }

    res.json({
      candidates,
      overallDisclaimer: 'Possible / Presumptive Identification. Colony photography alone cannot confirm organism identity. Confirmatory biochemical and molecular tests are strictly required.',
    });
  } catch (error: any) {
    console.error('Error in /api/analyze-plate:', error);
    res.status(500).json({
      error: 'Failed to analyze petri plate',
      details: error?.message,
    });
  }
});
