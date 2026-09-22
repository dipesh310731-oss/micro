import { LabInputData, ColonyDetection } from '../types/microbiology';

export interface SamplePlatePreset {
  id: string;
  name: string;
  organismHint: string;
  description: string;
  labInputs: LabInputData;
  mockColonies: ColonyDetection[];
  imageDataUrl: string;
}

// Generate realistic Petri plate data URL via procedural canvas rendering
function createPetriPlateImage(
  agarColor: string,
  rimColor: string,
  colonies: { x: number; y: number; r: number; color: string; halo?: string }[]
): string {
  // Use SVG data URL which is crisp, lightweight, and renders reliably in all browsers
  const width = 600;
  const height = 600;
  const cx = 300;
  const cy = 300;
  const dishRadius = 260;

  const colonySvgElements = colonies.map((c, i) => {
    const px = (c.x / 100) * 520 + (300 - 260);
    const py = (c.y / 100) * 520 + (300 - 260);
    const haloElement = c.halo
      ? `<circle cx="${px}" cy="${py}" r="${c.r * 2.2}" fill="${c.halo}" opacity="0.45" filter="blur(3px)" />`
      : '';
    return `
      ${haloElement}
      <g id="colony-svg-${i}">
        <circle cx="${px + 1}" cy="${py + 1.5}" r="${c.r}" fill="#000000" opacity="0.2" filter="blur(1px)" />
        <circle cx="${px}" cy="${py}" r="${c.r}" fill="${c.color}" />
        <circle cx="${px - c.r * 0.3}" cy="${py - c.r * 0.3}" r="${Math.max(1.5, c.r * 0.35)}" fill="#ffffff" opacity="0.5" />
      </g>
    `;
  }).join('');

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <defs>
        <radialGradient id="agarGrad" cx="45%" cy="45%" r="65%">
          <stop offset="0%" stop-color="${agarColor}" stop-opacity="0.9" />
          <stop offset="85%" stop-color="${agarColor}" stop-opacity="1" />
          <stop offset="100%" stop-color="#2D112A" stop-opacity="0.8" />
        </radialGradient>
        <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#E2E8F0" />
          <stop offset="50%" stop-color="${rimColor}" />
          <stop offset="100%" stop-color="#94A3B8" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#3B0764" flood-opacity="0.25" />
        </filter>
      </defs>

      <!-- Background lab workbench surface -->
      <rect width="${width}" height="${height}" fill="#FAF7FD" />
      
      <!-- Petri Dish Outer Shadow and Rim -->
      <circle cx="${cx}" cy="${cy}" r="${dishRadius + 14}" fill="none" stroke="url(#rimGrad)" stroke-width="12" filter="url(#shadow)" />
      <circle cx="${cx}" cy="${cy}" r="${dishRadius + 6}" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.7" />
      
      <!-- Dish Plastic Wall -->
      <circle cx="${cx}" cy="${cy}" r="${dishRadius}" fill="url(#agarGrad)" />
      
      <!-- Petri Agar Surface Highlights -->
      <ellipse cx="${cx - 80}" cy="${cy - 90}" rx="140" ry="70" fill="#FFFFFF" opacity="0.08" transform="rotate(-25, ${cx - 80}, ${cy - 90})" />

      <!-- Rendered Colonies -->
      ${colonySvgElements}

      <!-- Glass Rim Reflection Accent -->
      <circle cx="${cx}" cy="${cy}" r="${dishRadius - 3}" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.35" />
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const SAMPLE_PLATES: SamplePlatePreset[] = [
  {
    id: 'sample-ecoli-macconkey',
    name: 'Sample A: Lactose Fermenter on MacConkey Agar',
    organismHint: 'Escherichia coli (Presumptive)',
    description: 'Isolated bright pink colonies with surrounding bile salt precipitation halo on MacConkey agar.',
    labInputs: {
      sampleName: 'Clinical Urine Specimen - Plate #402',
      sampleType: 'Urine (Mid-stream Clean Catch)',
      cultureMedium: 'MacConkey Agar',
      incubationTemp: '37°C',
      incubationTimeHours: '24 hours',
      atmosphere: 'Aerobic',
      gramStain: 'Gram-negative Bacilli',
      catalaseTest: 'Positive',
      oxidaseTest: 'Negative',
      lactoseFermentation: 'Lactose Fermenter (Pink)',
      hemolysis: 'Not applicable',
      otherObservations: 'Indole positive, Citrate negative (IMViC: ++--), typical coliform appearance.'
    },
    mockColonies: [
      { id: 1, x: 28, y: 32, radius: 14, sizeMm: 2.4, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 2, x: 42, y: 25, radius: 13, sizeMm: 2.2, colorHex: '#DB2777', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 3, x: 62, y: 34, radius: 15, sizeMm: 2.5, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 4, x: 74, y: 48, radius: 12, sizeMm: 2.0, colorHex: '#DB2777', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 5, x: 58, y: 64, radius: 16, sizeMm: 2.6, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 6, x: 38, y: 72, radius: 13, sizeMm: 2.2, colorHex: '#BE185D', colorName: 'Deep Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 7, x: 24, y: 56, radius: 14, sizeMm: 2.3, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 8, x: 48, y: 46, radius: 15, sizeMm: 2.5, colorHex: '#DB2777', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 9, x: 34, y: 44, radius: 12, sizeMm: 2.0, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 10, x: 66, y: 52, radius: 11, sizeMm: 1.8, colorHex: '#DB2777', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 11, x: 46, y: 60, radius: 10, sizeMm: 1.7, colorHex: '#BE185D', colorName: 'Deep Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 12, x: 54, y: 28, radius: 12, sizeMm: 2.0, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 13, x: 70, y: 68, radius: 9, sizeMm: 1.5, colorHex: '#DB2777', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 14, x: 22, y: 40, radius: 11, sizeMm: 1.8, colorHex: '#EC4899', colorName: 'Bright Pink', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' }
    ],
    imageDataUrl: createPetriPlateImage(
      '#991B1B', // Deep reddish MacConkey base
      '#CBD5E1',
      [
        { x: 28, y: 32, r: 14, color: '#F43F5E', halo: '#FB7185' },
        { x: 42, y: 25, r: 13, color: '#E11D48', halo: '#FDA4AF' },
        { x: 62, y: 34, r: 15, color: '#F43F5E', halo: '#FB7185' },
        { x: 74, y: 48, r: 12, color: '#E11D48' },
        { x: 58, y: 64, r: 16, color: '#F43F5E', halo: '#FB7185' },
        { x: 38, y: 72, r: 13, color: '#BE123C' },
        { x: 24, y: 56, r: 14, color: '#F43F5E' },
        { x: 48, y: 46, r: 15, color: '#E11D48', halo: '#FB7185' },
        { x: 34, y: 44, r: 12, color: '#F43F5E' },
        { x: 66, y: 52, r: 11, color: '#E11D48' },
        { x: 46, y: 60, r: 10, color: '#BE123C' },
        { x: 54, y: 28, r: 12, color: '#F43F5E' },
        { x: 70, y: 68, r: 9, color: '#E11D48' },
        { x: 22, y: 40, r: 11, color: '#F43F5E' },
      ]
    )
  },
  {
    id: 'sample-staph-nutrient',
    name: 'Sample B: Golden Pigmented Staphylococci',
    organismHint: 'Staphylococcus aureus (Presumptive)',
    description: 'Opaque golden-yellow circular colonies with convex elevation and glistening sheen on Nutrient agar.',
    labInputs: {
      sampleName: 'Wound Pus Swab - Plate #108',
      sampleType: 'Wound Swab',
      cultureMedium: 'Nutrient Agar',
      incubationTemp: '37°C',
      incubationTimeHours: '24 hours',
      atmosphere: 'Aerobic',
      gramStain: 'Gram-positive Cocci in Clusters',
      catalaseTest: 'Positive',
      oxidaseTest: 'Negative',
      lactoseFermentation: 'Not applicable',
      hemolysis: 'Beta (Complete)',
      otherObservations: 'Coagulase positive (tube test clot formed within 4 hours).'
    },
    mockColonies: [
      { id: 1, x: 35, y: 30, radius: 12, sizeMm: 2.0, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 2, x: 50, y: 25, radius: 14, sizeMm: 2.3, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 3, x: 68, y: 38, radius: 11, sizeMm: 1.8, colorHex: '#D97706', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 4, x: 62, y: 55, radius: 13, sizeMm: 2.1, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 5, x: 44, y: 68, radius: 12, sizeMm: 2.0, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 6, x: 28, y: 52, radius: 13, sizeMm: 2.2, colorHex: '#D97706', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 7, x: 46, y: 45, radius: 15, sizeMm: 2.5, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 8, x: 36, y: 44, radius: 10, sizeMm: 1.7, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' },
      { id: 9, x: 56, y: 40, radius: 11, sizeMm: 1.8, colorHex: '#F59E0B', colorName: 'Golden Yellow', opacity: 'Opaque', shape: 'Circular', elevation: 'Convex', margin: 'Entire (Smooth)', surface: 'Smooth & Glistening' }
    ],
    imageDataUrl: createPetriPlateImage(
      '#FDF6B2', // Pale straw amber nutrient agar
      '#CBD5E1',
      [
        { x: 35, y: 30, r: 12, color: '#F59E0B' },
        { x: 50, y: 25, r: 14, color: '#D97706' },
        { x: 68, y: 38, r: 11, color: '#F59E0B' },
        { x: 62, y: 55, r: 13, color: '#D97706' },
        { x: 44, y: 68, r: 12, color: '#F59E0B' },
        { x: 28, y: 52, r: 13, color: '#F59E0B' },
        { x: 46, y: 45, r: 15, color: '#D97706' },
        { x: 36, y: 44, r: 10, color: '#F59E0B' },
        { x: 56, y: 40, r: 11, color: '#F59E0B' }
      ]
    )
  },
  {
    id: 'sample-bacillus-nutrient',
    name: 'Sample C: Spore-forming Bacillus on Nutrient Agar',
    organismHint: 'Bacillus subtilis / Bacillus species (Presumptive)',
    description: 'Large, opaque, creamy-white colonies with irregular undulate margins and dry, wrinkled surfaces.',
    labInputs: {
      sampleName: 'Soil Dilution Extract - Plate #22',
      sampleType: 'Agricultural Soil Sample',
      cultureMedium: 'Nutrient Agar',
      incubationTemp: '30°C',
      incubationTimeHours: '36 hours',
      atmosphere: 'Aerobic',
      gramStain: 'Gram-positive Bacilli with Endospores',
      catalaseTest: 'Positive',
      oxidaseTest: 'Positive',
      lactoseFermentation: 'Not applicable',
      hemolysis: 'Beta (Complete)',
      otherObservations: 'Heat-resistant endospores observed upon Schaeffer-Fulton staining.'
    },
    mockColonies: [
      { id: 1, x: 38, y: 35, radius: 24, sizeMm: 4.8, colorHex: '#F1F5F9', colorName: 'Creamy White', opacity: 'Opaque', shape: 'Irregular', elevation: 'Flat', margin: 'Undulate (Wavy)', surface: 'Dull' },
      { id: 2, x: 64, y: 42, radius: 22, sizeMm: 4.4, colorHex: '#F1F5F9', colorName: 'Creamy White', opacity: 'Opaque', shape: 'Irregular', elevation: 'Flat', margin: 'Undulate (Wavy)', surface: 'Wrinkled' },
      { id: 3, x: 45, y: 65, radius: 26, sizeMm: 5.2, colorHex: '#E2E8F0', colorName: 'Dull Grayish White', opacity: 'Opaque', shape: 'Irregular', elevation: 'Flat', margin: 'Lobate', surface: 'Rough' },
      { id: 4, x: 26, y: 55, radius: 18, sizeMm: 3.6, colorHex: '#F1F5F9', colorName: 'Creamy White', opacity: 'Opaque', shape: 'Irregular', elevation: 'Flat', margin: 'Undulate (Wavy)', surface: 'Dull' }
    ],
    imageDataUrl: createPetriPlateImage(
      '#FEF08A',
      '#94A3B8',
      [
        { x: 38, y: 35, r: 24, color: '#F8FAFC' },
        { x: 64, y: 42, r: 22, color: '#F1F5F9' },
        { x: 45, y: 65, r: 26, color: '#E2E8F0' },
        { x: 26, y: 55, r: 18, color: '#F8FAFC' }
      ]
    )
  }
];
