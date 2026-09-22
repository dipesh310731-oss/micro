import React from 'react';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';
import { SupportedLanguage } from '../../types/microbiology';
import { translations } from '../../data/translations';

interface DisclaimerBannerProps {
  language: SupportedLanguage;
  compact?: boolean;
  onDismiss?: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({
  language,
  compact = false,
  onDismiss,
}) => {
  const t = translations[language] || translations.en;

  if (compact) {
    return (
      <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl px-3 py-2 flex items-start gap-2.5 text-xs text-amber-900 shadow-xs">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1">
          <span className="font-bold">Presumptive Reference: </span>
          <span>{t.disclaimerBody}</span>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-amber-600 hover:text-amber-800 p-0.5 rounded-sm"
            aria-label="Dismiss disclaimer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 via-pink-50/50 to-amber-50/80 border border-purple-200/80 rounded-2xl p-4 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 text-purple-900 mt-0.5">
          <ShieldCheck className="w-5 h-5 text-purple-800" />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-purple-950 flex items-center gap-1.5">
              <span>{t.disclaimerTitle}</span>
              <span className="bg-purple-200 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Biosafety & Ethics
              </span>
            </h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {t.disclaimerBody}
          </p>
          <div className="pt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-purple-900 font-medium">
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
              Visual observations are presumptive
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
              Biochemical / PCR verification mandatory
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
              Not intended for clinical medical diagnosis
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
