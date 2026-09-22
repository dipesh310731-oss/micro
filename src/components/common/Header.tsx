import React from 'react';
import { MicroLogo } from './MicroLogo';
import { SupportedLanguage, UserProfile } from '../../types/microbiology';
import { Globe, Flame, ShieldAlert } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenProfile: () => void;
  onOpenSafetyNotice?: () => void;
}

const LANGUAGE_LABELS: Record<SupportedLanguage, { label: string; code: string }> = {
  en: { label: 'English', code: 'EN' },
  mr: { label: 'मराठी', code: 'मरा' },
  hi: { label: 'हिंदी', code: 'हिं' },
  hinglish: { label: 'Hinglish', code: 'HING' },
};

export const Header: React.FC<HeaderProps> = ({
  user,
  currentLang,
  onLanguageChange,
  onOpenProfile,
  onOpenSafetyNotice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-xs px-4 py-2.5 transition-all">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={onOpenProfile}>
          <MicroLogo size={36} />
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
              MICRO <span className="text-pink-600">ANALYSIS</span>
            </h1>
            <p className="text-[10px] font-semibold text-purple-900/70 tracking-wide uppercase mt-0.5">
              Analyze. Learn. Discover.
            </p>
          </div>
        </div>

        {/* Right side controls: Language switcher, Streak, Profile Avatar */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative inline-flex items-center">
            <Globe className="w-3.5 h-3.5 text-purple-700 absolute left-2 pointer-events-none" />
            <select
              value={currentLang}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              aria-label="Select Application Language"
              className="appearance-none bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-xs font-semibold rounded-lg pl-7 pr-3 py-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              <option value="en">English (EN)</option>
              <option value="mr">मराठी (MR)</option>
              <option value="hi">हिंदी (HI)</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>

          {/* Study Streak Badge */}
          <div
            title="Daily Study Streak"
            className="hidden sm:flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded-lg"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{user.studyStreakDays}d</span>
          </div>

          {/* Safety Notice Button */}
          {onOpenSafetyNotice && (
            <button
              onClick={onOpenSafetyNotice}
              title="Presumptive identification disclaimer & biosafety guidelines"
              className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
              aria-label="Safety & Presumptive Disclaimer"
            >
              <ShieldAlert className="w-4 h-4 text-purple-600" />
            </button>
          )}

          {/* User Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="Open User Profile"
            className="flex items-center gap-1.5 bg-gradient-to-br from-purple-800 to-pink-600 text-white p-0.5 rounded-full ring-2 ring-purple-100 hover:ring-purple-300 transition-all focus:outline-none"
          >
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
              {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
