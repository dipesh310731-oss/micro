import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
  Bookmark,
  Share2,
  Table,
  FileText
} from 'lucide-react';
import {
  StudyCategory,
  StudyTopic,
  SavedNote,
  SupportedLanguage
} from '../../types/microbiology';
import {
  STUDY_CATEGORIES,
  STUDY_TOPICS
} from '../../data/microbiologyKnowledge';
import { translations } from '../../data/translations';

interface StudyExamHubProps {
  language: SupportedLanguage;
  onSaveNote: (note: SavedNote) => void;
  onOpenTopicInChat?: (topicTitle: string) => void;
}

export const StudyExamHub: React.FC<StudyExamHubProps> = ({
  language,
  onSaveNote,
  onOpenTopicInChat
}) => {
  const t = translations[language] || translations.en;

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cat-bacteriology');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('top-gram-staining');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'mcq' | 'viva' | 'tables'>('notes');
  const [examNoteFilter, setExamNoteFilter] = useState<'all' | '2marks' | '5marks' | '10marks'>('all');

  // MCQ state: selected option per question ID, submitted status
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<Record<string, boolean>>({});

  // Filter categories by search
  const filteredCategories = STUDY_CATEGORIES.filter((cat) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
    );
  });

  // Current category & topics
  const currentCategory = STUDY_CATEGORIES.find((c) => c.id === selectedCategoryId) || STUDY_CATEGORIES[1];
  const categoryTopics = STUDY_TOPICS.filter((top) => top.categoryId === currentCategory.id);
  const currentTopic = categoryTopics.find((t) => t.id === selectedTopicId) || categoryTopics[0] || STUDY_TOPICS[0];

  const handleSelectOption = (mcqId: string, optIndex: number) => {
    if (mcqSubmitted[mcqId]) return;
    setMcqAnswers((prev) => ({ ...prev, [mcqId]: optIndex }));
  };

  const handleSubmitMcq = (mcqId: string) => {
    setMcqSubmitted((prev) => ({ ...prev, [mcqId]: true }));
  };

  const handleSaveExamNote = (noteText: string, noteType: string) => {
    const note: SavedNote = {
      id: `note-${Date.now()}`,
      title: `${currentTopic.title} (${noteType})`,
      content: noteText,
      category: currentCategory.name,
      timestamp: new Date().toISOString(),
      examTarget: noteType as any
    };
    onSaveNote(note);
    alert('Note saved to My Reports & Study Notes!');
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Search & Header */}
      <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-800" />
              <span>{t.studyHub}</span>
              <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full font-bold">
                14 Branches
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured University Exam Preparation: 2-Mark, 5-Mark, 10-Mark Notes, MCQs & Viva Traps
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-purple-700 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, topics..."
              className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
            />
          </div>
        </div>

        {/* 14 Categories Horizontal Ribbon */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {filteredCategories.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategoryId(cat.id);
                  const firstTopic = STUDY_TOPICS.find((t) => t.categoryId === cat.id);
                  if (firstTopic) setSelectedTopicId(firstTopic.id);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'bg-purple-50/70 hover:bg-purple-100 text-purple-900 border border-purple-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="whitespace-nowrap">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Study Workspace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Topic Navigator (Sidebar on desktop) */}
        <div className="md:col-span-4 bg-white rounded-3xl p-4 border border-purple-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-purple-50 pb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span>{currentCategory.icon}</span>
              <span>{currentCategory.name}</span>
            </span>
            <span className="text-[10px] text-purple-900 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
              {categoryTopics.length} Topics
            </span>
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            {currentCategory.description}
          </p>

          <div className="space-y-1.5">
            {categoryTopics.map((top) => {
              const isSelected = selectedTopicId === top.id;
              return (
                <button
                  key={top.id}
                  onClick={() => setSelectedTopicId(top.id)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-900 to-pink-700 text-white font-bold shadow-xs'
                      : 'bg-purple-50/40 hover:bg-purple-100/60 text-slate-800 border border-purple-100/50'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <p className="truncate font-semibold">{top.title}</p>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-pink-200' : 'text-slate-600'}`}>
                      {top.overview.slice(0, 48)}...
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Topic Content Panel */}
        <div className="md:col-span-8 bg-white rounded-3xl p-5 border border-purple-100 shadow-xs space-y-4">
          {/* Topic Title & Chat Bridge Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-50 pb-3">
            <div>
              <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider">
                {currentCategory.name}
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                {currentTopic.title}
              </h3>
            </div>

            {onOpenTopicInChat && (
              <button
                onClick={() => onOpenTopicInChat(`Explain ${currentTopic.title} in detail with exam tips.`)}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-800 to-pink-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs hover:opacity-95 transition-opacity"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This</span>
              </button>
            )}
          </div>

          {/* Sub-tabs: Overview, Notes (2M/5M/10M), MCQs, Viva, Comparison Tables */}
          <div className="flex items-center gap-1 bg-purple-50/70 p-1 rounded-2xl overflow-x-auto no-scrollbar text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'overview' ? 'bg-white text-purple-950 shadow-xs' : 'text-purple-800 hover:text-purple-950'
              }`}
            >
              Overview & Key Points
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'notes' ? 'bg-white text-purple-950 shadow-xs' : 'text-purple-800 hover:text-purple-950'
              }`}
            >
              Exam Notes (2M / 5M / 10M)
            </button>
            <button
              onClick={() => setActiveTab('mcq')}
              className={`font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'mcq' ? 'bg-white text-purple-950 shadow-xs' : 'text-purple-800 hover:text-purple-950'
              }`}
            >
              MCQs Practice ({currentTopic.mcqs.length})
            </button>
            <button
              onClick={() => setActiveTab('viva')}
              className={`font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                activeTab === 'viva' ? 'bg-white text-purple-950 shadow-xs' : 'text-purple-800 hover:text-purple-950'
              }`}
            >
              Viva Voce ({currentTopic.vivaQuestions.length})
            </button>
            {currentTopic.comparisonTable && (
              <button
                onClick={() => setActiveTab('tables')}
                className={`font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                  activeTab === 'tables' ? 'bg-white text-purple-950 shadow-xs' : 'text-purple-800 hover:text-purple-950'
                }`}
              >
                Comparison Table
              </button>
            )}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100">
                <h4 className="font-bold text-purple-950 text-sm mb-1">Conceptual Overview</h4>
                <p className="text-slate-700">{currentTopic.overview}</p>
              </div>

              {/* Definitions */}
              {currentTopic.definitions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Essential Definitions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentTopic.definitions.map((def, dIdx) => (
                      <div key={dIdx} className="p-3 bg-white rounded-xl border border-purple-100">
                        <span className="font-bold text-purple-900 block mb-0.5">{def.term}</span>
                        <span className="text-slate-600 text-[11px]">{def.definition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key High-Yield Points */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">High-Yield Points</h4>
                <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                  {currentTopic.keyPoints.map((point, pIdx) => (
                    <li key={pIdx} className="leading-snug">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: EXAM NOTES (2M, 5M, 10M) */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-600">Filter Weightage:</span>
                {(['all', '2marks', '5marks', '10marks'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setExamNoteFilter(w)}
                    className={`text-xs font-bold px-3 py-1 rounded-xl transition-colors ${
                      examNoteFilter === w
                        ? 'bg-purple-900 text-white'
                        : 'bg-purple-50 text-purple-900 hover:bg-purple-100'
                    }`}
                  >
                    {w === 'all' ? 'All Formats' : w === '2marks' ? '2-Marks' : w === '5marks' ? '5-Marks' : '10-Marks'}
                  </button>
                ))}
              </div>

              {/* 2-Mark Notes */}
              {(examNoteFilter === 'all' || examNoteFilter === '2marks') && (
                <div className="p-4 rounded-2xl border border-purple-100 bg-purple-50/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-purple-900 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      2-Mark Question Note
                    </span>
                    <button
                      onClick={() => handleSaveExamNote(currentTopic.examNotes.twoMarks, '2-Marks')}
                      className="text-xs text-purple-800 hover:text-purple-950 font-bold flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    {currentTopic.examNotes.twoMarks}
                  </p>
                </div>
              )}

              {/* 5-Mark Notes */}
              {(examNoteFilter === 'all' || examNoteFilter === '5marks') && (
                <div className="p-4 rounded-2xl border border-pink-100 bg-pink-50/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-pink-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      5-Mark Question Note (Structured)
                    </span>
                    <button
                      onClick={() => handleSaveExamNote(currentTopic.examNotes.fiveMarks, '5-Marks')}
                      className="text-xs text-pink-700 hover:text-pink-900 font-bold flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    {currentTopic.examNotes.fiveMarks}
                  </p>
                </div>
              )}

              {/* 10-Mark Notes */}
              {(examNoteFilter === 'all' || examNoteFilter === '10marks') && (
                <div className="p-4 rounded-2xl border border-purple-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-purple-950 to-purple-800 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                      10-Mark Comprehensive Long Answer Essay
                    </span>
                    <button
                      onClick={() => handleSaveExamNote(currentTopic.examNotes.tenMarks, '10-Marks')}
                      className="text-xs text-purple-800 hover:text-purple-950 font-bold flex items-center gap-1"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Save Note</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    {currentTopic.examNotes.tenMarks}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MCQS PRACTICE */}
          {activeTab === 'mcq' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Test your conceptual recall with high-yield university multiple choice questions.
              </p>

              {currentTopic.mcqs.map((mcq, mIdx) => {
                const selectedOpt = mcqAnswers[mcq.id];
                const isSubmitted = mcqSubmitted[mcq.id];

                return (
                  <div key={mcq.id} className="p-4 rounded-2xl border border-purple-100 bg-[#FAF7FD]/60 space-y-3">
                    <p className="text-xs font-bold text-slate-900 leading-snug">
                      Q{mIdx + 1}: {mcq.question}
                    </p>

                    <div className="space-y-1.5">
                      {mcq.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        const isCorrect = optIdx === mcq.correctIndex;

                        let style = 'bg-white border-purple-100 text-slate-800 hover:bg-purple-50';
                        if (isSubmitted) {
                          if (isCorrect) style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                          else if (isChosen) style = 'bg-red-50 border-red-300 text-red-900';
                        } else if (isChosen) {
                          style = 'bg-purple-100 border-purple-400 text-purple-950 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(mcq.id, optIdx)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition-colors flex items-center justify-between ${style}`}
                          >
                            <span>
                              <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                              {opt}
                            </span>
                            {isSubmitted && isCorrect && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {!isSubmitted ? (
                      <button
                        onClick={() => handleSubmitMcq(mcq.id)}
                        disabled={selectedOpt === undefined}
                        className="bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs disabled:opacity-40 transition-colors"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-0.5">
                        <span className="font-bold">Explanation:</span>
                        <p className="text-[11px] text-slate-700 leading-relaxed">{mcq.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: VIVA VOCE */}
          {activeTab === 'viva' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                Essential oral examination questions asked by university external examiners.
              </p>

              {currentTopic.vivaQuestions.map((viva, vIdx) => (
                <div key={vIdx} className="p-4 rounded-2xl border border-purple-100 bg-white space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-purple-900 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      Q{vIdx + 1}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900">{viva.question}</h4>
                  </div>
                  <div className="pl-7">
                    <p className="text-xs text-purple-950 font-medium leading-relaxed bg-purple-50/50 p-2.5 rounded-xl border border-purple-100/60">
                      <strong className="text-purple-900">Model Viva Answer: </strong>
                      {viva.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: COMPARISON TABLES */}
          {activeTab === 'tables' && currentTopic.comparisonTable && (
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-900">
                {currentTopic.comparisonTable.title}
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-purple-100">
                <table className="w-full text-xs text-left">
                  <thead className="bg-purple-900 text-white uppercase text-[10px] font-bold">
                    <tr>
                      {currentTopic.comparisonTable.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-50 text-slate-700">
                    {currentTopic.comparisonTable.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-purple-50/30'}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="py-2.5 px-3 font-medium">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
