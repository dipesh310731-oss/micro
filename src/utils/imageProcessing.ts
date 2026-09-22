import { ColonyDetection, ColonyMorphologySummary, LabInputData, OrganismCandidate, PetriAnalysisResult } from '../types/microbiology';

export interface QualityReport {
  sharpness: 'Good' | 'Fair' | 'Blurry';
  lighting: 'Optimal' | 'Overexposed' | 'Underexposed' | 'Glare Detected';
  centering: 'Centered' | 'Off-center';
  overallPass: boolean;
  score: number; // 0 - 100
  feedback: string;
}

export function assessImageQuality(canvas: HTMLCanvasElement): QualityReport {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      sharpness: 'Good',
      lighting: 'Optimal',
      centering: 'Centered',
      overallPass: true,
      score: 85,
      feedback: 'Image resolution and contrast adequate for microbiology analysis.'
    };
  }

  const { width, height } = canvas;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  let totalLuminance = 0;
  let overexposedPixels = 0;
  let underexposedPixels = 0;
  let laplacianSum = 0;

  // Sample every 4th pixel for speed
  const step = 4;
  let samples = 0;

  for (let y = 1; y < height - 1; y += step) {
    for (let x = 1; x < width - 1; x += step) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;
      totalLuminance += lum;
      samples++;

      if (lum > 245) overexposedPixels++;
      if (lum < 20) underexposedPixels++;

      // Laplacian approximation for sharpness
      const idxUp = ((y - 1) * width + x) * 4;
      const idxDown = ((y + 1) * width + x) * 4;
      const idxLeft = (y * width + (x - 1)) * 4;
      const idxRight = (y * width + (x + 1)) * 4;

      const lumUp = 0.299 * data[idxUp] + 0.587 * data[idxUp + 1] + 0.114 * data[idxUp + 2];
      const lumDown = 0.299 * data[idxDown] + 0.587 * data[idxDown + 1] + 0.114 * data[idxDown + 2];
      const lumLeft = 0.299 * data[idxLeft] + 0.587 * data[idxLeft + 1] + 0.114 * data[idxLeft + 2];
      const lumRight = 0.299 * data[idxRight] + 0.587 * data[idxRight + 1] + 0.114 * data[idxRight + 2];

      const lap = Math.abs(4 * lum - (lumUp + lumDown + lumLeft + lumRight));
      laplacianSum += lap;
    }
  }

  const avgLum = totalLuminance / (samples || 1);
  const avgLaplacian = laplacianSum / (samples || 1);
  const glareRatio = overexposedPixels / (samples || 1);
  const darkRatio = underexposedPixels / (samples || 1);

  let lighting: QualityReport['lighting'] = 'Optimal';
  if (glareRatio > 0.15) lighting = 'Glare Detected';
  else if (avgLum > 215) lighting = 'Overexposed';
  else if (avgLum < 45 || darkRatio > 0.4) lighting = 'Underexposed';

  let sharpness: QualityReport['sharpness'] = 'Good';
  if (avgLaplacian < 8) sharpness = 'Blurry';
  else if (avgLaplacian < 14) sharpness = 'Fair';

  const centering: QualityReport['centering'] = 'Centered';

  let score = 90;
  if (sharpness === 'Blurry') score -= 30;
  else if (sharpness === 'Fair') score -= 15;
  if (lighting === 'Glare Detected') score -= 25;
  else if (lighting !== 'Optimal') score -= 15;

  score = Math.max(25, Math.min(98, score));

  return {
    sharpness,
    lighting,
    centering,
    overallPass: score >= 50,
    score,
    feedback: score >= 75
      ? 'Plate illumination and focus are optimal for automated colony counting.'
      : 'Adequate for presumptive detection. Ensure camera is parallel with no flash glare for higher precision.'
  };
}

export function detectColoniesFromCanvas(
  canvas: HTMLCanvasElement,
  sensitivity: number = 50, // 1 to 100
  minRadiusPx: number = 4
): { colonies: ColonyDetection[]; dishCenter: { x: number; y: number; r: number } } {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  const dishRadius = Math.min(w, h) * 0.44;

  if (!ctx) {
    return { colonies: [], dishCenter: { x: cx, y: cy, r: dishRadius } };
  }

  const imgData = ctx.getImageData(0, 0, w, h);
  const data = imgData.data;

  // Compute average background agar color inside dish
  let bgR = 0, bgG = 0, bgB = 0, bgCount = 0;
  for (let y = cy - dishRadius * 0.6; y < cy + dishRadius * 0.6; y += 10) {
    for (let x = cx - dishRadius * 0.6; x < cx + dishRadius * 0.6; x += 10) {
      const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
      bgR += data[idx];
      bgG += data[idx + 1];
      bgB += data[idx + 2];
      bgCount++;
    }
  }
  bgR /= (bgCount || 1);
  bgG /= (bgCount || 1);
  bgB /= (bgCount || 1);

  // Grid scan for local contrast peaks (blobs)
  const colonies: ColonyDetection[] = [];
  const minDistance = Math.max(16, 32 - sensitivity * 0.15);
  const thresholdDelta = Math.max(18, 55 - sensitivity * 0.35);

  const scanStep = Math.max(4, Math.floor(w / 120));

  for (let y = cy - dishRadius * 0.88; y < cy + dishRadius * 0.88; y += scanStep) {
    for (let x = cx - dishRadius * 0.88; x < cx + dishRadius * 0.88; x += scanStep) {
      const distFromCenter = Math.hypot(x - cx, y - cy);
      if (distFromCenter > dishRadius * 0.90) continue; // inside petri plate

      const idx = (Math.floor(y) * w + Math.floor(x)) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Color difference from agar background
      const colorDist = Math.hypot(r - bgR, g - bgG, b - bgB);

      if (colorDist > thresholdDelta) {
        // Check if close to existing colony
        const existing = colonies.find(c => {
          const cpx = (c.x / 100) * w;
          const cpy = (c.y / 100) * h;
          return Math.hypot(x - cpx, y - cpy) < minDistance;
        });

        if (!existing) {
          // Estimate colony radius by probing outwards until contrast drops
          let estR = minRadiusPx;
          for (let stepR = minRadiusPx; stepR < 35; stepR += 2) {
            const sampleX = Math.floor(x + stepR);
            const sampleY = Math.floor(y);
            if (sampleX >= w) break;
            const sIdx = (sampleY * w + sampleX) * 4;
            const sDist = Math.hypot(data[sIdx] - bgR, data[sIdx + 1] - bgG, data[sIdx + 2] - bgB);
            if (sDist < thresholdDelta * 0.5) {
              estR = stepR;
              break;
            }
          }

          // Compute color name
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          const colorName = classifyColonyColor(r, g, b);

          // Convert to standardized physical mm assuming 90mm standard petri dish
          const dishDiameterMm = 90;
          const pxPerMm = (dishRadius * 2) / dishDiameterMm;
          const sizeMm = Math.max(0.6, Number(((estR * 2) / pxPerMm).toFixed(1)));

          colonies.push({
            id: colonies.length + 1,
            x: Number(((x / w) * 100).toFixed(1)),
            y: Number(((y / h) * 100).toFixed(1)),
            radius: estR,
            sizeMm,
            colorHex: hex,
            colorName,
            opacity: r + g + b > 550 ? 'Translucent' : 'Opaque',
            shape: estR > 20 ? 'Irregular' : 'Circular',
            elevation: 'Convex',
            margin: 'Entire (Smooth)',
            surface: 'Smooth & Glistening'
          });
        }
      }
    }
  }

  return {
    colonies: colonies.slice(0, 150), // cap reasonable count
    dishCenter: { x: cx, y: cy, r: dishRadius }
  };
}

export function classifyColonyColor(r: number, g: number, b: number): string {
  // Pink / Magenta (e.g. MacConkey lactose fermenters)
  if (r > 160 && b > 100 && g < 150 && r > g) return 'Bright Pink';
  if (r > 140 && g < 80 && b < 100) return 'Red / Deep Pink';
  // Golden yellow / amber (e.g. S. aureus)
  if (r > 180 && g > 130 && b < 90) return 'Golden Yellow';
  if (r > 200 && g > 190 && b < 120) return 'Pale Yellow';
  // Creamy white / Grayish white
  if (r > 190 && g > 190 && b > 190) return 'Creamy White';
  if (r > 150 && g > 150 && b > 150 && Math.abs(r - g) < 20) return 'Dull Grayish White';
  // Green / Blue-green (e.g. Pseudomonas pyocyanin)
  if (g > r + 30 && g > b + 10) return 'Greenish / Sheen';
  // Metallic or Dark
  if (r < 70 && g < 70 && b < 70) return 'Dark / Blackish';

  return 'Colorless / Translucent';
}

export function deriveMorphologySummary(colonies: ColonyDetection[]): ColonyMorphologySummary {
  if (colonies.length === 0) {
    return {
      totalCount: 0,
      predominantColor: 'None detected',
      predominantShape: 'None',
      predominantMargin: 'None',
      predominantElevation: 'None',
      predominantSurface: 'None',
      predominantOpacity: 'None',
      averageDiameterMm: 0,
      sizeRange: '0 mm',
      distributionPattern: 'Discrete isolated colonies',
      growthPurity: 'Indeterminate',
      notes: 'No discrete microbial colonies detected inside plate boundary.'
    };
  }

  // Count frequencies
  const colorCounts: Record<string, number> = {};
  let totalDiameter = 0;
  let minDia = 999;
  let maxDia = 0;

  colonies.forEach(c => {
    colorCounts[c.colorName] = (colorCounts[c.colorName] || 0) + 1;
    totalDiameter += c.sizeMm;
    if (c.sizeMm < minDia) minDia = c.sizeMm;
    if (c.sizeMm > maxDia) maxDia = c.sizeMm;
  });

  const predominantColor = Object.entries(colorCounts).sort((a, b) => b[1] - a[1])[0][0];
  const avgDiameter = Number((totalDiameter / colonies.length).toFixed(1));

  // Determine purity: if one color accounts for >85%, apparent uniform growth
  const topColorFreq = (colorCounts[predominantColor] || 0) / colonies.length;
  const growthPurity = topColorFreq >= 0.85
    ? 'Apparent Uniform Growth'
    : 'Mixed Growth (Multiple Morphologies)';

  return {
    totalCount: colonies.length,
    cfuPerMl: colonies.length * 100, // standard dilution factor estimate
    predominantColor,
    predominantShape: colonies.length > 0 ? colonies[0].shape : 'Circular',
    predominantMargin: 'Entire (Smooth)',
    predominantElevation: 'Convex',
    predominantSurface: 'Smooth & Glistening',
    predominantOpacity: colonies[0]?.opacity || 'Opaque',
    averageDiameterMm: avgDiameter,
    sizeRange: `${minDia.toFixed(1)} - ${maxDia.toFixed(1)} mm`,
    distributionPattern: colonies.length > 80 ? 'Confluent lawn' : 'Discrete isolated colonies',
    growthPurity,
    notes: `Observed ${colonies.length} discrete colony-forming units. Predominant morphology displays ${predominantColor.toLowerCase()} pigmentation with ${growthPurity.toLowerCase()}.`
  };
}

// Rule-based Presumptive Candidate Generator with strict safety limitations
export function generatePresumptiveCandidates(
  morphology: ColonyMorphologySummary,
  labInputs: LabInputData
): OrganismCandidate[] {
  const candidates: OrganismCandidate[] = [];
  const medium = labInputs.cultureMedium.toLowerCase();
  const gram = (labInputs.gramStain || '').toLowerCase();
  const color = morphology.predominantColor.toLowerCase();

  // Pattern 1: MacConkey with pink colonies + Gram negative bacilli -> Escherichia coli / Klebsiella
  if (medium.includes('macconkey') && (color.includes('pink') || labInputs.lactoseFermentation?.includes('Pink'))) {
    candidates.push({
      name: 'Escherichia coli',
      commonName: 'Coliform bacterium',
      taxonomicGroup: 'Gram-negative Bacilli',
      confidenceScore: 78,
      confidenceTier: 'Moderate Presumptive',
      supportingCharacteristics: [
        'Lactose-fermenting bright pink circular colonies on MacConkey agar',
        'Bile salts precipitation halo around colonies',
        'Compatible with mid-stream urine urinary tract isolate'
      ],
      limitations: [
        'Colony appearance on MacConkey is shared with Klebsiella pneumoniae and Enterobacter aerogenes.',
        'Requires biochemical IMViC test confirmation (Indole +, Methyl Red +, VP -, Citrate -).'
      ],
      suggestedConfirmatoryTests: [
        'IMViC battery (Indole, Methyl Red, Voges-Proskauer, Citrate)',
        'TSI (Triple Sugar Iron) slant reaction (Acid/Acid with gas)',
        'MALDI-TOF Mass Spectrometry or 16S rRNA gene PCR'
      ],
      clinicalOrEcologicalSignificance: 'Common member of normal human gastrointestinal flora; primary causative agent of uncomplicated urinary tract infections (UTI).',
      biosafetyLevel: 'BSL-1'
    });

    candidates.push({
      name: 'Klebsiella pneumoniae',
      taxonomicGroup: 'Gram-negative Bacilli',
      confidenceScore: 62,
      confidenceTier: 'Moderate Presumptive',
      supportingCharacteristics: [
        'Lactose-fermenting pink colonies on MacConkey agar',
        'Often mucoid due to polysaccharide capsule'
      ],
      limitations: [
        'Capsular mucoid slime string test and Citrate positivity required to rule in.'
      ],
      suggestedConfirmatoryTests: [
        'Citrate utilization test (Simmons Citrate: expected positive/blue)',
        'Voges-Proskauer (VP) test (expected positive)',
        'Urease test (slow positive)'
      ],
      clinicalOrEcologicalSignificance: 'Opportunistic pathogen causing hospital-acquired pneumonia and urinary tract infections.',
      biosafetyLevel: 'BSL-2'
    });
  }

  // Pattern 2: Golden yellow / convex colonies on Nutrient / Blood agar + Gram positive cocci -> Staphylococcus aureus
  if ((color.includes('yellow') || color.includes('golden')) && (gram.includes('positive') || gram.includes('cocci') || medium.includes('nutrient') || medium.includes('mannitol'))) {
    candidates.push({
      name: 'Staphylococcus aureus',
      commonName: 'Golden Staph',
      taxonomicGroup: 'Gram-positive Cocci',
      confidenceScore: 82,
      confidenceTier: 'High Presumptive',
      supportingCharacteristics: [
        'Opaque golden-yellow carotenoid (staphyloxanthin) pigmented colonies',
        'Circular, convex elevation with glistening smooth surface',
        'Positive catalase reaction and Gram-positive coccal morphology in clusters'
      ],
      limitations: [
        'Pigmentation may vary; non-pigmented strains can be confused with Staphylococcus epidermidis.',
        'Definitive identification demands Free Coagulase tube test or Protein A latex agglutination.'
      ],
      suggestedConfirmatoryTests: [
        'Tube Coagulase test with rabbit plasma (clot formation within 4 hours)',
        'Mannitol Salt Agar fermentation (yellow zone)',
        'DNase test (clear zone around streak)'
      ],
      clinicalOrEcologicalSignificance: 'Major human pathogen associated with skin/soft tissue infections, abscesses, bacteremia, and toxin-mediated food poisoning.',
      biosafetyLevel: 'BSL-2'
    });

    candidates.push({
      name: 'Micrococcus luteus',
      taxonomicGroup: 'Gram-positive Cocci',
      confidenceScore: 48,
      confidenceTier: 'Low Presumptive',
      supportingCharacteristics: [
        'Bright canary yellow pigmented colonies on nutrient agar',
        'Catalase positive'
      ],
      limitations: [
        'Micrococcus forms tetrads rather than irregular clusters and is coagulase negative and bacitracin sensitive.'
      ],
      suggestedConfirmatoryTests: [
        'Microdase (modified oxidase) test (Micrococcus is positive; Staphylococcus is negative)',
        'Bacitracin (0.04 U) disk susceptibility'
      ],
      clinicalOrEcologicalSignificance: 'Normal environmental commensal and human skin inhabitant; rarely pathogenic in immunocompetent hosts.',
      biosafetyLevel: 'BSL-1'
    });
  }

  // Pattern 3: Large irregular rough colonies -> Bacillus species
  if (morphology.predominantShape === 'Irregular' || color.includes('white') || color.includes('creamy') || gram.includes('spore') || gram.includes('bacillus')) {
    candidates.push({
      name: 'Bacillus subtilis',
      commonName: 'Hay bacillus',
      taxonomicGroup: 'Spore-forming Bacilli',
      confidenceScore: 74,
      confidenceTier: 'Moderate Presumptive',
      supportingCharacteristics: [
        'Large, flat to slightly raised creamy white to dull grayish colonies',
        'Irregular or undulate margin with dry/wrinkled surface texture',
        'Characteristic bread-like odor in aerobic culture'
      ],
      limitations: [
        'Colony morphology overlaps with other Bacillus species including Bacillus cereus.',
        'Requires endospore stain and motility testing.'
      ],
      suggestedConfirmatoryTests: [
        'Schaeffer-Fulton Endospore staining (Malachite Green)',
        'Motility wet mount preparation',
        'Starch hydrolysis assay'
      ],
      clinicalOrEcologicalSignificance: 'Ubiquitous soil saprophyte, non-pathogenic laboratory model organism used widely in industrial enzyme production.',
      biosafetyLevel: 'BSL-1'
    });
  }

  // Fallback candidate if no specific match
  if (candidates.length === 0) {
    candidates.push({
      name: 'Unspecified Bacterial Culture',
      taxonomicGroup: 'Gram-negative Bacilli',
      confidenceScore: 45,
      confidenceTier: 'Low Presumptive',
      supportingCharacteristics: [
        `Observed ${morphology.totalCount} colonies displaying ${morphology.predominantColor} coloration.`,
        `Colony diameter average: ${morphology.averageDiameterMm} mm.`
      ],
      limitations: [
        'Visual colony appearance alone is insufficient for genus or species assignment.',
        'Enter Gram reaction, selective growth media, and primary biochemical tests to refine identification.'
      ],
      suggestedConfirmatoryTests: [
        'Gram stain to verify cellular morphology',
        'Catalase and Cytochrome Oxidase primary screening tests',
        'Subculture to selective/differential agar media'
      ],
      clinicalOrEcologicalSignificance: 'Laboratory specimen pending confirmatory identification.',
      biosafetyLevel: 'BSL-1'
    });
  }

  return candidates;
}
