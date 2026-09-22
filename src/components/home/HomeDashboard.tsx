import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Upload,
  MessageSquareCode,
  BookOpen,
  FlaskConical,
  FileText,
  Flame,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  SupportedLanguage,
  PetriAnalysisResult,
  UserProfile
} from '../../types/microbiology';
import { translations } from '../../data/translations';
import { SAMPLE_PLATES } from '../../data/samplePlates';
import { STUDY_CATEGORIES } from '../../data/microbiologyKnowledge';
import { ActiveTab } from '../common/BottomNav';

interface HomeDashboardProps {
  language: SupportedLanguage;
  user: UserProfile;
  recentReports: PetriAnalysisResult[];
  onNavigate: (tab: ActiveTab) => void;
  onQuickAskAi: (question: string) => void;
  onOpenReport: (report: PetriAnalysisResult) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  language,
  user,
  recentReports,
  onNavigate,
  onQuickAskAi,
  onOpenReport,
}) => {
  const t = translations[language] || translations.en;
  const [quickQuestion, setQuickQuestion] = useState('');

  // Daily Challenge State
  const [dailyMcqAnswer, setDailyMcqAnswer] = useState<number | null>(null);
  const [dailyMcqSubmitted, setDailyMcqSubmitted] = useState(false);

  const samplePlatePreview = recentReports[0] || null;

  const quickPrompts = [
    'Explain Gram staining principle',
    'Differences between Gram-positive and Gram-negative bacteria',
    'Autoclave sterilization temperature and time',
    'Lactose fermenters on MacConkey agar',
  ];

  return (
    <div className="space-y-5 pb-20">
      {/* Hero Welcome & Quick Streak Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-purple-900 to-pink-800 text-white rounded-3xl p-6 shadow-xl shadow-purple-950/20 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-pink-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
              Welcome back, {user.name.split(' ')[0]}
            </span>
            <div className="flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold px-3 py-1 rounded-full">
              <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>{user.studyStreakDays} Day Streak</span>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              MICRO <span className="text-pink-400">ANALYSIS</span>
            </h2>
            <p className="text-purple-200 text-xs sm:text-sm font-medium mt-1">
              “Analyze. Learn. Discover.” — Your comprehensive microbiology laboratory & study platform.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onNavigate('analyze')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.analyzeNewPlate}</span>
            </button>

            <button
              onClick={() => onNavigate('study')}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl backdrop-blur-xs transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Study Hub</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: 🧫 PETRI PLATE ANALYSIS CARD */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm">
              🧫
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                {t.petriPlateAnalysis}
              </h3>
              <p className="text-xs text-slate-500">
                Segment colonies, estimate CFU diameter, and presumptive organism matching
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('analyze')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
          >
            <span>Open Studio</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action Tile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigate('analyze')}
            className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/60 transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2 rounded-xl bg-purple-900 text-white shrink-0 group-hover:scale-105 transition-transform">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                Take Photo
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Capture Petri dish with camera centering guide
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('analyze')}
            className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/60 transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2 rounded-xl bg-pink-600 text-white shrink-0 group-hover:scale-105 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 group-hover:text-pink-700">
                Upload from Gallery
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                High-resolution JPEG/PNG plate photographs
              </p>
            </div>
          </button>

          <button
            onClick={() => onNavigate('analyze')}
            className="p-4 rounded-2xl border border-purple-100 bg-purple-50/50 hover:bg-purple-100/60 transition-all text-left flex items-start gap-3 group"
          >
            <div className="p-2 rounded-xl bg-purple-800 text-white shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                Preset Test Plates
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                MacConkey, Nutrient, Blood agar calibrated models
              </p>
            </div>
          </button>
        </div>

        {/* Recent Analysis Preview Bar */}
        {samplePlatePreview && (
          <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-purple-200 shrink-0 bg-white">
                <img
                  src={samplePlatePreview.originalImage}
                  alt={samplePlatePreview.sampleName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Recent Specimen</span>
                <p className="font-bold text-purple-950 truncate">{samplePlatePreview.sampleName}</p>
                <p className="text-[11px] text-pink-600 font-semibold truncate">
                  {samplePlatePreview.colonies.length} CFUs • {samplePlatePreview.presumptiveCandidates[0]?.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenReport(samplePlatePreview)}
              className="shrink-0 bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs px-3 py-1.5 rounded-xl transition-colors"
            >
              View Report
            </button>
          </div>
        )}
      </div>

      {/* SECTION 2: 🤖 ASK MICROBIOLOGY FAST AI BOX */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-sm">
              🤖
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                {t.askMicrobiology}
              </h3>
              <p className="text-xs text-slate-500">
                Multi-language AI tutor with 2-mark, 5-mark, and Viva formats
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('chat')}
            className="text-xs font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1"
          >
            <span>Full Chat</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Fast Question Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (quickQuestion.trim()) {
              onQuickAskAi(quickQuestion);
            }
          }}
          className="relative"
        >
          <input
            type="text"
            value={quickQuestion}
            onChange={(e) => setQuickQuestion(e.target.value)}
            placeholder="Ask anything (e.g. Gram stain principle, autoclave cycle)..."
            className="w-full bg-purple-50/40 border border-purple-200 rounded-2xl pl-4 pr-24 py-3 text-xs sm:text-sm font-medium focus:ring-2 focus:ring-purple-500 text-slate-900"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-900 to-pink-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs hover:opacity-95 transition-opacity"
          >
            Ask AI
          </button>
        </form>

        {/* Suggested Prompts */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0">Popular:</span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => onQuickAskAi(p)}
              className="shrink-0 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-100 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 3 & 4: STUDY HUB & LAB TECHNIQUES 2-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Study & Exam Hub Preview */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="text-base">📚</span>
              <span>{t.studyHub}</span>
            </h3>
            <button
              onClick={() => onNavigate('study')}
              className="text-xs font-bold text-pink-600 hover:text-pink-700"
            >
              View 14 Categories →
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-snug">
            Master Bacteriology, Virology, Immunology & Molecular Biology with university exam notes.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => onNavigate('study')}
              className="p-2.5 rounded-xl bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-left border border-purple-100/60"
            >
              📝 2 & 5 Mark Notes
            </button>
            <button
              onClick={() => onNavigate('study')}
              className="p-2.5 rounded-xl bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-left border border-purple-100/60"
            >
              📖 10 Mark LAQ Essays
            </button>
            <button
              onClick={() => onNavigate('study')}
              className="p-2.5 rounded-xl bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-left border border-purple-100/60"
            >
              🎯 High-Yield MCQs
            </button>
            <button
              onClick={() => onNavigate('study')}
              className="p-2.5 rounded-xl bg-purple-50/60 hover:bg-purple-100 text-purple-900 text-left border border-purple-100/60"
            >
              🎤 Viva Voce Traps
            </button>
          </div>
        </div>

        {/* Lab & Techniques Preview */}
        <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="text-base">🧪</span>
              <span>{t.labTechniques}</span>
            </h3>
            <button
              onClick={() => onNavigate('lab')}
              className="text-xs font-bold text-purple-800 hover:text-purple-950"
            >
              Explore SOPs →
            </button>
          </div>

          <p className="text-xs text-slate-500 leading-snug">
            Hands-on laboratory manuals with step-by-step procedures, controls, and biosafety protocols.
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => onNavigate('lab')}
              className="p-2.5 rounded-xl bg-pink-50/50 hover:bg-pink-100/60 text-pink-900 text-left border border-pink-100/60"
            >
              🔬 Microscope SOP
            </button>
            <button
              onClick={() => onNavigate('lab')}
              className="p-2.5 rounded-xl bg-pink-50/50 hover:bg-pink-100/60 text-pink-900 text-left border border-pink-100/60"
            >
              🟣 Gram Stain Protocol
            </button>
            <button
              onClick={() => onNavigate('lab')}
              className="p-2.5 rounded-xl bg-pink-50/50 hover:bg-pink-100/60 text-pink-900 text-left border border-pink-100/60"
            >
              🧫 Culture Media Prep
            </button>
            <button
              onClick={() => onNavigate('lab')}
              className="p-2.5 rounded-xl bg-pink-50/50 hover:bg-pink-100/60 text-pink-900 text-left border border-pink-100/60"
            >
              🔥 Autoclave Operation
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 5: 📈 DAILY LEARNING WIDGET */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50/40 rounded-3xl p-5 border border-purple-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-purple-100 pb-2">
          <span className="text-xs font-black text-purple-950 flex items-center gap-1.5 uppercase tracking-wider">
            <span>📈</span>
            <span>Daily Microbiology Digest</span>
          </span>
          <span className="text-[10px] text-pink-600 font-bold bg-pink-100 px-2.5 py-0.5 rounded-full">
            Today's Picks
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Organism of the Day */}
          <div className="p-3.5 bg-white rounded-2xl border border-purple-100 space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-purple-900 uppercase">Organism of the Day</span>
            <p className="font-extrabold text-sm text-slate-900 italic">Escherichia coli</p>
            <p className="text-[11px] text-slate-600 leading-snug">
              Gram-negative bacillus; lactose fermenter with pink colonies and bile precipitation on MacConkey agar.
            </p>
          </div>

          {/* Media of the Day */}
          <div className="p-3.5 bg-white rounded-2xl border border-purple-100 space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-pink-700 uppercase">Medium of the Day</span>
            <p className="font-extrabold text-sm text-slate-900">MacConkey Agar</p>
            <p className="text-[11px] text-slate-600 leading-snug">
              Selective & differential medium containing bile salts, crystal violet, neutral red, and lactose.
            </p>
          </div>

          {/* Staining of the Day */}
          <div className="p-3.5 bg-white rounded-2xl border border-purple-100 space-y-1 shadow-xs">
            <span className="text-[10px] font-bold text-purple-900 uppercase">Staining of the Day</span>
            <p className="font-extrabold text-sm text-slate-900">Gram Staining (1884)</p>
            <p className="text-[11px] text-slate-600 leading-snug">
              Differential staining using crystal violet primary dye, Gram's iodine mordant, and safranin counterstain.
            </p>
          </div>
        </div>

        {/* Daily MCQ Challenge */}
        <div className="p-4 bg-white rounded-2xl border border-purple-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-purple-950 flex items-center gap-1.5">
              <span>🎯</span>
              <span>Daily Challenge: Question of the Day</span>
            </span>
            <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              +10 Streak XP
            </span>
          </div>

          <p className="text-xs font-semibold text-slate-900">
            What is the standard holding temperature and pressure for surgical autoclave sterilization?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              '100°C at 10 psi for 10 minutes',
              '121°C at 15 psi for 15-20 minutes',
              '160°C at 0 psi for 2 hours',
              '134°C at 5 psi for 45 minutes',
            ].map((opt, idx) => {
              const isSelected = dailyMcqAnswer === idx;
              const isCorrect = idx === 1;

              let style = 'bg-purple-50/50 hover:bg-purple-100 text-slate-800 border-purple-100';
              if (dailyMcqSubmitted) {
                if (isCorrect) style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                else if (isSelected) style = 'bg-red-50 border-red-300 text-red-900';
              } else if (isSelected) {
                style = 'bg-purple-200 border-purple-400 text-purple-950 font-bold';
              }

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (!dailyMcqSubmitted) {
                      setDailyMcqAnswer(idx);
                      setDailyMcqSubmitted(true);
                    }
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between text-xs ${style}`}
                >
                  <span>{opt}</span>
                  {dailyMcqSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>

          {dailyMcqSubmitted && (
            <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <strong>Correct! </strong> Autoclaving requires saturated steam at 121°C (250°F) under 15 psi (103 kPa)
              pressure for 15-20 minutes to kill heat-resistant bacterial endospores (e.g., <em>Geobacillus stearothermophilus</em>).
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
