import React from 'react';
import {
  Printer,
  Download,
  Share2,
  X,
  AlertTriangle,
  FlaskConical,
  CheckCircle2,
  Calendar,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { PetriAnalysisResult, SupportedLanguage } from '../../types/microbiology';
import { MicroLogo } from '../common/MicroLogo';

interface ReportModalProps {
  report: PetriAnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !report) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = `MICRO ANALYSIS Diagnostic Report: ${report.sampleName}\nCFU Count: ${report.colonies.length}\nTop Candidate: ${report.presumptiveCandidates[0]?.name || 'Unspecified'}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `MICRO ANALYSIS - ${report.sampleName}`,
          text
        });
      } catch {}
    } else {
      navigator.clipboard?.writeText(text);
      alert('Report summary copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl border border-purple-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Action Toolbar (Hidden during print) */}
        <div className="p-4 border-b border-purple-100 flex items-center justify-between bg-purple-50/50 print:hidden rounded-t-3xl">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-900" />
            <span className="font-extrabold text-sm text-purple-950">
              Laboratory Analysis Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-purple-900 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs hover:bg-purple-950 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 text-purple-900 hover:bg-purple-100 rounded-xl transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div id="printable-report" className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-900 bg-white">
          {/* Document Header */}
          <div className="flex items-start justify-between border-b-2 border-purple-900 pb-4">
            <div className="flex items-center gap-3">
              <MicroLogo size={48} />
              <div>
                <h1 className="text-xl font-black text-purple-950 tracking-tight">
                  MICRO ANALYSIS
                </h1>
                <p className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                  Analyze. Learn. Discover.
                </p>
                <p className="text-[10px] text-slate-500">
                  Microbiology Laboratory & Computer Vision Analysis Platform
                </p>
              </div>
            </div>

            <div className="text-right text-xs space-y-0.5">
              <span className="inline-block bg-purple-100 text-purple-900 font-extrabold text-[10px] px-2.5 py-0.5 rounded-md uppercase">
                Diagnostic Report
              </span>
              <p className="text-slate-500 text-[11px] flex items-center justify-end gap-1 mt-1">
                <Calendar className="w-3 h-3 text-purple-700" />
                {new Date(report.timestamp).toLocaleString()}
              </p>
              <p className="text-[10px] text-slate-400">ID: {report.id}</p>
            </div>
          </div>

          {/* Critical Presumptive Disclaimer Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold uppercase tracking-wide">
                Possible / Presumptive Identification Only:
              </span>
              <p className="text-[11px] text-amber-900 mt-0.5 leading-relaxed">
                {report.overallDisclaimer}
              </p>
            </div>
          </div>

          {/* Sample & Plate Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Specimen Photograph with Segmented Overlay */}
            <div className="border border-purple-100 rounded-2xl p-3 bg-[#FAF7FD] text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block">
                Analyzed Petri Plate Specimen
              </span>
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border-2 border-purple-300 shadow-sm bg-white">
                <img
                  src={report.originalImage}
                  alt="Petri Dish"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] text-slate-500">
                Dish Rim Confidence: {report.plateConfidence}% | Colonies Identified: {report.colonies.length}
              </p>
            </div>

            {/* Specimen Meta & Lab Inputs Table */}
            <div className="space-y-2 text-xs">
              <span className="text-[11px] font-bold text-purple-950 uppercase tracking-wider block">
                Laboratory Metadata
              </span>
              <table className="w-full text-xs">
                <tbody className="divide-y divide-purple-50">
                  <tr>
                    <td className="py-1.5 font-bold text-slate-700">Sample Name:</td>
                    <td className="py-1.5 font-semibold text-purple-950">{report.sampleName}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-700">Sample Matrix:</td>
                    <td className="py-1.5 text-slate-800">{report.labInputs.sampleType || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-700">Culture Medium:</td>
                    <td className="py-1.5 text-slate-800">{report.labInputs.cultureMedium}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-700">Gram Stain:</td>
                    <td className="py-1.5 text-slate-800">{report.labInputs.gramStain || 'Pending'}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-700">Catalase / Oxidase:</td>
                    <td className="py-1.5 text-slate-800">
                      {report.labInputs.catalaseTest || 'N/T'} / {report.labInputs.oxidaseTest || 'N/T'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-700">Growth Purity:</td>
                    <td className="py-1.5 text-slate-800">{report.morphology.growthPurity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Morphological Analysis Table */}
          <div className="space-y-2">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-purple-100 pb-1 flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-800" />
              <span>Macroscopic Colony Morphology</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Total CFUs</span>
                <p className="font-extrabold text-purple-950 text-base">{report.morphology.totalCount}</p>
              </div>
              <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Avg Size</span>
                <p className="font-extrabold text-purple-950 text-base">{report.morphology.averageDiameterMm} mm</p>
              </div>
              <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Pigmentation</span>
                <p className="font-bold text-pink-700">{report.morphology.predominantColor}</p>
              </div>
              <div className="bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Form & Margin</span>
                <p className="font-bold text-purple-950 text-xs truncate">
                  {report.morphology.predominantShape} / {report.morphology.predominantMargin}
                </p>
              </div>
            </div>
          </div>

          {/* Presumptive Microorganism Candidates */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 border-b border-purple-100 pb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-pink-600" />
              <span>Presumptive Microorganism Candidates</span>
            </h3>

            <div className="space-y-2.5">
              {report.presumptiveCandidates.map((cand, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-xl border border-purple-100 bg-[#FAF7FD]/70 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-sm text-purple-950 italic">
                        {cand.name}
                      </span>
                      <span className="ml-2 text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-md font-bold not-italic">
                        {cand.biosafetyLevel}
                      </span>
                    </div>
                    <span className="bg-purple-900 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md">
                      {cand.confidenceScore}% ({cand.confidenceTier})
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    <strong className="text-slate-800">Diagnostic Caveat: </strong>
                    {cand.limitations[0]}
                  </p>

                  <div className="text-[11px] text-slate-700">
                    <strong className="text-slate-800">Mandatory Confirmatory Assays: </strong>
                    {cand.suggestedConfirmatoryTests.join('; ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer & Signature Line */}
          <div className="pt-6 border-t border-purple-100 text-xs flex items-end justify-between">
            <div className="text-[10px] text-slate-400 space-y-0.5">
              <p>Generated by MICRO ANALYSIS Automated Diagnostic Assistance Engine</p>
              <p>Certified for educational and presumptive preliminary screening</p>
            </div>

            <div className="text-center w-40 border-t border-slate-300 pt-1">
              <p className="text-[10px] text-slate-500 font-bold">Reviewing Microbiologist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
