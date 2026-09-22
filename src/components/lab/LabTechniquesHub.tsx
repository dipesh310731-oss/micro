import React, { useState } from 'react';
import {
  FlaskConical,
  Search,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronRight,
  Sparkles,
  ClipboardList,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { LabTechnique, SupportedLanguage } from '../../types/microbiology';
import { LAB_TECHNIQUES } from '../../data/microbiologyKnowledge';
import { translations } from '../../data/translations';

interface LabTechniquesHubProps {
  language: SupportedLanguage;
  onAskAiAboutTechnique?: (techTitle: string) => void;
}

export const LabTechniquesHub: React.FC<LabTechniquesHubProps> = ({
  language,
  onAskAiAboutTechnique,
}) => {
  const t = translations[language] || translations.en;

  const [selectedCategory, setSelectedCategory] = useState<LabTechnique['category']>('Microscopy');
  const [selectedTechId, setSelectedTechId] = useState<string>('tech-microscope');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: LabTechnique['category'][] = [
    'Microscopy',
    'Staining',
    'Culture Media',
    'Biochemical Tests',
    'Sterilization',
  ];

  const filteredTechniques = LAB_TECHNIQUES.filter((tech) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        tech.title.toLowerCase().includes(q) ||
        tech.principle.toLowerCase().includes(q) ||
        tech.category.toLowerCase().includes(q)
      );
    }
    return tech.category === selectedCategory;
  });

  const currentTechnique =
    LAB_TECHNIQUES.find((t) => t.id === selectedTechId) || filteredTechniques[0] || LAB_TECHNIQUES[0];

  return (
    <div className="space-y-4 pb-20">
      {/* Header & Category Filters */}
      <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-purple-800" />
              <span>{t.labTechniques}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Standard operating procedures (SOPs), principles, controls, and biosafety protocols
            </p>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-purple-700 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search protocols, tests..."
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchQuery('');
                const firstInCat = LAB_TECHNIQUES.find((item) => item.category === cat);
                if (firstInCat) setSelectedTechId(firstInCat.id);
              }}
              className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                selectedCategory === cat && !searchQuery
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'bg-purple-50/70 hover:bg-purple-100 text-purple-900 border border-purple-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Protocol Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Protocol Sidebar list */}
        <div className="md:col-span-4 bg-white rounded-3xl p-4 border border-purple-100 shadow-xs space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Available Protocols ({filteredTechniques.length})
          </span>
          <div className="space-y-1.5">
            {filteredTechniques.map((tech) => {
              const isSelected = selectedTechId === tech.id;
              return (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTechId(tech.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900 to-pink-600 text-white font-bold shadow-xs'
                      : 'bg-purple-50/40 hover:bg-purple-100/60 text-slate-800 border border-purple-100/50'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate font-semibold">{tech.title}</p>
                    <span className={`text-[10px] ${isSelected ? 'text-pink-200' : 'text-slate-500'}`}>
                      {tech.category}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Protocol View Card */}
        <div className="md:col-span-8 bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-50 pb-3">
            <div>
              <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                {currentTechnique.category}
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {currentTechnique.title}
              </h3>
            </div>

            {onAskAiAboutTechnique && (
              <button
                onClick={() =>
                  onAskAiAboutTechnique(`Explain the procedure and troubleshooting for ${currentTechnique.title}.`)
                }
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-800 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About SOP</span>
              </button>
            )}
          </div>

          {/* Principle */}
          <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100 text-xs">
            <h4 className="font-bold text-purple-950 text-sm mb-1">Scientific Principle</h4>
            <p className="text-slate-700 leading-relaxed">{currentTechnique.principle}</p>
          </div>

          {/* Step-by-Step Procedure */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-purple-800" />
              <span>Step-by-Step Standard Protocol</span>
            </h4>
            <div className="space-y-2">
              {currentTechnique.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF7FD] border border-purple-100 text-xs text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-900 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <p className="leading-snug pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Observations */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-700" />
              <span>Expected Observations & Interpretation</span>
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-700 bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100">
              {currentTechnique.expectedObservations.map((obs, oIdx) => (
                <li key={oIdx} className="leading-relaxed">
                  {obs}
                </li>
              ))}
            </ul>
          </div>

          {/* Troubleshooting & Limitations */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Troubleshooting & Technical Limitations</span>
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-slate-700 bg-amber-50/50 p-3.5 rounded-2xl border border-amber-100">
              {currentTechnique.limitations.map((lim, lIdx) => (
                <li key={lIdx} className="leading-relaxed">
                  {lim}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
