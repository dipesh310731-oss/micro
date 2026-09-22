import React, { useState } from 'react';
import {
  FileText,
  Search,
  Trash2,
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import { PetriAnalysisResult, SupportedLanguage } from '../../types/microbiology';
import { translations } from '../../data/translations';

interface MyReportsHubProps {
  reports: PetriAnalysisResult[];
  onSelectReport: (report: PetriAnalysisResult) => void;
  onDeleteReport: (reportId: string) => void;
  onNavigateToAnalyzer: () => void;
  language: SupportedLanguage;
}

export const MyReportsHub: React.FC<MyReportsHubProps> = ({
  reports,
  onSelectReport,
  onDeleteReport,
  onNavigateToAnalyzer,
  language
}) => {
  const t = translations[language] || translations.en;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.sampleName.toLowerCase().includes(q) ||
      r.labInputs.cultureMedium.toLowerCase().includes(q) ||
      r.presumptiveCandidates.some((c) => c.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-4 pb-20">
      <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-800" />
            <span>{t.myReports}</span>
            <span className="text-[10px] bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full font-bold">
              {reports.length}
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Archived Petri plate colony segmentations, morphological evaluations & PDF exports
          </p>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-purple-700 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports by sample, organism..."
            className="w-full bg-purple-50/50 border border-purple-200 rounded-xl pl-8 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-purple-500 font-medium"
          />
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-purple-100 text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">No Reports Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Perform your first Petri plate photograph upload or run an automated sample analysis to generate and save reports.
          </p>
          <button
            onClick={onNavigateToAnalyzer}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-900 to-pink-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs hover:opacity-95 transition-opacity"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyze New Plate</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-4 border border-purple-100 shadow-xs hover:border-purple-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-purple-200 shrink-0 bg-purple-50">
                  <img
                    src={report.originalImage}
                    alt={report.sampleName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-extrabold text-sm text-purple-950 truncate">
                    {report.sampleName}
                  </h4>
                  <p className="text-xs text-pink-600 font-bold truncate">
                    {report.presumptiveCandidates[0]?.name || 'Unspecified'}
                  </p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-purple-500" />
                    <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-purple-50">
                <div className="flex items-center gap-2 text-slate-600">
                  <span className="bg-purple-50 font-bold px-2 py-0.5 rounded-md text-purple-900 text-[10px]">
                    {report.colonies.length} CFUs
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {report.labInputs.cultureMedium.split(' ')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSelectReport(report)}
                    className="inline-flex items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View / PDF</span>
                  </button>

                  <button
                    onClick={() => onDeleteReport(report.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
