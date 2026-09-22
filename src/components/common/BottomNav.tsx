import React from 'react';
import { Home, Sparkles, MessageSquareCode, BookOpen, User, FlaskConical } from 'lucide-react';
import { SupportedLanguage } from '../../types/microbiology';
import { translations } from '../../data/translations';

export type ActiveTab = 'home' | 'analyze' | 'chat' | 'study' | 'lab' | 'reports' | 'profile';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  language: SupportedLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, language }) => {
  const t = translations[language] || translations.en;

  const navItems = [
    { id: 'home' as ActiveTab, label: t.home, icon: Home },
    { id: 'study' as ActiveTab, label: t.study, icon: BookOpen },
    { id: 'analyze' as ActiveTab, label: t.analyze, icon: Sparkles, isPrimary: true },
    { id: 'chat' as ActiveTab, label: t.chat, icon: MessageSquareCode },
    { id: 'profile' as ActiveTab, label: t.profile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-purple-100 shadow-lg px-2 pb-safe pt-1 max-w-md mx-auto sm:max-w-xl md:max-w-2xl transition-all">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative -top-3 flex flex-col items-center group focus:outline-none"
                aria-label={item.label}
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-tr from-purple-800 via-purple-700 to-pink-600 text-white ring-4 ring-purple-100'
                      : 'bg-gradient-to-tr from-purple-900 to-pink-600 text-white shadow-purple-900/25'
                  }`}
                >
                  <Icon className="w-6 h-6 stroke-[2.3]" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight ${
                    isActive ? 'text-purple-900' : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-colors duration-150 focus:outline-none ${
                isActive ? 'text-purple-800' : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'stroke-[2.5] scale-110 text-purple-900' : 'stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-600" />
                )}
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors ${
                  isActive ? 'font-bold text-purple-950' : 'text-slate-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
